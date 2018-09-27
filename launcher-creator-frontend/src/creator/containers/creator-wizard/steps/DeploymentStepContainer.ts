import { AppState } from '../../../states';
import connectStep from '../ConnectStep';
import { WizardStepId } from '../../../states/WizardState';
import { apiAction, wizardAction } from '../../../actions';
import OpenShiftCluster from '../../../models/OpenShiftCluster';
import DeploymentStep from '../../../components/creator-wizard/destination-step/DeploymentStep';
import { getConnectedClustersData } from '../../../reducers/api/gitReducer';

const mapStateToProps = (state: AppState) => ({
  clustersData: getConnectedClustersData(state),
  locked: !state.wizard.repositoryStep.valid,
  selectedCluster: state.wizard.deploymentStep.cluster,
});

const mapDispatchToProps = (dispatch) => ({
  fetchClusters: () => dispatch(apiAction.fetchClusters()),
  onSelectCluster: (cluster: OpenShiftCluster) => dispatch(wizardAction.selectCluster(cluster)),
});

const DeploymentStepContainer = connectStep(
  WizardStepId.DEPLOYMENT_STEP,
  mapStateToProps,
  mapDispatchToProps,
)(DeploymentStep);

export default DeploymentStepContainer;
