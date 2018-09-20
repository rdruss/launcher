import * as React from 'react';
import Wizard from '../../../../components/wizard';
import CapabilitiesSelector from './CapabilitiesSelector';
import Capability from '../../../models/Capability';
import { StepProps } from '../StepProps';
import { WizardStepId } from '../../../states/WizardState';

interface CapabilitiesStepProps extends StepProps {
  capabilities: Capability[];
  selectedCapabilities: Set<Capability>;
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
    const goToNextStep = () => this.props.goToStep(WizardStepId.DESTINATION_STEP);
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
        <Wizard.Button type={'next'} onClick={goToNextStep}/>
      </Wizard.Step>
    );
  }
}

export default CapabilitiesStep;
