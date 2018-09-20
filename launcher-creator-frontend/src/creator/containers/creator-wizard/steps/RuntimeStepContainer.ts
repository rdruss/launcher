import { AppState } from '../../../states/index';
import RuntimeStep from '../../../components/creator-wizard/runtime-step/RuntimeStep';
import { apiAction, wizardAction } from '../../../actions/index';
import connectStep from '../ConnectStep';
import Runtime from '../../../models/Runtime';
import { WizardStepId } from '../../../states/WizardState';

const mapStateToProps = (state: AppState) => ({
  runtimes: state.runtimes.data || [],
  loading: !state.runtimes.data || state.runtimes.pending > 0,
  selectedRuntime: state.wizard.runtimeStep.runtime,
  locked: !state.wizard.titleStep.valid,
});

const mapDispatchToProps = (dispatch) => ({
  fetchRuntimes: () => dispatch(apiAction.fetchRuntimes()),
  onSelect: (runtime: Runtime) => dispatch(wizardAction.selectRuntime(runtime)),
});

const RuntimeStepContainer = connectStep(
  WizardStepId.RUNTIME_STEP,
  mapStateToProps,
  mapDispatchToProps,
)(RuntimeStep);


export default RuntimeStepContainer;
