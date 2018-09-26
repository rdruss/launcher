import { requestsReducer } from 'redux-saga-requests';
import { ApiAction } from '../actions';
import Runtime from '../models/Runtime';
import { FetchedData, AppState } from '../states';
import { createSelector } from 'reselect';
import Capability from '../models/Capability';
import { getSelectedRuntime } from './wizardReducer';
import OpenShiftCluster from '../models/OpenShiftCluster';
import GitUser from '../models/GitUser';

export const capabilitiesReducer = requestsReducer({ actionType: ApiAction.FETCH_CAPABILITIES, multiple: true });

function createCapabilityFilterForRuntime(r?: Runtime): (Capability) => boolean {
  return (c) => !r || Boolean(c.props.runtime && c.props.runtime.values.find(p => p.id === r.id));
}

const getCapabilitiesState = (state:AppState) => state.capabilities;

export const getCapabilitiesData = createSelector([getCapabilitiesState], (f) => ({
  data: f.data,
  loading: f.pending > 0,
  error: f.error,
} as FetchedData<Capability[]>));

export const getCapabilitiesDataForSelectedRuntime = createSelector([getCapabilitiesData, getSelectedRuntime], (c, r) => ({
  data: c.data.filter(createCapabilityFilterForRuntime(r)),
  loading: c.loading,
  error: c.error,
} as FetchedData<Capability[]>));

export const runtimesReducer = requestsReducer({ actionType: ApiAction.FETCH_RUNTIMES, multiple: true });

const getRuntimesState = (state:AppState) => state.runtimes;

export const getRuntimesData = createSelector([getRuntimesState], (f) => ({
  data: f.data,
  loading: f.pending > 0,
  error: f.error,
} as FetchedData<Runtime[]>));

export const clustersReducer = requestsReducer({
  actionType: ApiAction.FETCH_CLUSTERS,
  multiple: true,
  getData: (state, action, config) => action.data.map(c => ({
    ...c.cluster,
    connected: c.connected,
  })),
});

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

export const gitUserReducer = requestsReducer({ actionType: ApiAction.FETCH_GIT_USER });

const getGitUserState = (state:AppState) => state.gitUser;

export const getGitUserData = createSelector([getGitUserState], (f) => ({
  data: f.data,
  loading: !f.data || f.pending > 0,
  error: f.error,
} as FetchedData<GitUser>));
