/*
TODO:

materiaalipalkki
[alpakka 50% | bamboo 50%]

materials [
	material
		- fiber (enum: 
					- source: enum: plant|animal|synthetic|other)
		- prosenttiosuus
		- machineWashable:boolean
]
*/

export enum Source {
	Plant = "Plant",
	Animal = "Animal",
	Synthetic = "Synthetic",
	Other = "Other"
}

export class Fiber {
	label: string;
	source: Source;
	color: string;

	constructor(label: string, source: Source, color: string) {
		this.label = label;
		this.source = source;
		this.color = color;
	}
}

export const FIBERS = {
	alpaca: new Fiber("Alpakka", Source.Animal, "#AAAA44"),
	silk: new Fiber("Silkki", Source.Animal, "#AAAAAA"),
	wool: new Fiber("Villa", Source.Animal, "#BBBBBB"),
	bamboo: new Fiber("Bambu", Source.Plant, "#AABB66"),
	cotton: new Fiber("Puuvilla", Source.Plant, "#BBAA44"),
	acrylic: new Fiber("Akryyli", Source.Synthetic, "#CCCCCC"),
	nylon: new Fiber("Nylon", Source.Synthetic, "#DDDDDD"),
	other: new Fiber("Muu", Source.Other, "#EEEEEE")
};

export class YarnMaterial {
	fiber: Fiber;
	percentage: number;

	constructor(material?) {
		if (material !== undefined) {
			this.copyProperties(material);
		} else {
			this.setDefaults();
		}
	}

	copyProperties(material) {
		this.fiber = material.fiber;
		this.percentage = material.percentage;
	}

	setDefaults() {
		this.fiber = undefined;
		this.percentage = 100;
	}

	public equals(material: YarnMaterial): boolean {
		return this.fiber === material.fiber;
	}	
}

export class Color {
	label: string;
	rgb: string;

	constructor(label: string, rgb: string) {
		this.label = label;
		this.rgb = rgb;
	}

	setDefaults() {
		this.label = "";
		this.rgb = "#FFFFFF";
	}

	copyProperties(color: Color) {
		this.label = color.label;
		this.rgb = color.rgb;
	}

	public toString = (): string => {
		return this.label;
	};

	public equals(color: Color): boolean {
		return this.label === color.label;
	}
}

export class ItemHistory {

	weightOfYarn: number;
	date: string;
	note: string;

	constructor(history?: ItemHistory) {
		if (history) {
			this.copyProperties(history);
		} else {
			this.setDefaults();
		}		
	}

	setDefaults(){
		let now = new Date();
		this.weightOfYarn = 0;
		this.date = now.getDate() + "." + now.getMonth() + "." + now.getFullYear();
		this.note = "";
	}

	copyProperties(history: ItemHistory) {
		this.weightOfYarn = history.weightOfYarn;
		this.date = history.date;
		this.note = history.note;
	}
}

export class Item {
	id: number;
	manufacturer: string;
	yarn: string;
	colors: Color[];
	colorInfo: string;
	colorClass: string;
	colorNumber: string;
	materials: YarnMaterial[];
	yarnWeight: string;
	weightOfSkein: number;
	lengthOfSkein: number;
	remainingWeight: number;
	tags: string[];
	locations: string[];
	purchaseDates: string[];
	priceOfSkein: number;
	notes: string;
	machineWashable: boolean;
	history: ItemHistory[];

	constructor(item?: Item) {
		if (item) {
			this.copyProperties(item);
		} else {
			this.setDefaults();
		}
	}

	setDefaults() {
		this.id = undefined;
		this.manufacturer = "";
		this.yarn = "";
		this.colors = [];
		this.colorInfo = "";
		this.colorClass = "";
		this.colorNumber = "";
		this.materials = [];
		this.yarnWeight = '';
		this.lengthOfSkein = 0.0;
		this.weightOfSkein = 0.0;
		this.remainingWeight = 0.0;
		this.tags = [];
		this.locations = [];
		this.purchaseDates = [];
		this.priceOfSkein = 0.0;
		this.notes = "";
		this.machineWashable = false;
		this.history = [];
	}

