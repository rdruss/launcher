import { createDriver } from 'redux-saga-requests-mock';
import { ApiAction } from '../../actions';

import * as capabilities from '../../../mocks/capabilities.json';
import * as runtimes from '../../../mocks/runtimes.json';
import * as clusters from '../../../mocks/clusters.json';

const toData = (content) => ({ data: content });

const mockCreateApi  = {
  [ApiAction.FETCH_CAPABILITIES]: (requestConfig, requestAction) => {
    return toData(capabilities);
  },
  [ApiAction.FETCH_RUNTIMES]: (requestConfig, requestAction) => {
    return toData(runtimes);
  },
};

const mockLauncherApi  = {
  [ApiAction.FETCH_CLUSTERS]: (requestConfig, requestAction) => {
    return toData(clusters);
  },
};
const mockDriver = {
  default: createDriver(mockCreateApi, { timeout: 500 }),
  launcher: createDriver(mockLauncherApi, { timeout: 500 })
};

export default mockDriver;