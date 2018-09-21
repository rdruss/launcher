import { requestsReducer } from 'redux-saga-requests';
import { ApiAction } from '../actions';

export const capabilitiesReducer = requestsReducer({ actionType: ApiAction.FETCH_CAPABILITIES, multiple: true });

export const runtimesReducer = requestsReducer({ actionType: ApiAction.FETCH_RUNTIMES, multiple: true });

export const clustersReducer = requestsReducer({
  actionType: ApiAction.FETCH_CLUSTERS,
  multiple: true,
  getData: (state, action, config) => action.data.map(c => ({
    ...c.cluster,
    connected: c.connected,
  })),
});