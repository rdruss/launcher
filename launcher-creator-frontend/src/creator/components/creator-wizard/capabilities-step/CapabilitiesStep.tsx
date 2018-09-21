import * as React from 'react';
import Wizard from '../../../../components/wizard';
import CapabilitiesSelection from './CapabilitiesSelection';
import Capability from '../../../models/Capability';
import { StepProps } from '../StepProps';
import { WizardStepId } from '../../../states/WizardState';
import { ApiCollection } from '../../../states';

interface CapabilitiesStepProps extends StepProps {
  capabilityCollection: ApiCollection<Capability>;
  selectedCapabilities: Set<Capability>;
  onSelect: (capability: Capability) => void;
  onUnselect: (capability: Capability) => void;
  fetchCapabilities: () => {};
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
    const goToNextStep = () => this.props.goToStep(WizardStepId.DEPLOYMENT_STEP);
    return (
      <Wizard.Step
        title={'Capabilities'}
        summary={`➡️ Your future application will feature «${Array.from(selectedCapabilities).map(c => c.name).join(', ')}»`}
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
