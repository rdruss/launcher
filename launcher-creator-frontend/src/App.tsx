import * as React from 'react';
import './App.css';
import 'regenerator-runtime/runtime';

import StoreContainer from './creator/StoreContainer';
import AppRouterContainer from './creator/AppRouterContainer';

const App = () => (
  <StoreContainer>
    <AppRouterContainer />
  </StoreContainer>
);

export default App;
