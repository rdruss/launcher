import * as React from 'react';

import * as Patternfly from 'patternfly-react';
import SectionLoader from '../../../../components/loader/SectionLoader';
import Capability from '../../../models/Capability';
import { FetchedData } from '../../../states';

interface CapabilityCardProps {
  capability: Capability;
  onSelect: (capability: Capability) => void;
  onUnselect: (capability: Capability) => void;
  selected: boolean;
}

function CapabilityCard(props: CapabilityCardProps) {
  const {capability, onSelect, onUnselect, selected} = props;
  const doOnSelect = () => selected ? onUnselect(capability) : onSelect(capability);
  return (
    <Patternfly.ListViewItem
      onClick={doOnSelect}
      checkboxInput={(<input type="checkbox" checked={selected} value={capability.module} readOnly/>)}
      heading={capability.name}
      description={capability.description}
    />
  );
}

interface CapabilitiesSelectorProps {
  capabilitiesData: FetchedData<Capability[]>;
  selectedCapabilities: Set<Capability>;
  onSelect: (capability: Capability) => void;
  onUnselect: (capability: Capability) => void;
}

function CapabilitiesSelection(props: CapabilitiesSelectorProps) {
  const {capabilitiesData, onSelect, selectedCapabilities, onUnselect } = props;
  return (
    <div className={'capabilities-selector'}>
      <SectionLoader loading={capabilitiesData.loading} error={capabilitiesData.error}>
        <p>Here you can choose a set of capabilities for your new application/service.</p>
        <Patternfly.ListView>
          {
            capabilitiesData.data.map((cap, i) => (
              <CapabilityCard
                key={i}
                capability={cap}
                onSelect={onSelect}
                onUnselect={onUnselect}
                selected={selectedCapabilities.has(cap)}
              />
            ))
          }
        </Patternfly.ListView>
      </SectionLoader>
    </div>
  );
}

export default CapabilitiesSelection;
