import * as React from 'react';

import { applyMiddleware, createStore } from 'redux';
import { Provider } from 'react-redux';
import { createLogger } from 'redux-logger';
import createSagaMiddleware from 'redux-saga';

import sagas from '../sagas';
import rootReducer from '../reducers';
import { authenticationAction } from '../actions/authenticationActions';

const loggerMiddleware = createLogger();
const sagaMiddleware = createSagaMiddleware();

const store = createStore(
  rootReducer,
  applyMiddleware(sagaMiddleware, loggerMiddleware),
);

sagaMiddleware.run(sagas);

store.dispatch(authenticationAction.authenticate());

const StoreContainer = (props) => (<Provider store={store}>{props.children}</Provider>);

export default StoreContainer;
