import * as React from 'react';
import { Component } from 'react';
import * as Patternfly from 'patternfly-react';
import Wizard from '../../../../components/wizard/index';

import { StepProps } from '../StepProps';
import { FetchedData } from '../../../states';
import SectionLoader from '../../../../components/loader/SectionLoader';
import { GitRepository } from '../../../models/GitRepository';
import GitUser from '../../../models/GitUser';
import { WizardStepId } from '../../../states/WizardState';

export interface RepositoryStepProps extends StepProps {
  gitUserData: FetchedData<GitUser>;
  fetchGitUser: () => {};
  selectedRepository?: string;
  onSelectRepository: (repository: string) => void;
}

class RepositoryStep extends Component<RepositoryStepProps> {

  public componentDidMount() {
    this.props.fetchGitUser();
  }

  public componentDidUpdate() {
    if (this.props.current && !this.props.selectedRepository && this.props.gitUserData.data) {
      this.onOrganizationChange([this.props.gitUserData.data.login]);
    }
  }

  public render() {
    const { gitUserData } = this.props;
    const {organization, name} = RepositoryStep.toGitRepository(this.props.selectedRepository);
    const goToNextStep = () => this.props.goToStep(WizardStepId.DEPLOYMENT_STEP);
    return (
      <Wizard.Step
        title={'Source Code Repository'}
        summary={`➡️ Your future application source code will be in «${this.props.selectedRepository}»`}
        current={this.props.current}
        complete={this.props.valid}
        onClick={this.props.goToStep}
        locked={this.props.locked}
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
        <Wizard.Button type={'next'} onClick={goToNextStep}/>
      </Wizard.Step>
    );
  }

  private static toGitRepository(repository?: string):GitRepository {
    const [organization = '', name = ''] = repository ? repository.split('/') : [];
    return {organization, name};
  }

  private static toRepositoryString(rep: GitRepository):string {
    return `${rep.organization}/${rep.name}`;
  }

  public onOrganizationChange = ([organization]: string[]) => {
    if (!organization) {
      return;
    }
    const repo = RepositoryStep.toGitRepository(this.props.selectedRepository);
    this.props.onSelectRepository(RepositoryStep.toRepositoryString({ organization, name: repo.name }));
  }

  public onNameChange = (event) => {
    const name = event.target.value;
    if (!name) {
      return;
    }
    const repo = RepositoryStep.toGitRepository(this.props.selectedRepository);
    this.props.onSelectRepository(RepositoryStep.toRepositoryString({ name, organization: repo.organization }));
  }
}

export default RepositoryStep;