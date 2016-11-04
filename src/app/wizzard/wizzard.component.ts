import { Component, OnInit } from '@angular/core';
import { Router }    from '@angular/router';

@Component({
  selector: 'wizzard-step1',
  templateUrl: './wizzard.component.html',
  styleUrls: ['./wizzard.component.scss'],
})
export class Step1Component implements OnInit {
  showError: boolean = false;
  feedbackMessage: string = '';
  statusCode: number = 0;

  constructor(
    private router: Router) {
  }

  ngOnInit(): void {
  }

  closeAlert(){
    this.showError = false;
  }
}
