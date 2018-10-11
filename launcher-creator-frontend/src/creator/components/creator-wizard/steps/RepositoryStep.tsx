import * as React from 'react';
import { Component } from 'react';
import Wizard from '../../../../components/wizard/index';

import { StepProps } from '../StepProps';
import SectionLoader from '../../../../components/loader/SectionLoader';
import { GitRepository } from '../../../models/GitRepository';
import GitUser from '../../../models/GitUser';
import { FetchedData } from '../../../models/FetchedData';
import { Select, SelectOption, TextInput } from '@patternfly/react-core';

const REPOSITORY_VALUE_REGEXP = new RegExp('^[a-z][a-z0-9-.]{3,63}$');

function validateRepository(repository?: GitRepository): boolean {
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

  fetchGitUser(): void;
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
      const repository = {organization: this.props.gitUserData.data.login, name: this.props.applicationName} as GitRepository;
      this.updateStepContext(repository);
    }
  }

  public render() {
    const {gitUserData} = this.props;
    const {organization, name} = this.props.context.repository || {name: '', organization: ''};
    const options = gitUserData.data ? [gitUserData.data.login, ...gitUserData.data.organizations] : [];
    const noop = () => {
    };
    return (
      <Wizard.Step
        title={'Source Code Repository'}
        summary={`➡️ Your future application source code will be in «${this.props.context.repository}»`}
        onClick={this.props.select}
        {...this.props.status}
      >
        <SectionLoader loading={gitUserData.loading} error={gitUserData.error}>
          {gitUserData.data && (
            <Select
              onChange={this.onOrganizationChange}
              onBlur={noop}
              onFocus={noop}
              value={organization}
              aria-label="select-organization"
            >
              {options.map((option, index) => (
                <SelectOption key={index} value={option} label={option}/>
              ))}
            </Select>
          )}
          <TextInput value={name} onChange={this.onNameChange} aria-label="select-repository"/>
        </SectionLoader>
        <Wizard.StepFooter>
          <Wizard.Button type={'next'} onClick={this.props.submit} disabled={!this.props.status.completed}/>
        </Wizard.StepFooter>
      </Wizard.Step>
    );
  }

  public onOrganizationChange = (organization) => {
    if (!organization) {
      return;
    }
    const name = this.props.context.repository ? this.props.context.repository.name : '';
    this.updateStepContext({organization, name});
  }

  public onNameChange = (name) => {
    const organization = this.props.context.repository ? this.props.context.repository.organization : '';
    this.updateStepContext({name, organization});
  }

  private updateStepContext(repository: GitRepository) {
    this.props.updateStepContext({context: {repository}, completed: validateRepository(repository)});
  }
}

export default RepositoryStep;