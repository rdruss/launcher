enum ClusterType {
  PRO = 'pro',
  STARTER = 'starter',
}

export interface Cluster {
  id: string;
  name: string;
  type: ClusterType;
}

export default interface OpenShiftCluster {
  connected: boolean;
  cluster: Cluster;
}
