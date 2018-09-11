import { combineReducers } from 'redux';
import { AppState } from '../states';
import authenticationReducer from './authenticationReducer';
import globalReducer from './globalReducer';
import { requestsReducer } from 'redux-saga-requests';
import { ApiAction } from '../actions';

const rootReducer = combineReducers<AppState>({
  authentication: authenticationReducer,
  globalState: globalReducer,
  capabilities: requestsReducer({ actionType: ApiAction.FETCH_CAPABILITIES }),
  runtimes: requestsReducer({ actionType: ApiAction.FETCH_RUNTIMES }),
});

export default rootReducer;
