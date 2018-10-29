import { call, put, select } from '../../../../node_modules/redux-saga/effects';
import { getToken } from '../reducers/authenticationReducer';
import * as creatorApi from '../../api/CreatorApi';
import * as mockCreatorApi from '../../api/mocks/MockCreatorApi';
import { checkNotNull } from '../../../shared/utils/Preconditions';
import { Projectile } from '../../models/Projectile';
import { takeLatest } from 'redux-saga/effects';
import { authenticationAction } from '../actions/authenticationActions';
import { launchActions, LaunchActions } from '../actions/launchActions';

const creator = checkNotNull(process.env.REACT_APP_API_DRIVER, 'process.env.REACT_APP_API_DRIVER') === 'mock' ? mockCreatorApi : creatorApi;

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
        result = yield call(creator.zip, {
          name: projectile.name,
          runtime: projectile.runtime,
          capabilities: (projectile.capabilities || []).map(c => ({ module: c.module })),
        }, { authorizationToken });
        break;
      case 'launch':
        result = yield call(creator.launch, {
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
