import { AuthenticationState } from './AuthenticationState';
import Capability from '../../models/Capability';
import Runtime from '../../models/Runtime';
import OpenShiftCluster from '../../models/OpenShiftCluster';
import GitUser from '../../models/GitUser';
import { LaunchState } from './LaunchState';
import { SmartWizardState } from '../../../shared/components/smart-wizard/SmartWizardState';

export interface FetchedState<T> {
  data: T;
  error?: string;
  pending: number;
}

export interface AppState {
  authentication: AuthenticationState;
  capabilities: FetchedState<Capability[]>;
  runtimes: FetchedState<Runtime[]>;
  clusters: FetchedState<OpenShiftCluster[]>;
  gitUser: FetchedState<GitUser>;
  launch: LaunchState;
  smartWizard: SmartWizardState;
}
