import * as React from 'react';
import { Component } from 'react';
import Wizard from '../../../../components/wizard';
import { WizardStepId } from '../../../states/WizardState';
import { StepProps } from '../StepProps';

const NAME_REGEXP = new RegExp('^[a-z][a-z0-9-.]{3,63}$');

interface NameStepContext {
  title?: string;
}

interface NameStepState {
  title: string;
  valid: boolean;
}

class NameStep extends Component<StepProps<NameStepContext>, NameStepState> {
  public static defaultProps = {
    stepId: WizardStepId.NAME_STEP,
    context: { title: '' },
  };

  constructor(props) {
    super(props);
    const title = this.props.context.title || '';
    this.state = {
      title,
      valid: this.isTitleValid(title),
    };
  }

  public render() {
    return (
      <Wizard.Step
        title={'Application name'}
        summary={`➡️ Your future application will be named «${this.props.context.title}»`}
        current={this.props.current}
        complete={this.props.valid}
        onClick={this.props.goToStep}
      >
        <p>
          <input type="text" value={this.state.title} onChange={this.onTitleChange}/>
        </p>
        <Wizard.Button type={'next'} title={'Let\'s select Language and Runtime'} onClick={this.goToNextStep} disabled={!this.state.valid}/>
      </Wizard.Step>
    );
  }

  private goToNextStep = () => {
    this.props.updateStepContext({context: { title: this.state.title }, valid: this.state.valid });
    this.props.goToStep(WizardStepId.RUNTIME_STEP)
  }

  private onTitleChange = (e) => {
    const newTitle =  e.target.value;
    this.setState({ title: newTitle, valid: this.isTitleValid(newTitle) });
  }

  private isTitleValid(title: string): boolean {
    return NAME_REGEXP.test(title);
  }
}

export default NameStep;