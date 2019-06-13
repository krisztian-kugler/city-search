import { Component, OnInit, OnDestroy, Input, Output, EventEmitter } from "@angular/core";
import { Subscription } from "rxjs";
import { DataService } from "src/app/services/data.service";
import City from "src/app/models/city.model";
import SearchResponse from "src/app/models/search-response.model";

@Component({
  selector: "cs-dropdown-menu",
  templateUrl: "./dropdown-menu.component.html",
  styleUrls: ["./dropdown-menu.component.sass"]
})
export class DropdownMenuComponent implements OnInit, OnDestroy {
  constructor(private dataService: DataService) {}

  public status: "ok" | "error";
  public searchValue: string;
  public cities: City[];
  private searchResponseStream: Subscription;

  @Input() public loadingData: boolean = false;

  @Output() public selectCity = new EventEmitter<City>();

  public onSelect(city: City): void {
    this.dataService.selectedCity = city;
    this.selectCity.emit(city);
  }

  ngOnInit(): void {
    this.searchResponseStream = this.dataService.searchResponseStream.subscribe((searchResponse: SearchResponse) => {
      if (searchResponse) {
        this.status = searchResponse.status;
        this.searchValue = searchResponse.searchValue;
        this.cities = searchResponse.cities;
      }
    });
  }

  ngOnDestroy(): void {
    this.searchResponseStream.unsubscribe();
  }
}
