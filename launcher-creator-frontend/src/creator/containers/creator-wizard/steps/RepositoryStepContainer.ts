import { AppState } from '../../../states';
import { apiAction } from '../../../actions';
import RepositoryStep from '../../../components/creator-wizard/steps/RepositoryStep';
import { getGitUserData } from '../../../reducers/api/clustersReducer';
import { connect } from 'react-redux';
import { getStepContextValue } from '../../../reducers/wizardReducer';
import { WizardStepId } from '../CreatorWizardContainer';

const mapStateToRuntimeStepProps = (state:AppState, props) => ({
  applicationName: getStepContextValue(state, WizardStepId.NAME_STEP, 'name'),
  gitUserData: getGitUserData(state),
});

const mapDispatchToProps = (dispatch) => ({
  fetchGitUser: () => dispatch(apiAction.fetchGitUser()),
});

const RepositoryStepContainer = connect(mapStateToRuntimeStepProps, mapDispatchToProps)(RepositoryStep);

export default RepositoryStepContainer;