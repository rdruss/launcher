import { AppState } from '../../../states';
import RepositoryStep from '../../../../components/creator-wizard/steps/RepositoryStep';
import { getGitUserData } from '../../../reducers/fetch/clustersReducer';
import { connect } from 'react-redux';
import { fetchActions } from '../../../actions/fetchActions';

const mapStateToRuntimeStepProps = (state:AppState, props) => ({
  applicationName: props.projectile.name,
  gitUserData: getGitUserData(state),
});

const mapDispatchToProps = (dispatch) => ({
  fetchGitUser: () => dispatch(fetchActions.fetchGitUser()),
});

const RepositoryStepContainer = connect(mapStateToRuntimeStepProps, mapDispatchToProps)(RepositoryStep);

export default RepositoryStepContainer;