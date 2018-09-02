import { all } from '../../../node_modules/redux-saga/effects';
import watchAuthentication from './authenticationSaga';

export default function* sagas() {
  yield all([watchAuthentication()]);
}
