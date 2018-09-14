import * as React from 'react';
import './Wizard.css';
import WizardButton from './WizardButton';
import WizardStep from './WizardStep';

class Wizard extends React.Component {
    public static Button = WizardButton;
    public static Step = WizardStep;

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