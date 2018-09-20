import IdAndName from './IdAndName';

export default interface Capability {
  module: string;
  name: string;
  description: string;
  props: {
    runtime?: {
      values: [IdAndName];
    }
  };
}