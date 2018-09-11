import * as React from 'react';
import classNames from 'classnames';


interface LizardStepProps {
  title: string;
  complete?: boolean;
  summary?:string;
  current?:boolean;
  locked?: boolean;
  children?: React.ReactNode;
}

const LizardStep: React.StatelessComponent<LizardStepProps>
  = ({ title, complete = false, summary, current = false, locked = false, children }) => (
      <li className={classNames({'complete': complete, current, locked})}>
        <a href="#">{title}
          {(complete || locked) && (
            <i className={classNames('ico fa', { 'fa-check ico-green': complete, 'fa-lock ico-muted': locked})} />
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

export default LizardStep;