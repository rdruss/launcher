import { requestsReducer } from 'redux-saga-requests';
import { ApiAction } from '../../actions';
import { AppState } from '../../states';
import { createSelector } from 'reselect';
import GitUser from '../../models/GitUser';
import { FetchedData } from '../../models/FetchedData';

// Reducer

export const gitUserReducer = requestsReducer({ actionType: ApiAction.FETCH_GIT_USER });

// Selectors

const getGitUserState = (state:AppState) => state.gitUser;

export const getGitUserData = createSelector([getGitUserState], (f) => ({
  data: f.data,
  loading: (!f.data && !f.error) || f.pending > 0,
  error: f.error,
} as FetchedData<GitUser>));
