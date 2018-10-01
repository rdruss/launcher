import { AppState } from '../../../states';
import { apiAction } from '../../../actions';
import RepositoryStep from '../../../components/creator-wizard/repository-step/RepositoryStep';
import { getGitUserData } from '../../../reducers/api/clustersReducer';
import { compose } from 'redux';
import { connect, ConnectedComponentClass } from 'react-redux';
import connectWizardStep from '../connectWizardStep';
import * as _ from 'lodash';
import { getStepState } from '../../../reducers/wizardReducer';
import { WizardStepId } from '../../../states/WizardState';

const mapStateToRuntimeStepProps = (state:AppState, props) => ({
  applicationName: _.get(getStepState(WizardStepId.NAME_STEP)(state), 'context.title'),
  gitUserData: getGitUserData(state),
});

const mapDispatchToProps = (dispatch) => ({
  fetchGitUser: () => dispatch(apiAction.fetchGitUser()),
});

const connectData = connect(mapStateToRuntimeStepProps, mapDispatchToProps);

const RepositoryStepContainer: ConnectedComponentClass<any, any> = compose(connectWizardStep, connectData)(RepositoryStep);

export default RepositoryStepContainer;
