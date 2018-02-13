import { Item, YarnMaterial, Fiber, FIBERS, Color } from "./data/item";

export class RandomItemGenerator {
	private id: number = 1;

	constructor() {}

	generateItem(): Item {
		let item = new Item();

		item.id = this.id;
		item.manufacturer = this.getRandomString([
			"Cewec",
			"Fermenwolle",
			"Du Store Alpakka",
			"Ferme",
			"Cerxes"
		]);

		item.yarn = this.getRandomString([
			"Anisia",
			"Organic Cotton + Merono Wool",
			"Safira"
		]);

		item.colors = this.getRandomArray(
			[
				new Color("keltainen", "#e6e629"),
				new Color("punainen", "#e85d5d"),
				new Color("sininen", "#8888e8"),
				new Color("tumman sininen", "#4b4bd1"),
				new Color("harmaa", "#888888"),
				new Color("musta", "#222222"),
				new Color("violetti", "#d6118e"),
				new Color("pinkki", "#d30bd6"),
				new Color("valkoinen", "#ffffff")
			],
			5
		);

		item.colorInfo = this.getRandomString([
			"raita",
			"meleerattu",
			"semisolid"
		]);

		item.colorClass = this.getRandomString(["harmaa", "kirjava", "musta"]);

		item.colorNumber = this.getRandomString([
			"384",
			"00099",
			"02 Santiago",
			"01"
		]);

		let percentage = 100;
		item.materials = this.getRandomArray(
			[
				new YarnMaterial({
					fiber: FIBERS.alpaca,
					percentage: 100
				}),
				new YarnMaterial({
					fiber: FIBERS.bamboo,
					percentage: 100
				}),
				new YarnMaterial({
					fiber: FIBERS.cotton,
					percentage: 100
				}),
				new YarnMaterial({
					fiber: FIBERS.acrylic,
					percentage: 100
				}),
				new YarnMaterial({
					fiber: FIBERS.nylon,
					percentage: 100
				}),
				new YarnMaterial({
					fiber: FIBERS.silk,
					percentage: 100
				}),
				new YarnMaterial({
					fiber: FIBERS.wool,
					percentage: 100
				})
			],
			4
		);
		item.materials = item.materials.map(
			material =>
				new YarnMaterial({
					fiber: material.fiber,
					percentage: (100 / item.materials.length)
				})
		);

		item.locations = this.getRandomArray(
			[
				"Kirjakaappi",
				"Sohva",
				"Sänky",
				"Varasto/matkalaukku",
				"Varasto/hylly"
			],
			3
		);
		item.lengthOfSkein = parseFloat((Math.random() * 10.0).toFixed(2));
		item.weightOfSkein = parseFloat((Math.random() * 100.0).toFixed(2));
		item.notes = "";
		item.purchaseDates = this.getRandomArray(
			["1.1.2010", "20.9.2016", "15.4.2014", "12.12.2005"],
			3
		);
		item.remainingWeight = parseFloat(
			(item.weightOfSkein * Math.random()).toFixed(2)
		);
		item.priceOfSkein = parseFloat((Math.random() * 50.0).toFixed(2));

		item.machineWashable = Math.random() < 0.5;

		item.tags = this.getRandomArray(["Eka", "Toka", "Kolmas"], 3);

		this.id++;
		return item;
	}

	getRandomMaterial(): YarnMaterial {
		let material = new YarnMaterial();
		material.fiber = this.getRandomAny([
			FIBERS.alpaca,
			FIBERS.wool,
			FIBERS.cotton,
			FIBERS.silk,
			FIBERS.bamboo
		]);
		material.percentage = 100;
		return material;
	}

	getRandomString(options: string[]): string {
		const index = Math.floor(options.length * Math.random());
		return options[index];
	}
	getRandomArray(options: any[], maxSize: number): any[] {
		let array = [];
		let size = Math.ceil(Math.random() * maxSize);
		for (let i = 0; i < size; i++) {
			const index = Math.floor(options.length * Math.random());
			this.pushToArray(array, this.getRandomAny(options));
		}
		return array;
	}
	pushToArray(array: any[], value: any) {
		for (let i = 0; i < array.length; i++) {
			if (array[i] === value) {
				return;
			}
		}
		array.push(value);
	}
	getRandomAny(options: any[]): any {
		const index = Math.floor(options.length * Math.random());
		return options[index];
	}
}

/*
Merkki
	- Cewec
	- Fermenwolle
	- Du Store Alpakka
Lanka
	- Anisia
	- Organic Cotton + Merono Wool
	- Safira
Värit (useita)
	- sininen
	- tumman sininen
	- vauvan sininen
	- tumma
	- punainen
	- valkoinen
	- riemunkirjava
Tarkka väri (vapaamuotoinen)
	- raita 
	- meleerattu
	- semisolid
Väriluokka
	- harmaa
	- kirjava
	- musta
Värinro
	- 384
	- 00099
	- 02 Santiago
	- Jokunimi
Materiaali (useita)
	- Alpakka
	- Villa
	- Puuvilla
grammaa per kerä
metriä per kerä
saldo g
saldo metriä
tyyppi => Tagit
Paikka (useita)
	- Kirjakaappi
	- Sohva
	- Varasto/matkalaukku
Ostopvm (useita) 
Ikä (laske ostopvm:stä)
Hinta/kerä
Varaston arvo (= (saldo g / kerä g) * hinta/kerä )
m/50g = (metriä / g) * 50
Muistiinpanot

Konepestävä (vai tagi)

Yhteissaldot
*/
