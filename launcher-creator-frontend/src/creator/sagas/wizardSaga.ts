import { call, put, select, takeLatest } from '../../../node_modules/redux-saga/effects';
import { authenticationAction, wizardAction, WizardAction } from '../actions';
import { getToken } from '../reducers/authenticationReducer';
import * as creatorApi from '../../api/CreatorApi';
import * as mockCreatorApi from '../../mocks/MockCreatorApi';
import { checkNotNull } from '../../utils/Preconditions';

const creator = checkNotNull(process.env.REACT_APP_API_DRIVER, 'process.env.REACT_APP_API_DRIVER') === 'mock' ? mockCreatorApi : creatorApi;


function* submitWizard(action) {
  yield put(authenticationAction.refreshToken());
  const authorizationToken = yield select(getToken);
  const toCall = action.payload.target === 'zip' ? creator.zip : creator.launch;
  try {
    const result = yield call(toCall, action.payload.projectile, { authorizationToken });
    yield put(wizardAction.submitSuccess(result));
  } catch (e) {
    yield put(wizardAction.submitFailure(e));
  }
}



export default function* wizardSaga() {
  yield takeLatest(WizardAction.SUBMIT, submitWizard);
}
