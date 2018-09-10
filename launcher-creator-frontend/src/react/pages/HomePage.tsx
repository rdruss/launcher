import * as React from 'react';

import MainLayoutContainer from '../components/layout/MainLayoutContainer';
import Lizard from '../components/lizard/Lizard';
import LizardStep from '../components/lizard/LizardStep';
import LizardButton from '../components/lizard/LizardButton';
import CapabilitiesStepContainer from '../components/capabilities/CapabilitiesStepContainer';

class HomePage extends React.Component<{}, {}> {

  constructor(props) {
    super(props);
  }

  public render() {
    return (
        <MainLayoutContainer>
          <Lizard>
            <LizardStep title={'Language & Runtime'} summary={'➡️ Your future application will use Java Vert.x'} complete>
              Please select you language and runtime.
            </LizardStep>
            <LizardStep title={'Capabilities'} current>
              <CapabilitiesStepContainer />
              <LizardButton type={'next'} />
            </LizardStep>
            <LizardStep title={'Summary'}>
              Here is a summary of your future application. Launch!
            </LizardStep>
            <LizardStep title={'What\'s next...'} locked>
              Now that your application has been set up, here is what you can do...
            </LizardStep>
          </Lizard>
        </MainLayoutContainer>
    );
  }
}

export default HomePage;
