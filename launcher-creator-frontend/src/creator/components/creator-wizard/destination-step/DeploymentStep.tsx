import * as React from 'react';
import { Component } from 'react';
import * as Patternfly from 'patternfly-react';

import Wizard from '../../../../components/wizard';
import { StepProps } from '../StepProps';
import OpenShiftCluster from '../../../models/OpenShiftCluster';
import { FetchedData } from '../../../states';
import SectionLoader from '../../../../components/loader/SectionLoader';
import { WizardStepId } from '../../../states/WizardState';


export interface DeploymentStepContext {
  cluster?: OpenShiftCluster;
}

export interface DeploymentStepProps extends StepProps<DeploymentStepContext> {
  clustersData: FetchedData<OpenShiftCluster[]>;
  fetchClusters: () => {};
}

class DeploymentStep extends Component<DeploymentStepProps> {

  public static defaultProps = {
    stepId: WizardStepId.DEPLOYMENT_STEP,
    context: {},
  };

  public componentDidMount() {
    this.props.fetchClusters();
  }

  public componentDidUpdate() {
    if (this.props.current && !this.props.context.cluster && this.props.clustersData.data.length > 0) {
      this.onClusterChange([this.props.clustersData.data[0]]);
    }
  }

  public render() {
    const { clustersData, context } = this.props;
    const selected = context.cluster ? [context.cluster] : [];
    return (
      <Wizard.Step
        title={'OpenShift Deployment'}
        summary={`➡️ Your future application will built/deployed by «${context.cluster && context.cluster.name}»`}
        current={this.props.current}
        complete={this.props.valid}
        onClick={this.props.goToStep}
        locked={this.props.locked}
      >
        <SectionLoader loading={clustersData.loading} error={clustersData.error}>
          <Patternfly.TypeAheadSelect
            options={clustersData.data}
            labelKey={'name'}
            onChange={this.onClusterChange}
            selected={selected}
          />
        </SectionLoader>
        <Wizard.Button type={'launch'} title={'GO GO GO !'} disabled={!this.props.valid}/>
      </Wizard.Step>
    );
  }

  public onClusterChange = ([cluster]: OpenShiftCluster[]) => {
    this.props.updateStepContext({ context: { cluster }, valid: true });
  }
}

export default DeploymentStep;