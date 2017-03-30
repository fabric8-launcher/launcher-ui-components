import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Logger } from '../shared/logger.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})

export class HeaderComponent {
  title = 'Launchpad Generator';
  loggedIn: Boolean = false;
}
