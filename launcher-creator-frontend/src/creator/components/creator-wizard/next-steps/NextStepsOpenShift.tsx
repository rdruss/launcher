import * as React from 'react';
import * as Patternfly from 'patternfly-react';


interface NextStepsOpenShiftProps {
  show: boolean;
  error?: boolean;
  landingPageLink?: string;
  repositoryLink?: string;
  deploymentLink?: string;
}

class NextStepsOpenShift extends React.Component<NextStepsOpenShiftProps, {}> {
  public render(){
    const landingPageLink = this.props.landingPageLink || 'https://fabric8-launcher.github.io/application-creator-landingpage/';
    const repositoryLink = this.props.repositoryLink || 'https://github.com/fabric8-launcher/launcher-creator-frontend';
    const deploymentLink = this.props.deploymentLink || 'https://manage.openshift.com/';
    return (
      <Patternfly.Modal show={this.props.show} >
        <Patternfly.Modal.Header><Patternfly.Modal.Title>Next steps...</Patternfly.Modal.Title></Patternfly.Modal.Header>
        <Patternfly.Modal.Body>
          {!this.props.error && (
            <React.Fragment>
              <Patternfly.Alert type="success">We are delivering your new Application</Patternfly.Alert>
              <h3>Openshift Console</h3>
              <p>You can follow your application deployment in your OpenShift Console</p>
              <Patternfly.Button component="a" href={deploymentLink} target={'_blank'}>
                <Patternfly.Icon type="fa" name={'cubes'} /> OpenShift Console
              </Patternfly.Button>
              <h3>As soon as deployment is done, go checkout your new application capabilities</h3>
              <p>We prepared a set of examples to let you directly start playing with your new application.
                Those examples are there to get you started,
                soon it will be time for you to remove them and start developing your awesome application.</p>
              <Patternfly.Button component="a" href={landingPageLink} target={'_blank'}>
                <Patternfly.Icon type="pf" name={'applications'} /> Checkout your new Application
              </Patternfly.Button>
              <h3>Update your application using Continuous Delivery</h3>
              <p>We set up your application codebase in the GitHub repository you requested</p>
              <p>Your application is automatically configured to build and deploy on OpenShift with new commits.</p>
              <Patternfly.Button component="a" href={repositoryLink} target={'_blank'}>
                <Patternfly.Icon type="pf" name={'repository'} /> Go clone you new codebase
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