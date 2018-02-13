import { Component, OnInit } from "@angular/core";
import { Item, YarnMaterial, Fiber, FIBERS, Color } from "../data/item";
import { ItemModel } from "../data/item.model";

@Component({
	selector: "app-csv",
	templateUrl: "./csv.component.html",
	styleUrls: ["./csv.component.css"]
})
export class CsvComponent implements OnInit {
	
	csv: string;

	constructor(private itemModel: ItemModel) {}

	ngOnInit() {
		// 0: Merkki;
		// 1: Lanka;
		// 2: väri;
		// 3: väriluokka;
		// 4: värinro;
		// 5: Weight;
		// 6: g/ kerä;
		// 7: m/ kerä;
		// 8: jäljellä g;
		// 9: käytetty g; 
		// 10: saldo g ; 
		// 11: saldo m ;
		// 12: tyyppi;
		// 13: paikka;
		// 14: ostopvm;
		// 15: hinta/kerä;
		// 16: varaston arvo;
		// 17: m/50g;
		// 18: ideoita;
		//this.csv = "Merkki;Lanka;väri;väriluokka;värinro;Weight;g/ kerä;m/ kerä;jäljellä g;käytetty g; saldo g ; saldo m ;tyyppi;paikka;ostopvm;hinta/kerä;varaston arvo;m/50g;ideoita;Aade Lõng;Artistic 8/2;liuku punamusta;punakirjava;;Fingering / 4 ply (14 wpi);100;400;54;; 54   ; 216   ;huivilanka;varasto/matkalaukku;1.10.2008;6,00;3,24;200;;";
		this.csv = "Merkki;Lanka;väri;väriluokka;värinro;Weight;g/ kerä;m/ kerä;jäljellä g;käytetty g; saldo g ; saldo m ;tyyppi;paikka;ostopvm;hinta/kerä;varaston arvo;m/50g;ideoita;Aade Lõng;Artistic 8/2;liuku punamusta;punakirjava;;Fingering / 4 ply (14 wpi);100;400;54;; 54   ; 216   ;huivilanka;varasto/matkalaukku;1.10.2008;6,00;3,24;200;;Aade Lõng;Artistic 8/2;liuku vihreä;vihreä;Green;Fingering / 4 ply (14 wpi);100;400;243;; 243   ; 972   ;huivilanka;varasto/matkalaukku;1.10.2008;6,00;14,58;200;;Anttila;Corallo;yv harmaa;harmaa;02;Sport / 5 ply (12 wpi);50;150;44;; 44   ; 132   ;sukkalanka;kirjakaappi;1.10.2008;2,00;1,76;150;;"
	}

	load() {
		this.convertCSV();
	}

	convertCSV() {
		let values = this.csv.split(";");
		let items = [];
		
		for (let i=19;i<values.length-19;i+=19) {
			let item = new Item();
			item.manufacturer = values[i];
			item.yarn = values[i+1];
			item.colors = values[i+2].split(' ').map(col => new Color(col,"#888888"));
			item.colorClass = values[i+3];
			item.colorNumber = values[i+4];
			item.yarnWeight = values[i+5];
			item.weightOfSkein = parseFloat(values[i+6]);
			item.lengthOfSkein = parseFloat(values[i+7]);
			item.remainingWeight = parseFloat(values[i+8]);
			// 9 = käytetty g
			// 10 = saldo g
			// 11 = saldo m
			item.tags = [values[i+12]];
			item.locations = [values[i+13]];
			item.purchaseDates = values[i+14].split('/').map(date => date.trim());
			item.priceOfSkein = parseFloat(values[i+15]);
			// 16 = varaston arvo
			// 17 = m/50g
			item.notes = values[i+18];

			item.colorInfo = '';

			if (item.tags[0] === 'alpakkalanka') {
				item.materials = [new YarnMaterial({fiber: FIBERS.alpaca,percentage: 100})];
			}
			else {
				item.materials = [new YarnMaterial({fiber: FIBERS.other,percentage: 100})];
			}	

			this.deductColorInfo(item);

			items.push(item);
		}

		this.itemModel.items = items;
	}

	deductColorInfo(item: Item) {
		let colorInfo = '';
		let colors = [];
		for (let i=0;i<item.colors.length;i++) { 
			if (item.colors[i].label == 'yv') {
				colorInfo = "yksivärinen";
			}
			else if (item.colors[i].label == 'mel') {
				colorInfo = "meleerattu";
			}	
			else if (item.colors[i].label == 'kirj' || item.colors[i].label.indexOf('kirjava') !== -1) {
				colorInfo = "kirjava";
			}	
			else if (item.colors[i].label == 'semi') {
				colorInfo = "semisolidi";
			}	
			else if (item.colors[i].label == 'kierre') {
				colorInfo = "kierre";
			}
			else if (item.colors[i].label == 'liuku') {
				colorInfo = "liukuvärjätty";
			}	
			else if (item.colors[i].label == 'raita') {
				colorInfo = "raidallinen";
			}										
			else {
				colors.push(new Color(item.colors[i].label,"#888888"));
			}				
		}
		item.colorInfo = colorInfo;
		item.colors = colors;
	}
}
