import { Component } from "@angular/core";

@Component({
  selector: "cs-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.sass"]
})
export class AppComponent {
  public year: number = new Date().getFullYear();
}
