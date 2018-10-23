import { GlobalState } from '../states/index';

const INITIAL_GLOBAL_STATE: GlobalState = {
};

// This Reducer allows changes to the 'globalReducer' portion of Redux Store
const globalReducer = (state: GlobalState = INITIAL_GLOBAL_STATE, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

export default globalReducer;
