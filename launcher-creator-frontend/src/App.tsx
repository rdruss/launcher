import * as React from 'react';
import './App.css';
import 'regenerator-runtime/runtime';

import StoreContainer from './redux/StoreContainer';
import AppRouterContainer from './react/AppRouterContainer';

const App = () => (
  <StoreContainer>
    <AppRouterContainer />
  </StoreContainer>
);

export default App;
