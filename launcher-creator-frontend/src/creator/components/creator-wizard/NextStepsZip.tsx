import * as React from 'react';
import * as Patternfly from 'patternfly-react';


interface NextStepsZipProps {
  show: boolean;
  error?: boolean;
  downloadLink?: string;
}

class NextStepsZip extends React.Component<NextStepsZipProps, {}> {
  public render(){
    return (
      <Patternfly.Modal show={this.props.show} >
        <Patternfly.Modal.Header><Patternfly.Modal.Title>Next steps...</Patternfly.Modal.Title></Patternfly.Modal.Header>
        <Patternfly.Modal.Body>
          {!this.props.error && this.props.downloadLink && (
            <React.Fragment>
              <Patternfly.Alert type="success">Your Application is Ready</Patternfly.Alert>
              <p>
              You’re ready to start working. Your new application contains a sample codebase to get you started,
                as well as a README.md file that contains instructions on how to run and interact with your application.
              </p>
              <Patternfly.Button component="a" href={this.props.downloadLink}>
                <Patternfly.Icon type="pf" name={'pficon-save'} /> Download as a ZIP
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

export default NextStepsZip;