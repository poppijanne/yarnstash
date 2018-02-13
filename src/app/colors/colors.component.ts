import { Component, OnInit, Input } from "@angular/core";
import { Item, Color } from "../data/item";
import { ItemModel } from "../data/item.model";

@Component({
	selector: "app-colors",
	templateUrl: "./colors.component.html",
	styleUrls: ["./colors.component.css"]
})
export class ColorsComponent implements OnInit {
	@Input() item: Item;

	filteredColors: string[];

	constructor(private itemModel: ItemModel) {}

	ngOnInit() {}

	searchColors(event) {
		this.filteredColors = this.itemModel.searchColors(event.query);
	}	
}
