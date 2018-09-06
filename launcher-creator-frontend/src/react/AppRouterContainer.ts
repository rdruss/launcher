import { connect } from 'react-redux';
import { AppState } from '../redux/states';
import AppRouter from './AppRouter';

const mapStateToProps = (state: AppState) => ({
  authenticated: state.authentication.authenticated,
});

const mapDispatchToProps = (dispatch) => ({
});

const AppRouterContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(AppRouter);

export default AppRouterContainer;
