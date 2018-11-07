import { AppState } from '../../../states';
import DeploymentStep from '@app/components/wizard/steps/DeploymentStep';
import { getConnectedClustersData } from '../../../reducers/clustersReducer';
import { connect } from 'react-redux';
import { fetchActions } from '../../../actions/fetchActions';
import { authenticationAction } from '../../../actions/authenticationActions';
import { getAuthenticationState } from '../../../reducers/authenticationReducer';

const mapStateToRuntimeStepProps = (state:AppState, props) => ({
  clustersData: getConnectedClustersData(state),
  authentication: {
    authenticationEnabled: getAuthenticationState(state).enabled,
  }
});

const mapDispatchToProps = (dispatch) => ({
  fetchClusters: () => dispatch(fetchActions.fetchClusters()),
  authentication: {
    openAccountManagement: () => dispatch(authenticationAction.openAccountManagement()),
  },
});

const mergeProps = (stateProps, dispatchProps, ownProps) => ({
  ...ownProps,
  ...stateProps,
  ...dispatchProps,
  authentication: {
    ...stateProps.authentication,
    ...dispatchProps.authentication,
  }
});

const DeploymentStepContainer = connect(mapStateToRuntimeStepProps, mapDispatchToProps, mergeProps)(DeploymentStep);

export default DeploymentStepContainer;
