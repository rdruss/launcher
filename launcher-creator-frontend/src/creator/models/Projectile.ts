export interface Projectile {
  name: string;
  runtime: string;
  capabilities: [
    { module: string; }
  ];
  clusterId?: string;
  projectName?: string;
  gitOrganization?: string;
  gitRepository?: string;
}

