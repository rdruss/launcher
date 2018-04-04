import { inject, TestBed } from '@angular/core/testing';
import {
  HttpModule,
  Response,
  ResponseOptions,
  XHRBackend
} from '@angular/http';
import { MockBackend } from '@angular/http/testing';

import {
    Config,
    HelperService,
    Pipeline,
    TokenProvider
} from 'ngx-forge';

import { AppLauncherPipelineService } from './app-launcher-pipeline.service';
import { LaunchConfig } from '../../shared/config.component';


function initTestBed() {
  TestBed.configureTestingModule({
        imports: [
            HttpModule
        ],
        providers: [
            AppLauncherPipelineService,
            HelperService,
            TokenProvider,
            { provide: Config, useClass: LaunchConfig },
            { provide: XHRBackend, useClass: MockBackend }
        ]
  });
}

function mockPipeline(): Pipeline[] {
    return <Pipeline[]> [{
        id: 'maven-releaseandstage',
        platform: 'maven',
        name: 'Release and Stage',
        stages: [
        {
            name: 'Build Release',
            description: 'creates a new version then builds and deploys the project into the maven repository'
        }
        ],
        suggested: true
    }];
}

describe('Service: AppLauncherPipelineService', () => {
  let helperService: HelperService;
  let appLauncherPipelineService: AppLauncherPipelineService;

  beforeEach(() => {
    initTestBed();
    appLauncherPipelineService = TestBed.get(AppLauncherPipelineService);
  });

  it('should return pipelines', () => {
    inject([AppLauncherPipelineService, XHRBackend], (service, mockBackend) => {
        mockBackend.connections.subscribe((connection) => {
            connection.mockRespond(new Response(new ResponseOptions({
                body: JSON.stringify(mockPipeline)
            })));
        });

        service.getMissions().subscribe(response => {
            let pipelines: Pipeline[] = response;
            expect(pipelines.length).toBe(2);
            expect(pipelines[0].id).toBe('maven-releaseandstage');
            expect(pipelines[0].name).toBe('Release and Stage');
            expect(pipelines[0].platform).toBe('maven');
            expect(pipelines[0].stages).toBeDefined();
            expect(pipelines[0].stages.length).toBe(2);
            expect(pipelines[0].suggested).toBe(true);
        });
    });
  });

});
