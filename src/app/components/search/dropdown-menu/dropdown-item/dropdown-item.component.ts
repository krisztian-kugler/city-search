import { Component, OnInit, Input } from "@angular/core";
import City from "src/app/models/city.model";

@Component({
  selector: "cs-dropdown-item",
  templateUrl: "./dropdown-item.component.html",
  styleUrls: ["./dropdown-item.component.sass"]
})
export class DropdownItemComponent implements OnInit {
  constructor() {}

  @Input() public city: City;

  ngOnInit() {}
}
