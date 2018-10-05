import axios from 'axios';
import { checkNotNull } from '../utils/Preconditions';

export const launcherApiAxios = axios.create({
  baseURL: checkNotNull(process.env.REACT_APP_LAUNCHER_API_URL, 'process.env.REACT_APP_LAUNCHER_API_URL'),
});
