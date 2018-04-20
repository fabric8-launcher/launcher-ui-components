import { Injectable } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import {History} from "ngx-forge";
import { AsciidocIndex } from './asciidoc.index';

let asciidoctor = require('asciidoctor.js')();

@Injectable()
export class AsciidocService {
  defaultOptions = {
    safe: 'unsafe',
    sourceHighlighter: 'highlightjs'
  };

  constructor(private domSanitizer: DomSanitizer, private history: History, private adocIndex: AsciidocIndex) {}

  public generateHtml(docId: string): string {
    if (!this.adocIndex.hasKey(docId)) {
      console.warn(`docId: '${docId}' not valid`);
      return '';
    }
    let context = '';
    let gui = this.history.convert();
    gui.inputs.forEach(input => {
      context += `:${input.name}: ${input.value}\n`;
    });

    return asciidoctor.convert(context + this.adocIndex.get('document-attributes')
      + this.adocIndex.get(docId), this.defaultOptions).replace(/ [Oo]nline/g, '');
  }

  public generateSafeHtml(docId: string): SafeHtml {
    return this.domSanitizer.bypassSecurityTrustHtml(
      this.generateHtml(docId)
    );
  }
}
