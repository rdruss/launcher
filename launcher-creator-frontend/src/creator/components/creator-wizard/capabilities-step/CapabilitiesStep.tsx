import * as React from 'react';
import Wizard from '../../../../components/wizard';
import CapabilitiesSelection from './CapabilitiesSelection';
import Capability from '../../../models/Capability';
import { StepProps } from '../StepProps';
import { WizardStepId } from '../../../states/WizardState';

interface CapabilitiesStepProps extends StepProps {
  capabilities: Capability[];
  selectedCapabilities: Set<Capability>;
  onSelect: (capability: Capability) => void;
  onUnselect: (capability: Capability) => void;
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
    const { current, locked, valid } = this.props;
    const goToNextStep = () => this.props.goToStep(WizardStepId.DEPLOYMENT_STEP);
    return (
      <Wizard.Step
        title={'Capabilities'}
        current={current}
        locked={locked}
        complete={valid}
        onClick={this.props.goToStep}
      >
        <CapabilitiesSelection {...this.props}/>
        <Wizard.Button type={'next'} onClick={goToNextStep}/>
      </Wizard.Step>
    );
  }
}

export default CapabilitiesStep;
