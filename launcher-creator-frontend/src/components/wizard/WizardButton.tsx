import * as React from 'react';
import * as Patternfly from 'patternfly-react';

interface LizardButtonProps {
  type: 'next' | 'launch';
  title?: string;
  onClick?: () => void;
  disabled?: boolean;
}

const WizardButton: React.StatelessComponent<LizardButtonProps> = ({ type, title, onClick, disabled = false }) => {
  let text = 'Launch';
  let icon = 'check';
  if (type === 'next') {
    text = 'Next';
    icon = 'angle-right';
  }
  if (title) {
    text = title;
  }
  return (
    <Patternfly.Button className={'wizard-button'} onClick={onClick} disabled={disabled}>
      <Patternfly.Icon type="fa" name={icon} /> {text}
    </Patternfly.Button>
  );
}

export default WizardButton;