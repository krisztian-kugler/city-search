import { TestBed, async, ComponentFixture, tick, fakeAsync } from "@angular/core/testing";
import { DebugElement } from "@angular/core";
import { By } from "@angular/platform-browser";
import { FormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";

import { SearchComponent } from "./search.component";
import { DropdownMenuComponent } from "./dropdown-menu/dropdown-menu.component";
import { DropdownItemComponent } from "./dropdown-menu/dropdown-item/dropdown-item.component";
import { LoaderComponent } from "./dropdown-menu/loader/loader.component";

import { DataService } from "src/app/services/data.service";

import { MarkerPipe } from "src/app/pipes/marker.pipe";
import { from } from "rxjs";

describe("SearchComponent", () => {
  let component: SearchComponent;
  let fixture: ComponentFixture<SearchComponent>;
  let dataServiceStub: Partial<DataService>;

  beforeEach(async(() => {
    dataServiceStub = {
      selectedCity: { name: "testCity", country: "testCountry", lat: "123", lng: "456" },
      disableSearch: null
    };

    TestBed.configureTestingModule({
      declarations: [SearchComponent, DropdownMenuComponent, DropdownItemComponent, LoaderComponent, MarkerPipe],
      imports: [FormsModule, HttpClientModule],
      providers: [{ provide: DataService, useValue: dataServiceStub }]
      //providers: [DataService]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    fixture.destroy();
  });

  it("should update the inputValue property on user input", () => {
    const searchInput: HTMLInputElement = fixture.debugElement.query(By.css(".search-input")).nativeElement;

    searchInput.value = "test";
    searchInput.dispatchEvent(new Event("input"));
    fixture.detectChanges();

    expect(component.inputValue).toBe("test");
  });

  it("should update the value in the search input when inputValue changes", fakeAsync(() => {
    const searchInput: HTMLInputElement = fixture.debugElement.query(By.css(".search-input")).nativeElement;

    component.inputValue = "test";
    fixture.detectChanges();
    tick();
    expect(searchInput.value).toBe("test");
  }));

  it("should close the dropdown menu when clicking the 'X' icon in the input field", done => {
    const dropdownMenu: DebugElement = fixture.debugElement.query(By.directive(DropdownMenuComponent));

    component.clearInput();
    fixture.detectChanges();

    fixture.whenStable().then(() => {
      expect(dropdownMenu).toBeFalsy();
      done();
    });
  });

  it("should clear the selectedCity variable in DataService when clicking the 'X' icon in the input field", () => {
    const dataService: DataService = TestBed.get(DataService);

    component.clearInput();
    fixture.detectChanges();

    expect(dataService.selectedCity).toBeFalsy();
  });

  it("should enable the Search button if dataService.disableSearch is set to true", fakeAsync(() => {
    const searchButton: HTMLButtonElement = fixture.debugElement.query(By.css(".search-button")).nativeElement;
    const dataService: DataService = TestBed.get(DataService);

    dataService.disableSearch = true;
    fixture.detectChanges();
    tick();
    expect(searchButton.disabled).toBeTruthy();
  }));

  it("should disable the Search button if dataService.disableSearch is set to false", fakeAsync(() => {
    const searchButton: HTMLButtonElement = fixture.debugElement.query(By.css(".search-button")).nativeElement;
    const dataService: DataService = TestBed.get(DataService);

    dataService.disableSearch = false;
    fixture.detectChanges();
    tick();
    expect(searchButton.disabled).toBeFalsy();
  }));

  it("should call the searchPhotos method when clicking the search button", () => {
    const searchButton: HTMLButtonElement = fixture.debugElement.query(By.css(".search-button")).nativeElement;
    spyOn(component, "searchPhotos").and.returnValue(null);

    searchButton.dispatchEvent(new Event("click"));

    expect(component.searchPhotos).toHaveBeenCalled();
  });
});
