import * as React from 'react';
import classNames from 'classnames';
import { Component } from 'react';


interface LizardStepProps {
  title: string;
  complete?: boolean;
  summary?:string;
  current?:boolean;
  locked?: boolean;
  children?: React.ReactNode;
  onClick?: () => void;
}

class WizardStep extends Component<LizardStepProps> {
  public static defaultProps = {complete: false, current: false, locked: false};

  public render() {
    const {title, complete, summary, current, locked, onClick, children} = this.props;
    const linkOnClick = locked || !onClick ? () => {} : () => onClick();
    return (
      <li className={classNames({'complete': complete, current, locked})}>
        <a href="#" onClick={linkOnClick}>{title}
          {(complete || locked) && (
            <i className={classNames('ico fa', {'fa-check ico-green': complete, 'fa-lock ico-muted': locked})}/>
          )}
        </a>
        {!current && summary && (
          <span className="summary">{summary}</span>
        )}
        {current && (
          <span className="content">{children}</span>
        )}
      </li>
    );
  }
}

export default WizardStep;