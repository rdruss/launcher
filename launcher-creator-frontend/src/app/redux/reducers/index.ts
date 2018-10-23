import { combineReducers } from 'redux';
import { AppState } from '../states/index';
import authenticationReducer from './authenticationReducer';
import globalReducer from './globalReducer';
import wizardReducer from './wizardReducer';
import { capabilitiesReducer } from './api/capabilitiesReducer';
import { runtimesReducer } from './api/runtimesReducer';
import { clustersReducer } from './api/gitReducer';
import { gitUserReducer } from './api/clustersReducer';

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
