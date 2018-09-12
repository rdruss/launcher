import * as React from 'react';
import './Lizard.css';
import LizardButton from './LizardButton';
import LizardStep from './LizardStep';

class Lizard extends React.Component {
    public static Button = LizardButton;
    public static Step = LizardStep;

    public render() {
        return (
          <div className="lizard">
            <ul>
              {this.props.children}
            </ul>
          </div>
        );
    }
}

export default Lizard;