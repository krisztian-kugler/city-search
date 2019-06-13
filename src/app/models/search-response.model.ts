import City from "./city.model";

export default interface SearchResponse {
  status: "ok" | "error";
  searchValue: string;
  cities: City[];
}
