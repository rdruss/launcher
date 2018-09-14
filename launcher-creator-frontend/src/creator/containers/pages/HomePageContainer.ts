import { connect } from 'react-redux';
import { AppState } from '../../states/index';
import HomePage from '../../components/pages/HomePage';

const mapStateToProps = (state: AppState) => ({
});

const mapDispatchToProps = (dispatch) => ({
});

const HomePageContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(HomePage);

export default HomePageContainer;
