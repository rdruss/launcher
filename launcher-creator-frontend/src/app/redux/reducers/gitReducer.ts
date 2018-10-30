import { requestsReducer } from 'redux-saga-requests';
import { AppState } from '../states';
import { createSelector } from 'reselect';
import GitUser from '../../models/GitUser';
import { FetchedData } from '../../models/FetchedData';
import { FetchActions } from '../actions/fetchActions';

// Reducer

export const gitUserReducer = requestsReducer({ actionType: FetchActions.FETCH_GIT_USER });

// Selectors

const getGitUserState = (state:AppState) => state.gitUser;

export const getGitUserData = createSelector([getGitUserState], (f) => ({
  data: f.data,
  loading: (!f.data && !f.error) || f.pending > 0,
  error: f.error,
} as FetchedData<GitUser>));
