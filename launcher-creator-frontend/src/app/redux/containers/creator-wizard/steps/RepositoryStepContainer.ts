import { AppState } from '../../../states';
import RepositoryStep from '../../../../components/wizard/steps/RepositoryStep';
import { getGitUserData } from '../../../reducers/gitReducer';
import { connect } from 'react-redux';
import { fetchActions } from '../../../actions/fetchActions';
import { authenticationAction } from '../../../actions/authenticationActions';

const mapStateToRuntimeStepProps = (state:AppState, props) => ({
  applicationName: props.projectile.name,
  gitUserData: getGitUserData(state),

});

const mapDispatchToProps = (dispatch) => ({
  fetchGitUser: () => dispatch(fetchActions.fetchGitUser()),
  openAccountManagement: () => dispatch(authenticationAction.openAccountManagement()),
});

const RepositoryStepContainer = connect(mapStateToRuntimeStepProps, mapDispatchToProps)(RepositoryStep);

export default RepositoryStepContainer;