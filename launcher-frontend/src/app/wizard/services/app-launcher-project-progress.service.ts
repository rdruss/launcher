import { Injectable } from '@angular/core';
import {
  Subject
} from 'rxjs';

import {
  HelperService,
  ProjectProgressService
} from 'ngx-forge';

@Injectable()
export class AppLauncherProjectProgressService implements ProjectProgressService {
  progressMessages = new Subject<MessageEvent>();
  private socket: WebSocket;
  private END_POINT: string = '';

  constructor(private helperService: HelperService) {
    this.END_POINT = this.helperService.getBackendUrl();
    this.END_POINT = this.END_POINT.split('/api')[0];

    if (this.END_POINT && (this.END_POINT.startsWith("/") || this.END_POINT.startsWith(":"))) {
      this.END_POINT = (this.END_POINT.startsWith(":") ? location.hostname : location.host) + this.END_POINT;
      this.END_POINT = (location.protocol === "https:" ? "wss://" : "ws://") + this.END_POINT;
    }
  }

  getProgress(uuidLink: string): WebSocket {
    this.socket = new WebSocket(this.END_POINT + uuidLink);
    this.socket.onmessage = (event: MessageEvent) => {
      this.progressMessages.next(event);
    };
    this.socket.onerror = (error: ErrorEvent) => {
      this.progressMessages.error(error);
    };
    this.socket.onclose = () => {
      this.progressMessages.complete();
    };
    return this.socket;
  }
}
