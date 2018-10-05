import * as React from 'react';
import classNames from 'classnames';
import { Component } from 'react';


interface LizardStepProps {
  title: string;
  completed?: boolean;
  summary?:string;
  selected?:boolean;
  locked?: boolean;
  children?: React.ReactNode;
  onClick?: () => void;
}

class WizardStep extends Component<LizardStepProps> {
  public static defaultProps = {completed: false, selected: false, locked: false};

  public render() {
    const {title, completed, summary, selected, locked, onClick, children} = this.props;
    const linkOnClick = locked || !onClick ? () => {} : () => onClick();
    return (
      <li className={classNames({'completed': completed, selected, locked})}>
        <a href="#" onClick={linkOnClick}>{title}
          {(completed || locked) && (
            <i className={classNames('ico fa', {'fa-check ico-green': completed, 'fa-lock ico-muted': locked})}/>
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

export default WizardStep;