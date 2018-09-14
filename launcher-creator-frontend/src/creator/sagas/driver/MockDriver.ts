import { createDriver } from 'redux-saga-requests-mock';
import { ApiAction } from '../../actions';

import * as capabilities from '../../../mocks/capabilities.json';
import * as runtimes from '../../../mocks/runtimes.json';

const toData = (content) => ({ data: content });

const mock  = {
  [ApiAction.FETCH_CAPABILITIES]: (requestConfig, requestAction) => {
    return toData(capabilities);
  },
  [ApiAction.FETCH_RUNTIMES]: (requestConfig, requestAction) => {
    return toData(runtimes);
  },
};
const mockDriver = createDriver(mock, { timeout: 500 });

export default mockDriver;