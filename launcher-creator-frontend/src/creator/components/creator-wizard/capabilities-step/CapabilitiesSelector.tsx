import * as React from 'react';

import * as Patternfly from 'patternfly-react';
import { Capability } from '../../../states';
import SectionLoader from '../../../../components/loader/SectionLoader';
import classNames from 'classnames';

interface CapabilityCardProps {
  capability: Capability;
  onSelect: (capability: Capability) => void;
  selected: boolean;
}

function CapabilityCard(props: CapabilityCardProps) {
  const {capability, onSelect, selected} = props;
  const doOnSelect = () => onSelect(capability);
  return (
    <Patternfly.Col xs={12} md={4}>
      <Patternfly.Card className={classNames({selected})}>
        <Patternfly.CardBody>
          {capability.description}
        </Patternfly.CardBody>
        <Patternfly.CardFooter>
          <Patternfly.Button onClick={doOnSelect}>
            <Patternfly.Icon type="pf" name="add-circle-o"/> Add Capability
          </Patternfly.Button>
        </Patternfly.CardFooter>
      </Patternfly.Card>
    </Patternfly.Col>
  );
}

interface CapabilitiesSelectorProps {
  loading: boolean;
  selectedCapabilities: Set<Capability>;
  capabilities: Capability[];
  onSelect: (capability: Capability) => void;
}

function CapabilitiesSelector(props: CapabilitiesSelectorProps) {
  const {capabilities, onSelect, loading, selectedCapabilities} = props;
  return (
    <div className={'capabilities-selector'}>
      <SectionLoader loading={loading}>
        <p>Here you can choose a set of capabilities for your new application/service.</p>
        <Patternfly.CardGrid>
          <Patternfly.Row style={{marginBottom: '20px', marginTop: '20px'}}>
            {
              capabilities.map((cap, i) => (
                <CapabilityCard key={i} capability={cap} onSelect={onSelect} selected={selectedCapabilities.has(cap)}/>)
              )
            }
          </Patternfly.Row>
        </Patternfly.CardGrid>
      </SectionLoader>
    </div>
  );
}

export default CapabilitiesSelector;
