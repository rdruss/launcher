import { AppState, WizardStepId } from '../../states';
import { wizardAction } from '../../actions';
import TitleStep from '../../components/creator-wizard/title-step/TitleStep';
import connectStep from './ConnectStep';

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
