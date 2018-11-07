import * as React from 'react';
import './App.css';
import 'regenerator-runtime/runtime';
import StoreContainer from '@app/redux/containers/StoreContainer';
import AppRouterContainer from '@app/redux/containers/AppRouterContainer';


const App = () => (
  <StoreContainer>
    <AppRouterContainer />
  </StoreContainer>
);

export default App;
