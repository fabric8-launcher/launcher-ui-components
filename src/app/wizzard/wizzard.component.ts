import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ListService } from './list.service'
import { ProjectSettings } from './project-settings';

@Component({
  selector: 'wizzard-step1',
  templateUrl: './wizzard.component.html',
  styleUrls: ['./wizzard.component.scss'],
  providers: [
    ProjectSettings
  ]
})
export class Step1Component implements OnInit {
  showError: boolean = false;
  feedbackMessage: string = '';
  statusCode: number = 0;
  subSection: string = '1A';
  languageRuntimes: string[] = this.listService.LanguageRuntimes;
  features: string[] = this.listService.ListOfFeatures;

  constructor(
    private router: Router,
    private listService: ListService,
    private settings: ProjectSettings) {
  }

  ngOnInit(): void {
  }

  next(): void {
    this.subSection = '1B';
  }

  isNotActive(section: string): boolean {
    return this.subSection != section;
  }

  closeAlert() {
    this.showError = false;
  }
}
