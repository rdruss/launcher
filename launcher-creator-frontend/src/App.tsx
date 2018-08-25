import * as React from 'react';
import './App.css';

import { Alert } from 'patternfly-react';

import { CapabilitiesList } from './CapabilitiesSelector';
import logo from './logo.svg';

class App extends React.Component<any, {selectedCapability: Set<string>}> {
  private capabilities = [
    {
      description: "Some general information about this capability. \
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, \
      sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. \
      Odio facilisis mauris sit amet massa vitae tortor.",
      id: 'cap1'
    },
    {
      description: "Some general information about this capability. \
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, \
      sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. \
      Odio facilisis mauris sit amet massa vitae tortor.",
      id: 'cap2'
    },
    {
      description: "Some general information about this capability. \
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, \
      sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. \
      Odio facilisis mauris sit amet massa vitae tortor.",
      id: 'cap3'
    },
    {
      description: "Some general information about this capability. \
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, \
      sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. \
      Odio facilisis mauris sit amet massa vitae tortor.",
      id: 'cap4'
    }
  ]
  
  constructor(props) {
    super(props);
    this.state = {
      selectedCapability: new Set<string>()
    };
    this.onCapabilitySelect = this.onCapabilitySelect.bind(this);
  }

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
        {
          <CapabilitiesList capabilities={this.capabilities} select={this.onCapabilitySelect}/>
        }
      </div>
    );
  }

  private onCapabilitySelect(event: string) {
    this.setState({selectedCapability: new Set(this.state.selectedCapability.add(event))})
  }
}

export default App;
