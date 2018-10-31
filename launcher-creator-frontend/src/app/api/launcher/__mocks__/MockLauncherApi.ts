import { Subject, timer } from 'rxjs';
import { LauncherApi, StatusMessage } from '../LauncherApi';


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
  public listenToLaunchStatus(id: string): Subject<StatusMessage> {
    const progress = progressDef[id];
    const progressSubject = new Subject();
    let i = 0;
    progressSubject.next(progress.map(p => p.statusMessage));
    timer(0, 2500)
      .subscribe(value => {
        if (i < progress.length) {
          progressSubject.next(progress[i++]);
        } else {
          progressSubject.complete();
        }
      });
    return progressSubject;
  }

}

