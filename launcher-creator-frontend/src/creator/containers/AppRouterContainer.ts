import { connect } from 'react-redux';
import { AppState } from '../states/index';
import AppRouter from '../components/AppRouter';

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
