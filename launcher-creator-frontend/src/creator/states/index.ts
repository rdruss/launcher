import { AuthenticationState } from './AuthenticationState';
import { WizardState } from './WizardState';
import Capability from '../models/Capability';
import Runtime from '../models/Runtime';
import OpenShiftCluster from '../models/OpenShiftCluster';

export interface GlobalState {
}

export interface FetchState<T> {
  data: T;
  error?: string;
  pending: number;
}

export interface AppState {
  globalState: GlobalState;
  authentication: AuthenticationState;
  capabilities: FetchState<[Capability]>;
  runtimes: FetchState<[Runtime]>;
  clusters: FetchState<[OpenShiftCluster]>;
  wizard: WizardState;
}

export const AuthenticationSelector = {
  token: (state: AppState) => state.authentication.token,
};

function isCapabilityCompatibleWithRuntime(c: Capability, r: Runtime): boolean {
  return Boolean(c.props.runtime && c.props.runtime.values.find(p => p.id === r.id));
}

export const ApiCapabilitiesSelector = {
  capabilities: (state: AppState, runtime?: Runtime): Capability[] => {
    if (runtime) {
      return state.capabilities.data.filter(c => isCapabilityCompatibleWithRuntime(c, runtime));
    }
    return state.capabilities.data;
  },
  loading: (state: AppState): boolean => state.capabilities.pending > 0,
  error: (state: AppState): string | undefined => state.capabilities.error,
};

export const ApiRuntimesSelector = {
  runtimes: (state: AppState): Runtime[] => state.runtimes.data,
  loading: (state: AppState): boolean => state.runtimes.pending > 0,
  error: (state: AppState): string | undefined => state.runtimes.error,
};

export const ApiClustersSelector = {
  clusters: (state: AppState): OpenShiftCluster[] => state.clusters.data,
  loading: (state: AppState): boolean => state.clusters.pending > 0,
  error: (state: AppState): string | undefined => state.clusters.error,
};
