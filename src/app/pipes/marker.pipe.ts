import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "marker"
})
export class MarkerPipe implements PipeTransform {
  transform(value: any, args?: any): any {
    return null;
  }
}
