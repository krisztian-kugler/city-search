import { Server } from "http";
import express, { Application, Request, Response } from "express";
import cities from "cities.json";
import searchCities from "./search-cities";
import City from "../src/app/models/city.model";
import SearchResponse from "../src/app/models/search-response.model";

const app: Application = express();

app.get("/citysearch", (req: Request, res: Response) => {
  const searchResponse: SearchResponse = {
    status: "ok",
    searchValue: req.query.search,
    cities: searchCities(cities as City[], "name", req.query.search)
  };
  res.send(searchResponse);
});

const server: Server = app.listen(3000, () => {
  console.log(`Server is running at http://localhost:${server.address().port}`);
});
