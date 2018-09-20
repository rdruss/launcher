import { AppState } from '../../../states';
import connectStep from '../ConnectStep';
import { WizardStepId } from '../../../states/WizardState';
import DestinationStep from '../../../components/creator-wizard/destination-step/DestinationStep';
import { apiAction } from '../../../actions';

const mapStateToProps = (state: AppState) => ({
  clusters: state.clusters.data,
  loading: !state.clusters.data || state.clusters.pending > 0,
  locked: !state.wizard.capabilitiesStep.valid,
});

const mapDispatchToProps = (dispatch) => ({
  fetchClusters: () => dispatch(apiAction.fetchClusters()),
  fetchRepository: () => dispatch(apiAction.fetchRepository()),
});

const DestinationStepContainer = connectStep(
  WizardStepId.DESTINATION_STEP,
  mapStateToProps,
  mapDispatchToProps,
)(DestinationStep);

export default DestinationStepContainer;
