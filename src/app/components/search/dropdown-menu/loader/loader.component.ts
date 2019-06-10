import { Component, OnInit } from "@angular/core";

@Component({
  selector: "cs-loader",
  template: `
    <div class="loader"></div>
  `,
  styleUrls: ["./loader.component.sass"]
})
export class LoaderComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
