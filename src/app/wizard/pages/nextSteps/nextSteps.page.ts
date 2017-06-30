import { Component, Input } from "@angular/core";
import { GenericPage } from "../generic/generic.page";
import { SubmittableInput } from "../../../shared/model";

let adocIndex = require("../../../../assets/adoc.index");

@Component({
  selector: "nextSteps",
  templateUrl: "nextSteps.page.html",
  styleUrls: ["nextSteps.page.scss"]
})
export class NextStepsPage extends GenericPage {
  adocIndex = adocIndex;
}