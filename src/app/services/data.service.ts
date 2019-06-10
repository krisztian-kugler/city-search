import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import City from "../models/city.model";

@Injectable()
export class DataService {
  constructor(private http: HttpClient) {}

  public searchValue: string;
  public disableSearch: boolean = true;

  private _selectedCity: City = null;

  public get selectedCity(): City {
    return { ...this._selectedCity };
  }

  public set selectedCity(city: City) {
    if (city) {
      this._selectedCity = { ...city };
      this.disableSearch = false;
    } else {
      this._selectedCity = null;
      this.disableSearch = true;
    }
  }

  private _cache = {};

  public getCache(query: string): City[] {
    if (this._cache[query]) {
      return [...this._cache[query]];
    } else {
      return null;
    }
  }

  public setCache(params: { query: string; cities: City[] }) {
    this._cache[params.query] = params.cities;
  }

  public getCities(searchQuery: string): Observable<Object> {
    const url: string = `/citysearch?search=${encodeURIComponent(searchQuery)}`;
    return this.http.get(url);
  }
}
