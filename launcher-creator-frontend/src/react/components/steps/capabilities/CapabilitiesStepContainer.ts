import { connect } from 'react-redux';
import { AppState } from '../../../../redux/states';
import { apiAction } from '../../../../redux/actions';
import CapabilitiesStep from './CapabilitiesStep';

const mapStateToProps = (state: AppState) => ({
  capabilities: state.capabilities.data,
  loading: !state.capabilities.data || state.capabilities.pending > 0,
});

const mapDispatchToProps = (dispatch) => ({
  fetchCapabilities: () => dispatch(apiAction.fetchCapabilities()),
});

const CapabilitiesStepContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(CapabilitiesStep);

export default CapabilitiesStepContainer;
