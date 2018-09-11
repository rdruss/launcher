import { connect } from 'react-redux';
import { AppState } from '../../redux/states';
import { authenticationAction } from '../../redux/actions';
import LoginPage from './LoginPage';

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
