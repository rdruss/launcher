import * as React from 'react';
import * as Patternfly from 'patternfly-react';


interface NextStepsOpenShiftProps {
  show: boolean;
  error?: boolean;
  landingPageLink?: string;
}

class NextStepsOpenShift extends React.Component<NextStepsOpenShiftProps, {}> {
  public render(){
    const landingPageLink = this.props.landingPageLink || 'https://fabric8-launcher.github.io/application-creator-landingpage/';
    return (
      <Patternfly.Modal show={this.props.show} >
        <Patternfly.Modal.Header><Patternfly.Modal.Title>Next steps...</Patternfly.Modal.Title></Patternfly.Modal.Header>
        <Patternfly.Modal.Body>
          {!this.props.error && (
            <React.Fragment>
              <Patternfly.Alert type="success">Your Application deployment has started</Patternfly.Alert>
              <h4>Go checkout your new application capabilities</h4>
              <p>We prepared a set of examples to let you directly start playing with your new application.
                Those examples are there to get you started,
                soon it will be time for you to remove them and start developing your awesome application.</p>
              <Patternfly.Button component="a" href={landingPageLink}>
                <Patternfly.Icon type="fa" name={'star'} /> Checkout your new Application
              </Patternfly.Button>
              <h4>Update your application using Continuous Delivery</h4>
              <p>We set up your application codebase in the GitHub repository you requested</p>
              <p>Your application is automatically configured to build and deploy on OpenShift with new commits.</p>
              <Patternfly.Button component="a" href={landingPageLink}>
                <Patternfly.Icon type="fa" name={'edit'} /> Go clone you new codebase
              </Patternfly.Button>
            </React.Fragment>
          )}
          {this.props.error && (
            <Patternfly.Alert type="error">
              Holy guacamole... something weird happened, please reload the page to try again.
            </Patternfly.Alert>
          )}
        </Patternfly.Modal.Body>
      </Patternfly.Modal>
    );
  }
}

export default NextStepsOpenShift;