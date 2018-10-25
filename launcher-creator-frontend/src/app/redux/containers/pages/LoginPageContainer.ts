import { connect } from 'react-redux';
import { AppState } from '../../states';
import { authenticationAction } from '../../actions';
import LoginPage from '../../../components/pages/LoginPage';

const mapStateToProps = (state: AppState) => ({
});

const mapDispatchToProps = (dispatch) => ({
  login: () => dispatch(authenticationAction.login()),
});

const LoginPageContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(LoginPage);

export default LoginPageContainer;
