import { ApiClustersSelector, AppState } from '../../../states';
import connectStep from '../ConnectStep';
import { WizardStepId } from '../../../states/WizardState';
import { apiAction, wizardAction } from '../../../actions';
import OpenShiftCluster from '../../../models/OpenShiftCluster';
import DeploymentStep from '../../../components/creator-wizard/destination-step/DeploymentStep';

const mapStateToProps = (state: AppState) => ({
  clusters: ApiClustersSelector.clusters(state),
  loading: ApiClustersSelector.loading(state),
  locked: !state.wizard.capabilitiesStep.valid,
  selectedCluster: state.wizard.deploymentStep.cluster,
  valid: state.wizard.deploymentStep.cluster
});

const mapDispatchToProps = (dispatch) => ({
  fetchClusters: () => dispatch(apiAction.fetchClusters()),
  fetchRepository: () => dispatch(apiAction.fetchRepository()),
  onSelectCluster: (cluster: OpenShiftCluster) => dispatch(wizardAction.selectCluster(cluster)),
});

const DeploymentStepContainer = connectStep(
  WizardStepId.DEPLOYMENT_STEP,
  mapStateToProps,
  mapDispatchToProps,
)(DeploymentStep);

export default DeploymentStepContainer;
