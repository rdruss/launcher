import IdAndName from './IdAndName';

export default interface Capability {
  module: string;
  name: string;
  description: string;
  icon?: string;
  props: {
    runtime?: {
      values: [IdAndName];
    }
  };
}