import { Component, AfterViewInit, ViewChild, ElementRef, OnDestroy } from "@angular/core";
import { fromEvent, Subscription } from "rxjs";
import { map, tap, filter, debounceTime, switchMap } from "rxjs/operators";
import { HttpService } from "src/app/services/http.service";
import { DataService } from "src/app/services/data.service";
import City from "src/app/models/city.model";

@Component({
  selector: "cs-search",
  templateUrl: "./search.component.html",
  styleUrls: ["./search.component.sass"]
})
export class SearchComponent implements AfterViewInit, OnDestroy {
  constructor(private httpService: HttpService, private dataService: DataService) {}

  public inputValue: string = "";
  public showDropdown: boolean = false;
  public loadingData: boolean = true;
  public inputStream: Subscription;

  @ViewChild("searchInput", { static: false }) searchInput: ElementRef<HTMLInputElement>;

  public clearInput(): void {
    this.inputValue = "";
    this.searchInput.nativeElement.focus();
    this.showDropdown = false;
    this.dataService.selectedCity = null;
  }

  public onSelectCity(city: City): void {
    this.inputValue = city.name;
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

        tap((inputValue: string) => {
          this.dataService.disableSearch = true;

          if (!inputValue) {
            this.showDropdown = false;
          } else {
            this.dataService.inputValue = inputValue;
            if (this.dataService.getCache(inputValue)) {
              this.dataService.searchResponseStream.next({
                searchValue: inputValue,
                cities: this.dataService.getCache(inputValue)
              });
              this.showDropdown = true;
            }
          }
        }),

        debounceTime(500),

        filter((inputValue: string) => {
          if (!inputValue) return false;
          else return true;
        }),

        filter((inputValue: string) => !this.dataService.getCache(inputValue)),

        tap(() => {
          this.loadingData = true;
          this.showDropdown = true;
        }),

        switchMap((inputValue: string) => this.dataService.getCities(inputValue))
      )
      .subscribe(
        (response: { searchValue: string; cities: City[] }) => {
          this.dataService.searchResponseStream.next(response);
          this.dataService.setCache({ query: this.searchInput.nativeElement.value, cities: response.cities });
          this.loadingData = false;
        },
        (error: Error) => console.log(error)
      );
  }

  ngOnDestroy(): void {
    this.inputStream.unsubscribe();
  }
}
