import { Component, OnInit } from "@angular/core";
import { DataService } from "src/app/services/data.service";
import City from "src/app/models/city.model";

@Component({
  selector: "cs-search",
  templateUrl: "./search.component.html",
  styleUrls: ["./search.component.sass"]
})
export class SearchComponent implements OnInit {
  constructor(private dataService: DataService) {}

  public searchQuery: string = "";
  public cities: City[];

  public onInput(): void {
    this.dataService.getCities(this.searchQuery).subscribe((cities: City[]) => {
      console.log(cities);
      this.cities = cities;
    });
  }

  public onClear(): void {
    this.searchQuery = "";
    this.cities = [];
  }

  ngOnInit() {}
}
