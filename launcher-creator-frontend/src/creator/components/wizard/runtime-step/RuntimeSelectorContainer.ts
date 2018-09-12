import { connect } from 'react-redux';
import { AppState } from '../../../states';
import { apiAction, wizardAction } from '../../../actions';
import RuntimeSelector from './RuntimeSelector';
import { Runtime } from '../../../states';

const mapStateToProps = (state: AppState) => ({
  runtimes: state.runtimes.data,
  loading: !state.runtimes.data || state.runtimes.pending > 0,
  selectedRuntime: state.wizard.runtimeStep.runtime,
});

const mapDispatchToProps = (dispatch) => ({
  fetchRuntimes: () => dispatch(apiAction.fetchRuntimes()),
  onSelect: (runtime: Runtime) => dispatch(wizardAction.selectRuntime(runtime)),
});

const RuntimeSelectorContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(RuntimeSelector);

export default RuntimeSelectorContainer;
