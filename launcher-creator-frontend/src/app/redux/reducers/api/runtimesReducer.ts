import { requestsReducer } from 'redux-saga-requests';
import { ApiAction } from '../../actions';
import { AppState } from '../../states';
import { createSelector } from 'reselect';
import Runtime from '../../../models/Runtime';
import { FetchedData } from '../../../models/FetchedData';

// Reducer

export const runtimesReducer = requestsReducer({ actionType: ApiAction.FETCH_RUNTIMES, multiple: true });

// Selectors

const getRuntimesState = (state:AppState) => state.runtimes;

export const getRuntimesData = createSelector([getRuntimesState], (f) => ({
  data: f.data,
  loading: f.pending > 0,
  error: f.error,
} as FetchedData<Runtime[]>));