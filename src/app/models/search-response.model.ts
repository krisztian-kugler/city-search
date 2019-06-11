import City from "./city.model";

export default interface SearchResponse {
  searchValue: string;
  cities: City[];
}
