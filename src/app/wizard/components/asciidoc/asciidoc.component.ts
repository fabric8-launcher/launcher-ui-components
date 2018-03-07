import { Component, Input } from '@angular/core';
import { AsciidocService } from './asciidoc.service';
import { SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'asciidoc',
  template: '<span [innerHtml]=\'generate()\'></span>'
})
export class AsciidocComponent {
  @Input() docId: string;
  defaultOptions = {
    safe: 'unsafe',
    sourceHighlighter: 'highlightjs'
  };

  constructor(private asciidoc: AsciidocService) {}

  private generate(): SafeHtml {
    return this.asciidoc.generateSafeHtml(this.docId);
  }
}
