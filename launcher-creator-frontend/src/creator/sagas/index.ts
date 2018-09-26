import { all, select } from 'redux-saga/effects';
import authenticationSaga, { refreshTokenRequest } from './authenticationSaga';
import { createRequestInstance, RequestAction, watchRequests } from 'redux-saga-requests';

import mockDriver from './driver/MockDriver';
import axiosDriver from './driver/AxiosDriver';
import { AxiosRequestConfig } from 'axios';
import { checkNotNull } from '../../utils/Preconditions';
import { getToken } from '../reducers/authenticationReducer';

const driver = checkNotNull(process.env.REACT_APP_API_DRIVER, 'process.env.REACT_APP_API_DRIVER') === 'mock' ? mockDriver : axiosDriver;
function* onRequest(request: AxiosRequestConfig, action: RequestAction) {
  yield refreshTokenRequest(action);
  const token = yield select(getToken);
  request.headers = {
    ...request.headers,
    'Authorization': `Bearer ${token}`,
  }
  return request;
};


export default function* sagas() {
  yield createRequestInstance({ driver, onRequest });
  yield all([authenticationSaga(), watchRequests()]);
}
