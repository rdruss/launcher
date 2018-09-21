import { combineReducers } from 'redux';
import { AppState } from '../states';
import authenticationReducer from './authenticationReducer';
import globalReducer from './globalReducer';
import wizardReducer from './wizardReducer';
import { capabilitiesReducer, clustersReducer, runtimesReducer } from './apiReducer';


const rootReducer = combineReducers<AppState>({
  authentication: authenticationReducer,
  globalState: globalReducer,
  capabilities: capabilitiesReducer,
  runtimes: runtimesReducer,
  clusters: clustersReducer,
  wizard: wizardReducer,
});

export default rootReducer;
