import {combineReducers} from 'redux';
import {AppState} from '../states';
import authenticationReducer from './authenticationReducer';
import globalReducer from './globalReducer';

const rootReducer = combineReducers<AppState>({
  authentication: authenticationReducer,
  globalState: globalReducer
});

export default rootReducer;
