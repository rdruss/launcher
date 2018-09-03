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

// This defines the  Global Application State
export interface AppState {
  globalState: GlobalState;
  authentication: AuthenticationState;
}
