module.exports = (cities, prop, searchQuery, limit = 10) => {
  const results = [];

  for (let city of cities) {
    if (city[prop].toLowerCase().startsWith(searchQuery.toLowerCase())) {
      results.push({ ...city });
      limit--;
    }

    if (limit === 0) break;
  }

  return results;
};
