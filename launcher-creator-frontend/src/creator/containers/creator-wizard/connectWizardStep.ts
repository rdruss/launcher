import { connect } from 'react-redux';
import { AppState } from '../../states';
import { wizardAction } from '../../actions';
import {
  getThisStepStateContext,
  isThisCurrentStep,
  isThisStepLocked,
  isThisStepValid
} from '../../reducers/wizardReducer';
import { StepProps } from '../../components/creator-wizard/StepProps';

const mapStateToProps = (state: AppState, props: StepProps<object>) => ({
  context: getThisStepStateContext(state, props),
  valid: isThisStepValid(state, props),
  current: isThisCurrentStep(state, props),
  locked: isThisStepLocked(state, props)
});

const mapDispatchToProps = (dispatch, props: StepProps<object>) => ({
  updateStepContext: (payload) => dispatch(wizardAction.updateStepContext(props.stepId, payload)),
});

const connectWizardStep = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default connectWizardStep;