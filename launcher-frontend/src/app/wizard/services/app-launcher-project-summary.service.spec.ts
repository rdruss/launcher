import { inject, TestBed } from '@angular/core/testing';
import { HttpModule, Response, ResponseOptions, XHRBackend } from '@angular/http';
import { MockBackend } from '@angular/http/testing';

import {
  AuthHelperService, Config, HelperService, Summary, TokenProvider
} from 'ngx-forge';

import { AppLauncherProjectSummaryService } from './app-launcher-project-summary.service';
import { LaunchConfig } from 'app/shared/config.component';


function initTestBed() {
  TestBed.configureTestingModule({
    imports: [HttpModule],
    providers: [
        AppLauncherProjectSummaryService,
        AuthHelperService,
        HelperService,
        TokenProvider,
        { provide: Config, useClass: LaunchConfig },
        {
            provide: XHRBackend, useClass: MockBackend
        }
    ]
  });
}

describe('Service: AppLauncherProjectSummaryService', () => {
  let helperService: HelperService;
  let appLauncherProjectSummaryService: AppLauncherProjectSummaryService;
  let mockService: MockBackend;

    let summaryData = {
        dependencyCheck: null,
        gitHubDetails: null,
        mission: null,
        organization: null,
        pipeline: null,
        runtime: null,
        targetEnvironment: null
      } as Summary;

  beforeEach(() => {
    initTestBed();
    appLauncherProjectSummaryService = TestBed.get(AppLauncherProjectSummaryService);
  });

  it('Should return uuid', () => {
    inject([AppLauncherProjectSummaryService, XHRBackend], (service, mockBackend) => {
      mockBackend.connections.subscribe((connection: any) => {
          connection.mockRespond(new Response(
            new ResponseOptions({
              body: JSON.stringify({'uuid': 'e6daff35-5d93-4c38-965a-6a975cf80be1', 'uuid_link': '/status/e6daff35-5d93-4c38-965a-6a975cf80be1'}),
              status: 200
            })
          ));
      });
      service.setup(summaryData).subscribe((val: any) => {
          expect(val).toBeDefined();
          expect(val.uuid).toEqual('e6daff35-5d93-4c38-965a-6a975cf80be1');
      });
    });
  });

});
