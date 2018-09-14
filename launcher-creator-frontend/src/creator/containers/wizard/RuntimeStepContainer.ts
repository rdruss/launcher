import { connect } from 'react-redux';
import { AppState, Runtime, WizardStepId } from '../../states/index';
import RuntimeStep from '../../components/wizard/runtime-step/RuntimeStep';
import { apiAction, wizardAction } from '../../actions/index';

const mapStateToProps = (state: AppState) => ({
  runtimes: state.runtimes.data || [],
  loading: !state.runtimes.data || state.runtimes.pending > 0,
  selectedRuntime: state.wizard.runtimeStep.runtime,
  valid: state.wizard.runtimeStep.valid,
  current: state.wizard.current === WizardStepId.RUNTIME_STEP,
  locked: !state.wizard.titleStep.valid,
});

const mapDispatchToProps = (dispatch) => ({
  fetchRuntimes: () => dispatch(apiAction.fetchRuntimes()),
  onSelect: (runtime: Runtime) => dispatch(wizardAction.selectRuntime(runtime)),
  goToStep: (step: WizardStepId) => dispatch(wizardAction.goToStep(step)),
});

const RuntimeStepContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(RuntimeStep);

export default RuntimeStepContainer;
