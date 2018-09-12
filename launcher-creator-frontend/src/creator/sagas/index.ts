import { all } from '../../../node_modules/redux-saga/effects';
import authenticationSaga from './authenticationSaga';
import { createRequestInstance, watchRequests } from 'redux-saga-requests';

import mockDriver from './driver/MockDriver';
import axiosDriver from './driver/AxiosDriver';

const driver = process.env.REACT_APP_API_DRIVER === 'mock' ? mockDriver : axiosDriver;

export default function* sagas() {
  yield createRequestInstance({ driver });
  yield all([authenticationSaga(), watchRequests()]);
}
