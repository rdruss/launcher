import * as React from 'react';
import { Capability } from '../../../states';
import Lizard from '../../../../components/lizard';
import CapabilitiesSelectorContainer from './CapabilitiesSelectorContainer';

interface CapabilitiesStepProps {
  selectedCapabilities: Set<Capability>;
  valid: boolean;
  current: boolean;
  locked: boolean;
}

class CapabilitiesStep extends React.Component<CapabilitiesStepProps, { CapabilitiesStepState }> {
  constructor(props) {
    super(props);
  }

  public render() {
    return (
      <Lizard.Step
        title={'Capabilities'}
        current={this.props.current}
        locked={this.props.locked}
        complete={this.props.valid}
      >
        <CapabilitiesSelectorContainer/>
        {this.props.selectedCapabilities.size > 0 && (
          <div>
            Selected capabilities:
            <ul>
              {
                Array.from(this.props.selectedCapabilities).map((cap, i) => (<li key={i}>{cap.name}</li>))
              }
            </ul>
          </div>
        )}
        <Lizard.Button type={'next'}/>
      </Lizard.Step>
    );
  }
}

export default CapabilitiesStep;
