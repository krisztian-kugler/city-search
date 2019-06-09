import express, { Application, Request, Response } from "express";
import cities from "cities.json";
import searchCities from "./search-cities";
import City from "../src/app/models/city.model";

const app: Application = express();

app.get("/citysearch", (req: Request, res: Response) => {
  const results: City[] = searchCities(cities as City[], "name", req.query.search);
  res.send(results);
});

const server = app.listen(3000, () => {
  console.log(`Server is running at http://localhost:${server.address().port}`);
});
