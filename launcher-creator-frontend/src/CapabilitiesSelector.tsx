import * as React from 'react';

import * as Patternfly from 'patternfly-react';

export const CapabilitiesList = ({ capabilities }) => (
  <Patternfly.CardGrid>
    <Patternfly.Row style={{ marginBottom: '20px', marginTop: '20px' }}>
      {
        capabilities.map((cap, i) => (
          <CapabilitiesSelector key={i} capability={cap} />)
        )
      }
    </Patternfly.Row>
  </Patternfly.CardGrid>

)

export const CapabilitiesSelector = ({ capability }) => (
  <Patternfly.Col xs={12} md={4}>
    <Patternfly.Card>
      <Patternfly.CardBody>
        {capability.description}
      </Patternfly.CardBody>
      <Patternfly.CardFooter>
        <Patternfly.Button>
          <Patternfly.Icon type="pf" name="add-circle-o" /> Add Capability
        </Patternfly.Button>
      </Patternfly.CardFooter>
    </Patternfly.Card>
  </Patternfly.Col>
);