import { Injectable } from '@angular/core';
import {
  Subject
} from 'rxjs';

import {
  Config,
  ProjectProgressService
} from 'ngx-forge';

@Injectable()
export class AppLauncherProjectProgressService implements ProjectProgressService {
  progressMessages = new Subject<MessageEvent>();
  private socket: WebSocket;
  private readonly END_POINT: string = '';

  constructor(private config: Config) {
    this.END_POINT = config.get('backend_websocket_url');
  }

  getProgress(uuidLink: string): WebSocket {
    this.socket = new WebSocket(this.END_POINT + uuidLink);
    this.socket.onmessage = (event: MessageEvent) => {
      this.progressMessages.next(event);
    };
    this.socket.onerror = (error: ErrorEvent) => {
      this.progressMessages.error(error);
    };
    this.socket.onclose = () => {
      this.progressMessages.complete();
    };
    return this.socket;
  }
}
