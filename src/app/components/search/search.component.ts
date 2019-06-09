import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from "@angular/core";
import { fromEvent, Subscription } from "rxjs";
import { map, tap, filter, debounceTime, switchMap } from "rxjs/operators";
import { DataService } from "src/app/services/data.service";
import City from "src/app/models/city.model";

@Component({
  selector: "cs-search",
  templateUrl: "./search.component.html",
  styleUrls: ["./search.component.sass"]
})
export class SearchComponent implements OnInit, AfterViewInit {
  constructor(private dataService: DataService) {}

  private _searchQuery: string = "";

  public get searchQuery(): string {
    return this._searchQuery;
  }

  public cities: City[];
  public input: Subscription;

  @ViewChild("searchInput", { static: false }) searchInput: ElementRef<HTMLInputElement>;

  ngOnInit() {}

  ngAfterViewInit(): void {
    this.input = fromEvent<any>(this.searchInput.nativeElement, "input")
      .pipe(
        map((event: any) => event.target.value),
        tap((value: string) => {
          if (this.dataService.cache[value]) this.cities = this.dataService.cache[value];
        }),
        filter((value: string) => {
          return !this.dataService.cache[value];
        }),
        debounceTime(500),
        switchMap((value: string) => this.dataService.getCities(value))
      )
      .subscribe((cities: City[]) => {
        this.cities = cities;
        this.dataService.setCache({
          query: this.searchInput.nativeElement.value,
          cities
        });
      });
  }

  ngOnDestroy(): void {
    this.input.unsubscribe();
  }
}
