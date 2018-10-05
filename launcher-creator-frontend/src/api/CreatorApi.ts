import axios from 'axios';
import { checkNotNull } from '../utils/Preconditions';

export const creatorApiAxios = axios.create({
  baseURL: checkNotNull(process.env.REACT_APP_CREATOR_API_URL, 'process.env.REACT_APP_CREATOR_API_URL'),
});


export interface ZipPayload {
  name: string;
  runtime: string;
  capabilities: [
    { module: string; }
  ];
}

export interface ZipOutput {
  downloadLink: string;
}

export function zip(payload: ZipPayload, { authorizationToken }): Promise<ZipOutput> {
  const config = {
    headers: {
      'Authorization': `Bearer ${authorizationToken}`,
    },
  };
  return creatorApiAxios.post<{id: string}>('/zip', payload, config).then(r => ({
    downloadLink: `${creatorApiAxios.defaults.baseURL}/download?id=${r.data.id}`
  }));
}

export interface LaunchPayload {
  name: string;
  runtime: string;
  capabilities: [
    { module: string; }
  ];
  clusterId: string;
  projectName: string;
  gitOrganization: string;
  gitRepository: string;
}

export interface LaunchOutput {
}

export function launch(payload: LaunchPayload, { authorizationToken }): Promise<LaunchOutput> {
  const config = {
    headers: {
      'Authorization': `Bearer ${authorizationToken}`,
    },
  };
  return creatorApiAxios.post<{id: string}>('/launch', payload, config);
}