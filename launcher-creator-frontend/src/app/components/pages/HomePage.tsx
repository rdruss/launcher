import * as React from 'react';

import MainLayoutContainer from '../layout/MainLayoutContainer';
import CreatorWizardContainer from '../../redux/containers/creator-wizard/CreatorWizardContainer';

export default function HomePage() {
  return (
    <MainLayoutContainer>
      <div className="container">
        <h1>You are creating a new application</h1>
        <CreatorWizardContainer/>
      </div>
    </MainLayoutContainer>
  );
}