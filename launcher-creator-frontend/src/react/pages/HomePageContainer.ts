import { connect } from 'react-redux';
import { AppState } from '../../redux/states';
import HomePage from './HomePage';

const mapStateToProps = (state: AppState) => ({
});

const mapDispatchToProps = (dispatch) => ({
});

const HomePageContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(HomePage);

export default HomePageContainer;
