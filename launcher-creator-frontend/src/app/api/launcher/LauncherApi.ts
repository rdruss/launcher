import { Subject } from 'rxjs';

export interface StatusMessage {

}

export interface LauncherApi {
  listenToLaunchStatus(id: string): Subject<StatusMessage>;
}