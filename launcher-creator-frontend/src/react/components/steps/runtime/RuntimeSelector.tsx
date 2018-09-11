import * as React from 'react';

import * as Patternfly from 'patternfly-react';
import { Runtime } from '../../../../redux/states';

interface RuntimeCardProps {
  selected: boolean;
  runtime: Runtime;
  onSelect: (runtime: Runtime) => void;
}

const RuntimeCard: React.StatelessComponent<RuntimeCardProps> = ({runtime, onSelect, selected}) => {
  const doOnSelect = () => onSelect(runtime);
  return (
    <Patternfly.ListViewItem
      onClick={doOnSelect}
      checkboxInput={(<input type="radio" checked={selected}/>)}
      leftContent={(<img className={'runtime-icon'} src={runtime.icon}/>)}
      heading={runtime.name}
      description={runtime.description}
    />

  );
};

interface RuntimeSelectorProps {
  selectedRuntime?: Runtime;
  runtimes: [Runtime];
  onSelect: (runtime: Runtime) => void;
}

const RuntimeSelector: React.StatelessComponent<RuntimeSelectorProps> = ({runtimes, onSelect, selectedRuntime}) => (
  <div className={'runtime-selector'}>
    <p>Here you can choose a runtime for a specific programming language.</p>
    <Patternfly.ListView>
      {
        runtimes.map((runtime, i) => (
          <RuntimeCard key={i} runtime={runtime} onSelect={onSelect} selected={selectedRuntime && selectedRuntime.id === runtime.id}/>)
        )
      }
    </Patternfly.ListView>
  </div>
);

export default RuntimeSelector;

