import { AppState } from '../../../states';
import DeploymentStep from '../../../../components/wizard/steps/DeploymentStep';
import { getConnectedClustersData } from '../../../reducers/clustersReducer';
import { connect } from 'react-redux';
import { fetchActions } from '../../../actions/fetchActions';
import { authenticationAction } from '../../../actions/authenticationActions';

const mapStateToRuntimeStepProps = (state:AppState, props) => ({
  clustersData: getConnectedClustersData(state),
});

const mapDispatchToProps = (dispatch) => ({
  fetchClusters: () => dispatch(fetchActions.fetchClusters()),
  openAccountManagement: () => dispatch(authenticationAction.openAccountManagement()),
});

const DeploymentStepContainer = connect(mapStateToRuntimeStepProps, mapDispatchToProps)(DeploymentStep);

export default DeploymentStepContainer;
