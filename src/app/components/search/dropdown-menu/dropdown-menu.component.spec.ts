import { TestBed, ComponentFixture, async } from "@angular/core/testing";
import { DebugElement } from "@angular/core";
import { By } from "@angular/platform-browser";
import { HttpClientModule } from "@angular/common/http";

import { DropdownMenuComponent } from "./dropdown-menu.component";
import { DropdownItemComponent } from "./dropdown-item/dropdown-item.component";
import { LoaderComponent } from "./loader/loader.component";

import { DataService } from "src/app/services/data.service";

import { MarkerPipe } from "src/app/pipes/marker.pipe";

describe("DropdownMenuComponent", () => {
  let component: DropdownMenuComponent;
  let fixture: ComponentFixture<DropdownMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DropdownMenuComponent, DropdownItemComponent, LoaderComponent, MarkerPipe],
      imports: [HttpClientModule],
      providers: [DataService]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DropdownMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should display 'LoaderComponent' if data is being fetched", () => {
    let loaderComponent: DebugElement;
    component.loadingData = true;

    fixture.detectChanges();
    loaderComponent = fixture.debugElement.query(By.directive(LoaderComponent));

    expect(loaderComponent).toBeTruthy();
  });

  it("should NOT display 'LoaderComponent' if there is no API request in progress", () => {
    let loaderComponent: DebugElement;
    component.loadingData = false;

    fixture.detectChanges();
    loaderComponent = fixture.debugElement.query(By.directive(LoaderComponent));

    expect(loaderComponent).toBeFalsy();
  });

  it("should display a DropdownItemComponent for each city", () => {
    let dropdownItemComponents: DebugElement[];
    component.cities = [{ name: "testCity", country: "testCountry", lat: "123", lng: "456" }];
    component.status = "ok";

    fixture.detectChanges();
    dropdownItemComponents = fixture.debugElement.queryAll(By.directive(DropdownItemComponent));

    expect(dropdownItemComponents.length).toBe(1);
  });

  it("should display a 'no results' message when no cities are found for a given string", () => {
    let noResult: HTMLDivElement;
    component.cities = [];
    component.status = "ok";
    component.searchValue = "test";

    fixture.detectChanges();
    noResult = fixture.debugElement.query(By.css(".no-result")).nativeElement;

    expect(noResult).toBeTruthy();
    expect(noResult.innerText).toContain(component.searchValue);
  });

  it("should display a 'network error' message when data cannot be fetched from the server", () => {
    let networkError: HTMLDivElement;
    component.status = "error";

    fixture.detectChanges();
    networkError = fixture.debugElement.query(By.css(".error")).nativeElement;

    expect(networkError).toBeTruthy();
  });

  it("should select a city when the user clicks on the corresponding dropdown item", () => {
    const dataService: DataService = TestBed.get(DataService);
    let dropdownItemComponent: DebugElement;
    component.cities = [{ name: "testCity", country: "testCountry", lat: "123", lng: "456" }];
    component.status = "ok";

    fixture.detectChanges();
    dropdownItemComponent = fixture.debugElement.query(By.directive(DropdownItemComponent));
    dropdownItemComponent.triggerEventHandler("click", dropdownItemComponent.nativeElement.city);
    fixture.detectChanges();

    expect(dataService.selectedCity).toEqual({ name: "testCity", country: "testCountry", lat: "123", lng: "456" });
  });
});
