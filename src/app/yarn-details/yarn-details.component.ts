import { Component, OnInit, Input } from "@angular/core";
import { Item, YarnMaterial, Fiber, FIBERS } from "../data/item";
import { ItemModel } from "../data/item.model";

@Component({
	selector: "app-yarn-details",
	templateUrl: "./yarn-details.component.html",
	styleUrls: ["./yarn-details.component.css"]
})
export class YarnDetailsComponent implements OnInit {
	@Input() item: Item;

	itemToEdit: Item;

	selectedMaterial: YarnMaterial;

	filteredManufacturers: string[];

	filteredYarns: string[];

	filteredColorInfos: string[];

	filteredColorClasses: string[];

	filteredColorNumbers: string[];

	filteredColors: string[];

	fibers: Fiber[] = [FIBERS.acrylic,FIBERS.alpaca,FIBERS.bamboo,FIBERS.cotton,FIBERS.nylon,FIBERS.silk,FIBERS.wool,FIBERS.other];

	displayHistoryDialog: boolean;

	constructor(private itemModel: ItemModel) {}

	ngOnInit() {
		this.displayHistoryDialog = false;
	}

	searchManufacturers(event) {
		this.filteredManufacturers = this.itemModel.searchManufacturers(event.query);
	}

	searchYarns(event) {
		this.filteredYarns = this.itemModel.searchYarns(event.query);
	}

	searchColorInfos(event) {
		this.filteredColorInfos = this.itemModel.searchColorInfos(event.query);
	}

	searchColorClasses(event) {
		this.filteredColorClasses = this.itemModel.searchColorClasses(event.query);
	}	

	searchColorNumbers(event) {
		this.filteredColorNumbers = this.itemModel.searchColorNumbers(event.query);
	}

	searchColors(event) {
		this.filteredColors = this.itemModel.searchColors(event.query);
	}	

	openHistoryDialog() {
		this.displayHistoryDialog = true;
	}

	closeHistoryDialog() {
		this.displayHistoryDialog = false;
	}	
}
