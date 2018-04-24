import {Component} from "@angular/core";
import { Router } from "@angular/router";
import {ForgeService} from "ngx-forge";

@Component({
  selector: "app-footer",
  templateUrl: "./footer.component.html",
  styleUrls: ["./footer.component.scss"],
})

export class FooterComponent {
  version: string;
  wizard: boolean;

  constructor(private forgeService: ForgeService, private router: Router) {
    router.events.subscribe((url: any) => {
      this.wizard = url.url.indexOf('filtered-wizard') !== -1;
    });
  }

  ngOnInit() {
    this.forgeService.version().then(version => {
      this.version = version.backendVersion;
    });
  }
}
