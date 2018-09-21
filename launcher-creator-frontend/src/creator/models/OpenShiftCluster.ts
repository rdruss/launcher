enum ClusterType {
  PRO = 'pro',
  STARTER = 'starter',
}

export default interface OpenShiftCluster {
  id: string;
  name: string;
  type: ClusterType;
  connected: boolean;
}
