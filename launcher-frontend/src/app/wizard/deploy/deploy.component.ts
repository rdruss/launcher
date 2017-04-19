import { Component, Input } from '@angular/core';

import { Gui, StatusMessage, StatusEvent } from '../../shared/model';
import { ForgeService } from "../../shared/forge.service";
import { KeycloakService } from "../../shared/keycloak.service";
import { Config } from "../../shared/config.component";

@Component({
  selector: 'deploy',
  templateUrl: './deploy.component.html'
})
export class DeployComponent {
  @Input() submittedGuis: Gui[];
  @Input() command: string;
  status: Status = Status.None;
  Status = Status;
  statusMessages: StatusMessage[];

  private apiUrl: string = process.env.LAUNCHPAD_MISSIONCONTROL_URL;
  private webSocket: WebSocket;

  constructor(private forgeService: ForgeService,
    private kc: KeycloakService,
    private config: Config) {
      if (!this.apiUrl) {
        this.apiUrl = config.get('mission_control_url');
      }
      if (this.apiUrl && this.apiUrl.endsWith('/')) {
        this.apiUrl = this.apiUrl.substr(0, this.apiUrl.length-1);
      }
  }

  deploy(): void {
    if (this.kc.isAuthenticated()) {
      this.status = Status.Progress;
      this.forgeService.upload(this.command, this.submittedGuis)
        .then(status => {
          this.webSocket = new WebSocket(this.apiUrl + status.uuid_link);
          this.webSocket.onmessage = function(event: MessageEvent) {
            if (!this.statusMessages) {
              this.statusMessages = [];
              let values = JSON.parse(event.data);
              for (let item of values) {
                for (let key in item) {
                  let status = new StatusMessage(key, item[key]);
                  this.statusMessages.push(status);
                }
              }
            } else {
              let message = JSON.parse(event.data);
              if (message.data && message.data.error) {
                this.status = Status.Error;
                this.webSocket.close();
                for (let status of this.statusMessages) {
                  if (!status.done) {
                    status.data = message.data;
                    break;
                  }
                }
              } else {
                for (let status of this.statusMessages) {
                  if (status.messageKey == message.statusMessage) {
                    status.done = true;
                    status.data = message.data;
                    break;
                  }
                }

                let done = this.statusMessages[this.statusMessages.length - 1].done;
                if (this.done) {
                  this.webSocket.close();
                  this.status = Status.Done;
                } 
              }
            }
          }.bind(this);
        });
    } else {
      this.kc.login();
    }
  }

  retry(): void {
    this.webSocket.close();
    this.statusMessages = null;
    this.deploy();
  }

  downloadZip(): void {
    this.forgeService.downloadZip(this.command, this.submittedGuis);
  }
}

enum Status {
  None,
  Progress,
  Done,
  Error
}