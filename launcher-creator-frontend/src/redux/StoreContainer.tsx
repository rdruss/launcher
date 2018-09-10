import * as React from 'react';

import { applyMiddleware, createStore } from 'redux';
import { Provider } from 'react-redux';
import { createLogger } from 'redux-logger';
import createSagaMiddleware from 'redux-saga';

import sagas from './sagas/index';
import rootReducer from './reducers/index';
import { authentication } from './actions';

const loggerMiddleware = createLogger();
const sagaMiddleware = createSagaMiddleware();

const store = createStore(
  rootReducer,
  applyMiddleware(sagaMiddleware, loggerMiddleware),
);

sagaMiddleware.run(sagas);

store.dispatch(authentication.authenticate());

const StoreContainer = (props) => (<Provider store={store}>{props.children}</Provider>);

export default StoreContainer;
