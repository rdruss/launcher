import * as React from 'react';
import { Component } from 'react';
import * as Patternfly from 'patternfly-react';
import Wizard from '../../../../components/wizard/index';

import { StepProps } from '../StepProps';
import SectionLoader from '../../../../components/loader/SectionLoader';
import { GitRepository } from '../../../models/GitRepository';
import GitUser from '../../../models/GitUser';
import { FetchedData } from '../../../models/FetchedData';

const REPOSITORY_VALUE_REGEXP = new RegExp('^[a-z][a-z0-9-.]{3,63}$');

function validateRepository(repository?:GitRepository): boolean {
  return Boolean(repository
    && REPOSITORY_VALUE_REGEXP.test(repository.organization)
    && REPOSITORY_VALUE_REGEXP.test(repository.name));
}

export interface RepositoryStepContext {
  repository?: GitRepository;
}

export interface RepositoryStepProps extends StepProps<RepositoryStepContext> {
  applicationName?: string;
  gitUserData: FetchedData<GitUser>;
  fetchGitUser: () => {};
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
      const repository = { organization: this.props.gitUserData.data.login, name: this.props.applicationName } as GitRepository;
      this.updateStepContext(repository);
    }
  }

  public render() {
    const { gitUserData } = this.props;
    const { organization, name} = this.props.context.repository || { name: '', organization: ''};
    return (
      <Wizard.Step
        title={'Source Code Repository'}
        summary={`➡️ Your future application source code will be in «${this.props.context.repository}»`}
        onClick={this.props.select}
        {...this.props.status}
      >
        <SectionLoader loading={gitUserData.loading} error={gitUserData.error}>
          {gitUserData.data && (
            <Patternfly.TypeAheadSelect
              options={[gitUserData.data.login, ...gitUserData.data.organizations]}
              onChange={this.onOrganizationChange}
              selected={[organization]}
            />
          )}
          <input type="text" value={name} onChange={this.onNameChange}/>
        </SectionLoader>
        <Wizard.Button type={'next'} onClick={this.props.submit} disabled={!this.props.status.completed}/>
      </Wizard.Step>
    );
  }

  public onOrganizationChange = ([organization]: string[]) => {
    if (!organization) {
      return;
    }
    const name = this.props.context.repository ? this.props.context.repository.name : '';
    this.updateStepContext({ organization, name });
  }

  public onNameChange = (event) => {
    const name = event.target.value;
    const organization = this.props.context.repository ? this.props.context.repository.organization : '';
    this.updateStepContext({ name, organization });
  }

  private updateStepContext(repository: GitRepository) {
    this.props.updateStepContext({context: {repository}, completed: validateRepository(repository)});
  }
}

export default RepositoryStep;