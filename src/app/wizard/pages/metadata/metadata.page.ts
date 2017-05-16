import {Component, Input, OnInit, ViewChild} from "@angular/core";
import {GenericPage} from "../generic/generic.page";
import {FormControl, NgForm} from "@angular/forms";

import 'rxjs/add/operator/debounceTime';

@Component({
    selector: "metadata",
    templateUrl: "metadata.page.html"
})
export class MetadataPage extends GenericPage {
    expand: boolean;
    named: FormControl = new FormControl();

    constructor() {
        super();
        this.named.valueChanges.debounceTime(2000).distinctUntilChanged().subscribe(data => {
            console.log("named changed");
        })
    }

    toggle() {
        this.expand = !this.expand;
    }

    getField(fieldName:string): Input {
        return this.gui.inputs.find(i => i.name == fieldName);
    }
}

