import * as React from 'react';

import MainLayoutContainer from '../components/layout/MainLayoutContainer';
import Lizard from '../components/lizard/Lizard';
import LizardStep from '../components/lizard/LizardStep';
import LizardButton from '../components/lizard/LizardButton';
import CapabilitiesStepContainer from '../components/steps/capabilities/CapabilitiesStepContainer';
import RuntimeStepContainer from '../components/steps/runtime/RuntimeStepContainer';

class HomePage extends React.Component<{}, {}> {

  constructor(props) {
    super(props);
  }

  public render() {
    return (
        <MainLayoutContainer>
          <div className="container">
            <h1>Your are creating a new application/service</h1>
            <Lizard>
              <LizardStep title={'Title'} summary={'➡️ Your future application will be named «an-awesome-service»'} complete>
                <RuntimeStepContainer />
                <LizardButton type={'next'} title={'Let\'s select capabilities'} />
              </LizardStep>
              <LizardStep title={'Language & Runtime'} summary={'➡️ Your future application will use Java Vert.x'} current>
                <RuntimeStepContainer />
                <LizardButton type={'next'} title={'Let\'s select capabilities'} />
              </LizardStep>
              <LizardStep title={'Capabilities'} locked>
                <CapabilitiesStepContainer />
                <LizardButton type={'next'} />
              </LizardStep>
              <LizardStep title={'Source Repository'} locked>
                <CapabilitiesStepContainer />
                <LizardButton type={'next'} />
              </LizardStep>
              <LizardStep title={'What\'s next...'} locked>
                Now that your application has been set up, here is what you can do...
              </LizardStep>
            </Lizard>
          </div>
        </MainLayoutContainer>
    );
  }
}

export default HomePage;
