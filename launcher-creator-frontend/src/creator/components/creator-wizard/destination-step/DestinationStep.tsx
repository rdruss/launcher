import * as React from 'react';
import { Component } from 'react';
import Wizard from '../../../../components/wizard';
import { StepProps } from '../StepProps';
import OpenShiftCluster from '../../../models/OpenShiftCluster';

interface DestinationStepProps extends StepProps {
  clusters: OpenShiftCluster[];
  loading: boolean;
  fetchClusters: () => {};
  fetchRepository: () => {};
}

class DestinationStep extends Component<DestinationStepProps> {

  public componentDidMount() {
    this.props.fetchRepository();
    this.props.fetchClusters();
  }

  public render() {
    return (
      <Wizard.Step
        title={'Destination'}
        current={this.props.current}
        complete={this.props.valid}
        onClick={this.props.goToStep}
        locked={this.props.locked}
      >
        <Wizard.Button type={'launch'} title={'GO GO GO !'} disabled={!this.props.valid}/>
      </Wizard.Step>
    );
  }
}

export default DestinationStep;