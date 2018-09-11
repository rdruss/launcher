// Store is the Redux Data states

export interface GlobalState {
}

export interface AuthenticationState {
  token?: string;
  userName?: string;
  userPreferredName?: string
  error: any;
  message?: string;
  authenticated: boolean;
  inProgress: boolean;
  sessionTimeOut?: Date;
}

export interface IdAndName {
  id: string;
  name: string;
}

export interface Runtime {
  id: string;
  language: string;
  name: string;
  description?: string;
  icon?: string;
}

export interface Capability {
  module: string;
  name: string;
  description: string;
  props: {
    runtime?: {
      values: [IdAndName];
    }
  };
}

export interface FetchState<T> {
  data: T;
  error: string;
  pending: number;
}

// This defines the  Global Application State
export interface AppState {
  globalState: GlobalState;
  authentication: AuthenticationState;
  capabilities: FetchState<[Capability]>;
  runtimes: FetchState<[Runtime]>;
}
