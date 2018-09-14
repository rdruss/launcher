import * as React from 'react';
import { Component } from 'react';
import Wizard from '../../../../components/wizard';
import { TITLE_REGEXP, WizardStepId } from '../../../states';

interface TitleStepProps {
  onTitleChange: (title: string) => void
  title: string;
  valid: boolean;
  current: boolean;
  locked: boolean;
  goToStep: (step?: string) => void;
}

interface TitleStepState {
  title: string;
  valid: boolean;
}

class TitleStep extends Component<TitleStepProps, TitleStepState> {

  constructor(props) {
    super(props);

    this.state = {
      title: this.props.title || '',
      valid: this.isTitleValid(this.props.title),
    };
  }

  public render() {
    const goToCurrentStep = () => this.props.goToStep(WizardStepId.TITLE_STEP);
    return (
      <Wizard.Step
        title={'Title'}
        summary={`➡️ Your future application will be named «${this.props.title}»`}
        current={this.props.current}
        complete={this.props.valid}
        onClick={goToCurrentStep}
      >
        <p>
          <input type="text" value={this.state.title} onChange={this.onTitleChange}/>
        </p>
        <Wizard.Button type={'next'} title={'Let\'s select Language and Runtime'} onClick={this.goToNextStep} disabled={!this.state.valid}/>
      </Wizard.Step>
    );
  }

  private goToNextStep = () => {
    this.props.onTitleChange(this.state.title);
    this.props.goToStep(WizardStepId.RUNTIME_STEP)
  }

  private onTitleChange = (e) => {
    const newTitle =  e.target.value;
    this.setState({ title: newTitle, valid: this.isTitleValid(newTitle) });
  }

  private isTitleValid(title: string): boolean {
    return title && TITLE_REGEXP.test(title);
  }
}

export default TitleStep;