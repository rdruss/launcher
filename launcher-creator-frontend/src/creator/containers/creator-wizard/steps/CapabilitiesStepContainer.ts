import { AppState } from '../../../states';
import { apiAction } from '../../../actions';
import { getCapabilitiesDataForSelectedRuntime } from '../../../reducers/api/capabilitiesReducer';
import { connect } from 'react-redux';
import CapabilitiesStep from '../../../components/creator-wizard/steps/CapabilitiesStep';
import { getWizardState, getWizardStepContextValue } from '../../../reducers/wizardReducer';
import { WizardStepId } from '../CreatorWizardContainer';

const mapStateToRuntimeStepProps = (state:AppState, props) => ({
  selectedRuntime: getWizardStepContextValue(state, WizardStepId.RUNTIME_STEP, 'runtime'),
  capabilitiesData: getCapabilitiesDataForSelectedRuntime(state, props),
  showZipButton: getWizardState(state).steps.length <= 3
});

const mapDispatchToProps = (dispatch) => ({
  fetchCapabilities: () => dispatch(apiAction.fetchCapabilities()),
});

const CapabilitiesStepContainer = connect(mapStateToRuntimeStepProps, mapDispatchToProps)(CapabilitiesStep);

export default CapabilitiesStepContainer;