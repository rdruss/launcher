import { connect } from 'react-redux';
import { AppState } from '../../states/index';
import WizardPage from '../../components/pages/HomePage';

const mapStateToProps = (state: AppState) => ({
});

const mapDispatchToProps = (dispatch) => ({
});

const WizardPageContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(WizardPage);

export default WizardPageContainer;
