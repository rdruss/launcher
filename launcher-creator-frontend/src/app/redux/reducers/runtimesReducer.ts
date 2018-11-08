import { requestsReducer } from 'redux-saga-requests';
import { AppState } from '../states/index';
import { createSelector } from 'reselect';
import Runtime from '../../models/Runtime';
import { FetchedData } from '../../models/FetchedData';
import { FetchActions } from '../actions/fetchActions';

// Reducer

export const runtimesReducer = requestsReducer({ actionType: FetchActions.FETCH_RUNTIMES, multiple: true });

// Selectors

const getRuntimesState = (state:AppState) => state.runtimes;

export const getRuntimesData = createSelector([getRuntimesState], (f) => ({
  data: f.data,
  loading: f.pending > 0,
  error: f.error,
} as FetchedData<Runtime[]>));