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
export class SearchComponent implements AfterViewInit {
  constructor(private dataService: DataService) {}

  public searchValue: string = "";
  public cities: City[] = [];
  public input: Subscription;
  public showDropdown: boolean = false;
  public loadingData: boolean = true;

  @ViewChild("searchInput", { static: false }) searchInput: ElementRef<HTMLInputElement>;

  public searchPhotos(): void {
    open(`https://www.google.com/search?q=${this.dataService.selectedCity.name}&tbm=isch`);
  }

  public closeDropdown(event: PointerEvent) {
    let element: HTMLElement = event.target as HTMLElement;

    do {
      if (!element.classList.contains("dropdown-menu")) {
        element = element.parentElement;
      } else {
        return;
      }
    } while (element.parentElement);

    this.showDropdown = false;
  }

  public clearInput(): void {
    this.searchValue = "";
    this.searchInput.nativeElement.focus();
    this.showDropdown = false;
    this.dataService.selectedCity = null;
  }

  public onSelectCity(city: City): void {
    this.showDropdown = false;
    this.searchValue = city.name;
  }

  ngAfterViewInit(): void {
    /*
    The code below creates an observable stream from the input event on the search input field.
    If the search value has a corresponding array of results in the cache (which resides in the data service),
    then it uses the cached results, otherwise it initiates a request to the backend to fetch new data
    (which is added to the cache object if the response is succesful). The caching function and the 500ms debouncer together minimizes the network traffic
    toward the backend.
    */
    this.input = fromEvent<any>(this.searchInput.nativeElement, "input")
      .pipe(
        map((event: any) => event.target.value),
        tap((value: string) => {
          this.dataService.searchValue = value;
          if (this.dataService.getCache(value)) {
            value ? (this.showDropdown = true) : (this.showDropdown = false);
            this.cities = this.dataService.getCache(value);
          }
        }),
        filter((value: string) => {
          return !this.dataService.getCache(value);
        }),
        debounceTime(500),
        tap(value => {
          this.loadingData = true;
          value ? (this.showDropdown = true) : (this.showDropdown = false);
        }),
        switchMap((value: string) => this.dataService.getCities(value))
      )
      .subscribe(
        (cities: City[]) => {
          this.cities = cities;
          this.dataService.setCache({
            query: this.searchInput.nativeElement.value,
            cities
          });
          this.loadingData = false;
        },
        (error: Error) => {
          console.log(error);
        }
      );
  }

  ngOnDestroy(): void {
    this.input.unsubscribe();
  }
}
