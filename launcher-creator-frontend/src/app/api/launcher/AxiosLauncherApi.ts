import { AxiosInstance } from 'axios';
import { checkNotNull } from '../../../shared/utils/Preconditions';
import { LauncherApi, StatusListener, StatusMessage } from './LauncherApi';


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

  public listenToLaunchStatus = (id: string, events: Array<{ name: string }>, listener: StatusListener) => {
    const socket = new WebSocket(createBackendWebsocketUrl(this.axios.defaults.baseURL) + id);
    socket.onmessage = (msg) => {
      const message = JSON.parse(msg.data) as StatusMessage;
      if (message.data && message.data.error) {
        listener.onError(new Error(message.data.error));
        socket.close();
      } else {
        listener.onMessage(message);
        if(message.statusMessage === events[events.length - 1].name) {
          listener.onComplete();
          socket.close();
        }
      }
    };
    socket.onerror = listener.onError;
    socket.onclose = listener.onComplete;
  }
}