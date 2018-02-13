import { Injectable } from "@angular/core";
import { Item } from "./data/item";
import { RandomItemGenerator } from "./RandomItemGenerator";

@Injectable()
export class ItemService {
	private items: Item[] = [];

	constructor() {

		const generator = new RandomItemGenerator();

		for (let i=0;i<50;i++) {
			this.addItem(generator.generateItem());
		}
	}

	getItems(): Item[] {
		return this.items;
	}

	addItem(item: Item) {
		this.items.push(item);
	}

	removeById(id: number) {
		this.items = this.items.filter(item => item.id !== id);
	}

	findById(id: number) {
		return this.items.filter(item => item.id === id);
	}

	getTags(): string[] {
		let tags = [];

		return tags;
	}

	save(item: Item) {
		console.log("Item saved!");
	}
}
