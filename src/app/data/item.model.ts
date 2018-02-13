import { Injectable } from "@angular/core";
import { ItemService } from "../item.service";
import { Item } from "../data/item";

@Injectable()
export class ItemModel {
	items: Item[];

	allManufacturers: string[];

	constructor(private itemService: ItemService) {
		this.items = itemService.getItems();
	}

	getItems() {
		return this.items;
	}

	getItem(id:number) {
		for (let i=0; i<this.items.length;i++) {
			if (this.items[i].id === id) {
				return this.items[i];
			}
		}
	}

	searchManufacturers(query: string): string[] {
		return this.searchWithField(query, "manufacturer");
	}

	searchYarns(query: string): string[] {
		return this.searchWithField(query, "yarn");
	}

	searchColors(query: string): string[] {
		let values = this.collectAllUsedValuesInField('colors').map(color => color.label);
		if (query != undefined && query != "" && query != "*") {
			return values.filter(color =>
				color.toLowerCase().startsWith(query.toLowerCase())
			);
		}

		return values;
	}

	searchColorInfos(query: string): string[] {
		return this.searchWithField(query, "colorInfo");
	}

	searchColorClasses(query: string): string[] {
		return this.searchWithField(query, "colorClass");
	}

	searchColorNumbers(query: string): string[] {
		return this.searchWithField(query, "colorNumber");
	}

	searchMaterials(query: string): string[] {
		let values = this.collectAllUsedValuesInField('materials').map(material => material.fiber.label);
		if (query != undefined && query != "" && query != "*") {
			return values.filter(material =>
				material.toLowerCase().startsWith(query.toLowerCase())
			);
		}

		return values;
	}

	searchLocations(query: string): string[] {
		return this.searchWithField(query, "locations");
	}	

	searchTags(query: string): string[] {
		return this.searchWithField(query, "tags");
	}

	searchWithField(query: string, field: string): any[] {
		let values = this.collectAllUsedValuesInField(field);
		if (query != undefined && query != "" && query != "*") {
			return values.filter(value =>
				value.toLowerCase().startsWith(query.toLowerCase())
			);
		}

		return values;
	}

	collectAllUsedValuesInField(field: string): any[] {
		let all = [];
		for (let i = 0; i < this.items.length; i++) {
			if (Array.isArray(this.items[i][field])) {
				for (let j = 0; j < this.items[i][field].length; j++) {
					if (this.isNewValue(this.items[i][field][j], all)) {
						all.push(this.items[i][field][j]);
						//console.log('add color:'+this.items[i][field][j])
					}
				}
			} else {
				if (this.isNewValue(this.items[i][field], all)) {
					all.push(this.items[i][field]);
				}
			}
		}
		return all;
	}

	isNewValue(value: any, all: Array<any>): boolean {
		for (let i = 0; i < all.length; i++) {
			if (typeof all[i] === 'string') {
				if (all[i] == value) {
					return false;
				}
			}
			else if (all[i].equals(value)) {
				return false;
			}
		}
		return true;
	}
}
