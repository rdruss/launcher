import { connect } from 'react-redux';
import { AppState } from '@app/redux/states';
import { authenticationAction } from '@app/redux/actions/authenticationActions';
import MainLayout from '@app/components/layout/MainLayout';

const mapStateToProps = (state: AppState) => ({
  authenticationEnabled: state.authentication.enabled,
  authenticated: state.authentication.authenticated,
  userName: state.authentication.userName,
  inProgress: state.authentication.inProgress
});

const mapDispatchToProps = (dispatch) => ({
  logout: () => dispatch(authenticationAction.logout()),
  openAccountManagement: () => dispatch(authenticationAction.openAccountManagement()),
});

const MainLayoutContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(MainLayout);

export default MainLayoutContainer;
