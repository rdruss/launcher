import { connect } from 'react-redux';
import { AppState } from '../../../../redux/states';
import { apiAction } from '../../../../redux/actions';
import RuntimeStep from './RuntimeStep';

const mapStateToProps = (state: AppState) => ({
  runtimes: state.runtimes.data,
  loading: !state.runtimes.data || state.runtimes.pending > 0,
});

const mapDispatchToProps = (dispatch) => ({
  fetchRuntimes: () => dispatch(apiAction.fetchRuntimes()),
});

const RuntimeStepContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(RuntimeStep);

export default RuntimeStepContainer;
