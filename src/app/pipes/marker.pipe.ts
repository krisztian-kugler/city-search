import { Pipe, PipeTransform } from "@angular/core";
import { DomSanitizer, SafeHtml } from "@angular/platform-browser";
import { DataService } from "../services/data.service";

@Pipe({ name: "marker" })
export class MarkerPipe implements PipeTransform {
  constructor(private sanitizer: DomSanitizer, private dataService: DataService) {}

  public transform(value: string): SafeHtml {
    if (value) return this.sanitizer.bypassSecurityTrustHtml(this.mark(value, this.dataService.inputValue));
  }

  public mark(value: string, filter: string): string {
    const regExp: RegExp = new RegExp(`^(${filter})`, "i");
    const marked: string = `<span style="font-weight: bold">$1</span>`;
    return value.replace(regExp, marked);
  }
}
