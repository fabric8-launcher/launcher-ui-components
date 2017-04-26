import { Component, ViewChild, Input, ElementRef, OnInit, ViewContainerRef, Compiler } from '@angular/core';
import { Http } from "@angular/http";

import 'asciidoctorjs-web-repack/asciidoctor-all.min';
import { CompileHtmlService } from "p3x-angular-compile-html";

declare var Opal: any;

@Component({
  selector: 'asciidoc',
  template: '<div #container></div>'
})
export class AsciidocRenderer extends OnInit {
  @Input() href: string;
  @ViewChild('container', { read: ViewContainerRef }) container: ViewContainerRef;

  constructor(private compileHtmlService: CompileHtmlService,
    private http: Http) {
    super();
  }

  ngOnInit(): void {
    this.http.get(this.href).subscribe(asciidoc => {
      let doc = Opal.Asciidoctor.$convert(asciidoc.text(), Opal.hash({ doctype: 'article' }));
      this.compileHtmlService.compile({
        template: doc,
        container: this.container,
        ref: this
      });
    });
  }
}