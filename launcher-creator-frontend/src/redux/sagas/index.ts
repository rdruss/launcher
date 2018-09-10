import { all } from '../../../node_modules/redux-saga/effects';
import authenticationSaga from './authenticationSaga';
import { createRequestInstance, watchRequests } from 'redux-saga-requests';

// import driver from './driver/MockDriver';
import driver from './driver/AxiosDriver';

export default function* sagas() {
  yield createRequestInstance({ driver });
  yield all([authenticationSaga(), watchRequests()]);
}
