import * as React from 'react';

import * as Patternfly from 'patternfly-react';
import SectionLoader from '../loader/SectionLoader';

export interface ViewItem {
  id: string;
  name: string;
  description?: string;
  icon?: string;
  item: any;
}

interface ListItemProps {
  selected?: boolean;
  viewItem: ViewItem;
  onSelect: (item: any) => void;
}

function ListItem(props: ListItemProps) {
  const { viewItem, onSelect, selected = false } = props;
  const doOnSelect = () => onSelect(viewItem.item);
  return (
    <Patternfly.ListViewItem
      onClick={doOnSelect}
      checkboxInput={(<input type="radio" checked={selected} value={viewItem.id} readOnly/>)}
      leftContent={(<img className={'runtime-icon'} src={viewItem.icon}/>)}
      heading={viewItem.name}
      description={viewItem.description}
    />
  );
}

interface ListSingleSelectionProps<T> {
  loading: boolean;
  selectedItem?: T;
  items?: T[];
  onSelect: (item: T) => void;
  mapToViewItem?: (item: T) => ViewItem;
  children?: React.ReactNode;
}

function defaultMapToViewItem(item:any): ViewItem {
  return {
    ...item,
    item,
  };
}

function ListSingleSelection<T>(props: ListSingleSelectionProps<T>) {
  const {children, items = [], onSelect, mapToViewItem = defaultMapToViewItem, selectedItem} = props;
  const selectedViewItem: ViewItem | undefined = selectedItem && mapToViewItem(selectedItem);
  return (
    <div className={'runtime-selector'}>
      <SectionLoader loading={props.loading}>
        <p>{children}</p>
        <Patternfly.ListView>
          {
            items.map(mapToViewItem).map((viewItem, i) => (
              <ListItem key={i} viewItem={viewItem} onSelect={onSelect}
                           selected={selectedViewItem && selectedViewItem.id === viewItem.id}/>)
            )
          }
        </Patternfly.ListView>
      </SectionLoader>
    </div>
  );
}

export default ListSingleSelection;

