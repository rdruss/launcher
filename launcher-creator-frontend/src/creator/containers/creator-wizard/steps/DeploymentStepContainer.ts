import { AppState } from '../../../states';
import { apiAction } from '../../../actions';
import DeploymentStep from '../../../components/creator-wizard/destination-step/DeploymentStep';
import { getConnectedClustersData } from '../../../reducers/api/gitReducer';
import { compose } from 'redux';
import { connect, ConnectedComponentClass } from 'react-redux';
import connectWizardStep from '../connectWizardStep';

const mapStateToRuntimeStepProps = (state:AppState, props) => ({
  clustersData: getConnectedClustersData(state),
});

const mapDispatchToProps = (dispatch) => ({
  fetchClusters: () => dispatch(apiAction.fetchClusters()),
});

const connectData = connect(mapStateToRuntimeStepProps, mapDispatchToProps);
const DeploymentStepContainer: ConnectedComponentClass<any, any> = compose(connectWizardStep, connectData)(DeploymentStep);

export default DeploymentStepContainer;
