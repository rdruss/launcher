import * as React from 'react';
import Wizard from '../../../../components/wizard';
import CapabilitiesSelection from './CapabilitiesSelection';
import Capability from '../../../models/Capability';
import { StepProps } from '../StepProps';
import { WizardStepId } from '../../../states/WizardState';
import { FetchedData } from '../../../states';
import Runtime from '../../../models/Runtime';

export interface CapabilitiesStepContext {
  capabilities: Set<Capability>;
}

interface CapabilitiesStepProps extends StepProps<CapabilitiesStepContext> {
  capabilitiesData: FetchedData<Capability[]>;
  fetchCapabilities: () => {};
  selectedRuntime?: Runtime;
}

class CapabilitiesStep extends React.Component<CapabilitiesStepProps, { CapabilitiesStepState }> {

  public static defaultProps = {
    stepId: WizardStepId.CAPABILITIES_STEP,
    context: {
      capabilities: new Set(),
    },
  };

  constructor(props) {
    super(props);
  }

  public componentDidMount() {
    this.props.fetchCapabilities();
  }

  public render() {
    const { current, locked, valid, context, capabilitiesData, updateStepContext } = this.props;
    const goToNextStep = () => this.props.goToStep(WizardStepId.REPOSITORY_STEP);
    const onSelect = (capability:Capability) => {
      const capabilities = new Set(this.props.context.capabilities);
      capabilities.add(capability);
      updateStepContext({ valid: true, context: { capabilities }});
    };
    const onUnSelect = (capability:Capability) => {
      const capabilities = new Set(this.props.context.capabilities);
      capabilities.delete(capability);
      updateStepContext({ valid: true, context: { capabilities }});
    };
    return (
      <Wizard.Step
        title={'Capabilities'}
        summary={`➡️ Your future application will feature «${Array.from(context.capabilities).map(c => c.name).join(', ')}»`}
        current={current}
        locked={locked}
        complete={valid}
        onClick={this.props.goToStep}
      >
        <CapabilitiesSelection
          capabilitiesData={capabilitiesData}
          onSelect={onSelect}
          onUnselect={onUnSelect}
          selectedCapabilities={context.capabilities}
        />
        <Wizard.Button type={'next'} onClick={goToNextStep}/>
      </Wizard.Step>
    );
  }
}

export default CapabilitiesStep;
