import { Injectable } from '@angular/core';
import { Headers, Http, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs';

import {
  HelperService,
  MissionRuntimeService,
  Catalog,
  TokenProvider
} from 'ngx-forge';

@Injectable()
export class AppLauncherMissionRuntimeService extends MissionRuntimeService {

  private END_POINT: string;
  private API_BASE: string = '/booster-catalog/';
  private ORIGIN: string;

  constructor(
    private http: Http,
    private helperService: HelperService,
    private tokenProvider: TokenProvider
  ) {
    super();
    this.END_POINT = this.helperService.getBackendUrl();
    this.ORIGIN = this.helperService.getOrigin();
  }

  private get options(): Observable<RequestOptions> {
    let headers = new Headers();
    headers.append('X-App', this.ORIGIN);
    return Observable.fromPromise(this.tokenProvider.token.then((token) => {
      headers.append('Authorization', 'Bearer ' + token);
      return new RequestOptions({
        headers: headers
      });
    }));
  }

  getCatalog(): Observable<Catalog> {
    return this.options.flatMap(option => {
      return this.http.get(this.END_POINT + this.API_BASE, option)
        .map(response => response.json() as Catalog)
        .catch(this.handleError);
    })
  }

  private handleError(error: Response | any) {
    // In a real world app, we might use a remote logging infrastructure
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
}
