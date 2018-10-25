import { checkNotNull } from '../../shared/utils/Preconditions';

export const isMockApi = checkNotNull(process.env.REACT_APP_API_DRIVER, 'process.env.REACT_APP_API_DRIVER') === 'mock';

export const creatorApiUrl =
  checkNotNull(isMockApi ? 'http://mockUrl' : process.env.REACT_APP_CREATOR_API_URL, 'process.env.REACT_APP_CREATOR_API_URL');

export const launcherApiUrl =
  checkNotNull(isMockApi ? 'http://mockUrl' : process.env.REACT_APP_LAUNCHER_API_URL, 'process.env.REACT_APP_LAUNCHER_API_URL');