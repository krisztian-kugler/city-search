import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import City from "../models/city.model";

@Injectable()
export class DataService {
  constructor(private http: HttpClient) {}

  private _selectedCity: City = null;

  public get selectedCity(): City {
    return { ...this._selectedCity };
  }

  public set selectedCity(city: City) {
    this._selectedCity = { ...city };
  }

  private _cache = {};

  public get cache() {
    return { ...this._cache };
  }

  public getCache(query: string): City[] {
    return this._cache[query];
  }

  public setCache(params: { query: string; cities: City[] }) {
    this._cache[params.query] = params.cities;
  }

  public getCities(searchQuery: string): Observable<Object> {
    const url: string = `/citysearch?search=${encodeURIComponent(searchQuery)}`;
    return this.http.get(url);
  }
}
