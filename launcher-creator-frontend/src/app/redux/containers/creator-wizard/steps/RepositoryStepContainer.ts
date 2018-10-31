import { AppState } from '../../../states';
import RepositoryStep from '../../../../components/wizard/steps/RepositoryStep';
import { getGitUserData } from '../../../reducers/gitReducer';
import { connect } from 'react-redux';
import { fetchActions } from '../../../actions/fetchActions';
import { authenticationAction } from '../../../actions/authenticationActions';
import { getAuthenticationState } from '../../../reducers/authenticationReducer';

const mapStateToRuntimeStepProps = (state:AppState, props) => ({
  applicationName: props.projectile.name,
  gitUserData: getGitUserData(state),
  authorization: {
    authorizationEnabled: getAuthenticationState(state).enabled,
  }
});

const mapDispatchToProps = (dispatch) => ({
  fetchGitUser: () => dispatch(fetchActions.fetchGitUser()),
  authorization: {
    openAccountManagement: () => dispatch(authenticationAction.openAccountManagement()),
  },
});

const mergeProps = (stateProps, dispatchProps, ownProps) => ({
  ...ownProps,
  ...stateProps,
  ...dispatchProps,
  authorization: {
    ...stateProps.authorization,
    ...dispatchProps.authorization,
  }
});

const RepositoryStepContainer = connect(mapStateToRuntimeStepProps, mapDispatchToProps, mergeProps)(RepositoryStep);

export default RepositoryStepContainer;