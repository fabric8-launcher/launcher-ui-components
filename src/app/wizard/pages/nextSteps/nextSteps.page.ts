import { Component, Input } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { GenericPage } from "../generic/generic.page";
import { SubmittableInput } from "../../../shared/model";
import { History } from "../../history.component";

let adocIndex = require("../../../../assets/adoc.index");

@Component({
  selector: "nextSteps",
  templateUrl: "nextSteps.page.html",
  styleUrls: ["nextSteps.page.scss"]
})
export class NextStepsPage extends GenericPage {
  adocIndex = adocIndex;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private history: History) {
    super();
  }

  ngOnInit() {
    let input = this.getPreviousPageInput("GITHUB_CREATE");
    this.adocIndex["nextStep"] = this.adocIndex["nextStep"].replace(/\${repoUrl}/g, input.value);
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