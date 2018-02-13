import { Component, OnInit, Input } from "@angular/core";
import { YarnMaterial, Fiber, FIBERS } from "../data/item";

@Component({
	selector: "app-material-bar",
	templateUrl: "./material-bar.component.html",
	styleUrls: ["./material-bar.component.css"]
})
export class MaterialBarComponent implements OnInit {
	@Input() materials: YarnMaterial[];

	constructor() {}

	ngOnInit() {}

	getPercentage(i:number):number {
		if (i<this.materials.length-1) {
			return this.materials[i].percentage;
		}
		else {
				
		}
	}
}
