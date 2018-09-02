import * as React from 'react';

import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { createLogger } from 'redux-logger';
import createSagaMiddleware from 'redux-saga';

import sagas from './sagas/index';
import rootReducer from './reducers/index';
import { MainLayoutContainer } from './containers/MainLayoutContainer';
import { authentication } from './actions';

const loggerMiddleware = createLogger();
const sagaMiddleware = createSagaMiddleware();

const store = createStore(
  rootReducer,
  applyMiddleware(sagaMiddleware, loggerMiddleware),
);

sagaMiddleware.run(sagas);

store.dispatch(authentication.authenticationRequest());

const StoreContainer = (props) => (<Provider store={store}><MainLayoutContainer>{props.children}</MainLayoutContainer></Provider>);

export default StoreContainer;
