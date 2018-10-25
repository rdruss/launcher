import * as React from 'react';
import { Component } from 'react';
import { connect } from 'react-redux';
import { AppState } from '../../states';
import NameStepContainer from './steps/NameStepContainer';
import RuntimeStepContainer from './steps/RuntimeStepContainer';
import CapabilitiesStepContainer from './steps/CapabilitiesStepContainer';
import DeploymentStepContainer from './steps/DeploymentStepContainer';
import RepositoryStepContainer from './steps/RepositoryStepContainer';

import { wizardAction } from '../../actions';
import NextStepsZip from '../../../components/creator-wizard/next-steps/NextStepsZip';
import NextStepsOpenShift from '../../../components/creator-wizard/next-steps/NextStepsOpenShift';
import ProcessingApp from '../../../components/creator-wizard/next-steps/ProcessingApp';
import { Projectile } from '../../../models/Projectile';
import * as _ from 'lodash';
import SmartWizard, { StepState } from '../../../../shared/components/smart-wizard/SmartWizard';


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
  submission: {
    payload?: any;
    loading: boolean;
    completed: boolean;
    error?: string;
    result?: any;
  };

  save(payload): void;

  submit(payload): void;

  reset(): void;
}

function buildProjectile(stepState: StepState[]): Projectile {
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

class CreatorWizard extends Component<CreatorWizardProps, { id: string }> {

  constructor(props) {
    super(props);
    this.state = {
      id: `${Date.now()}`, // FIXME ia3andy workaround to reset wizard
    };
  }

  public render() {
    return (
      <React.Fragment>
        <SmartWizard
          id={this.state.id}
          definition={wizardStepsDefinition}
          submit={this.submit}
          save={this.save}
          reset={this.reset}
          buildProjectile={buildProjectile}
        />
        <ProcessingApp isOpen={this.props.submission.loading}/>
        <NextStepsZip
          isOpen={this.props.submission.completed && this.props.submission.payload.target === 'zip'}
          error={Boolean(this.props.submission.error)}
          downloadLink={this.props.submission.result && this.props.submission.result.downloadLink}
          onClose={this.resetSmartWizard}
        />
        <NextStepsOpenShift
          isOpen={this.props.submission.completed && this.props.submission.payload.target === 'launch'}
          error={Boolean(this.props.submission.error)}
          deploymentLink={this.props.submission.payload && this.props.submission.payload.projectile.deploymentLink}
          repositoryLink={this.props.submission.payload && this.props.submission.payload.projectile.repositoryLink}
          landingPageLink={this.props.submission.payload && this.props.submission.payload.projectile.deploymentLink}
          onClose={this.resetSmartWizard}
        />
      </React.Fragment>
    );
  }

  private submit = (payload) => {
    this.props.submit(payload);
  };

  private save = () => {

  };

  private reset = () => {
    this.props.reset();
  };

  private resetSmartWizard = () => {
    this.setState({
      id: `${Date.now()}`, // FIXME ia3andy workaround to reset wizard
    });
  };
}

const mapStateToProps = (state: AppState) => ({
  submission: state.wizard.submission
});

const mapDispatchToProps = (dispatch) => ({
  save: (payload) => dispatch(wizardAction.save(payload)),
  submit: (payload) => dispatch(wizardAction.submit(payload)),
  reset: () => dispatch(wizardAction.reset()),
});

const CreatorWizardContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(CreatorWizard);

export default CreatorWizardContainer;
