import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";

import { AppComponent } from "./app.component";
import { SearchComponent } from "./components/search/search.component";
import { DropdownMenuComponent } from "./components/search/dropdown-menu/dropdown-menu.component";
import { DropdownItemComponent } from "./components/search/dropdown-menu/dropdown-item/dropdown-item.component";
import { LoaderComponent } from "./components/search/dropdown-menu/loader/loader.component";

import { HttpService } from "./services/http.service";
import { DataService } from "./services/data.service";

import { MarkerPipe } from "./pipes/marker.pipe";

@NgModule({
  declarations: [AppComponent, SearchComponent, DropdownMenuComponent, DropdownItemComponent, LoaderComponent, MarkerPipe],
  imports: [BrowserModule, FormsModule, HttpClientModule],
  providers: [HttpService, DataService],
  bootstrap: [AppComponent]
})
export class AppModule {}
