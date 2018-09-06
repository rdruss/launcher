import * as React from 'react';

import { CapabilitiesList } from './CapabilitiesSelector';

class CapabilityStep extends React.Component<any, {selectedCapability: Set<string>}> {
  private capabilities = [
    {
      description: 'Some general information about this capability. \
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, \
      sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. \
      Odio facilisis mauris sit amet massa vitae tortor.',
      id: 'cap1'
    },
    {
      description: 'Some general information about this capability. \
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, \
      sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. \
      Odio facilisis mauris sit amet massa vitae tortor.',
      id: 'cap2'
    },
    {
      description: 'Some general information about this capability. \
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, \
      sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. \
      Odio facilisis mauris sit amet massa vitae tortor.',
      id: 'cap3'
    },
    {
      description: 'Some general information about this capability. \
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, \
      sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. \
      Odio facilisis mauris sit amet massa vitae tortor.',
      id: 'cap4'
    }
  ]

  constructor(props) {
    super(props);
    this.state = {
      selectedCapability: new Set<string>()
    };
  }

  public render() {
    return (
      <div>
        <CapabilitiesList capabilities={this.capabilities} select={this.onCapabilitySelect}/>
        Selected capabilities:
        <ul>
          {
            Array.from(this.state.selectedCapability).map((cap, i) => (<li key={i}>{cap}</li>))
          }
        </ul>
      </div>
    );
  }

  private onCapabilitySelect = (event: string) => {
    this.setState({selectedCapability: new Set(this.state.selectedCapability.add(event))})
  }
}

export default CapabilityStep;
