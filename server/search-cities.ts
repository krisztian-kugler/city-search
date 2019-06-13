import City from "../src/app/models/city.model";

const searchCities = (cities: City[], prop: string, searchValue: string, limit: number = 10): City[] => {
  const results: City[] = [];

  for (let city of cities) {
    if (city[prop].toLowerCase().startsWith(searchValue.toLowerCase())) {
      results.push({ ...city });
      limit--;
    }

    if (limit === 0) break;
  }

  return results;
};

export default searchCities;
