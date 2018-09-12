import { connect } from 'react-redux';
import { AppState, WizardStepId } from '../../../states';
import { apiAction } from '../../../actions';
import CapabilitiesStep from './CapabilitiesStep';

const mapStateToProps = (state: AppState) => ({
  capabilities: state.capabilities.data,
  loading: !state.capabilities.data || state.capabilities.pending > 0,
  valid: state.wizard.capabilitiesStep.valid,
  selectedCapabilities: state.wizard.capabilitiesStep.capabilities,
  current: state.wizard.current === WizardStepId.CAPABILITIES_STEP,
  locked: !state.wizard.runtimeStep.valid,
});

const mapDispatchToProps = (dispatch) => ({
  fetchCapabilities: () => dispatch(apiAction.fetchCapabilities()),
});

const CapabilitiesStepContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(CapabilitiesStep);

export default CapabilitiesStepContainer;
