import * as React from 'react';
import { Component } from 'react';
import Wizard from '../../../../components/wizard';
import { TITLE_REGEXP, WizardStepId } from '../../../states/WizardState';

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
  public static defaultProps = {
    title: ''
  };

  constructor(props) {
    super(props);
    const title = this.props.title || '';
    this.state = {
      title,
      valid: this.isTitleValid(title),
    };
  }

  public render() {
    return (
      <Wizard.Step
        title={'Title'}
        summary={`➡️ Your future application will be named «${this.props.title}»`}
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
    this.props.onTitleChange(this.state.title);
    this.props.goToStep(WizardStepId.RUNTIME_STEP)
  }

  private onTitleChange = (e) => {
    const newTitle =  e.target.value;
    this.setState({ title: newTitle, valid: this.isTitleValid(newTitle) });
  }

  private isTitleValid(title: string): boolean {
    return TITLE_REGEXP.test(title);
  }
}

export default TitleStep;