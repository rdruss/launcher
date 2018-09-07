import * as React from 'react';
import * as Patternfly from 'patternfly-react';

interface LizardButtonProps {
  type: 'next' | 'launch';
  children?: React.ReactNode;
}

const LizardButton: React.StatelessComponent<LizardButtonProps> = ({ type, children }) => {
  let text = 'Launch';
  let icon = 'check';
  if(type === 'next') {
    text = 'Next';
    icon = 'angle-right';
  }
  return (
    <Patternfly.Button className={'lizard-button'}>
      <Patternfly.Icon type="fa" name={icon} /> {text}
    </Patternfly.Button>
  );
}

export default LizardButton;