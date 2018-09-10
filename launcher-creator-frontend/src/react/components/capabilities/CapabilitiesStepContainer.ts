import { connect } from 'react-redux';
import { AppState } from '../../../redux/states';
import { capabilities } from '../../../redux/actions';
import CapabilitiesStep from './CapabilitiesStep';

const mapStateToProps = (state: AppState) => ({
});

const mapDispatchToProps = (dispatch) => ({
  fetchCapabilities: () => dispatch(capabilities.fetch()),
});

const CapabilitiesStepContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(CapabilitiesStep);

export default CapabilitiesStepContainer;
