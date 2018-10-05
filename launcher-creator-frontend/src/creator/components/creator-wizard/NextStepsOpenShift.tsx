import * as React from 'react';
import * as Patternfly from 'patternfly-react';


interface NextStepsOpenShiftProps {
  show: boolean;
}

class NextStepsOpenShift extends React.Component<NextStepsOpenShiftProps, {}> {
  public render(){
    return (
      <Patternfly.Modal show={this.props.show} >
        <Patternfly.Modal.Header><Patternfly.Modal.Title>Next steps...</Patternfly.Modal.Title></Patternfly.Modal.Header>
        <Patternfly.Modal.Body>
          blah blah blah
        </Patternfly.Modal.Body>
      </Patternfly.Modal>
    );
  }
}

export default NextStepsOpenShift;