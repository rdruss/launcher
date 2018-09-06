import * as React from 'react';

import * as Patternfly from 'patternfly-react';

export const CapabilitiesSelector = ({ capability, onSelect }) => {
  const doOnSelect = () => onSelect(capability.id);
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

export const CapabilitiesList = ({ capabilities, select }) => (
  <Patternfly.CardGrid>
    <Patternfly.Row style={{ marginBottom: '20px', marginTop: '20px' }}>
      {
        capabilities.map((cap, i) => (
          <CapabilitiesSelector key={i} capability={cap} onSelect={select} />)
        )
      }
    </Patternfly.Row>
  </Patternfly.CardGrid>
);

