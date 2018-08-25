import * as React from 'react';
import './App.css';

import { Alert } from 'patternfly-react';

import { CapabilitiesSelector } from './CapabilitiesSelector';
import logo from './logo.svg';

class App extends React.Component {
  public render() {
    return (
      <div>
        <div className="App">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <h1 className="App-title">Welcome to React</h1>
          </header>
          <p className="App-intro">
            To get started, edit <code>src/App.tsx</code> and save to reload.
          </p>
          <Alert type="warning">
            <strong>Holy guacamole!</strong> Best check yo self, you're not looking too
            good.
          </Alert>
        </div>
        <CapabilitiesSelector />
      </div>
    );
  }
}

export default App;
