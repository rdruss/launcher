import * as React from 'react';

import './RuntimeStep.css';
import { Runtime, WizardStepId } from '../../../states';
import Wizard from '../../../../components/wizard';
import RuntimeSelector from './RuntimeSelector';

interface RuntimeStepProps {
  runtimes: Runtime[];
  selectedRuntime?: Runtime;
  valid: boolean;
  current: boolean;
  locked: boolean;
  goToStep: (step?:WizardStepId) => void;
  fetchRuntimes: () => {};
  onSelect: (runtime: Runtime) => void;
  loading: boolean;
}

class RuntimeStep extends React.Component<RuntimeStepProps, {}> {

  public componentDidMount() {
    this.props.fetchRuntimes();
  }

  public render() {
    const { current, locked, valid, selectedRuntime } = this.props;
    const summary = selectedRuntime && `➡️ Your future application will use «${selectedRuntime.name}»`;
    const goToNextStep = () => this.props.goToStep(WizardStepId.CAPABILITIES_STEP);
    return (
      <Wizard.Step
          title={'Language & Runtime'}
          summary={summary}
          current={current}
          locked={locked}
          complete={valid}
          onClick={this.props.goToStep}
      >
        <RuntimeSelector  {...this.props} />
        <Wizard.Button type={'next'} title={'Let\'s select capabilities'} disabled={!valid} onClick={goToNextStep}/>
      </Wizard.Step>
    );
  }
}

export default RuntimeStep;
