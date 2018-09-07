import * as React from 'react';
import classNames from 'classnames';


interface LizardStepProps {
  title: string;
  complete?:boolean;
  current?:boolean;
  locked?: boolean;
  children?: React.ReactNode;
}

const LizardStep: React.StatelessComponent<LizardStepProps>  = ({ title, complete = false, current = false, locked = false, children }) => (
      <li className={classNames({complete, current, locked})}>
        <a href="#">{title}
        {(complete || locked) && (
          <i className={classNames('ico fa', { 'fa-check ico-green': complete, 'fa-lock ico-muted': locked})} />
        )}
        {current && (
          <span className="content">{children}</span>
        )}
        </a>
      </li>
);

export default LizardStep;