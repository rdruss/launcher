import { connect } from 'react-redux';
import { AppState, Capability, WizardStepId } from '../../states/index';
import { apiAction, wizardAction } from '../../actions/index';
import CapabilitiesStep from '../../components/wizard/capabilities-step/CapabilitiesStep';

const mapStateToProps = (state: AppState) => ({
  capabilities: state.capabilities.data || [],
  loading: !state.capabilities.data || state.capabilities.pending > 0,
  selectedCapabilities: state.wizard.capabilitiesStep.capabilities,
  valid: state.wizard.capabilitiesStep.valid,
  current: state.wizard.current === WizardStepId.CAPABILITIES_STEP,
  locked: !state.wizard.runtimeStep.valid,
});

const mapDispatchToProps = (dispatch) => ({
  fetchCapabilities: () => dispatch(apiAction.fetchCapabilities()),
  onSelect: (capability: Capability) => dispatch(wizardAction.addCapability(capability)),
});

const CapabilitiesStepContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(CapabilitiesStep);

export default CapabilitiesStepContainer;
