import * as React from 'react';

import MainLayoutContainer from '../layout/MainLayoutContainer';
import CreatorWizardContainer from '../../containers/wizard/CreatorWizardContainer';

export default function HomePage() {
  return (
    <MainLayoutContainer>
      <div className="container">
        <h1>Your are creating a new application/service</h1>
        <CreatorWizardContainer/>
      </div>
    </MainLayoutContainer>
  );
}