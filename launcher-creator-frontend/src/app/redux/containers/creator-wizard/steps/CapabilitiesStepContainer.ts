import { AppState } from '../../../states';
import { getCapabilitiesDataForSelectedRuntime } from '../../../reducers/capabilitiesReducer';
import { connect } from 'react-redux';
import CapabilitiesStep from '../../../../components/creator-wizard/steps/CapabilitiesStep';
import { fetchActions } from '../../../actions/fetchActions';

const mapStateToRuntimeStepProps = (state:AppState, props) => ({
  capabilitiesData: getCapabilitiesDataForSelectedRuntime(state, { selectedRuntime: props.projectile.runtime}),
});

const mapDispatchToProps = (dispatch) => ({
  fetchCapabilities: () => dispatch(fetchActions.fetchCapabilities()),
});

const CapabilitiesStepContainer = connect(mapStateToRuntimeStepProps, mapDispatchToProps)(CapabilitiesStep);

export default CapabilitiesStepContainer;