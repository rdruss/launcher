import * as React from 'react';

import RuntimeSelector from './RuntimeSelector';
import { Runtime } from '../../../../redux/states';
import SectionLoader from '../../layout/SectionLoader';

import './RuntimeStep.css';

interface RuntimeStepProps {
  loading: boolean;
  runtimes: [Runtime];
  fetchRuntimes: () => {}
}

interface RuntimeStepState {
  selectedRuntime?: Runtime;
}

class RuntimeStep extends React.Component<RuntimeStepProps, RuntimeStepState> {

  constructor(props) {
    super(props);
    this.state = {
      selectedRuntime: undefined
    };
  }

  public componentDidMount() {
    this.props.fetchRuntimes();
  }

  public render() {
    return (
      <SectionLoader loading={this.props.loading}>
        <RuntimeSelector runtimes={this.props.runtimes} onSelect={this.onRuntimeSelect} selectedRuntime={this.state.selectedRuntime}/>
      </SectionLoader>
    );
  }

  private onRuntimeSelect = (runtime: Runtime) => {
    this.setState({selectedRuntime: runtime})
  }
}

export default RuntimeStep;
