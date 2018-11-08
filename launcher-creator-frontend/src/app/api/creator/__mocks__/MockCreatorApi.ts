import { CreatorApi, LaunchOutput, LaunchPayload, ZipOutput, ZipPayload } from '../CreatorApi';

export class MockCreatorApi implements CreatorApi {
  public launch(payload: LaunchPayload, {authorizationToken}: { authorizationToken: any }): Promise<LaunchOutput> {
    console.info(`calling launch with projectile: ${JSON.stringify(payload)}`);
    const output: LaunchOutput = {
      id: `success`,
      events: [
        { 'name': 'GITHUB_CREATE', 'message': 'Creating your new GitHub repository' },
        { 'name': 'GITHUB_PUSHED', 'message': 'Pushing your customized Booster code into the repo' },
        { 'name': 'OPENSHIFT_CREATE', 'message': 'Creating your project on OpenShift Online' },
        { 'name': 'OPENSHIFT_PIPELINE', 'message': 'Setting up your build pipeline' },
        { 'name': 'GITHUB_WEBHOOK', 'message': 'Configuring to trigger builds on Git pushes' }
      ]
    };
    return Promise.resolve(output)
      .then((d) => new Promise<LaunchOutput>(resolve => setTimeout(() => resolve(d), 1000)));
  }

  public zip(payload: ZipPayload, {authorizationToken}: { authorizationToken: any }): Promise<ZipOutput> {
    console.info(`calling zip with projectile: ${JSON.stringify(payload)}`);
    const output: ZipOutput = {
      downloadLink: `http://mock/result.zip`
    };
    return Promise.resolve(output)
      .then((d) => new Promise<ZipOutput>(resolve => setTimeout(() => resolve(d), 1000)));
  }
}