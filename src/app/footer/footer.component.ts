import { Component } from '@angular/core';
import { ForgeService } from '../shared/forge.service'
import { Version } from '../shared/model';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})

export class FooterComponent {
  version: string;

  constructor(private forgeService: ForgeService){
  }
  ngOnInit() {
    this.forgeService.version().then(version => {
      this.version = version.backendVersion;
    });
  }
}
