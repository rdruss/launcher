import { Injectable } from '@angular/core';
import { Headers, Http, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs';

import { TargetEnvironment, TargetEnvironmentService, HelperService, TokenProvider, Cluster } from 'ngx-forge';

@Injectable()
export class AppLauncherTargetEnvironmentService implements TargetEnvironmentService {
  private END_POINT: string = '';
  private API_BASE: string = 'services/openshift/clusters';
  private ORIGIN: string = '';

  constructor(
    private http: Http,
    private helperService: HelperService,
    private tokenProvider: TokenProvider
  ) {
    if (this.helperService) {
      this.END_POINT = this.helperService.getBackendUrl();
      this.ORIGIN = this.helperService.getOrigin();
    }
  }

  private get options(): Observable<RequestOptions> {
    let headers = new Headers();
    headers.append('X-App', this.ORIGIN);
    headers.append('X-Git-Provider', 'GitHub');
    headers.append('X-Execution-Step-Index', '0');
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    return Observable.fromPromise(this.tokenProvider.token.then((token) => {
      headers.append('Authorization', 'Bearer ' + token);
      return new RequestOptions({
        headers: headers
      });
    }));
  }

  private getClusters(): Observable<Cluster[]> {
    const endPoint: string = this.END_POINT + this.API_BASE;
    return this.options.flatMap((option) => {
      return this.http.get(endPoint, option)
                  .map(response => response.json() as Cluster[])
                  .catch(this.handleError);
    });
  }

  private handleError(error: Response | any) {
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return Observable.throw(errMsg);
  }

  /**
   * Returns target environments
   *
   * @returns {Observable<TargetEnvironment>} The target environments
   */
  getTargetEnvironments(): Observable<TargetEnvironment[]> {
    return this.getClusters().map(clusters => [{
      description: 'Here is a brief description of what OpenShift is. ' +
        'There is a distinction between what OpenShift does compared to OpenShift.io.',
      benefits: [
        'In your GitHub namespace, create repository containg your project\'s code.',
        'Configure OpenShift to build and deploy your code on each push to your repository\'s master branch.',
        'Here is a benefit of using OpenShift as a project environment.'
      ],
      footer: 'OpenShift',
      header: 'Code Locally, Build and Deploy',
      /* tslint:disable */
      icon: 'data:image/svg+xml,%3C%3Fxml%20version%3D%221.0%22%20encoding%3D%22UTF-8%22%3F%3E%0A%3Csvg%20width%3D%22205px%22%20height%3D%2253px%22%20data-name%3D%22Layer%201%22%20viewBox%3D%220%200%20416.45%20107.11%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%0A%3Cdefs%3E%0A%3Cstyle%3E.cls-1%7Bfill%3A%23a30000%3B%7D.cls-2%7Bfill%3A%23c00%3B%7D.cls-3%7Bfill%3A%23820000%3B%7D%3C/style%3E%0A%3C/defs%3E%0A%3Ctitle%3ELogotype_RH_OpenShift_wLogo_RGB_Black%3C/title%3E%0A%3Cpath%20class%3D%22cls-1%22%20transform%3D%22translate%28-30.95%20-31.27%29%22%20d%3D%22M64.82%2C79.3L46.1%2C86.12A54.41%2C54.41%2C0%2C0%2C0%2C47.58%2C95l17.79-6.48a34.89%2C34.89%2C0%2C0%2C1-.55-9.22%22/%3E%0A%3Cpath%20class%3D%22cls-1%22%20transform%3D%22translate%28-30.95%20-31.27%29%22%20d%3D%22M147.59%2C58.6A53.48%2C53.48%2C0%2C0%2C0%2C143%2C50.84l-18.72%2C6.82a34.81%2C34.81%2C0%2C0%2C1%2C5.5%2C7.41Z%22/%3E%0A%3Cpath%20class%3D%22cls-2%22%20transform%3D%22translate%28-30.95%20-31.27%29%22%20d%3D%22M106.39%2C53.29A34.57%2C34.57%2C0%2C0%2C1%2C116.5%2C60.5l18.73-6.81A53.52%2C53.52%2C0%2C0%2C0%2C38.3%2C89L57%2C82.14a34.7%2C34.7%2C0%2C0%2C1%2C49.36-28.85%22/%3E%0A%3Cpath%20class%3D%22cls-2%22%20transform%3D%22translate%28-30.95%20-31.27%29%22%20d%3D%22M48.75%2C94.57L31%2C101.05a54.22%2C54.22%2C0%2C0%2C0%2C8.36%2C18.13L58%2C112.39a35%2C35%2C0%2C0%2C1-9.26-17.81%22/%3E%0A%3Cpath%20class%3D%22cls-2%22%20transform%3D%22translate%28-30.95%20-31.27%29%22%20d%3D%22M126.36%2C87.51a34.24%2C34.24%2C0%2C0%2C1-3.14%2C12A34.82%2C34.82%2C0%2C0%2C1%2C77%2C116.36a34.46%2C34.46%2C0%2C0%2C1-10.14-7.2L48.15%2C116A53.06%2C53.06%2C0%2C0%2C0%2C69%2C133.37a53.63%2C53.63%2C0%2C0%2C0%2C71.18-25.91A53%2C53%2C0%2C0%2C0%2C145%2C80.71Z%22/%3E%0A%3Cpath%20class%3D%22cls-2%22%20transform%3D%22translate%28-30.95%20-31.27%29%22%20d%3D%22M131%2C64.65l-17.79%2C6.48a34.93%2C34.93%2C0%2C0%2C1%2C4.36%2C19.59l18.69-6.79A54%2C54%2C0%2C0%2C0%2C131%2C64.65%22/%3E%0A%3Cpath%20class%3D%22cls-3%22%20transform%3D%22translate%28-30.95%20-31.27%29%22%20d%3D%22M64.75%2C83.07a34.18%2C34.18%2C0%2C0%2C1%2C.07-3.76L46.1%2C86.12c0.09%2C1.2.25%2C2.39%2C0.43%2C3.58Z%22/%3E%0A%3Cpath%20class%3D%22cls-3%22%20transform%3D%22translate%28-30.95%20-31.27%29%22%20d%3D%22m144.87%2053.67c-0.59-1-1.2-1.9-1.85-2.82l-18.72%206.81a31.55%2031.55%200%200%201%202.3%202.65z%22/%3E%0A%3Cpath%20class%3D%22cls-1%22%20transform%3D%22translate%28-30.95%20-31.27%29%22%20d%3D%22M48.15%2C116a53.29%2C53.29%2C0%2C0%2C0%2C4.76%2C5.78l20.34-7.42a34.41%2C34.41%2C0%2C0%2C1-6.42-5.17ZM145%2C80.71l-18.68%2C6.79a34.25%2C34.25%2C0%2C0%2C1-1.58%2C8l20.34-7.42a53%2C53%2C0%2C0%2C0-.07-7.42%22/%3E%0A%3Cpath%20transform%3D%22translate%28-30.95%20-31.27%29%22%20d%3D%22M182.37%2C74.19l-3.94-8.13h-2.69v8.13H169.2V50.09H180a16%2C16%2C0%2C0%2C1%2C3.84.43%2C8.17%2C8.17%2C0%2C0%2C1%2C3%2C1.36%2C6.08%2C6.08%2C0%2C0%2C1%2C1.91%2C2.43%2C8.86%2C8.86%2C0%2C0%2C1%2C.67%2C3.63%2C7.73%2C7.73%2C0%2C0%2C1-1.17%2C4.44A7.42%2C7.42%2C0%2C0%2C1%2C185%2C65l4.83%2C9.2h-7.49Zm-0.31-17.94a3%2C3%2C0%2C0%2C0-2.27-.72h-4V60.8h3.95a3.27%2C3.27%2C0%2C0%2C0%2C2.35-.69%2C2.69%2C2.69%2C0%2C0%2C0%2C.69-2A2.62%2C2.62%2C0%2C0%2C0%2C182.06%2C56.25Z%22/%3E%0A%3Cpath%20transform%3D%22translate%28-30.95%20-31.27%29%22%20d%3D%22M194.89%2C74.19V50.09h18.46V55.7H201.5v3.24h7.13v5.51H201.5v4.13h12.09v5.61h-18.7Z%22/%3E%0A%3Cpath%20transform%3D%22translate%28-30.95%20-31.27%29%22%20d%3D%22M238.91%2C67.74a8.69%2C8.69%2C0%2C0%2C1-2.48%2C3.75%2C10%2C10%2C0%2C0%2C1-4.08%2C2.07%2C22.27%2C22.27%2C0%2C0%2C1-5.63.64H218.9V50.09h8.44a20.89%2C20.89%2C0%2C0%2C1%2C5.13.59%2C9.35%2C9.35%2C0%2C0%2C1%2C3.91%2C2%2C9.11%2C9.11%2C0%2C0%2C1%2C2.48%2C3.67%2C15.88%2C15.88%2C0%2C0%2C1%2C.88%2C5.68A17.26%2C17.26%2C0%2C0%2C1%2C238.91%2C67.74Zm-6.32-8.49a4.62%2C4.62%2C0%2C0%2C0-.95-2%2C3.85%2C3.85%2C0%2C0%2C0-1.72-1.12%2C8.22%2C8.22%2C0%2C0%2C0-2.62-.36h-1.65V68.48h1.45a9.4%2C9.4%2C0%2C0%2C0%2C2.65-.33%2C4%2C4%2C0%2C0%2C0%2C1.81-1.07%2C4.32%2C4.32%2C0%2C0%2C0%2C1-2%2C12.5%2C12.5%2C0%2C0%2C0%2C.31-3A12.23%2C12.23%2C0%2C0%2C0%2C232.59%2C59.25Z%22/%3E%0A%3Cpath%20transform%3D%22translate%28-30.95%20-31.27%29%22%20d%3D%22m271.52%2074.19v-9.5h-7.52v9.51h-6.8v-24.11h6.8v8.78h7.51v-8.78h6.82v24.1h-6.82z%22/%3E%0A%3Cpath%20transform%3D%22translate%28-30.95%20-31.27%29%22%20d%3D%22M299.83%2C74.19L298.53%2C70h-7.23L290%2C74.19h-7.16l8.75-24.11h6.75l8.75%2C24.11h-7.23Zm-3.37-11.12q-0.31-1.17-.55-2l-0.43-1.55q-0.19-.69-0.33-1.26T294.91%2C57q-0.1.62-.24%2C1.21t-0.33%2C1.27l-0.43%2C1.55-0.55%2C2-0.45%2C1.58h4Z%22/%3E%0A%3Cpath%20transform%3D%22translate%28-30.95%20-31.27%29%22%20d%3D%22M320.71%2C55.91V74.19H314V55.91h-6.75V50.09h20.18v5.82h-6.75Z%22/%3E%0A%3Cpath%20transform%3D%22translate%28-30.95%20-31.27%29%22%20d%3D%22M336.41%2C54.26a3%2C3%2C0%2C0%2C1-1.64%2C1.64%2C3.32%2C3.32%2C0%2C0%2C1-2.46%2C0%2C3%2C3%2C0%2C0%2C1-1.64-1.64%2C3.33%2C3.33%2C0%2C0%2C1%2C0-2.46%2C3%2C3%2C0%2C0%2C1%2C1.64-1.64%2C3.32%2C3.32%2C0%2C0%2C1%2C2.46%2C0%2C3%2C3%2C0%2C0%2C1%2C1.64%2C1.64A3.31%2C3.31%2C0%2C0%2C1%2C336.41%2C54.26ZM335.95%2C52a2.51%2C2.51%2C0%2C0%2C0-1.38-1.38%2C2.79%2C2.79%2C0%2C0%2C0-2.06%2C0A2.52%2C2.52%2C0%2C0%2C0%2C331.13%2C52a2.78%2C2.78%2C0%2C0%2C0%2C0%2C2.06%2C2.53%2C2.53%2C0%2C0%2C0%2C1.38%2C1.38%2C2.79%2C2.79%2C0%2C0%2C0%2C2.06%2C0%2C2.52%2C2.52%2C0%2C0%2C0%2C1.38-1.38A2.78%2C2.78%2C0%2C0%2C0%2C335.95%2C52Zm-1.2%2C1a1%2C1%2C0%2C0%2C1-.53.34l0.7%2C1.37h-0.68l-0.66-1.31h-0.65v1.31h-0.58V51.27h1.48a1.48%2C1.48%2C0%2C0%2C1%2C.42.06%2C1%2C1%2C0%2C0%2C1%2C.35.19%2C0.89%2C0.89%2C0%2C0%2C1%2C.24.32%2C1.08%2C1.08%2C0%2C0%2C1%2C.09.46A1%2C1%2C0%2C0%2C1%2C334.75%2C52.95Zm-0.53-1a0.61%2C0.61%2C0%2C0%2C0-.39-0.12h-0.9v1h0.9a0.63%2C0.63%2C0%2C0%2C0%2C.39-0.12A0.5%2C0.5%2C0%2C0%2C0%2C334.22%2C52Z%22/%3E%0A%3Cpath%20transform%3D%22translate%28-30.95%20-31.27%29%22%20d%3D%22M196.58%2C106.63a18%2C18%2C0%2C0%2C1-3.07%2C5.92%2C14.22%2C14.22%2C0%2C0%2C1-4.78%2C3.87%2C14.3%2C14.3%2C0%2C0%2C1-12.27%2C0%2C13.75%2C13.75%2C0%2C0%2C1-4.73-3.85%2C18%2C18%2C0%2C0%2C1-3-5.89%2C25.17%2C25.17%2C0%2C0%2C1-1.06-7.49%2C24.85%2C24.85%2C0%2C0%2C1%2C1.08-7.52%2C18.29%2C18.29%2C0%2C0%2C1%2C3-5.92%2C14%2C14%2C0%2C0%2C1%2C4.75-3.87%2C14.31%2C14.31%2C0%2C0%2C1%2C12.27%2C0%2C13.78%2C13.78%2C0%2C0%2C1%2C4.73%2C3.85%2C18.37%2C18.37%2C0%2C0%2C1%2C3%2C5.89%2C24.62%2C24.62%2C0%2C0%2C1%2C1.08%2C7.49A24.87%2C24.87%2C0%2C0%2C1%2C196.58%2C106.63ZM192.78%2C93a15.34%2C15.34%2C0%2C0%2C0-2.35-4.75%2C10.53%2C10.53%2C0%2C0%2C0-3.51-3%2C9.3%2C9.3%2C0%2C0%2C0-4.39-1.06%2C9%2C9%2C0%2C0%2C0-4.31%2C1.06%2C10.34%2C10.34%2C0%2C0%2C0-3.44%2C3%2C14.93%2C14.93%2C0%2C0%2C0-2.27%2C4.7%2C21.5%2C21.5%2C0%2C0%2C0-.83%2C6.17%2C20.89%2C20.89%2C0%2C0%2C0%2C.85%2C6.17%2C15.69%2C15.69%2C0%2C0%2C0%2C2.33%2C4.75%2C10.26%2C10.26%2C0%2C0%2C0%2C3.49%2C3%2C9.29%2C9.29%2C0%2C0%2C0%2C4.39%2C1.06%2C9.18%2C9.18%2C0%2C0%2C0%2C4.34-1.06%2C10.24%2C10.24%2C0%2C0%2C0%2C3.46-3%2C15%2C15%2C0%2C0%2C0%2C2.27-4.7%2C21.55%2C21.55%2C0%2C0%2C0%2C.83-6.17A20.9%2C20.9%2C0%2C0%2C0%2C192.78%2C93Z%22/%3E%0A%3Cpath%20transform%3D%22translate%28-30.95%20-31.27%29%22%20d%3D%22M231.32%2C96.66a9.83%2C9.83%2C0%2C0%2C1-2.51%2C3.51%2C10.56%2C10.56%2C0%2C0%2C1-3.87%2C2.14%2C16.26%2C16.26%2C0%2C0%2C1-5%2C.72H211.2v14.21h-4V81.08h13.54a15.46%2C15.46%2C0%2C0%2C1%2C4.57.65%2C10%2C10%2C0%2C0%2C1%2C3.64%2C2%2C9.24%2C9.24%2C0%2C0%2C1%2C2.43%2C3.38A13.26%2C13.26%2C0%2C0%2C1%2C231.32%2C96.66Zm-5.09-10a7.89%2C7.89%2C0%2C0%2C0-5.68-1.89H211.2V99.37H220q8.16%2C0%2C8.16-7.34A7.14%2C7.14%2C0%2C0%2C0%2C226.23%2C86.64Z%22/%3E%0A%3Cpath%20transform%3D%22translate%28-30.95%20-31.27%29%22%20d%3D%22M240.65%2C117.25V81.08H262.5v3.67H244.68V96.12H255v3.67H244.68v13.79h18.6v3.67H240.65Z%22/%3E%0A%3Cpath%20transform%3D%22translate%28-30.95%20-31.27%29%22%20d%3D%22M294.79%2C117.25L279%2C92.5q-0.31-.46-0.67-1.11l-0.72-1.29q-0.36-.65-0.7-1.21a8.51%2C8.51%2C0%2C0%2C1-.49-0.93v29.29h-3.93V81.08h3.93l15.65%2C25.21q0.31%2C0.47.67%2C1.11l0.72%2C1.29q0.36%2C0.65.7%2C1.21a8.45%2C8.45%2C0%2C0%2C1%2C.49.93V81.08h3.93v36.16h-3.82Z%22/%3E%0A%3Cpath%20transform%3D%22translate%28-30.95%20-31.27%29%22%20d%3D%22M331%2C111.72a8.8%2C8.8%2C0%2C0%2C1-2.35%2C3.2%2C11.44%2C11.44%2C0%2C0%2C1-3.77%2C2.12%2C15.33%2C15.33%2C0%2C0%2C1-5.06.78%2C16.35%2C16.35%2C0%2C0%2C1-6.85-1.42%2C17.81%2C17.81%2C0%2C0%2C1-5.29-3.59l2.69-3a18.34%2C18.34%2C0%2C0%2C0%2C4.44%2C3.15%2C11.38%2C11.38%2C0%2C0%2C0%2C5.17%2C1.19%2C9%2C9%2C0%2C0%2C0%2C5.71-1.65%2C5.47%2C5.47%2C0%2C0%2C0%2C2.09-4.55%2C6.07%2C6.07%2C0%2C0%2C0-.41-2.27%2C5.05%2C5.05%2C0%2C0%2C0-1.42-1.91%2C13.42%2C13.42%2C0%2C0%2C0-2.66-1.73%2C33.84%2C33.84%2C0%2C0%2C0-4.13-1.73%2C36%2C36%2C0%2C0%2C1-4.93-2.09%2C13.4%2C13.4%2C0%2C0%2C1-3.2-2.27%2C7.35%2C7.35%2C0%2C0%2C1-1.76-2.71%2C10.15%2C10.15%2C0%2C0%2C1-.54-3.46%2C8.77%2C8.77%2C0%2C0%2C1%2C.83-3.87%2C8.61%2C8.61%2C0%2C0%2C1%2C2.3-2.92%2C10%2C10%2C0%2C0%2C1%2C3.57-1.83%2C16.22%2C16.22%2C0%2C0%2C1%2C4.62-.62%2C16.48%2C16.48%2C0%2C0%2C1%2C6.17%2C1%2C19.49%2C19.49%2C0%2C0%2C1%2C4.83%2C2.84l-2.58%2C3.15a16%2C16%2C0%2C0%2C0-4-2.51%2C12%2C12%2C0%2C0%2C0-4.73-.85%2C10.36%2C10.36%2C0%2C0%2C0-3.2.44%2C6.45%2C6.45%2C0%2C0%2C0-2.2%2C1.16%2C4.31%2C4.31%2C0%2C0%2C0-1.24%2C1.68%2C5.37%2C5.37%2C0%2C0%2C0-.39%2C2%2C6.25%2C6.25%2C0%2C0%2C0%2C.31%2C2%2C4.34%2C4.34%2C0%2C0%2C0%2C1.24%2C1.76A11.19%2C11.19%2C0%2C0%2C0%2C316.93%2C95a43.4%2C43.4%2C0%2C0%2C0%2C4.42%2C1.81%2C38%2C38%2C0%2C0%2C1%2C5%2C2.17%2C12.55%2C12.55%2C0%2C0%2C1%2C3.23%2C2.38%2C7.68%2C7.68%2C0%2C0%2C1%2C1.73%2C2.84%2C11.29%2C11.29%2C0%2C0%2C1%2C.52%2C3.57A9.94%2C9.94%2C0%2C0%2C1%2C331%2C111.72Z%22/%3E%0A%3Cpath%20transform%3D%22translate%28-30.95%20-31.27%29%22%20d%3D%22M363.76%2C117.25v-17h-18v17h-4V81.08h4V96.53h18V81.08h4v36.16h-4Z%22/%3E%0A%3Cpath%20transform%3D%22translate%28-30.95%20-31.27%29%22%20d%3D%22M379.1%2C117.25V81.08h4v36.16h-4Z%22/%3E%0A%3Cpath%20transform%3D%22translate%28-30.95%20-31.27%29%22%20d%3D%22M398.48%2C84.75v12h9.92v3.67h-9.92v16.84h-4V81.08h21.23v3.67h-17.2Z%22/%3E%0A%3Cpath%20transform%3D%22translate%28-30.95%20-31.27%29%22%20d%3D%22m436.76%2084.75v32.5h-4v-32.5h-10.67v-3.67h25.31v3.67h-10.64z%22/%3E%0A%3C/svg%3E%0A',
      /* tslint:enable */
      id: 'os',
      styleClass: 'card-pf-footer--logo-os',
      clusters: clusters
    }, {
      description: 'When you build and run locally, you will receive a .zip file ' +
        'containing the setup you have established for your application.',
      benefits: [
        'Scaffold a project based on your chosen runtime.',
        'Configure OpenShift Online to build and deploy your code on each push to your repository\'s master branch.',
        'Here is a benefit of using OpenShift as a project environment.'
      ],
      footer: '.ZIP File',
      header: 'Build and Run Locally',
      /* tslint:disable */
      icon: 'data:image/svg+xml;charset=UTF-8,%3Csvg%20version%3D%221.1%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20width%3D%22384%22%20height%3D%22448%22%20viewBox%3D%220%200%20384%20448%22%3E%0A%3Ctitle%3E%3C/title%3E%0A%3Cpath%20d%3D%22M160%2096v-32h-32v32h32zM192%20128v-32h-32v32h32zM160%20160v-32h-32v32h32zM192%20192v-32h-32v32h32zM367%2095c9.25%209.25%2017%2027.75%2017%2041v288c0%2013.25-10.75%2024-24%2024h-336c-13.25%200-24-10.75-24-24v-400c0-13.25%2010.75-24%2024-24h224c13.25%200%2031.75%207.75%2041%2017zM256%2034v94h94c-1.5-4.25-3.75-8.5-5.5-10.25l-78.25-78.25c-1.75-1.75-6-4-10.25-5.5zM352%20416v-256h-104c-13.25%200-24-10.75-24-24v-104h-32v32h-32v-32h-128v384h320zM195.25%20235.75c21.25%2071.75%2026.75%2087.25%2026.75%2087.25%201.25%204.25%202%208.5%202%2013%200%2027.75-27%2048-64%2048s-64-20.25-64-48c0-4.5%200.75-8.75%202-13%200%200%205.25-15.5%2030-99v-32h32v32h19.75c7.25%200%2013.5%204.75%2015.5%2011.75zM160%20352c17.75%200%2032-7.25%2032-16s-14.25-16-32-16-32%207.25-32%2016%2014.25%2016%2032%2016z%22%3E%3C/path%3E%0A%3C/svg%3E%0A',
      /* tslint:enable */
      id: 'zip',
      styleClass: 'card-pf-footer--logo-zip'
    }] as TargetEnvironment[]);
  }
}
