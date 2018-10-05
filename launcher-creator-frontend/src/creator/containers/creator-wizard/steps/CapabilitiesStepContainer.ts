import { AppState } from '../../../states';
import { apiAction } from '../../../actions';
import { getCapabilitiesDataForSelectedRuntime } from '../../../reducers/api/capabilitiesReducer';
import { compose } from 'redux';
import { connect, ConnectedComponentClass } from 'react-redux';
import CapabilitiesStep from '../../../components/creator-wizard/capabilities-step/CapabilitiesStep';
import connectWizardStep from '../connectWizardStep';
import { getSteps, getStepState } from '../../../reducers/wizardReducer';
import * as _ from 'lodash';
import { WizardStepId } from '../CreatorWizardContainer';

const mapStateToRuntimeStepProps = (state:AppState, props) => ({
  selectedRuntime: _.get(getStepState(WizardStepId.RUNTIME_STEP)(state), 'context.runtime'),
  capabilitiesData: getCapabilitiesDataForSelectedRuntime(state, props),
  showZipButton: getSteps(state).length <= 3
});

const mapDispatchToProps = (dispatch) => ({
  fetchCapabilities: () => dispatch(apiAction.fetchCapabilities()),
});

const connectData = connect(mapStateToRuntimeStepProps, mapDispatchToProps);

const CapabilitiesStepContainer: ConnectedComponentClass<any, any> = compose(connectWizardStep, connectData)(CapabilitiesStep);

export default CapabilitiesStepContainer;