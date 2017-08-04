import { Component, Input, Injectable } from "@angular/core";
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { History } from "../../history.component";

let adocIndex = require("../../../../assets/adoc.index");
let asciidoctor = require('asciidoctor.js')();

@Injectable()
export class AsciidocService {
  defaultOptions = {
    safe: 'unsafe',
    sourceHighlighter: 'highlightjs'
  }

  constructor(private domSanitizer: DomSanitizer, private history: History) {}

  public generateHtml(docId: string): string {
    if (!adocIndex.hasOwnProperty(docId)) {
      console.warn(`docId: '${docId}' not valid`);
      return "";
    }
    let context = "";
    let gui = this.history.convert();
    gui.inputs.forEach(input => {
      context += `:${input.name}: ${input.value}\n`;
    });

    return asciidoctor.convert(context + adocIndex['document-attributes'] + adocIndex[docId], this.defaultOptions)
  }

  public generateSafeHtml(docId: string): SafeHtml {
    return this.domSanitizer.bypassSecurityTrustHtml(
      this.generateHtml(docId)
    );
  }
}
