import { createDriver } from 'redux-saga-requests-mock';

import * as capabilities from '../../api/mocks/capabilities.json';
import * as runtimes from '../../api/mocks/runtimes.json';
import * as clusters from '../../api/mocks/clusters.json';
import * as gitUser from '../../api/mocks/gitUser.json';
import { FetchActions } from '../actions/fetchActions';

const toData = (content) => ({ data: content });

const mockCreateApi  = {
  [FetchActions.FETCH_CAPABILITIES]: (requestConfig, requestAction) => {
    return toData(capabilities);
  },
  [FetchActions.FETCH_RUNTIMES]: (requestConfig, requestAction) => {
    return toData(runtimes);
  },
};

const mockLauncherApi  = {
  [FetchActions.FETCH_CLUSTERS]: (requestConfig, requestAction) => {
    return toData(clusters);
  },
  [FetchActions.FETCH_GIT_USER]: (requestConfig, requestAction) => {
    return toData(gitUser);
  },
};
const mockApiDriver = {
  default: createDriver(mockCreateApi, { timeout: 500 }),
  launcher: createDriver(mockLauncherApi, { timeout: 500 })
};

export default mockApiDriver;