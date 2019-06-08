const express = require("express");
const cities = require("cities.json");
const searchCities = require("./search");
const app = express();

app.get("/citysearch", (req, res) => {
  const search = req.query.search;
  const results = searchCities(cities, "name", search);
  res.send(results);
});

app.listen(3000);
