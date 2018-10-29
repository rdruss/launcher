export interface LaunchState {
  submission: {
    payload?: any;
    result?: any;
    error?: string;
    completed: boolean;
    loading: boolean;
  };
}
