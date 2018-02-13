import { Component, OnInit } from "@angular/core";
import { Item, YarnMaterial, Fiber, FIBERS } from "../data/item";
import { ItemModel } from "../data/item.model";
import { SelectItem, MenuItem } from "primeng/components/common/api";
import { Router } from "@angular/router";

@Component({
	selector: "app-yarn-table",
	templateUrl: "./yarn-table.component.html",
	styleUrls: ["./yarn-table.component.css"]
})
export class YarnTableComponent implements OnInit {
	items: Item[];

	columnOptions: SelectItem[];

	displayEditDialog: boolean;
	displayDeleteConfimationDialog: boolean;

	item: Item;

	filteredManufacturers: string[];
	usedMaterials: SelectItem[];
	usedColors: SelectItem[];
	usedLocations: SelectItem[];
	usedTags: SelectItem[];

	editableItem: Item;
	originalItem: Item;

	contextMenuItems: MenuItem[];

	constructor(private itemModel: ItemModel, private router: Router) {}

	ngOnInit() {
		this.getItems();
		this.columnOptions = [];
		this.columnOptions.push({
			label: "Merkki",
			value: { field: "manufacturer", header: "Merkki" }
		});

		this.usedColors = [];
		this.usedMaterials = [];
		this.usedLocations = [];
		this.usedTags = [];

		this.contextMenuItems = [
			{
				label: "Lisää uusi lanka",
				icon: "fa-plus",
				command: event => this.createNewItem()
			},
			{
				label: "Muokkaa lankaa",
				icon: "fa-pencil",
				command: (event) => this.editItem(this.item)
			},
			{
				label: "Kopioi lanka",
				icon: "fa-clone",
				command: (event) => this.cloneItem(this.item)
			},
			{
				label: "Poista lanka",
				icon: "fa-trash",
				command: (event) => this.openDeleteConfimationDialog()
			}
		];

		this.editableItem = new Item();
		this.item = this.editableItem;
		//this.editItem(this.items[0]);
	}

	editItem(item: Item) {
		this.setEditableItem(item);
		this.openEditDialog();
		//this.router.navigateByUrl("/yarn-edit/"+item.id);
	}

	createNewItem() {
		this.originalItem = undefined;
		this.editableItem = new Item();
		this.openEditDialog();
	}

	cloneItem(item: Item) {
		this.originalItem = undefined;
		this.editableItem = new Item(item);
		this.openEditDialog();
	}

	deleteItem(item: Item) {
		this.items = this.items.filter(i => i.id !== item.id);
		this.closeDeleteConfimationDialog();
	}

	setEditableItem(item: Item) {
		this.originalItem = item;
		this.editableItem = new Item(item);
	}

	saveChanges() {
		if (this.originalItem !== undefined) {
			this.originalItem.copyProperties(this.editableItem);
		} else {
			this.items = [...this.items];
			this.items.push(this.editableItem);
		}
		this.closeEditDialog();
	}

	cancel() {
		this.closeEditDialog();
	}

	openEditDialog() {
		this.displayEditDialog = true;
	}

	closeEditDialog() {
		this.displayEditDialog = false;
	}

	getEditDialogTitle(): string {
		if (this.originalItem !== undefined) {
			return "Muokkaa langan tietoja";
		}

		return "Uuden langan tiedot";
	}

	openDeleteConfimationDialog() {
		this.displayDeleteConfimationDialog = true;
	}

	closeDeleteConfimationDialog() {
		this.displayDeleteConfimationDialog = false;
	}

	get materialsForFilter(): SelectItem[] {
		let materials = this.itemModel.searchMaterials("*");
		if (this.usedMaterials.length !== materials.length) {
			this.usedMaterials = [];
			for (let i = 0; i < materials.length; i++) {
				this.usedMaterials.push({ label: materials[i], value: materials[i] });
			}
			this.usedMaterials.push({ label: 'konepestävä', value: 'konepestävä' });
		}

		return this.usedMaterials;
	}

	get colorsForFilter(): SelectItem[] {
		let colors = this.itemModel.searchColors("*");
		if (this.usedColors.length !== colors.length) {
			this.usedColors = [];
			for (let i = 0; i < colors.length; i++) {
				this.usedColors.push({ label: colors[i], value: colors[i] });
			}
		}
		return this.usedColors;
	}

	get locationsForFilter(): SelectItem[] {
		let locations = this.itemModel.searchLocations("*");
		if (this.usedLocations.length !== locations.length) {
			this.usedLocations = [];
			for (let i = 0; i < locations.length; i++) {
				this.usedLocations.push({ label: locations[i], value: locations[i] });
			}
		}
		return this.usedLocations;
	}

	get tagsForFilter(): SelectItem[] {
		let tags = this.itemModel.searchTags("*");
		if (this.usedTags.length !== tags.length) {
			this.usedTags = [];
			for (let i = 0; i < tags.length; i++) {
				this.usedTags.push({ label: tags[i], value: tags[i] });
			}
		}
		return this.usedTags;
	}

	searchManufacturers(event) {
		let query = event.query;
		let values = this.collectAllUsedValuesInField("manufacturer");
		this.filteredManufacturers = values.filter(value =>
			value.toLowerCase().startsWith(event.query.toLowerCase())
		);
	}

	collectAllUsedValuesInField(field: string): string[] {
		let all = [];
		for (let i = 0; i < this.items.length; i++) {
			let isNewValue = true;
			for (let j = 0; j < all.length; j++) {
				if (all[j] == this.items[i][field]) {
					isNewValue = false;
					break;
				}
			}
			if (isNewValue) {
				all.push(this.items[i][field]);
			}
		}
		return all;
	}

	getTableHeight() {
		return window.innerHeight - (51 + 18 + 25);
	}

	getItems() {
		this.items = this.itemModel.getItems();
	}

	getTotal(field: string) {
		let total = 0.0;
		for (let i = 0; i < this.items.length; i++) {
			if (this.items[i][field] !== null && !Number.isNaN(this.items[i][field]))
			total += this.items[i][field];
		}
		return total;
	}
}
