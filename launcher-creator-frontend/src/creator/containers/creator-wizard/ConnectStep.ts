import { connect } from 'react-redux';
import { AppState } from '../../states';
import { wizardAction } from '../../actions';
import { WizardStepId } from '../../states/WizardState';


export default function connectStep(stepId: WizardStepId, mapStateToProps?:any, mapDispatchToProps?:any) {
  const stepMapStateToProps = (state: AppState) => ({
    ...mapStateToProps(state),
    valid: state.wizard[stepId].valid,
    current: state.wizard.current === stepId,
  });

  const stepMapDispatchToProps = (dispatch) => ({
    ...mapDispatchToProps(dispatch),
    goToStep: (step: WizardStepId = stepId) => dispatch(wizardAction.goToStep(step)),
  });

  return connect(stepMapStateToProps, stepMapDispatchToProps);
}
