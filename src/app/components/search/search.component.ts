import { Component, AfterViewInit, ViewChild, ElementRef } from "@angular/core";
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
  public showDropdown: boolean = false;
  public loadingData: boolean = true;
  public inputStream: Subscription;

  @ViewChild("searchInput", { static: false }) searchInput: ElementRef<HTMLInputElement>;

  public clearInput(): void {
    this.searchValue = "";
    this.searchInput.nativeElement.focus();
    this.showDropdown = false;
    this.dataService.selectedCity = null;
  }

  public onSelectCity(city: City): void {
    this.searchValue = city.name;
    this.showDropdown = false;
  }

  public closeDropdown(event: PointerEvent): void {
    let element: HTMLElement = event.target as HTMLElement;

    do {
      if (!element.classList.contains("dropdown-menu") && !element.classList.contains("search-input")) element = element.parentElement;
      else return;
    } while (element.parentElement);

    this.showDropdown = false;
  }

  public searchPhotos(): void {
    open(`https://www.google.com/search?q=${this.dataService.selectedCity.name}&tbm=isch`);
  }

  ngAfterViewInit(): void {
    this.inputStream = fromEvent<any>(this.searchInput.nativeElement, "input")
      .pipe(
        map((event: any) => event.target.value),

        tap((searchValue: string) => {
          this.dataService.disableSearch = true;

          if (!searchValue) {
            this.showDropdown = false;
          } else {
            this.dataService.searchValue = searchValue;
            if (this.dataService.getCache(searchValue)) {
              this.cities = this.dataService.getCache(searchValue);
              this.showDropdown = true;
            }
          }
        }),

        debounceTime(500),

        filter((searchValue: string) => {
          if (!searchValue) return false;
          else return true;
        }),

        filter((searchValue: string) => !this.dataService.getCache(searchValue)),

        tap(() => {
          this.loadingData = true;
          this.showDropdown = true;
        }),

        switchMap((searchValue: string) => this.dataService.getCities(searchValue))
      )
      .subscribe(
        (cities: City[]) => {
          this.cities = cities;
          this.dataService.setCache({ query: this.searchInput.nativeElement.value, cities });
          this.loadingData = false;
        },
        (error: Error) => console.log(error)
      );
  }

  ngOnDestroy(): void {
    this.inputStream.unsubscribe();
  }
}
