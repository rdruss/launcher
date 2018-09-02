// Store is the Redux Data states

export interface GlobalState {
}

export interface Token {
  token: string;
  expired_at: string;
}

export interface AuthenticationState {
  token?: Token;
  userName?: string;
  error: any;
  message: string;
  authenticated: boolean;
  inProgress: boolean;
  sessionTimeOut?: Date;
}

// This defines the  Global Application State
export interface AppState {
  globalState: GlobalState;
  authentication: AuthenticationState;
}
