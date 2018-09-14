import { connect } from 'react-redux';
import { AppState } from '../../states/index';
import { authenticationAction } from '../../actions/index';
import LoginPage from '../../components/pages/LoginPage';

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
