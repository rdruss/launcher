import IdAndName from '@app/models/IdAndName';

export default interface Capability {
  module: string;
  name: string;
  description: string;
  icon?: string;
  props: Array<{ id: string; values?: IdAndName[]}>;
}