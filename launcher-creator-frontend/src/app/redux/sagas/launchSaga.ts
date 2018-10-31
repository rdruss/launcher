import { call, put, select, takeLatest } from 'redux-saga/effects';
import { getToken } from '../reducers/authenticationReducer';
import { Projectile } from '../../models/Projectile';
import { authenticationAction } from '../actions/authenticationActions';
import { launchActions, LaunchActions } from '../actions/launchActions';
import { newCreatorApi } from '../../api';

const creatorApi = newCreatorApi();

interface LaunchProjectileAction {
  payload: {
    target: 'zip' | 'launch';
    projectile: Projectile;
  };
}

function* submitWizard(action) {
  const { payload: { target, projectile } } = action as LaunchProjectileAction;
  yield put(authenticationAction.refreshToken());
  const authorizationToken = yield select(getToken);
  try {
    let result;
    switch (target) {
      case 'zip':
        result = yield call(creatorApi.zip, {
          name: projectile.name,
          runtime: projectile.runtime,
          capabilities: (projectile.capabilities || []).map(c => ({ module: c.module })),
        }, { authorizationToken });
        break;
      case 'launch':
        result = yield call(creatorApi.launch, {
          name: projectile.name,
          runtime: projectile.runtime,
          capabilities: (projectile.capabilities || []).map(c => ({ module: c.module })),
          clusterId: projectile.clusterId,
          projectName: projectile.projectName,
          gitOrganization: projectile.gitOrganization,
          gitRepository: projectile.gitRepository,
        }, { authorizationToken });
        break;
      default:
        throw new Error(`Invalid target: ${target}`);
    }
    yield put(launchActions.launchProjectileSuccess(result));
  } catch (e) {
    yield put(launchActions.launchProjectilFailure(e));
  }
}

export default function* launchSaga() {
  yield takeLatest(LaunchActions.LAUNCH_PROJECTILE, submitWizard);
}
