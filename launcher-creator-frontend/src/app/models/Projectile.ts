export interface Projectile {
  name?: string;
  runtime?: string;
  capabilities?: Array<{ module: string; }>;
  clusterId?: string;
  projectName?: string;
  gitOrganization?: string;
  gitRepository?: string;
  deploymentLink?: string;
  repositoryLink?: string;
}

