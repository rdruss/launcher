import * as React from 'react';
import * as Patternfly from 'patternfly-react';
import SectionLoader from '../../../../components/loader/SectionLoader';


interface ProcessingAppProps {
  show: boolean;
}

class ProcessingApp extends React.Component<ProcessingAppProps, {}> {
  public render(){
    return (
      <Patternfly.Modal show={this.props.show} >
        <Patternfly.Modal.Header>
          <Patternfly.Modal.Title>Your application is getting created...</Patternfly.Modal.Title>
        </Patternfly.Modal.Header>
        <Patternfly.Modal.Body>
          <SectionLoader loading={true} />
        </Patternfly.Modal.Body>
      </Patternfly.Modal>
    );
  }
}

export default ProcessingApp;