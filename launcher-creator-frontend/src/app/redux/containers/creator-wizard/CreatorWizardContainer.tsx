import * as React from 'react';
import { Component } from 'react';
import { connect } from 'react-redux';
import { AppState } from '../../states';
import NameStepContainer from './steps/NameStepContainer';
import RuntimeStepContainer from './steps/RuntimeStepContainer';
import CapabilitiesStepContainer from './steps/CapabilitiesStepContainer';
import DeploymentStepContainer from './steps/DeploymentStepContainer';
import RepositoryStepContainer from './steps/RepositoryStepContainer';

import NextStepsZip from '../../../components/creator-wizard/next-steps/NextStepsZip';
import NextStepsOpenShift from '../../../components/creator-wizard/next-steps/NextStepsOpenShift';
import ProcessingApp from '../../../components/creator-wizard/next-steps/ProcessingApp';
import { Projectile } from '../../../models/Projectile';
import * as _ from 'lodash';
import SmartWizard, { Step } from '../../../../shared/components/smart-wizard/SmartWizard';
import { getLaunchState } from '../../reducers/launchReducer';
import { smartWizardActions } from '../../../../shared/components/smart-wizard/smartWizardActions';
import { launchActions } from '../../actions/launchActions';


const wizardStepsDefinition = {
  nameStep: {
    id: 'nameStep',
    component: NameStepContainer,
  },
  runtimeStep: {
    id: 'runtimeStep',
    component: RuntimeStepContainer,
  },
  capabilityStep: {
    id: 'capabilityStep',
    component: CapabilitiesStepContainer,
  },
  repositoryStep: {
    id: 'repositoryStep',
    component: RepositoryStepContainer,
  },
  deploymentStep: {
    id: 'deploymentStep',
    component: DeploymentStepContainer,
  },
};

interface CreatorWizardProps {
  data: any;
  submission: {
    payload?: any;
    loading: boolean;
    completed: boolean;
    error?: string;
    result?: any;
  };

  saveWizard(payload): void;

  launchProjectile(payload): void;

  resetWizard(): void;

  resetLaunch(): void;
}

function buildProjectile(stepState: Step[]): Projectile {
  const byId = _.keyBy(stepState, 'id');
  return {
    name: _.get(byId[wizardStepsDefinition.nameStep.id], 'context.name'),
    runtime: _.get(byId[wizardStepsDefinition.runtimeStep.id], 'context.runtime.id'),
    capabilities: Array.from(_.get(byId[wizardStepsDefinition.capabilityStep.id], 'context.capabilities', [])),
    clusterId: _.get(byId[wizardStepsDefinition.deploymentStep.id], 'context.cluster.id'),
    projectName: _.get(byId[wizardStepsDefinition.nameStep.id], 'context.name'),
    gitOrganization: _.get(byId[wizardStepsDefinition.repositoryStep.id], 'context.repository.organization'),
    gitRepository: _.get(byId[wizardStepsDefinition.repositoryStep.id], 'context.repository.id'),
    deploymentLink: _.get(byId[wizardStepsDefinition.deploymentStep.id], 'context.cluster.consoleUrl'),
    repositoryLink: _.get(byId[wizardStepsDefinition.repositoryStep.id], 'context.repository.url'),
  };
}

class CreatorWizard extends Component<CreatorWizardProps> {

  constructor(props) {
    super(props);
  }

  public render() {
    return (
      <React.Fragment>
        <SmartWizard
          definition={wizardStepsDefinition}
          submit={this.props.launchProjectile}
          buildProjectile={buildProjectile}
        />
        <ProcessingApp isOpen={this.props.submission.loading}/>
        <NextStepsZip
          isOpen={this.props.submission.completed && this.props.submission.payload.target === 'zip'}
          error={Boolean(this.props.submission.error)}
          downloadLink={this.props.submission.result && this.props.submission.result.downloadLink}
          onClose={this.props.resetLaunch}
        />
        <NextStepsOpenShift
          isOpen={this.props.submission.completed && this.props.submission.payload.target === 'launch'}
          error={Boolean(this.props.submission.error)}
          deploymentLink={this.props.submission.payload && this.props.submission.payload.projectile.deploymentLink}
          repositoryLink={this.props.submission.payload && this.props.submission.payload.projectile.repositoryLink}
          landingPageLink={this.props.submission.payload && this.props.submission.payload.projectile.deploymentLink}
          onClose={this.reset}
        />
      </React.Fragment>
    );
  }

  private reset = () => {
    this.props.resetLaunch();
    this.props.resetWizard();
  };

}

const mapStateToProps = (state: AppState) => ({
  submission: getLaunchState(state).submission,
});

const mapDispatchToProps = (dispatch) => ({
  launchProjectile: (payload) => dispatch(launchActions.launchProjectile(payload)),
  resetWizard: () => dispatch(smartWizardActions.reset()),
  resetLaunch: () => dispatch(launchActions.resetLaunch()),
});

const CreatorWizardContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(CreatorWizard);

export default CreatorWizardContainer;
