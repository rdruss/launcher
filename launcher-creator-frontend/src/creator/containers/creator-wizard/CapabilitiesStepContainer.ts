import { AppState, Capability, WizardStepId } from '../../states';
import { apiAction, wizardAction } from '../../actions';
import CapabilitiesStep from '../../components/creator-wizard/capabilities-step/CapabilitiesStep';
import connectStep from './ConnectStep';

const mapStateToProps = (state: AppState) => ({
  capabilities: state.capabilities.data || [],
  loading: !state.capabilities.data || state.capabilities.pending > 0,
  selectedCapabilities: state.wizard.capabilitiesStep.capabilities,
  locked: !state.wizard.runtimeStep.valid,
});

const mapDispatchToProps = (dispatch) => ({
  fetchCapabilities: () => dispatch(apiAction.fetchCapabilities()),
  onSelect: (capability: Capability) => dispatch(wizardAction.addCapability(capability)),
});

const CapabilitiesStepContainer = connectStep(
  WizardStepId.CAPABILITIES_STEP,
  mapStateToProps,
  mapDispatchToProps,
)(CapabilitiesStep);

export default CapabilitiesStepContainer;
