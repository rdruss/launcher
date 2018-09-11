import * as React from 'react';

import CapabilitiesSelector from './CapabilitiesSelector';
import { Capability } from '../../../../redux/states';
import SectionLoader from '../../layout/SectionLoader';

interface CapabilitiesStepProps {
  loading: boolean;
  capabilities: [Capability];
  fetchCapabilities: () => {}
}

interface CapabilitiesStepState {
  selectedCapability: Set<Capability>
}

class CapabilitiesStep extends React.Component<CapabilitiesStepProps, CapabilitiesStepState> {


  constructor(props) {
    super(props);
    this.state = {
      selectedCapability: new Set<Capability>()
    };
  }

  public componentDidMount() {
    this.props.fetchCapabilities();
  }

  public render() {
    return (
      <div>
        <h2>Here you can choose some capabilities for your app.</h2>
        <SectionLoader loading={this.props.loading}>
          <CapabilitiesSelector capabilities={this.props.capabilities} onSelect={this.onCapabilitySelect}/>
          {this.state.selectedCapability.size > 0 && (
              <div>
                  Selected capabilities:
                  <ul>
                    {
                      Array.from(this.state.selectedCapability).map((cap, i) => (<li key={i}>{cap.name}</li>))
                    }
                  </ul>
              </div>
          )}
        </SectionLoader>
      </div>
    );
  }

  private onCapabilitySelect = (capability: Capability) => {
    this.setState({selectedCapability: new Set(this.state.selectedCapability.add(capability))})
  }
}

export default CapabilitiesStep;
