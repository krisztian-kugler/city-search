import City from "../src/app/models/city.model";

const searchCities = (cities: City[], prop: string, searchQuery: string, limit: number = 10): City[] => {
  const results: City[] = [];

  for (let city of cities) {
    if (city[prop].toLowerCase().startsWith(searchQuery.toLowerCase())) {
      results.push({ ...city });
      limit--;
    }

    if (limit === 0) break;
  }

  return results;
};

export default searchCities;
