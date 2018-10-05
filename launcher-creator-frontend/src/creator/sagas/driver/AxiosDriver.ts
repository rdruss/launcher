import { createDriver } from 'redux-saga-requests-axios';
import { creatorApiAxios } from '../../../api/CreatorApi';
import { launcherApiAxios } from '../../../api/LauncherApi';


const driver = {
  default: createDriver(creatorApiAxios),
  launcher: createDriver(launcherApiAxios),
};

export default driver;