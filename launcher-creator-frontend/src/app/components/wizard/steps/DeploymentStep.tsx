import * as React from 'react';
import { Component } from 'react';

import Wizard from '@shared/components/wizard';
import { StepProps } from '@shared/smart-components/smart-wizard/StepProps';
import OpenShiftCluster from '@app/models/OpenShiftCluster';
import SectionLoader from '@shared/components/loader/SectionLoader';
import { FetchedData } from '@app/models/FetchedData';
import { Select, SelectOption } from '@patternfly/react-core';
import { AuthorizationWarning } from '../../AuthorizationWarning';


export interface DeploymentStepContext {
  cluster?: OpenShiftCluster;
}

export interface DeploymentStepProps extends StepProps<DeploymentStepContext> {
  clustersData: FetchedData<OpenShiftCluster[]>;
  authentication: {
    authenticationEnabled: boolean;
    openAccountManagement(): void;
  };
  fetchClusters(): void;
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
    const submit = () => this.props.submit('launch');
    return (
      <Wizard.Step
        title={'OpenShift Deployment'}
        summary={`➡️ Your future application will built/deployed by «${context.cluster && context.cluster.name}»`}
        onClick={this.props.select}
        {...this.props.status}
      >
        <SectionLoader loading={clustersData.loading} error={clustersData.error} reload={this.props.fetchClusters}>
          {clustersData.data.length > 0 && (
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
          )}
          {clustersData.data.length === 0 && (
            <AuthorizationWarning {...this.props.authentication}
                                  name="OpenShift cluster"
                                  retry={this.props.fetchClusters}/>
          )}
        </SectionLoader>
        <Wizard.StepFooter>
          <Wizard.Button type={'launch'} title={'GO GO GO !'} onClick={submit} disabled={!this.props.status.completed}/>
        </Wizard.StepFooter>
      </Wizard.Step>
    );
  }

  public onClusterChange = (clusterId) => {
    const cluster = this.props.clustersData.data.find(c => c.id === clusterId);
    this.props.updateStepContext({context: {cluster}, completed: true});
  };
}

export default DeploymentStep;