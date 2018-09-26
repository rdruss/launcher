import { combineReducers } from 'redux';
import { AppState } from '../states';
import authenticationReducer from './authenticationReducer';
import globalReducer from './globalReducer';
import wizardReducer from './wizardReducer';
import { capabilitiesReducer, clustersReducer, gitUserReducer, runtimesReducer } from './apiReducer';

const rootReducer = combineReducers<AppState>({
  authentication: authenticationReducer,
  globalState: globalReducer,
  capabilities: capabilitiesReducer,
  runtimes: runtimesReducer,
  clusters: clustersReducer,
  gitUser: gitUserReducer,
  wizard: wizardReducer,
});



export default rootReducer;
