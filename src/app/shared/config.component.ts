import { Inject, Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class Config {
  private settings: any;

  constructor(private http: Http) {
  }

  load(): Promise<any> {
    return this.http.get('settings.json').toPromise().then((settings) => {
      this.settings = settings.json();
    }).catch(() => console.log('settings.json not found ignoring'));
  }

  get(key: string): string {
    return this.settings[key];
  }
}