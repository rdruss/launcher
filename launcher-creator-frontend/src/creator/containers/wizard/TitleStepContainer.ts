import { connect } from 'react-redux';
import { AppState, WizardStepId } from '../../states/index';
import { wizardAction } from '../../actions/index';
import TitleStep from '../../components/wizard/title-step/TitleStep';

const mapStateToProps = (state: AppState) => ({
  title: state.wizard.titleStep.title,
  valid: state.wizard.titleStep.valid,
  current: state.wizard.current === WizardStepId.TITLE_STEP,
});

const mapDispatchToProps = (dispatch) => ({
  onTitleChange: (title) => dispatch(wizardAction.selectTitle(title)),
  goToStep: (step: WizardStepId) => dispatch(wizardAction.goToStep(step)),
});

const TitleStepContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(TitleStep);

export default TitleStepContainer;
