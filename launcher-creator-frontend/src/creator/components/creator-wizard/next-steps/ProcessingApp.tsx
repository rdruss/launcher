import * as React from 'react';
import { Modal } from '@patternfly/react-core';
import SectionLoader from '../../../../components/loader/SectionLoader';


interface ProcessingAppProps {
  isOpen: boolean;
  onClose?: () => {};
}

class ProcessingApp extends React.Component<ProcessingAppProps, {}> {
  public render(){
    return (
      <Modal isOpen={this.props.isOpen} onClose={this.props.onClose} title="Your application is getting created.." isLarge>
        <SectionLoader loading={true} />
      </Modal>
    );
  }
}

export default ProcessingApp;