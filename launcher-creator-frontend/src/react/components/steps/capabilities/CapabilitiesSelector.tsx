import * as React from 'react';

import * as Patternfly from 'patternfly-react';
import { Capability } from '../../../../redux/states/index';

interface CapabilityCardProps {
  capability: Capability;
  onSelect: (capability: Capability) => void;
}

const CapabilityCard = ({ capability, onSelect } : CapabilityCardProps) => {
  const doOnSelect = () => onSelect(capability);
  return (
    <Patternfly.Col xs={12} md={4}>
      <Patternfly.Card>
        <Patternfly.CardBody>
          {capability.description}
        </Patternfly.CardBody>
        <Patternfly.CardFooter>
          <Patternfly.Button onClick={doOnSelect}>
            <Patternfly.Icon type="pf" name="add-circle-o" /> Add Capability
          </Patternfly.Button>
        </Patternfly.CardFooter>
      </Patternfly.Card>
    </Patternfly.Col>
  );
};

interface CapabilitiesSelectorProps {
  capabilities: [Capability];
  onSelect: (capability: Capability) => void;
}

const CapabilitiesSelector = ({ capabilities, onSelect } : CapabilitiesSelectorProps) => (
  <Patternfly.CardGrid>
    <Patternfly.Row style={{ marginBottom: '20px', marginTop: '20px' }}>
      {
        capabilities.map((cap, i) => (
          <CapabilityCard key={i} capability={cap} onSelect={onSelect} />)
        )
      }
    </Patternfly.Row>
  </Patternfly.CardGrid>
);

export default CapabilitiesSelector;
