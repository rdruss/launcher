import { AppState } from '../../../states';
import { apiAction, wizardAction } from '../../../actions';
import CapabilitiesStep from '../../../components/creator-wizard/capabilities-step/CapabilitiesStep';
import connectStep from '../ConnectStep';
import Capability from '../../../models/Capability';
import { WizardStepId } from '../../../states/WizardState';
import { getCapabilityCollectionForSelectedRuntime } from '../../../reducers/apiReducer';

const mapStateToProps = (state: AppState) => ({
  capabilityCollection: getCapabilityCollectionForSelectedRuntime(state),
  selectedCapabilities: state.wizard.capabilitiesStep.capabilities,
  locked: !state.wizard.runtimeStep.valid,
});

const mapDispatchToProps = (dispatch) => ({
  fetchCapabilities: () => dispatch(apiAction.fetchCapabilities()),
  onSelect: (capability: Capability) => dispatch(wizardAction.addCapability(capability)),
  onUnselect: (capability: Capability) => dispatch(wizardAction.removeCapability(capability)),
});

const CapabilitiesStepContainer = connectStep(
  WizardStepId.CAPABILITIES_STEP,
  mapStateToProps,
  mapDispatchToProps,
)(CapabilitiesStep);

export default CapabilitiesStepContainer;
