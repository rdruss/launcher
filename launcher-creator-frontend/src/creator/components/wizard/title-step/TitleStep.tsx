import * as React from 'react';
import { Component } from 'react';
import Lizard from '../../../../components/lizard';

interface TitleStepProps {
  onTitleChange: (title: string) => void
  title: string;
  valid: boolean;
  current: boolean;
  locked: boolean;
  goToNextStep: () => void;
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
    return (
      <Lizard.Step
        title={'Title'}
        summary={`➡️ Your future application will be named «${this.props.title}»`}
        current={this.props.current}
        complete={this.props.valid}
      >
        <p>
          <input type="text" value={this.state.title} onChange={this.onTitleChange}/>
        </p>
        <Lizard.Button type={'next'} title={'Let\'s select Language and Runtime'} onClick={this.gotoNextStep} disabled={!this.state.valid}/>
      </Lizard.Step>
    );
  }

  private gotoNextStep = () => {
    this.props.onTitleChange(this.state.title);
    this.props.goToNextStep();
  }

  private onTitleChange = (e) => {
    const newTitle =  e.target.value;
    this.setState({ title: newTitle, valid: this.isTitleValid(newTitle) });
  }

  private isTitleValid(title: string): boolean {
    return title && title.length > 3;
  }
}

export default TitleStep;