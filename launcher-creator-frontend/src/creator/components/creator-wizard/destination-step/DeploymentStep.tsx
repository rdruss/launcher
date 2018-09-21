import * as React from 'react';
import { Component } from 'react';
import Wizard from '../../../../components/wizard';
import { StepProps } from '../StepProps';
import OpenShiftCluster from '../../../models/OpenShiftCluster';
import ListSingleSelection from '../../../../components/selection/ListSingleSelection';
import { ApiCollection } from '../../../states';
import SectionLoader from '../../../../components/loader/SectionLoader';

interface DeploymentStepProps extends StepProps {
  clusterCollection: ApiCollection<OpenShiftCluster>;
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
    const { clusterCollection, onSelectCluster, selectedCluster } = this.props;
    return (
      <Wizard.Step
        title={'OpenShift Deployment'}
        current={this.props.current}
        complete={this.props.valid}
        onClick={this.props.goToStep}
        locked={this.props.locked}
      >
        <SectionLoader loading={clusterCollection.loading} error={clusterCollection.error}>
          <ListSingleSelection  items={clusterCollection.collection}  onSelect={onSelectCluster} selectedItem={selectedCluster}>
            Here you can choose a destination OpenShift cluster. It will be in charge of building and serving your new Application.
          </ListSingleSelection>
        </SectionLoader>

        <Wizard.Button type={'launch'} title={'GO GO GO !'} disabled={!this.props.valid}/>
      </Wizard.Step>
    );
  }
}

export default DeploymentStep;