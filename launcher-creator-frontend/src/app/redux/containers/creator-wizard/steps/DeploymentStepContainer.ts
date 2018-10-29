import { AppState } from '../../../states';
import DeploymentStep from '../../../../components/creator-wizard/steps/DeploymentStep';
import { getConnectedClustersData } from '../../../reducers/fetch/gitReducer';
import { connect } from 'react-redux';
import { fetchActions } from '../../../actions/fetchActions';

const mapStateToRuntimeStepProps = (state:AppState, props) => ({
  clustersData: getConnectedClustersData(state),
});

const mapDispatchToProps = (dispatch) => ({
  fetchClusters: () => dispatch(fetchActions.fetchClusters()),
});

const DeploymentStepContainer = connect(mapStateToRuntimeStepProps, mapDispatchToProps)(DeploymentStep);

export default DeploymentStepContainer;
