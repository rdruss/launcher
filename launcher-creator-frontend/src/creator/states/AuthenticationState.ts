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

