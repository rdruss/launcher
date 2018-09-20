import { AuthenticationState } from './AuthenticationState';
import { WizardState } from './WizardState';
import Capability from '../models/Capability';
import Runtime from '../models/Runtime';
import OpenShiftCluster from '../models/OpenShiftCluster';

export interface GlobalState {
}

export interface FetchState<T> {
  data: T;
  error: string;
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

export const ApiCapabilitiesSelector = {
  capabilities: (state: AppState, runtime?: Runtime): Capability[] => {
    if (runtime) {
      return state.capabilities.data.filter(c => Boolean(c.props.runtime.values.find(p => p.id === runtime.id))) || [];
    }
    return state.capabilities.data ||[];
  },
  loading: (state: AppState): boolean => !state.capabilities.data || state.capabilities.pending > 0,
};

export const ApiRuntimesSelector = {
  runtimes: (state: AppState): Runtime[] => state.runtimes.data,
  loading: (state: AppState): boolean => !state.runtimes.data || state.runtimes.pending > 0,
};
