import { combineReducers } from 'redux';
import { AppState } from '../states';
import authenticationReducer from './authenticationReducer';
import { capabilitiesReducer } from './capabilitiesReducer';
import { runtimesReducer } from './runtimesReducer';
import { clustersReducer } from './gitReducer';
import { gitUserReducer } from './clustersReducer';
import launchReducer from './launchReducer';
import smartWizardReducer from '../../../shared/components/smart-wizard/smartWizardReducer';

const rootReducer = combineReducers<AppState>({
  authentication: authenticationReducer,
  capabilities: capabilitiesReducer,
  runtimes: runtimesReducer,
  clusters: clustersReducer,
  gitUser: gitUserReducer,
  smartWizard: smartWizardReducer,
  launch: launchReducer,
});



export default rootReducer;
