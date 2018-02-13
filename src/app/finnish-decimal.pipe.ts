import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'finnishDecimal'
})
export class FinnishDecimalPipe implements PipeTransform {

  transform(value: number): string {
  	if (value === null || Number.isNaN(value)) {
  		return "?";
  	}
  	let valueAsString = ''+value;
  	valueAsString = valueAsString.replace(',',' ');
  	return valueAsString.replace('.',',');
  }

}
