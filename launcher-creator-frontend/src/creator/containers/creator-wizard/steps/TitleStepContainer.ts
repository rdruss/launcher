import { AppState } from '../../../states/index';
import { wizardAction } from '../../../actions/index';
import TitleStep from '../../../components/creator-wizard/title-step/TitleStep';
import connectStep from '../ConnectStep';
import { WizardStepId } from '../../../states/WizardState';

const mapStateToProps = (state: AppState) => ({
  title: state.wizard.titleStep.title,
});

const mapDispatchToProps = (dispatch) => ({
  onTitleChange: (title) => dispatch(wizardAction.selectTitle(title))
});

const TitleStepContainer = connectStep(
  WizardStepId.TITLE_STEP,
  mapStateToProps,
  mapDispatchToProps,
)(TitleStep);

export default TitleStepContainer;
