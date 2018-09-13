import * as React from 'react';

import './RuntimeStep.css';
import RuntimeSelectorContainer from './RuntimeSelectorContainer';
import { Runtime } from '../../../states';
import Wizard from '../../../../components/wizard';

interface RuntimeStepProps {
  selectedRuntime?: Runtime;
  valid: boolean;
  current: boolean;
  locked: boolean;
  goToNextStep: () => void;
}

class RuntimeStep extends React.Component<RuntimeStepProps, {}> {

  constructor(props) {
    super(props);
  }

  public render() {
    const summary = this.props.selectedRuntime && `➡️ Your future application will use «${this.props.selectedRuntime.name}»`;
    return (
      <Wizard.Step
          title={'Language & Runtime'}
          summary={summary}
          current={this.props.current}
          locked={this.props.locked}
          complete={this.props.valid}
      >
        <RuntimeSelectorContainer />
        <Wizard.Button type={'next'} title={'Let\'s select capabilities'} disabled={!this.props.valid} onClick={this.props.goToNextStep}/>
      </Wizard.Step>
    );
  }
}

export default RuntimeStep;
