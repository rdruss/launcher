import * as React from 'react';
import Wizard from '../../../../shared/components/wizard/index';
import CapabilitiesSelection from './CapabilitiesSelection';
import Capability from '../../../models/Capability';
import { StepProps } from '../StepProps';
import Runtime from '../../../models/Runtime';
import { FetchedData } from '../../../models/FetchedData';

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
    const {context, capabilitiesData, updateStepContext} = this.props;
    const onSelect = (capability: Capability) => {
      const capabilities = new Set(this.props.context.capabilities);
      capabilities.add(capability);
      updateStepContext({completed: capabilities.size > 0, context: {capabilities}});
    };
    const onUnSelect = (capability: Capability) => {
      const capabilities = new Set(this.props.context.capabilities);
      capabilities.delete(capability);
      updateStepContext({completed: capabilities.size > 0, context: {capabilities}});
    };
    const submitOpenShift = () => this.props.submit('openshift');
    const submitZip = () => this.props.submit('zip');
    return (
      <Wizard.Step
        title={'Capabilities'}
        summary={`➡️ Your future application will feature «${Array.from(context.capabilities).map(c => c.name).join(', ')}»`}
        onClick={this.props.select}
        {...this.props.status}
      >
        <CapabilitiesSelection
          capabilitiesData={capabilitiesData}
          onSelect={onSelect}
          onUnselect={onUnSelect}
          selectedCapabilities={context.capabilities}
        />
        <Wizard.StepFooter>
          {!this.props.showZipButton && (
            <Wizard.Button
              type={'next'}
              onClick={submitOpenShift}
              disabled={!this.props.status.completed}
            />
          )}
          {this.props.showZipButton && (
            <React.Fragment>
              <Wizard.Button
                type={'next'}
                title="Deploy this app on OpenShift"
                onClick={submitOpenShift}
                disabled={!this.props.status.completed}
              />
              <br/>
              <Wizard.Button
                type={'alternate'}
                title="Download this app as a ZIP"
                onClick={submitZip}
                disabled={!this.props.status.completed}
              />
            </React.Fragment>
          )}
        </Wizard.StepFooter>
      </Wizard.Step>
    );
  }
}

export default CapabilitiesStep;
