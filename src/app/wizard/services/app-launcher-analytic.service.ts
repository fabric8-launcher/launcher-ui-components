import { Injectable } from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { distinctUntilChanged } from 'rxjs/internal/operators/distinctUntilChanged';
import { Broadcaster } from 'ngx-base';
import { Config } from 'ngx-launcher';

declare global {
  interface Window {
    analytics: any;
  }
}

@Injectable()
export class AnalyticService {

  constructor(private broadcaster: Broadcaster, private router: Router,
              private route: ActivatedRoute, private config: Config) {
    this.init();
  }

  private get analytics(): any {
    return window.analytics;
  }

  public track() {
    if (!this.analytics) {
      return;
    }
    this.broadcaster.on('analyticsTracker')
      .subscribe((data: any) => {
        const eventKey = data['event'];
        const eventData = data['data'];
        if (eventKey && eventData) {
          this.analytics.track(eventKey, eventData);
        } else if (eventKey) {
          this.analytics.track(eventKey);
        }
      });
    this.broadcaster.on('login').subscribe((user) => this.identifyUser(user));

    this.router.events.pipe(distinctUntilChanged(((previous: any, current: any) => {
      if (current instanceof NavigationEnd) {
        return previous.url === current.url;
      }
      return true;
    }))).subscribe(() => {
      let snapshot = this.route.snapshot;
      let activated = this.route.firstChild;
      if (activated != null) {
        while (activated != null) {
          snapshot = activated.snapshot;
          activated = activated.firstChild;
        }
      }

      this.analytics.page({
        name: snapshot.data.name + (snapshot.params.step || ''),
        properties: snapshot.params
      });
    });
  }

  private init() {
    if (this.config.get('segment_tracker_token')) {
      this.initialize(this.config.get('segment_tracker_token'));
    }
  }

  /* tslint:disable */
  private initialize(apiWriteKey: string) {
    // THIS CODE IS DIRECTLY PASTED FROM SEGMENT
    var analytics = window.analytics = window.analytics || []; if (!analytics.initialize) if (analytics.invoked) window.console && console.error && console.error("Segment snippet included twice."); else {
      analytics.invoked = !0; analytics.methods = ["trackSubmit", "trackClick", "trackLink", "trackForm", "pageview", "identify", "reset", "group", "track", "ready", "alias", "debug", "page", "once", "off", "on"]; analytics.factory = function (t) { return function () { var e = Array.prototype.slice.call(arguments); e.unshift(t); analytics.push(e); return analytics } }; for (var t = 0; t < analytics.methods.length; t++) { var e = analytics.methods[t]; analytics[e] = analytics.factory(e) } analytics.load = function (t) { var e = document.createElement("script"); e.type = "text/javascript"; e.async = !0; e.src = ("https:" === document.location.protocol ? "https://" : "http://") + "cdn.segment.com/analytics.js/v1/" + t + "/analytics.min.js"; var n = document.getElementsByTagName("script")[0]; n.parentNode.insertBefore(e, n) }; analytics.SNIPPET_VERSION = "4.0.0";
      analytics.load(apiWriteKey);
    }
  }
  /* tslint:enable */

  private identifyUser(user: any): any {
    this.analytics.identify(user.email, user);
  }
}
