import { connect, ConnectedComponentClass } from 'react-redux';
import { AppState } from '../../../states';
import RuntimeStep from '../../../components/creator-wizard/runtime-step/RuntimeStep';
import { apiAction } from '../../../actions';
import { getRuntimesData } from '../../../reducers/api/runtimesReducer';
import { compose } from 'redux';
import connectWizardStep from '../connectWizardStep';


const mapStateToRuntimeStepProps = (state:AppState) => ({
  runtimesData: getRuntimesData(state),
});

const mapDispatchToProps = (dispatch) => ({
  fetchRuntimes: () => dispatch(apiAction.fetchRuntimes()),
});

const connectData = connect(mapStateToRuntimeStepProps, mapDispatchToProps);

const RuntimeStepContainer: ConnectedComponentClass<any, any> = compose(connectWizardStep, connectData)(RuntimeStep);

export default RuntimeStepContainer;
