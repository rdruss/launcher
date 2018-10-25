import { AppState } from '../../../states';
import { apiAction } from '../../../actions';
import { getCapabilitiesDataForSelectedRuntime } from '../../../reducers/api/capabilitiesReducer';
import { connect } from 'react-redux';
import CapabilitiesStep from '../../../../components/creator-wizard/steps/CapabilitiesStep';

const mapStateToRuntimeStepProps = (state:AppState, props) => ({
  capabilitiesData: getCapabilitiesDataForSelectedRuntime(state, { selectedRuntime: props.projectile.runtime}),
});

const mapDispatchToProps = (dispatch) => ({
  fetchCapabilities: () => dispatch(apiAction.fetchCapabilities()),
});

const CapabilitiesStepContainer = connect(mapStateToRuntimeStepProps, mapDispatchToProps)(CapabilitiesStep);

export default CapabilitiesStepContainer;