import * as React from 'react';
import CapabilityStep from '../components/capabilities/CapabilityStep';
import MainLayoutContainer from '../components/layout/MainLayoutContainer';

class HomePage extends React.Component<any, {selectedCapability: Set<string>}> {

  constructor(props) {
    super(props);
    this.state = {
      selectedCapability: new Set<string>()
    };
    this.onCapabilitySelect = this.onCapabilitySelect.bind(this);
  }

  public render() {
    return (
        <MainLayoutContainer>
          <CapabilityStep />
        </MainLayoutContainer>
    );
  }

  private onCapabilitySelect(event: string) {
    this.setState({selectedCapability: new Set(this.state.selectedCapability.add(event))})
  }
}

export default HomePage;
