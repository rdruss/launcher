import { requestsReducer } from 'redux-saga-requests';
import { AppState } from '../../states';
import { createSelector } from 'reselect';
import OpenShiftCluster from '../../../models/OpenShiftCluster';
import { FetchedData } from '../../../models/FetchedData';
import { FetchActions } from '../../actions/fetchActions';

// Reducer

export const clustersReducer = requestsReducer({
  actionType: FetchActions.FETCH_CLUSTERS,
  multiple: true,
  getData: (state, action, config) => action.data.map(c => ({
    ...c.cluster,
    connected: c.connected,
  })),
});

// Selectors

const getClustersState = (state:AppState) => state.clusters;

export const getClustersData = createSelector([getClustersState], (f) => ({
  data: f.data,
  loading: f.pending > 0,
  error: f.error,
} as FetchedData<OpenShiftCluster[]>));

export const getConnectedClustersData = createSelector([getClustersData], (d) => ({
  ...d,
  data: d.data.filter(c => c.connected),
} as FetchedData<OpenShiftCluster[]>));