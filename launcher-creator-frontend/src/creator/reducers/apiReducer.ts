import { requestsReducer } from 'redux-saga-requests';
import { ApiAction } from '../actions';
import Runtime from '../models/Runtime';
import { ApiCollection, AppState } from '../states';
import { createSelector } from 'reselect';
import Capability from '../models/Capability';
import { getSelectedRuntime } from './wizardReducer';
import OpenShiftCluster from '../models/OpenShiftCluster';

export const capabilitiesReducer = requestsReducer({ actionType: ApiAction.FETCH_CAPABILITIES, multiple: true });

function createCapabilityFilterForRuntime(r?: Runtime): (Capability) => boolean {
  return (c) => !r || Boolean(c.props.runtime && c.props.runtime.values.find(p => p.id === r.id));
}

const getCapabilitiesState = (state:AppState) => state.capabilities;

export const getCapabilityCollection = createSelector([getCapabilitiesState], (f) => ({
  collection: f.data,
  loading: f.pending > 0,
  error: f.error,
} as ApiCollection<Capability>));

export const getCapabilityCollectionForSelectedRuntime = createSelector([getCapabilityCollection, getSelectedRuntime], (c, r) => ({
  collection: c.collection.filter(createCapabilityFilterForRuntime(r)),
  loading: c.loading,
  error: c.error,
} as ApiCollection<Capability>));

export const runtimesReducer = requestsReducer({ actionType: ApiAction.FETCH_RUNTIMES, multiple: true });

const getRuntimesState = (state:AppState) => state.runtimes;

export const getRuntimeCollection = createSelector([getRuntimesState], (f) => ({
  collection: f.data,
  loading: f.pending > 0,
  error: f.error,
} as ApiCollection<Runtime>));

export const clustersReducer = requestsReducer({
  actionType: ApiAction.FETCH_CLUSTERS,
  multiple: true,
  getData: (state, action, config) => action.data.map(c => ({
    ...c.cluster,
    connected: c.connected,
  })),
});

const getClustersState = (state:AppState) => state.clusters;

export const getClusterCollection = createSelector([getClustersState], (f) => ({
  collection: f.data,
  loading: f.pending > 0,
  error: f.error,
} as ApiCollection<OpenShiftCluster>));
