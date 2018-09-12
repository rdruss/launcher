import { connect } from 'react-redux';
import { AppState, Capability } from '../../../states';
import { apiAction, wizardAction } from '../../../actions';
import CapabilitiesSelector from './CapabilitiesSelector';

const mapStateToProps = (state: AppState) => ({
  capabilities: state.capabilities.data,
  loading: !state.capabilities.data || state.capabilities.pending > 0,
  selectedCapabilities: state.wizard.capabilitiesStep.capabilities,
});

const mapDispatchToProps = (dispatch) => ({
  fetchCapabilities: () => dispatch(apiAction.fetchCapabilities()),
  onSelect: (capability: Capability) => dispatch(wizardAction.addCapability(capability)),
});

const CapabilitiesSelectorContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(CapabilitiesSelector);

export default CapabilitiesSelectorContainer;
