import { AuthenticationState } from './AuthenticationState';
import { WizardState } from './WizardState';
import Capability from '../models/Capability';
import Runtime from '../models/Runtime';
import OpenShiftCluster from '../models/OpenShiftCluster';

export interface GlobalState {
}

export interface ApiCollection<T> {
  collection: T[];
  loading: boolean;
  error?: string;
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
