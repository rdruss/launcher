import * as React from 'react';

import './RuntimeStep.css';
import Wizard from '../../../../shared/components/wizard';
import Runtime from '../../../models/Runtime';
import { StepProps } from '../StepProps';
import ListSingleSelection from '../../../../shared/components/selection/ListSingleSelection';
import SectionLoader from '../../../../shared/components/loader/SectionLoader';
import { FetchedData } from '../../../models/FetchedData';

export interface RuntimeStepContext {
  runtime?: Runtime;
}

interface RuntimeStepProps extends StepProps<RuntimeStepContext> {
  runtimesData: FetchedData<Runtime[]>;
  fetchRuntimes: () => {};
}

class RuntimeStep extends React.Component<RuntimeStepProps, {}> {
  public static defaultProps = {
    context: {},
  };

  public componentDidMount() {
    this.props.fetchRuntimes();
  }

  public render() {
    const {context, runtimesData, updateStepContext} = this.props;
    const summary = context.runtime && `➡️ Your future application will use «${context.runtime.name}»`;
    const onSelect = (runtime: Runtime) => updateStepContext({completed: true, context: {runtime}});
    return (
      <Wizard.Step
        title={'Language & Runtime'}
        summary={summary}
        onClick={this.props.select}
        {...this.props.status}
      >
        <SectionLoader loading={runtimesData.loading} error={runtimesData.error}>
          <ListSingleSelection items={runtimesData.data} onSelect={onSelect} selectedItem={context.runtime}>
            Here you can choose a runtime for a specific programming language
          </ListSingleSelection>
        </SectionLoader>
        <Wizard.StepFooter>
          <Wizard.Button type={'next'} disabled={!this.props.status.completed} onClick={this.props.submit}/>
        </Wizard.StepFooter>
      </Wizard.Step>
    );
  }
}

export default RuntimeStep;
