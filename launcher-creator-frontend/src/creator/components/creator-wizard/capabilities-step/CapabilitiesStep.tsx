import * as React from 'react';
import { Capability, WizardStepId } from '../../../states';
import Wizard from '../../../../components/wizard';
import CapabilitiesSelector from './CapabilitiesSelector';

interface CapabilitiesStepProps {
  capabilities: Capability[];
  selectedCapabilities: Set<Capability>;
  valid: boolean;
  current: boolean;
  locked: boolean;
  goToStep: (step?:WizardStepId) => void;
  onSelect: (capability: Capability) => void;
  fetchCapabilities: () => {};
  loading: boolean;
}

class CapabilitiesStep extends React.Component<CapabilitiesStepProps, { CapabilitiesStepState }> {
  constructor(props) {
    super(props);
  }

  public componentDidMount() {
    this.props.fetchCapabilities();
  }

  public render() {
    const { current, locked, valid, selectedCapabilities } = this.props;
    return (
      <Wizard.Step
        title={'Capabilities'}
        current={current}
        locked={locked}
        complete={valid}
        onClick={this.props.goToStep}
      >
        <CapabilitiesSelector {...this.props}/>
        {selectedCapabilities.size > 0 && (
          <div>
            Selected capabilities:
            <ul>
              {
                Array.from(selectedCapabilities).map((cap, i) => (<li key={i}>{cap.name}</li>))
              }
            </ul>
          </div>
        )}
        <Wizard.Button type={'next'}/>
      </Wizard.Step>
    );
  }
}

export default CapabilitiesStep;
