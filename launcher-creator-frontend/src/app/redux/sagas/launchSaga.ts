import { call, put, select, takeEvery, takeLatest } from 'redux-saga/effects';
import { getToken } from '../reducers/authenticationReducer';
import { Projectile } from '../../models/Projectile';
import { authenticationAction } from '../actions/authenticationActions';
import { launchActions, LaunchActions } from '../actions/launchActions';
import { newCreatorApi, newLauncherApi } from '../../api';
import { END, eventChannel } from 'redux-saga';

const creatorApi = newCreatorApi();
const launchApi = newLauncherApi();

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
        yield put(launchActions.launchProjectileSuccess(result));
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
        yield put(launchActions.launchProjectileFollowProgress(result));
        break;
      default:
        throw new Error(`Invalid target: ${target}`);
    }

  } catch (e) {
    yield put(launchActions.launchProjectilFailure(e));
  }
}

function* channelToDispatch(action) {
  yield put(action);
}

function* followStatus(action) {
  const channel = eventChannel(emitter => {
    launchApi.listenToLaunchStatus(action.result.id, action.result.events, {
      onMessage(message) {
        emitter(launchActions.launchProjectileProgressMessage(message));
      },
      onComplete() {
        emitter(launchActions.launchProjectileSuccess(action.result));
        emitter(END);
      },
      onError(error) {
        emitter(launchActions.launchProjectilFailure(error));
        emitter(END);
      }
    });
    return () => {
      console.log('listen launch off');
    };
  });
  yield takeEvery(channel, channelToDispatch);
}

export default function* launchSaga() {
  yield takeLatest(LaunchActions.LAUNCH_PROJECTILE, submitWizard);
  yield takeLatest(LaunchActions.LAUNCH_PROJECTILE_FOLLOW_PROGRESS, followStatus);
}