	copyProperties(item: Item) {
		this.id = item.id;
		this.manufacturer = item.manufacturer;
		this.yarn = item.yarn;
		this.colors = item.colors.map(
			color => new Color(color.label, color.rgb)
		);
		this.colorInfo = item.colorInfo;
		this.colorClass = item.colorClass;
		this.colorNumber = item.colorNumber;
		this.yarnWeight = item.yarnWeight;
		this.materials = item.materials.map(
			material => new YarnMaterial(material)
		);
		this.lengthOfSkein = item.lengthOfSkein;
		this.weightOfSkein = item.weightOfSkein;
		this.remainingWeight = item.remainingWeight;
		this.tags = [...item.tags];
		this.locations = [...item.locations];
		this.purchaseDates = [...item.purchaseDates];
		this.priceOfSkein = item.priceOfSkein;
		this.notes = item.notes;
		this.machineWashable = item.machineWashable;
		this.history = item.history.map(
			history => new ItemHistory(history)
		);
	}

	get valueOfYarn(): number {
		return (this.remainingWeight / this.weightOfSkein) * this.priceOfSkein;
	}

	get lengthPerWeight(): number {
		return (this.lengthOfSkein / this.weightOfSkein) * 50;
	}

	get remainingLength():number {
		return (this.remainingWeight / this.weightOfSkein) * this.lengthOfSkein;
	}

	get materialLabels(): string[] {
		return this.materials.map(
			material => material.fiber.label + " (" + material.percentage + "%)"
		);
	}

	addMaterial() {
		this.materials = [...this.materials];
		let material = new YarnMaterial();
		if (this.materials.length == 1 && this.materials[0].percentage == 100) {
			this.materials[0].percentage = 50;
			material.percentage = 50;
		}
		this.materials.push(material);
	}

	removeMaterial(material: YarnMaterial) {
		this.materials = this.materials.filter(mat => mat !== material);
	}

	addColor() {
		this.colors = [...this.colors];
		let color = new Color('','#888888');
		this.colors.push(color);
	}

	removeColor(color: Color) {
		this.colors = this.colors.filter(col => col !== color);
	}

	addTag() {
		this.tags = [...this.tags];
		this.tags.push(' ');
	}

	removeTag(tagToBeRemoved: string) {
		this.tags = this.tags.filter(tag => tag !== tagToBeRemoved);
	}

	addHistory() {
		this.history = [...this.history];
		let history = new ItemHistory();
		history.weightOfYarn = this.remainingWeight;
		this.history.push(history);
	}

	removeHistory(historyToBeRemoved: ItemHistory) {
		this.history = this.history.filter(history => history !== historyToBeRemoved);
	}

	get colorsAsString(): string {
		return this.colors.map(color => color.label).join(' ');
	}

	get materialsAsString(): string {
		return this.materials.map(material => material.fiber.label).join(' ') + (this.machineWashable ? '' : ' konepestävä');
	}

	get locationsAsString(): string {
		return this.locations.join(' ');
	}

	get tagsAsString(): string {
		return this.tags.join(' ');
	}

	/*
	get weightOfSkein(): number {
		return this._weightOfSkein;
	}

	set weightOfSkein(value: number) {
		if (typeof value === 'string') 
			this._weightOfSkein = value;//parseFloat(value);
		else {
			this._weightOfSkein = parseFloat(value);
		}
	}	*/
}

/*
Merkki v
	- Cewec
	- Fermenwolle
	- Du Store Alpakka
Lanka v
	- Anisia
	- Organic Cotton + Merono Wool
	- Safira
Värit (useita) v
	- sininen
	- tumman sininen
	- vauvan sininen
	- tumma
	- punainen
	- valkoinen
	- riemunkirjava
Tarkka väri (vapaamuotoinen) v
	- raita 
	- meleerattu
	- semisolid
Väriluokka v
	- harmaa
	- kirjava
	- musta
Värinro v
	- 384
	- 00099
	- 02 Santiago
	- Jokunimi
Materiaali (useita) v
	- Alpakka
	- Villa
	- Puuvilla
grammaa per kerä v
metriä per kerä v
saldo g v
saldo metriä
tyyppi => Tagit v
Paikka (useita) v
	- Kirjakaappi
	- Sohva
	- Varasto/matkalaukku
Ostopvm (useita) 
Ikä (laske ostopvm:stä)
Hinta/kerä v
Varaston arvo (= (saldo g / kerä g) * hinta/kerä ) v
m/50g = (metriä / g) * 50 v
Muistiinpanot

Konepestävä (vai tagi)

Yhteissaldot
*/
