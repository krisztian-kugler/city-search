import { fakeAsync } from "@angular/core/testing";
import { from } from "rxjs";
import { DataService } from "./data.service";

describe("DataService", () => {
  let dataService: DataService;

  beforeEach(() => {
    dataService = new DataService(null);
  });

  it("should enable search if 'selectedCity' is set", () => {
    dataService.selectedCity = { name: "testCity", country: "testCountry", lat: "123", lng: "456" };

    expect(dataService.disableSearch).toBe(false);
  });

  it("should disable search if 'selectedCity' is not set", () => {
    dataService.selectedCity = null;

    expect(dataService.disableSearch).toBe(true);
  });

  it("should return cached cities for a given search string", () => {
    dataService.setCache({ query: "test", cities: [{ name: "testCity", country: "testCountry", lat: "123", lng: "456" }] });

    expect(dataService.getCache("test")).toEqual([{ name: "testCity", country: "testCountry", lat: "123", lng: "456" }]);
  });

  it("should return null if there are no cached cities for a given search string", () => {
    expect(dataService.getCache("dummy")).toBe(null);
  });

  it("should fetch cities when calling 'getCities'", fakeAsync(() => {
    spyOn(dataService, "getCities").and.returnValue(from([{ name: "testCity", country: "testCountry", lat: "123", lng: "456" }]));

    dataService.getCities("test").subscribe(response => {
      expect(response).toEqual({ name: "testCity", country: "testCountry", lat: "123", lng: "456" });
    });
  }));
});
