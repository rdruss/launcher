import { connect } from 'react-redux';
import { AppState } from '../states';
import { authentication } from '../actions';
import { MainLayout } from '../../react/components/layout/MainLayout';

const mapStateToProps = (state: AppState) => ({
  authenticated: state.authentication.authenticated,
  userName: state.authentication.userName,
  inProgress: state.authentication.inProgress
});

const mapDispatchToProps = (dispatch) => ({
  login: () => dispatch(authentication.loginRequest()),
  logout: () => dispatch(authentication.logoutRequest())
});

export const MainLayoutContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(MainLayout);
