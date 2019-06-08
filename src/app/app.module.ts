import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { AppRoutingModule } from "./app-routing.module";

import { AppComponent } from "./app.component";
import { SearchComponent } from "./components/search/search.component";
import { DropdownMenuComponent } from "./components/search/dropdown-menu/dropdown-menu.component";
import { DropdownItemComponent } from "./components/search/dropdown-menu/dropdown-item/dropdown-item.component";

import { DataService } from "./services/data.service";

@NgModule({
  declarations: [AppComponent, SearchComponent, DropdownMenuComponent, DropdownItemComponent],
  imports: [BrowserModule, FormsModule, HttpClientModule, AppRoutingModule],
  providers: [DataService],
  bootstrap: [AppComponent]
})
export class AppModule {}
