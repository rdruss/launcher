import NameStep from '../../../components/creator-wizard/steps/NameStep';
import { connect } from 'react-redux';
import { AppState } from '../../../states';

const mapStateToRuntimeStepProps = (state:AppState, props) => ({});

const mapDispatchToProps = (dispatch) => ({});

const NameStepContainer = connect(mapStateToRuntimeStepProps, mapDispatchToProps)(NameStep);

export default NameStepContainer;