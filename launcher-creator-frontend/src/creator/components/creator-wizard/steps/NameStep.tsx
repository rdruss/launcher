import * as React from 'react';
import { Component } from 'react';
import Wizard from '../../../../components/wizard/index';
import { StepProps } from '../StepProps';
import { TextInput } from '@patternfly/react-core';

const NAME_REGEXP = new RegExp('^[a-z][a-z0-9-.]{3,63}$');

interface NameStepContext {
  name?: string;
}

interface NameStepState {
  name: string;
  completed: boolean;
}

class NameStep extends Component<StepProps<NameStepContext>, NameStepState> {
  public static defaultProps = {
    context: {name: ''},
  };

  constructor(props) {
    super(props);
    const name = this.props.context.name || '';
    this.state = {
      name,
      completed: this.isNameValid(name),
    };
  }

  public render() {
    return (
      <Wizard.Step
        title={'Application name'}
        summary={`➡️ Your future application will be named «${this.props.context.name}»`}
        onClick={this.props.select}
        {...this.props.status}
      >
        <p>
          <TextInput value={this.state.name}
                     onChange={this.onTitleChange}
                     isValid={this.state.name.length === 0 || this.state.completed}
                     aria-label="application-name"
          />
        </p>
        <Wizard.StepFooter>
          <Wizard.Button type={'next'} onClick={this.goToNextStep} disabled={!this.state.completed}/>
        </Wizard.StepFooter>
      </Wizard.Step>
    );
  }

  private goToNextStep = () => {
    this.props.updateStepContext({context: {name: this.state.name}, completed: this.state.completed});
    this.props.submit();
  }

  private onTitleChange = (newTitle) => {
    this.setState({name: newTitle, completed: this.isNameValid(newTitle)});
  }

  private isNameValid(name: string): boolean {
    return NAME_REGEXP.test(name);
  }
}

export default NameStep;