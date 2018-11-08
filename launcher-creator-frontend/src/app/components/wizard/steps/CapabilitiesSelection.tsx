import * as React from 'react';

import * as Patternfly from 'patternfly-react';
import { FetchedData } from '@app/models/FetchedData';
import Capability from '@app/models/Capability';
import SectionLoader from '@shared/components/loader/SectionLoader';

interface CapabilityCardProps {
  capability: Capability;
  selected: boolean;
  onSelect(capability: Capability): void;
  onUnselect(capability: Capability): void;
}

function CapabilityCard(props: CapabilityCardProps) {
  const {capability, onSelect, onUnselect, selected} = props;
  const doOnSelect = () => {
    if (selected) {
      onUnselect(capability);
    } else {

      onSelect(capability);
    }
  };
  return (
    <Patternfly.ListViewItem
      onClick={doOnSelect}
      checkboxInput={(<input type="checkbox" checked={selected} value={capability.module} readOnly/>)}
      heading={capability.name}
      leftContent={capability.icon && (<img src={capability.icon} />)}
      description={capability.description}
    />
  );
}

interface CapabilitiesSelectorProps {
  capabilitiesData: FetchedData<Capability[]>;
  selectedCapabilities: Set<Capability>;
  onSelect(capability: Capability): void;
  onUnselect(capability: Capability): void;
  reload(): void;
}

function CapabilitiesSelection(props: CapabilitiesSelectorProps) {
  const {capabilitiesData, onSelect, selectedCapabilities, onUnselect } = props;
  return (
    <div className={'capabilities-selector'}>
      <SectionLoader loading={capabilitiesData.loading} error={capabilitiesData.error} reload={props.reload}>
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
