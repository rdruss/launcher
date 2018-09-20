import { all, select } from 'redux-saga/effects';
import authenticationSaga from './authenticationSaga';
import { createRequestInstance, RequestAction, watchRequests } from 'redux-saga-requests';

import mockDriver from './driver/MockDriver';
import axiosDriver from './driver/AxiosDriver';
import { AuthenticationSelector } from '../states';
import { AxiosRequestConfig } from 'axios';
import { checkNotNull } from '../../utils/Preconditions';

const driver = checkNotNull(process.env.REACT_APP_API_DRIVER) === 'mock' ? mockDriver : axiosDriver;
function* onRequest(request: AxiosRequestConfig, action: RequestAction) {
  const token = yield select(AuthenticationSelector.token);
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
