import { LauncherApi, StatusListener } from '../LauncherApi';


const progressDef = {
  success: [
    {
      statusMessage: 'OPENSHIFT_CREATE',
      data: {
        location: 'https://console.starter-us-east-2.openshift.com/console/projects'
      }
    },
    {statusMessage: 'OPENSHIFT_PIPELINE'},
    {statusMessage: 'GITHUB_WEBHOOK'},
  ],
  error: [
    {
      statusMessage: 'GITHUB_CREATE',
      data: {
        location: 'https://github.com/fabric8-launcher/launcher-backend'
      }
    },
    {statusMessage: 'GITHUB_PUSHED'},
    {
      statusMessage: 'OPENSHIFT_CREATE',
      data: {
        error: 'Failed to create the Openshift application'
      }
    }
  ]
};

export default class MockLauncherApi implements LauncherApi {
  public listenToLaunchStatus = (id: string, listener: StatusListener) => {
    const progress = progressDef[id];
    let i = 0;
    listener.onMessage(progress.map(p => p.statusMessage));
    const interval = setInterval(value => {
        if (i < progress.length) {
          listener.onMessage(progress[i++]);
        } else {
          clearInterval(interval);
          listener.onComplete();
        }
      }, 2500);
  }

}

