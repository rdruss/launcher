import * as React from 'react';
import { Component } from 'react';
import Wizard from '../../../../components/wizard';
import { StepProps } from '../StepProps';
import OpenShiftCluster  from '../../../models/OpenShiftCluster';
import ListSingleSelection from '../../../../components/selection/ListSingleSelection';

interface DeploymentStepProps extends StepProps {
  clusters: OpenShiftCluster[];
  loading: boolean;
  fetchClusters: () => {};
  fetchRepository: () => {};
  selectedCluster?: OpenShiftCluster;
  onSelectCluster: (cluster: OpenShiftCluster) => void;
}

class DeploymentStep extends Component<DeploymentStepProps> {

  public componentDidMount() {
    this.props.fetchRepository();
    this.props.fetchClusters();
  }

  public render() {
    const { clusters, loading, onSelectCluster, selectedCluster } = this.props;
    return (
      <Wizard.Step
        title={'OpenShift Deployment'}
        current={this.props.current}
        complete={this.props.valid}
        onClick={this.props.goToStep}
        locked={this.props.locked}
      >
        <ListSingleSelection  items={clusters} loading={loading} onSelect={onSelectCluster} selectedItem={selectedCluster}>
          Here you can choose a destination OpenShift cluster. It will be in charge of building and serving your new Application.
        </ListSingleSelection>
        <Wizard.Button type={'launch'} title={'GO GO GO !'} disabled={!this.props.valid}/>
      </Wizard.Step>
    );
  }
}

export default DeploymentStep;