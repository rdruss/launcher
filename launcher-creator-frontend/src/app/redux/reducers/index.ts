import { combineReducers } from 'redux';
import { AppState } from '../states';
import authenticationReducer from './authenticationReducer';
import globalReducer from './globalReducer';
import wizardReducer from './wizardReducer';
import { capabilitiesReducer } from './fetch/capabilitiesReducer';
import { runtimesReducer } from './fetch/runtimesReducer';
import { clustersReducer } from './fetch/gitReducer';
import { gitUserReducer } from './fetch/clustersReducer';
import launchReducer from './launchReducer';

const rootReducer = combineReducers<AppState>({
  authentication: authenticationReducer,
  globalState: globalReducer,
  capabilities: capabilitiesReducer,
  runtimes: runtimesReducer,
  clusters: clustersReducer,
  gitUser: gitUserReducer,
  wizard: wizardReducer,
  launch: launchReducer,
});



export default rootReducer;
