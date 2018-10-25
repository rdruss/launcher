import axios from 'axios';
import { launcherApiUrl } from './ApiConfig';

export const launcherApiAxios = axios.create({
  baseURL: launcherApiUrl,
});
