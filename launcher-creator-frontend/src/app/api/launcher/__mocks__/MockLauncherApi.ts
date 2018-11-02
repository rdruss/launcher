import { LauncherApi, StatusListener } from '../LauncherApi';


const progressDef = {
  success: [
    {
      statusMessage: 'GITHUB_CREATE',
      data: {
        location: 'https://github.com/fabric8-launcher/launcher-backend'
      }
    },
    {statusMessage: 'GITHUB_PUSHED'},
    {
      statusMessage: 'OPENSHIFT_CREATE'
    },
    {
      statusMessage: 'OPENSHIFT_CREATE',
      data: {
        location: 'https://console.starter-us-east-2.openshift.com/console/projects'
      }
    },
    {statusMessage: 'OPENSHIFT_PIPELINE'},
    {statusMessage: 'GITHUB_WEBHOOK'},
  ],
};

export default class MockLauncherApi implements LauncherApi {
  public listenToLaunchStatus = (id: string, events: Array<{ name: string }>, listener: StatusListener) => {
    const progress = progressDef[id];
    if (!progress) {
      throw new Error(`invalid id ${id}`);
    }
    let i = 0;
    const interval = setInterval(value => {
      if (i < progress.length) {
        listener.onMessage(progress[i++]);
      } else {
        clearInterval(interval);
        listener.onComplete();
      }
    }, 2500);
  };

}

