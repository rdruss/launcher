import { AppState } from '../../../states';
import { apiAction } from '../../../actions';
import DeploymentStep from '../../../components/creator-wizard/steps/DeploymentStep';
import { getConnectedClustersData } from '../../../reducers/api/gitReducer';
import { connect } from 'react-redux';

const mapStateToRuntimeStepProps = (state:AppState, props) => ({
  clustersData: getConnectedClustersData(state),
});

const mapDispatchToProps = (dispatch) => ({
  fetchClusters: () => dispatch(apiAction.fetchClusters()),
});

const DeploymentStepContainer = connect(mapStateToRuntimeStepProps, mapDispatchToProps)(DeploymentStep);

export default DeploymentStepContainer;
