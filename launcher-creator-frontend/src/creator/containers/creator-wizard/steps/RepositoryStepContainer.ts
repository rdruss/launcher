import { AppState } from '../../../states';
import connectStep from '../ConnectStep';
import { WizardStepId } from '../../../states/WizardState';
import { apiAction, wizardAction } from '../../../actions';
import RepositoryStep from '../../../components/creator-wizard/repository-step/RepositoryStep';
import { getGitUserData } from '../../../reducers/api/clustersReducer';

const mapStateToProps = (state: AppState) => ({
  gitUserData: getGitUserData(state),
  applicationName: state.wizard.titleStep.title,
  locked: !state.wizard.capabilitiesStep.valid,
  selectedRepository: state.wizard.repositoryStep.repository,
});

const mapDispatchToProps = (dispatch) => ({
  fetchGitUser: () => dispatch(apiAction.fetchGitUser()),
  onSelectRepository: (repository: string) => dispatch(wizardAction.selectRepository(repository)),
});

const RepositoryStepContainer = connectStep(
  WizardStepId.REPOSITORY_STEP,
  mapStateToProps,
  mapDispatchToProps,
)(RepositoryStep);

export default RepositoryStepContainer;
