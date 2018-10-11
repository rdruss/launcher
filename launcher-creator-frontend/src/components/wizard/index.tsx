import * as React from 'react';
import { Component } from 'react';
import './Wizard.css';
import classNames from 'classnames';
import { Button, ButtonVariant } from '@patternfly/react-core';
import { ArrowAltCircleRightIcon, CheckIcon } from '@patternfly/react-icons';

const WizardStepFooter: React.StatelessComponent<{children?: React.ReactNode}> = (props) => (
  <div className="wizard-step-footer">
    {props.children}
  </div>
);

interface WizardButtonProps {
  type: 'next' | 'launch' | 'alternate';
  title?: string;
  onClick?: () => void;
  disabled?: boolean;
}

const WizardButton: React.StatelessComponent<WizardButtonProps> = ({ type, title, onClick, disabled = false }) => {
  let text = 'Launch';
  let variant: any = type === 'launch' ? ButtonVariant.primary : ButtonVariant.link;
  if (type === 'next') {
    text = 'Next';
    variant = ButtonVariant.secondary;
  }
  if (title) {
    text = title;
  }
  return (
    <Button className={'wizard-button'} onClick={onClick} isDisabled={disabled} variant={variant}>
      {type === 'next' ? <ArrowAltCircleRightIcon /> : <CheckIcon />} {text}
    </Button>
  );
}

interface WizardStepProps {
  title: string;
  completed?: boolean;
  summary?:string;
  selected?:boolean;
  locked?: boolean;
  children?: React.ReactNode;
  onClick?: () => void;
}

class WizardStep extends Component<WizardStepProps> {
  public static defaultProps = {completed: false, selected: false, locked: false};

  public render() {
    const {title, completed, summary, selected, locked, onClick, children} = this.props;
    const linkOnClick = locked || !onClick ? () => {} : () => onClick();
    const completedAndNotLocked = !locked && completed;
    return (
      <li className={classNames({'completed': completedAndNotLocked, selected, locked})}>
        <a href="#" onClick={linkOnClick}>{title}
          {(completedAndNotLocked || locked) && (
            <i className={classNames('ico fa', {'fa-check ico-green': completedAndNotLocked, 'fa-lock ico-muted': locked})}/>
          )}
        </a>
        {!locked && completed && !selected && summary && (
          <span className="summary">{summary}</span>
        )}
        {!locked && selected && (
          <span className="content">{children}</span>
        )}
      </li>
    );
  }
}

class Wizard extends React.Component {
    public static Button = WizardButton;
    public static Step = WizardStep;
    public static StepFooter = WizardStepFooter;

    public render() {
        return (
          <div className="wizard">
            <ul>
              {this.props.children}
            </ul>
          </div>
        );
    }
}

export default Wizard;