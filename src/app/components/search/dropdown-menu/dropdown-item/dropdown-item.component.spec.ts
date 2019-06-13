import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { By } from "@angular/platform-browser";
import { HttpClientModule } from "@angular/common/http";

import { DropdownItemComponent } from "./dropdown-item.component";

import { DataService } from "src/app/services/data.service";

import { MarkerPipe } from "src/app/pipes/marker.pipe";

describe("DropdownItemComponent", () => {
  let component: DropdownItemComponent;
  let fixture: ComponentFixture<DropdownItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DropdownItemComponent, MarkerPipe],
      imports: [HttpClientModule],
      providers: [DataService]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DropdownItemComponent);
    component = fixture.componentInstance;
    component.city = { name: "testCity", country: "testCountry", lat: "123", lng: "456" };
    fixture.detectChanges();
  });

  it("should display the city name", () => {
    const cityName: HTMLParagraphElement = fixture.debugElement.query(By.css(".city-name")).nativeElement;

    expect(cityName.innerText).toBe("testCity");
  });

  it("should display the country", () => {
    const country: HTMLParagraphElement = fixture.debugElement.query(By.css(".country")).nativeElement;

    expect(country.innerText).toBe("testCountry");
  });
});
