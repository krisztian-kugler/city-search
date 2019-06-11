import { Component, Input } from "@angular/core";
import City from "src/app/models/city.model";

@Component({
  selector: "cs-dropdown-item",
  templateUrl: "./dropdown-item.component.html",
  styleUrls: ["./dropdown-item.component.sass"]
})
export class DropdownItemComponent {
  @Input() public city: City;
}
