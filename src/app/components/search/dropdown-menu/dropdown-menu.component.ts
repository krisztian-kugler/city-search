import { Component, OnInit, Input, Output, EventEmitter, HostListener } from "@angular/core";
import City from "src/app/models/city.model";
import { DataService } from "src/app/services/data.service";

@Component({
  selector: "cs-dropdown-menu",
  templateUrl: "./dropdown-menu.component.html",
  styleUrls: ["./dropdown-menu.component.sass"]
})
export class DropdownMenuComponent implements OnInit {
  constructor(private dataService: DataService) {}

  @HostListener("focus") focusevent() {
    console.log("focused");
  }

  @Input() public loadingData: boolean = false;
  @Input() public searchValue: string;

  @Output() selectCity = new EventEmitter<City>();

  @Input() public cities: City[];
  public foundCities: boolean = true;

  public onSelect(city: City): void {
    this.dataService.selectedCity = city;
    this.selectCity.emit(city);
  }

  ngOnInit() {}
}
