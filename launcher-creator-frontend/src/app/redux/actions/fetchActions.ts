import { action } from '@shared/utils/Actions';

export enum FetchActions {
  FETCH_CAPABILITIES = 'FETCH_CAPABILITIES',
  FETCH_RUNTIMES = 'FETCH_RUNTIMES',
  FETCH_CLUSTERS = 'FETCH_CLUSTERS',
  FETCH_GIT_USER = 'FETCH_GIT_USER',
}

export const fetchActions = {
  fetchCapabilities: () => action(FetchActions.FETCH_CAPABILITIES, {request: {url: `/capabilities`}}),
  fetchRuntimes: () => action(FetchActions.FETCH_RUNTIMES, {request: {url: `/runtimes`}}),
  fetchClusters: () => action(FetchActions.FETCH_CLUSTERS, {
    request: {url: `/services/openshift/clusters`, headers: {'X-App': 'launcher'}},
    meta: {driver: 'launcher'},
  }),
  fetchGitUser: () => action(FetchActions.FETCH_GIT_USER, {
    request: {url: `/services/git/user`, headers: {'X-App': 'launcher', 'X-Git-Provider': 'GitHub'}},
    meta: {driver: 'launcher'},
  }),
};