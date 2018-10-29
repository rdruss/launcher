import { AuthenticationState } from './AuthenticationState';
import { WizardState } from './WizardState';
import Capability from '../../models/Capability';
import Runtime from '../../models/Runtime';
import OpenShiftCluster from '../../models/OpenShiftCluster';
import GitUser from '../../models/GitUser';
import { LaunchState } from './LaunchState';

export interface GlobalState {
}


export interface FetchedState<T> {
  data: T;
  error?: string;
  pending: number;
}

export interface AppState {
  globalState: GlobalState;
  authentication: AuthenticationState;
  capabilities: FetchedState<Capability[]>;
  runtimes: FetchedState<Runtime[]>;
  clusters: FetchedState<OpenShiftCluster[]>;
  gitUser: FetchedState<GitUser>;
  launch: LaunchState;
  wizard: WizardState;
}
