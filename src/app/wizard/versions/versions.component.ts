import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'versions',
  templateUrl: './versions.component.html'
})
export class VersionComponent {

  constructor(private router: Router) {}

  back() {
    this.router.navigate(['/']);
  }
}