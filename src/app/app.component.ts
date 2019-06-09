import { Component, OnInit } from "@angular/core";
import { DataService } from "./services/data.service";

@Component({
  selector: "cs-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.sass"]
})
export class AppComponent implements OnInit {
  constructor(public dataService: DataService) {}

  ngOnInit() {}
}
