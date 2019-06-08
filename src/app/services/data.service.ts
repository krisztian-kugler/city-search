import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import City from "../models/city.model";
import { Observable } from "rxjs";

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

  public getCities(searchQuery: string): Observable<Object> {
    const url: string = `/citysearch?search=${encodeURIComponent(searchQuery)}`;
    return this.http.get(url);
  }

  public searchImages(searchQuery: string): Observable<Object> {
    const url: string = `https://www.google.com/search?q=${searchQuery}&tbm=isch`;
    return this.http.get(url);
  }
}
