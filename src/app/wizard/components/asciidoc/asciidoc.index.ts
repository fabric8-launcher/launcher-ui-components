import { Injectable } from '@angular/core';

let adocIndex = require('../../../../assets/adoc.index');

@Injectable()
export class AsciidocIndex {
  private index: Map<string, string> = new Map<string, string>();

  constructor() {
    let index = new Map<string, string>();
    Object.keys(adocIndex).forEach(key => {
      index.set(key, adocIndex[key]);
    });
    this.set(index);
  }

  get(key: string): string {
    return this.index.get(key);
  }

  hasKey(key: string): boolean {
    return this.index.has(key);
  }

  set(index: Map<string, string>): void {
    this.index = index;
  }
}
