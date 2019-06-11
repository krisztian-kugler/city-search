import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable()
export class HttpService {
  constructor(private http: HttpClient) {}

  public getCities(searchQuery: string): Observable<Object> {
    const url: string = `/citysearch?search=${encodeURIComponent(searchQuery)}`;
    return this.http.get(url);
  }
}
