import { Directive, ElementRef, Input, OnInit } from "@angular/core";
import { History } from "../wizard/history.component";

@Directive({
  selector: "[la-ci]"
})
export class CiDirective implements OnInit {
  @Input("la-ci") invert: boolean;

  constructor(private elementRef: ElementRef, private history: History) {
  }

  ngOnInit() {
    let isCi = this.isCiChosen();
    if (this.invert) isCi = !isCi;
    if (isCi) this.elementRef.nativeElement.remove();
  }

  isCiChosen(): boolean {
    let input = this.history.convert().inputs.find(input => input.name === "deploymentType");
    return input != null ? input.value !== "ZIP File" : false;
  }

}
