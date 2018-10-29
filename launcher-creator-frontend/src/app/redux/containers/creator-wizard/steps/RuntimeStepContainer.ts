import { connect } from 'react-redux';
import { AppState } from '../../../states';
import RuntimeStep from '../../../../components/creator-wizard/steps/RuntimeStep';
import { getRuntimesData } from '../../../reducers/runtimesReducer';
import { fetchActions } from '../../../actions/fetchActions';

const mapStateToRuntimeStepProps = (state:AppState) => ({
  runtimesData: getRuntimesData(state),
});

const mapDispatchToProps = (dispatch) => ({
  fetchRuntimes: () => dispatch(fetchActions.fetchRuntimes()),
});

const RuntimeStepContainer = connect(mapStateToRuntimeStepProps, mapDispatchToProps)(RuntimeStep);

export default RuntimeStepContainer;