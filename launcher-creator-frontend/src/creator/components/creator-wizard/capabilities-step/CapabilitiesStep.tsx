import * as React from 'react';
import Wizard from '../../../../components/wizard';
import CapabilitiesSelection from './CapabilitiesSelection';
import Capability from '../../../models/Capability';
import { StepProps } from '../StepProps';
import { FetchedData } from '../../../states';
import Runtime from '../../../models/Runtime';

export interface CapabilitiesStepContext {
  capabilities: Set<Capability>;
}

interface CapabilitiesStepProps extends StepProps<CapabilitiesStepContext> {
  capabilitiesData: FetchedData<Capability[]>;
  fetchCapabilities: () => {};
  selectedRuntime?: Runtime;
  showZipButton: boolean;
}

class CapabilitiesStep extends React.Component<CapabilitiesStepProps, { CapabilitiesStepState }> {

  public static defaultProps = {
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
    const { context, capabilitiesData, updateStepContext } = this.props;
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
    const submitOpenShift = () => this.props.submit('openshift');
    const submitZip = () => this.props.submit('zip');
    return (
      <Wizard.Step
        title={'Capabilities'}
        summary={`➡️ Your future application will feature «${Array.from(context.capabilities).map(c => c.name).join(', ')}»`}
        selected={this.props.current}
        locked={this.props.locked}
        completed={this.props.valid}
        onClick={this.props.select}
      >
        <CapabilitiesSelection
          capabilitiesData={capabilitiesData}
          onSelect={onSelect}
          onUnselect={onUnSelect}
          selectedCapabilities={context.capabilities}
        />
        <Wizard.Button type={'next'} title="Deploy this app on OpenShift" onClick={submitOpenShift} disabled={!this.props.valid}/>
        {this.props.showZipButton && (
          <Wizard.Button type={'launch'} title="Download this app as a ZIP" onClick={submitZip} disabled={!this.props.valid}/>
        )}
      </Wizard.Step>
    );
  }
}

export default CapabilitiesStep;
