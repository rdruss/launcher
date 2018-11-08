export interface StatusListener {
  onMessage(message: StatusMessage);
  onError(error: any);
  onComplete();
}

export interface StatusMessage {
  statusMessage: string;
  data?: {
    location?: string;
    error?: string;
  };
}

export interface LauncherApi {
  listenToLaunchStatus(id: string, events: Array<{ name: string }>, listener: StatusListener);
}