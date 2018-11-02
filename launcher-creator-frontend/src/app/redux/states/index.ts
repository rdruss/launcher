import Capability from '../../models/Capability';
import Runtime from '../../models/Runtime';
import OpenShiftCluster from '../../models/OpenShiftCluster';
import GitUser from '../../models/GitUser';
import { SmartWizardState } from '../../../shared/components/smart-wizard/SmartWizardState';

export interface FetchedState<T> {
  data: T;
  error?: string;
  pending: number;
}

export interface LaunchState {
  submission: {
    payload?: any;
    result?: any;
    error?: string;
    progressEvents?: Array<{name: string, message: string}>;
    progressEventsResults?: Array<{
      statusMessage: string;
      data?: {
        location?: string;
        error?: string;
      };
    }>;
    completed: boolean;
    loading: boolean;
  };
}

export interface AuthenticationState {
  enabled: boolean;
  token?: string;
  userName?: string;
  userPreferredName?: string;
  error: any;
  message?: string;
  authenticated: boolean;
  inProgress: boolean;
  sessionTimeOut?: Date;
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
