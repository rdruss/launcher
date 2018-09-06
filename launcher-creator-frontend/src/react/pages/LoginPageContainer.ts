import { connect } from 'react-redux';
import { AppState } from '../../redux/states';
import { authentication } from '../../redux/actions';
import { LoginPage } from './LoginPage';

const mapStateToProps = (state: AppState) => ({
});

const mapDispatchToProps = (dispatch) => ({
  login: () => dispatch(authentication.loginRequest()),
});

const LoginPageContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(LoginPage);

export default LoginPageContainer;
