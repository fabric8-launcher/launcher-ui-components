import { TestBed } from '@angular/core/testing';

import {
  Subject
} from 'rxjs';

import {
  Config,
  HelperService,
  TokenProvider
} from 'ngx-forge';

import { AppLauncherProjectProgressService } from './app-launcher-project-progress.service';
import { LaunchConfig } from 'app/shared/config.component';


function initTestBed() {
  TestBed.configureTestingModule({
    providers: [
        AppLauncherProjectProgressService,
        HelperService,
        TokenProvider,
        { provide: Config, useClass: LaunchConfig }
    ]
  });
}

describe('Progress: AppLauncherProjectProgressService', () => {
  let helperService: HelperService;
  let appLauncherProjectProgressService: AppLauncherProjectProgressService;
  let progressMessages = new Subject<MessageEvent>();

  beforeEach(() => {
    initTestBed();
    appLauncherProjectProgressService = TestBed.get(AppLauncherProjectProgressService);
    let fakeWebSocket = () => {
        let socket = new WebSocket('wss://url');
        let msgEvntInit: MessageEventInit = {'data': 'socket data message'};
        let event = new MessageEvent('worker', msgEvntInit);
        progressMessages.next(event);
        return socket;
      };
    spyOn(appLauncherProjectProgressService, 'getProgress').and.returnValue(fakeWebSocket);
  });

  it('Get progress messages', () => {
    let socket = appLauncherProjectProgressService.getProgress('wss://url');
    progressMessages.subscribe((event: MessageEvent) => {
        expect(event.data).toEqual('socket data message');
    });
  });

});
