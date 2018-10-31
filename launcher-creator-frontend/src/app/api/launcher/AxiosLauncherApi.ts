import { Subject } from 'rxjs';
import { AxiosInstance } from 'axios';
import { checkNotNull } from '../../../shared/utils/Preconditions';
import { LauncherApi, StatusMessage } from './LauncherApi';


function createBackendWebsocketUrl(backendApiUrl?: string) {
  checkNotNull(backendApiUrl, 'backendApiUrl');

  let url = backendApiUrl!.substring(0, backendApiUrl!.indexOf('/api'));
  if (url.indexOf('https') !== -1) {
    return url.replace('https', 'wss');
  } else if (url.indexOf('http') !== -1) {
    return url.replace('http', 'ws');
  } else if (url.startsWith('/') || url.startsWith(':')) {
    // /launch/api
    url = (url.startsWith(':') ? location.hostname : location.host) + url;
    return (location.protocol === 'https:' ? 'wss://' : 'ws://') + url;
  }
  throw new Error('Error while creating websocket url from backend url: ' + backendApiUrl);
}

export default class AxiosLauncherApi implements LauncherApi {

  constructor(private axios: AxiosInstance) {}

  public listenToLaunchStatus = (id: string): Subject<StatusMessage> => {
    const progressMessages = new Subject<MessageEvent>();
    const socket = new WebSocket(createBackendWebsocketUrl(this.axios.defaults.baseURL) + id);
    socket.onmessage = progressMessages.next;
    socket.onerror = progressMessages.error;
    socket.onclose = progressMessages.complete;
    return progressMessages;
  }
}