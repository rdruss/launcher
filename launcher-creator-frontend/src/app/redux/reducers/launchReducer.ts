import { AppState } from '../states/index';
import { LaunchState } from '../states/LaunchState';
import { LaunchActions } from '../actions/launchActions';

// Reducer

const INITIAL_STATE: LaunchState = {
  submission: {
    loading: false,
    completed: false,
  },
};

const launchReducer = (state: LaunchState = INITIAL_STATE, action) => {
  let newState = state;
  switch (action.type) {
    case LaunchActions.LAUNCH_PROJECTILE:
      newState = { ...state, submission: { loading: true, completed: false, payload: action.payload } };
      break;
    case LaunchActions.LAUNCH_PROJECTILE_SUCCESS:
      newState = { ...state, submission: { ...state.submission,
          loading: false,
          completed: true,
          result: action.result,
          error: undefined
        }};
      break;
    case LaunchActions.LAUNCH_PROJECTILE_FAILURE:
      newState = { ...state, submission: { ...state.submission,
          loading: false,
          completed: true,
          error: action.error,
          result: undefined
        }};
      break;
    case LaunchActions.RESET_LAUNCH:
      newState = { ...INITIAL_STATE };
      break;
  }
  return newState;
};

// Selectors

export const getLaunchState = (state:AppState) => state.launch;

export default launchReducer;
