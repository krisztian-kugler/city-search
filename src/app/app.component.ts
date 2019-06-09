import { Component, OnInit } from "@angular/core";
import { DataService } from "./services/data.service";

@Component({
  selector: "cs-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.sass"]
})
export class AppComponent implements OnInit {
  constructor(private dataService: DataService) {}

  public onSearch(): void {
    open(`https://www.google.com/search?q=${this.dataService.selectedCity.name}&tbm=isch`);
  }

  ngOnInit() {}
}
