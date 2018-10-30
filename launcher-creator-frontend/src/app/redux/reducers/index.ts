import { combineReducers } from 'redux';
import { AppState } from '../states';
import authenticationReducer from './authenticationReducer';
import { capabilitiesReducer } from './capabilitiesReducer';
import { runtimesReducer } from './runtimesReducer';
import launchReducer from './launchReducer';
import smartWizardReducer from '../../../shared/components/smart-wizard/smartWizardReducer';
import { clustersReducer } from './clustersReducer';
import { gitUserReducer } from './gitReducer';

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
