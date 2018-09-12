import * as React from 'react';

import * as Patternfly from 'patternfly-react';
import { Runtime } from '../../../states';
import SectionLoader from '../../../../components/loader/SectionLoader';

interface RuntimeCardProps {
  selected?: boolean;
  runtime: Runtime;
  onSelect: (runtime: Runtime) => void;
}

const RuntimeCard: React.StatelessComponent<RuntimeCardProps> = ({runtime, onSelect, selected = false}) => {
  const doOnSelect = () => onSelect(runtime);
  return (
    <Patternfly.ListViewItem
      onClick={doOnSelect}
      checkboxInput={(<input type="radio" checked={selected} value={runtime.id}/>)}
      leftContent={(<img className={'runtime-icon'} src={runtime.icon}/>)}
      heading={runtime.name}
      description={runtime.description}
    />
  );
};

interface RuntimeSelectorProps {
  loading: boolean;
  selectedRuntime?: Runtime;
  runtimes: Runtime[];
  fetchRuntimes: () => {};
  onSelect: (runtime: Runtime) => void;
}

class RuntimeSelector extends React.Component<RuntimeSelectorProps> {

  public componentDidMount() {
    this.props.fetchRuntimes();
  }

  public render() {
    const {runtimes, onSelect, selectedRuntime} = this.props;
    return (
      <div className={'runtime-selector'}>
        <SectionLoader loading={this.props.loading}>
          <p>Here you can choose a runtime for a specific programming language.</p>
          <Patternfly.ListView>
            {
              runtimes && runtimes.map((runtime, i) => (
                <RuntimeCard key={i} runtime={runtime} onSelect={onSelect}
                             selected={selectedRuntime && selectedRuntime.id === runtime.id}/>)
              )
            }
          </Patternfly.ListView>
        </SectionLoader>
      </div>
    );
  }
}

export default RuntimeSelector;

