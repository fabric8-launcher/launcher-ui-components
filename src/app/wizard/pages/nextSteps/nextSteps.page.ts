import {Component, ElementRef, Renderer2} from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { GenericPage } from "../generic/generic.page";
import { SubmittableInput } from "ngx-forge";
import { History } from "ngx-forge";

@Component({
  selector: "nextSteps",
  templateUrl: "nextSteps.page.html",
  styleUrls: ["nextSteps.page.scss"]
})
export class NextStepsPage extends GenericPage {

  constructor(_renderer: Renderer2, _elementRef: ElementRef, _compositionMode: boolean,
    private route: ActivatedRoute,
    private router: Router,
    private history: History) {
    super(_renderer, _elementRef, _compositionMode);
  }

  consoleUrl(): string {
    return this.getPreviousPageInput("OPENSHIFT_CREATE").value;
  }

  private getPreviousPageInput(name: string): SubmittableInput {
    return this.history.get(this.history.currentGui.stepIndex - 1).inputs.filter(element => element.name === name)[0];
  }

  restart() {
    this.router.navigate(["../../" + 1, ""], { relativeTo: this.route });
  }

}