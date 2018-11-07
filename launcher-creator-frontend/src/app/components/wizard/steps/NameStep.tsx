import * as React from 'react';
import { Component } from 'react';
import Wizard from '../../../../shared/components/wizard';
import { StepProps } from '../../../../shared/smart-components/smart-wizard/StepProps';
import { TextInput } from '@patternfly/react-core';
import * as _ from 'lodash';

const NAME_REGEXP = new RegExp('^[a-z][a-z0-9-.]{3,63}$');

export interface NameStepContext {
  name?: string;
}

interface NameStepState {
  name: string;
  completed: boolean;
}

class NameStep extends Component<StepProps<NameStepContext>, NameStepState> {
  public static defaultProps = {
    context: { name: '' },
  };

  private updateStepContext = _.throttle((payload) => {
    this.props.updateStepContext(payload);
  }, 300);

  constructor(props) {
    super(props);
    const name = this.props.context.name || '';
    this.state = {
      name,
      completed: this.isNameValid(name),
    };
  }

  public componentDidUpdate(prevProps: StepProps<NameStepContext>, prevState: NameStepState) {
    if (prevProps.context.name !== this.props.context.name) {
      this.setNameInState(this.props.context.name);
    }
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
                     onChange={this.onNameChange}
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
    this.props.submit();
  }

  private onNameChange = (name) => {
    this.updateStepContext({context: { name }, completed: this.isNameValid(name) });
    this.setNameInState(name);
  }

  private setNameInState = (name) => {
    this.setState({ name, completed: this.isNameValid(name)});
  }

  private isNameValid(name: string): boolean {
    return NAME_REGEXP.test(name);
  }
}

export default NameStep;