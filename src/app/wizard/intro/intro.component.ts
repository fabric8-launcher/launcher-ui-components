import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'intro',
  templateUrl: './intro.component.html'
})
export class IntroComponent {

  constructor(private router: Router) {}

  startQuickstart() {
    this.router.navigate(['/wizard', 'obsidian-new-quickstart']);
  }

  startNewProject() {
    this.router.navigate(['/wizard', 'obsidian-new-project']);
  }
}