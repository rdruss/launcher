export interface StatusListener {
  onMessage(message: StatusMessage);
  onError(error: any);
  onComplete();
}

export interface StatusMessage {

}

export interface LauncherApi {
  listenToLaunchStatus(id: string, listener: StatusListener);
}