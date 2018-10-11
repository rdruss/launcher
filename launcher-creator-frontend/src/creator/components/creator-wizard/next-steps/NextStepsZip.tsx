import * as React from 'react';
import { Alert, Button, Modal } from '@patternfly/react-core';
import { DownloadIcon } from '@patternfly/react-icons';

interface NextStepsZipProps {
  isOpen: boolean;
  error?: boolean;
  downloadLink?: string;
  onClose?: () => {};
  children?: React.ReactNode;
}

class NextStepsZip extends React.Component<NextStepsZipProps, {}> {
  public render(){
    return (
      <Modal title="Next steps..." isOpen={this.props.isOpen} onClose={this.props.onClose} actions={this.props.children} isLarge>
        {!this.props.error && (
          <React.Fragment>
            <Alert variant="success">Your Application is Ready</Alert>
            <h2>Download your application</h2>
            <p>
              You are ready to start working.
            </p>
            <Button component="a" variant="link" href={this.props.downloadLink} target={'_blank'}>
              <DownloadIcon /> Download .zip
            </Button>
            <h2>Deploy it on OpenShift</h2>
            <p>
              Your new application contains a tool to help you deploy your new application on OpenShift.
              You can find instructions in the README.md.
            </p>
            <h2>As soon as deployment is done, go checkout your new application capabilities</h2>
            <p>We prepared a set of examples to let you directly start playing with your new application.
              Those examples are there to get you started,
              soon it will be time for you to remove them and start developing your awesome application.</p>
          </React.Fragment>
        )}
        {this.props.error && (
          <Alert variant="danger">
            Holy guacamole... something weird happened, please reload the page to try again.
          </Alert>
        )}
      </Modal>
    );
  }
}

export default NextStepsZip;