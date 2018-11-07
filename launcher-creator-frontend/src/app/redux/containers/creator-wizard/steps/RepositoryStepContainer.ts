import { AppState } from '../../../states';
import RepositoryStep from '@app/components/wizard/steps/RepositoryStep';
import { getGitUserData } from '../../../reducers/gitReducer';
import { connect } from 'react-redux';
import { fetchActions } from '../../../actions/fetchActions';
import { authenticationAction } from '../../../actions/authenticationActions';
import { getAuthenticationState } from '../../../reducers/authenticationReducer';

const mapStateToRuntimeStepProps = (state:AppState, props) => ({
  applicationName: props.projectile.name,
  gitUserData: getGitUserData(state),
  authentication: {
    authenticationEnabled: getAuthenticationState(state).enabled,
  }
});

const mapDispatchToProps = (dispatch) => ({
  fetchGitUser: () => dispatch(fetchActions.fetchGitUser()),
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

const RepositoryStepContainer = connect(mapStateToRuntimeStepProps, mapDispatchToProps, mergeProps)(RepositoryStep);

export default RepositoryStepContainer;