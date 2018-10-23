import { AppState } from '../../../states/index';
import { apiAction } from '../../../actions/index';
import RepositoryStep from '../../../../components/creator-wizard/steps/RepositoryStep';
import { getGitUserData } from '../../../reducers/api/clustersReducer';
import { connect } from 'react-redux';
import { getStepContext } from '../../../reducers/wizardReducer';
import { WizardStepId } from '../CreatorWizardContainer';
import { NameStepContext } from '../../../../components/creator-wizard/steps/NameStep';

const mapStateToRuntimeStepProps = (state:AppState, props) => ({
  applicationName: getStepContext<NameStepContext>(state, WizardStepId.NAME_STEP).name(),
  gitUserData: getGitUserData(state),
});

const mapDispatchToProps = (dispatch) => ({
  fetchGitUser: () => dispatch(apiAction.fetchGitUser()),
});

const RepositoryStepContainer = connect(mapStateToRuntimeStepProps, mapDispatchToProps)(RepositoryStep);

export default RepositoryStepContainer;