import * as React from 'react';
import { Component } from 'react';
import Wizard from '@shared/components/wizard';

import { StepProps } from '@shared/smart-components/smart-wizard/StepProps';
import SectionLoader from '@shared/components/loader/SectionLoader';
import { GitRepository } from '@app/models/GitRepository';
import GitUser from '@app/models/GitUser';
import { FetchedData } from '@app/models/FetchedData';
import { Select, SelectOption, TextInput } from '@patternfly/react-core';
import { AuthorizationWarning } from '../../AuthorizationWarning';

const REPOSITORY_VALUE_REGEXP = new RegExp('^[a-z][a-z0-9-.]{3,63}$');

function validateRepository(repository?: GitRepository): boolean {
  return Boolean(repository
    && (!repository.organization || REPOSITORY_VALUE_REGEXP.test(repository.organization))
    && REPOSITORY_VALUE_REGEXP.test(repository.name));
}

export interface RepositoryStepContext {
  repository?: GitRepository;
}

export interface RepositoryStepProps extends StepProps<RepositoryStepContext> {
  applicationName?: string;
  gitUserData: FetchedData<GitUser>;
  authentication: {
    authenticationEnabled: boolean;
    openAccountManagement(): void;
  };
  fetchGitUser(): void;
}

export interface BaseGitRepository {
  organization?: string;
  owner: string;
  name: string;
}


function withGitHubUrl(repo: BaseGitRepository): GitRepository {
  return {
    ...repo,
    url: `http://www.github.com/${repo.organization || repo.owner}/${repo.name}`,
  };
}

class RepositoryStep extends Component<RepositoryStepProps> {

  public static defaultProps = {
    context: {},
  };

  public componentDidMount() {
    this.props.fetchGitUser();
  }

  public componentDidUpdate() {
    if (this.props.status.selected && !this.props.context.repository && this.props.gitUserData.data) {
      const repository = {
        organization: undefined,
        owner: this.props.gitUserData.data.login,
        name: this.props.applicationName,
      } as GitRepository;
      this.updateStepContext(repository);
    }
  }

  public render() {
    const {gitUserData} = this.props;
    const {organization, name} = this.props.context.repository || {name: '', organization: ''};
    const options = gitUserData.data ? [gitUserData.data.login, ...gitUserData.data.organizations] : [];
    const isGitNotAuthorized = gitUserData.error && gitUserData.error.response && gitUserData.error.response.status === 404;
    const submit = () => this.props.submit();
    return (
      <Wizard.Step
        title={'Source Code Repository'}
        summary={`➡️ Your future application source code will be in «${this.props.context.repository}»`}
        onClick={this.props.select}
        {...this.props.status}
      >
        <SectionLoader loading={gitUserData.loading} error={!isGitNotAuthorized && gitUserData.error} reload={this.props.fetchGitUser}>
          {isGitNotAuthorized && (
            <AuthorizationWarning {...this.props.authentication}
                                  name="repository access"
                                  retry={this.props.fetchGitUser}
            />
          )}
          {!isGitNotAuthorized && gitUserData.data && (
            <React.Fragment>
              <Select
                onChange={this.onOrganizationChange}
                value={organization || gitUserData.data.login}
                aria-label="select-organization"
              >
                {options.map((option, index) => (
                  <SelectOption key={index} value={option} label={option}/>
                ))}
              </Select>
              <TextInput value={name} onChange={this.onNameChange} aria-label="select-repository"/>
            </React.Fragment>
          )}

        </SectionLoader>
        <Wizard.StepFooter>
          <Wizard.Button type={'next'} onClick={submit} disabled={!this.props.status.completed}/>
        </Wizard.StepFooter>
      </Wizard.Step>
    );
  }

  public onOrganizationChange = (organization) => {
    if (!organization) {
      return;
    }
    const name = this.props.context.repository ? this.props.context.repository.name : '';
    const owner = this.props.gitUserData.data.login;
    if (organization === owner) {
      this.updateStepContext({name, owner});
      return;
    }
    this.updateStepContext({organization, name, owner});
  };

  public onNameChange = (name) => {
    const organization = this.props.context.repository ? this.props.context.repository.organization : '';
    const owner = this.props.gitUserData.data.login;
    this.updateStepContext({name, organization, owner});
  };

  private updateStepContext(baseRepo: BaseGitRepository) {
    const repository = withGitHubUrl(baseRepo);
    this.props.updateStepContext({context: {repository}, completed: validateRepository(repository)});
  }
}

export default RepositoryStep;