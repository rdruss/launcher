import { connect } from 'react-redux';
import { AppState } from '../../../states';
import RuntimeStep from '../../../../components/creator-wizard/steps/RuntimeStep';
import { apiAction } from '../../../actions';
import { getRuntimesData } from '../../../reducers/api/runtimesReducer';

const mapStateToRuntimeStepProps = (state:AppState) => ({
  runtimesData: getRuntimesData(state),
});

const mapDispatchToProps = (dispatch) => ({
  fetchRuntimes: () => dispatch(apiAction.fetchRuntimes()),
});

const RuntimeStepContainer = connect(mapStateToRuntimeStepProps, mapDispatchToProps)(RuntimeStep);

export default RuntimeStepContainer;