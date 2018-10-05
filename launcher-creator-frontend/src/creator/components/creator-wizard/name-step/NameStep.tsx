import * as React from 'react';
import { Component } from 'react';
import Wizard from '../../../../components/wizard';
import { StepProps } from '../StepProps';

const NAME_REGEXP = new RegExp('^[a-z][a-z0-9-.]{3,63}$');

interface NameStepContext {
  name?: string;
}

interface NameStepState {
  name: string;
  valid: boolean;
}

class NameStep extends Component<StepProps<NameStepContext>, NameStepState> {
  public static defaultProps = {
    context: { name: '' },
  };

  constructor(props) {
    super(props);
    const name = this.props.context.name || '';
    this.state = {
      name,
      valid: this.isNameValid(name),
    };
  }

  public render() {
    return (
      <Wizard.Step
        title={'Application name'}
        summary={`➡️ Your future application will be named «${this.props.context.name}»`}
        selected={this.props.current}
        completed={this.props.valid}
        onClick={this.props.select}
      >
        <p>
          <input type="text" value={this.state.name} onChange={this.onTitleChange}/>
        </p>
        <Wizard.Button type={'next'} onClick={this.goToNextStep} disabled={!this.state.valid}/>
      </Wizard.Step>
    );
  }

  private goToNextStep = () => {
    this.props.updateStepContext({context: { name: this.state.name }, valid: this.state.valid });
    this.props.submit();
  }

  private onTitleChange = (e) => {
    const newTitle =  e.target.value;
    this.setState({ name: newTitle, valid: this.isNameValid(newTitle) });
  }

  private isNameValid(name: string): boolean {
    return NAME_REGEXP.test(name);
  }
}

export default NameStep;