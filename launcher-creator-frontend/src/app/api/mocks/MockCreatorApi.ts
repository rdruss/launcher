export interface ZipPayload {
  name: string;
  runtime: string;
  capabilities: [
    { module: string; }
  ];
}

export interface ZipOutput {
  downloadLink: string;
}

export function zip(payload: ZipPayload, { authorizationToken }): Promise<ZipOutput> {
  console.info(`calling zip with projectile: ${JSON.stringify(payload)}`);
  return Promise.resolve({
    downloadLink: `http://mock/result.zip`
  }).then((d) => new Promise<ZipOutput>(resolve => setTimeout(() => resolve(d), 1000)));
}

export interface LaunchPayload {
  name: string;
  runtime: string;
  capabilities: [
    { module: string; }
  ];
  clusterId: string;
  projectName: string;
  gitOrganization: string;
  gitRepository: string;
}

export interface LaunchOutput {
}

export function launch(payload: LaunchPayload, { authorizationToken }): Promise<LaunchOutput> {
  console.info(`calling launch with projectile: ${JSON.stringify(payload)}`);
  return Promise.resolve({
    downloadLink: `http://mock/result.zip`
  }).then((d) => new Promise<LaunchOutput>(resolve => setTimeout(() => resolve(d), 1000)));
}