import * as React from 'react';

import * as Patternfly from 'patternfly-react';

export const CapabilitiesSelector = (capability) => (
  <Patternfly.CardGrid>
    <Patternfly.Row style={{ marginBottom: '20px', marginTop: '20px' }}>
      <Patternfly.Col xs={12} md={5}>
        <Patternfly.Card>
          <Patternfly.CardBody>
            Some general information about this capability.
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            Odio facilisis mauris sit amet massa vitae tortor.
          </Patternfly.CardBody>
          <Patternfly.CardFooter>
            <Patternfly.Button>
            <Patternfly.Icon type="pf" name="add-circle-o" /> Add Capability
            </Patternfly.Button>
          </Patternfly.CardFooter>
        </Patternfly.Card>
      </Patternfly.Col>
    </Patternfly.Row>
  </Patternfly.CardGrid>
);