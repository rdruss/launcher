import { connect } from 'react-redux';
import { AppState } from '../../states';
import CreatorWizard from './CreatorWizard';

const mapStateToProps = (state: AppState) => ({
  current: state.wizard.current,
  valid: state.wizard.valid,
});

const mapDispatchToProps = (dispatch) => ({
});

const CreatorWizardContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(CreatorWizard);

export default CreatorWizardContainer;
