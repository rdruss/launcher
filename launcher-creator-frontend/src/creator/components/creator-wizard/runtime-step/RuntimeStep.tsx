import * as React from 'react';

import './RuntimeStep.css';
import Wizard from '../../../../components/wizard';
import Runtime from '../../../models/Runtime';
import { WizardStepId } from '../../../states/WizardState';
import { StepProps } from '../StepProps';
import ListSingleSelection from '../../../../components/selection/ListSingleSelection';
import SectionLoader from '../../../../components/loader/SectionLoader';
import { FetchedData } from '../../../states';

interface RuntimeStepProps extends StepProps {
  runtimesData: FetchedData<Runtime[]>;
  selectedRuntime?: Runtime;
  fetchRuntimes: () => {};
  onSelect: (runtime: Runtime) => void;
}

class RuntimeStep extends React.Component<RuntimeStepProps, {}> {

  public componentDidMount() {
    this.props.fetchRuntimes();
  }

  public render() {
    const { current, locked, valid, selectedRuntime, runtimesData, onSelect } = this.props;
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
        <SectionLoader loading={runtimesData.loading} error={runtimesData.error}>
          <ListSingleSelection items={runtimesData.data} onSelect={onSelect} selectedItem={selectedRuntime}>
            Here you can choose a runtime for a specific programming language
          </ListSingleSelection>
        </SectionLoader>
        <Wizard.Button type={'next'} title={'Let\'s select capabilities'} disabled={!valid} onClick={goToNextStep}/>
      </Wizard.Step>
    );
  }
}

export default RuntimeStep;
