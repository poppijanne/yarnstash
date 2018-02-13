import { Component, OnInit, Input } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Location } from "@angular/common";
import { Item } from "../data/item";
import { ItemModel } from "../data/item.model";

@Component({
	selector: "app-yarn-edit",
	templateUrl: "./yarn-edit.component.html",
	styleUrls: ["./yarn-edit.component.css"]
})
export class YarnEditComponent implements OnInit {
	@Input() item: Item;

	constructor(
		private route: ActivatedRoute,
		private itemModel: ItemModel,
		private location: Location
	) {}

	ngOnInit() {
		this.getItem();
	}

	getItem(): void {
		const id = +this.route.snapshot.paramMap.get("id");
		this.item = this.itemModel.getItem(id);
		//this.heroService.getHero(id).subscribe(hero => (this.hero = hero));
	}

	goBack(): void {
		this.location.back();
	}

	save(): void {
		//this.heroService.updateHero(this.hero).subscribe(() => this.goBack());
	}
}
