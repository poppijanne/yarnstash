import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
	name: "listWithCommas"
})
export class ListWithCommasPipe implements PipeTransform {
	transform(value: string[]): any {
		return value.join(", ");
	}
}
