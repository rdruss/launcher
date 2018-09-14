import * as React from 'react';
import './App.css';
import 'regenerator-runtime/runtime';

import StoreContainer from './containers/StoreContainer';
import AppRouterContainer from './containers/AppRouterContainer';

const App = () => (
  <StoreContainer>
    <AppRouterContainer />
  </StoreContainer>
);

export default App;
