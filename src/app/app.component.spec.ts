import { TestBed, async, ComponentFixture } from "@angular/core/testing";
import { DebugElement } from "@angular/core";
import { BrowserModule, By } from "@angular/platform-browser";
import { FormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";

import { AppComponent } from "./app.component";
import { SearchComponent } from "./components/search/search.component";
import { DropdownMenuComponent } from "./components/search/dropdown-menu/dropdown-menu.component";
import { DropdownItemComponent } from "./components/search/dropdown-menu/dropdown-item/dropdown-item.component";
import { LoaderComponent } from "./components/search/dropdown-menu/loader/loader.component";

import { DataService } from "./services/data.service";

import { MarkerPipe } from "./pipes/marker.pipe";

describe("AppComponent", () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AppComponent, SearchComponent, DropdownMenuComponent, DropdownItemComponent, LoaderComponent, MarkerPipe],
      imports: [BrowserModule, FormsModule, HttpClientModule],
      providers: [DataService]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
  });

  it("should create the component", () => {
    component = fixture.componentInstance;

    expect(component).toBeTruthy();
  });

  it("should display 'City Search' in the header", () => {
    const heading: HTMLHeadingElement = fixture.debugElement.query(By.css(".heading")).nativeElement;

    expect(heading.innerText).toContain("City Search");
  });

  it("should contain exactly ONE SearchComponent", () => {
    const searchComponents: DebugElement[] = fixture.debugElement.queryAll(By.directive(SearchComponent));

    expect(searchComponents.length).toBe(1);
  });

  it("should display the current year in the footer", () => {
    const footer: HTMLElement = fixture.debugElement.query(By.css(".footer")).nativeElement;
    const year: number = new Date().getFullYear();

    expect(footer.innerText).toContain(year.toString());
  });
});
