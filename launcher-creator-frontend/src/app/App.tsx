import * as React from 'react';
import './App.css';
import 'regenerator-runtime/runtime';

import StoreContainer from './redux/containers/StoreContainer';
import AppRouterContainer from './redux/containers/AppRouterContainer';

const App = () => (
  <StoreContainer>
    <AppRouterContainer />
  </StoreContainer>
);

export default App;
