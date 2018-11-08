import { AxiosInstance } from 'axios';
import { CreatorApi, LaunchOutput, LaunchPayload, ZipOutput, ZipPayload } from './CreatorApi';

export default class AxiosCreatorApi implements CreatorApi {

  constructor(private axios: AxiosInstance) {
  }

  public zip = (payload: ZipPayload, { authorizationToken }): Promise<ZipOutput> => {
    const config = {
      headers: {
        'Authorization': `Bearer ${authorizationToken}`,
      },
    };
    return this.axios.post<{id: string}>('/zip', payload, config).then(r => ({
      downloadLink: `${this.axios.defaults.baseURL}/download?id=${r.data.id}`
    }));
  }

  public launch = (payload: LaunchPayload, { authorizationToken }): Promise<LaunchOutput> => {
    const config = {
      headers: {
        'Authorization': `Bearer ${authorizationToken}`,
      },
    };
    return this.axios.post<{uuid_link: string, events: []}>('/launch', payload, config)
      .then(r => ({
        id: r.data.uuid_link,
        events: r.data.events,
      }));
  }

}
