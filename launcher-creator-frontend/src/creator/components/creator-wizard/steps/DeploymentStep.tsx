import * as React from 'react';
import { Component } from 'react';

import Wizard from '../../../../components/wizard/index';
import { StepProps } from '../StepProps';
import OpenShiftCluster from '../../../models/OpenShiftCluster';
import SectionLoader from '../../../../components/loader/SectionLoader';
import { FetchedData } from '../../../models/FetchedData';
import { Select, SelectOption } from '@patternfly/react-core';


export interface DeploymentStepContext {
  cluster?: OpenShiftCluster;
}

export interface DeploymentStepProps extends StepProps<DeploymentStepContext> {
  clustersData: FetchedData<OpenShiftCluster[]>;
  fetchClusters: () => {};
}

class DeploymentStep extends Component<DeploymentStepProps> {

  public static defaultProps = {
    context: {}
  };

  public componentDidMount() {
    this.props.fetchClusters();
  }

  public componentDidUpdate() {
    if (this.props.status.selected && !this.props.context.cluster && this.props.clustersData.data.length > 0) {
      this.onClusterChange(this.props.clustersData.data[0].id);
    }
  }

  public render() {
    const {clustersData, context} = this.props;
    const selected = context.cluster ? context.cluster.id : undefined;
    const noop = () => {
    };
    return (
      <Wizard.Step
        title={'OpenShift Deployment'}
        summary={`➡️ Your future application will built/deployed by «${context.cluster && context.cluster.name}»`}
        onClick={this.props.select}
        {...this.props.status}
      >
        <SectionLoader loading={clustersData.loading} error={clustersData.error}>
          <Select
            onChange={this.onClusterChange}
            onBlur={noop}
            onFocus={noop}
            value={selected}
            aria-label="select-cluster"
          >
            {clustersData.data.map((option, index) => (
              <SelectOption key={index} value={option.id} label={option.name}/>
            ))}
          </Select>
        </SectionLoader>
        <Wizard.StepFooter>
          <Wizard.Button type={'launch'} title={'GO GO GO !'} onClick={this.props.submit} disabled={!this.props.status.completed}/>
        </Wizard.StepFooter>
      </Wizard.Step>
    );
  }

  public onClusterChange = (clusterId) => {
    const cluster = this.props.clustersData.data.find(c => c.id === clusterId);
    this.props.updateStepContext({context: {cluster}, completed: true});
  }
}

export default DeploymentStep;