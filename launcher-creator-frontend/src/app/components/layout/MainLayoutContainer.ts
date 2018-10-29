import { connect } from 'react-redux';
import { AppState } from '../../redux/states';
import { authenticationAction } from '../../redux/actions/authenticationActions';
import MainLayout from './MainLayout';

const mapStateToProps = (state: AppState) => ({
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
