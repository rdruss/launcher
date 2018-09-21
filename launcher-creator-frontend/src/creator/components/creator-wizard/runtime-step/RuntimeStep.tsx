import * as React from 'react';

import './RuntimeStep.css';
import Wizard from '../../../../components/wizard';
import Runtime from '../../../models/Runtime';
import { WizardStepId } from '../../../states/WizardState';
import { StepProps } from '../StepProps';
import ListSingleSelection from '../../../../components/selection/ListSingleSelection';

interface RuntimeStepProps extends StepProps {
  runtimes: Runtime[];
  selectedRuntime?: Runtime;
  fetchRuntimes: () => {};
  onSelect: (runtime: Runtime) => void;
  loading: boolean;
}

class RuntimeStep extends React.Component<RuntimeStepProps, {}> {

  public componentDidMount() {
    this.props.fetchRuntimes();
  }

  public render() {
    const { current, locked, valid, selectedRuntime, runtimes, loading, onSelect } = this.props;
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
        <ListSingleSelection  items={runtimes} loading={loading} onSelect={onSelect} selectedItem={selectedRuntime}>
          Here you can choose a runtime for a specific programming language
        </ListSingleSelection>
        <Wizard.Button type={'next'} title={'Let\'s select capabilities'} disabled={!valid} onClick={goToNextStep}/>
      </Wizard.Step>
    );
  }
}

export default RuntimeStep;
