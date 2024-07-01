import express from "express";
import { getWeather } from "./controller.js";
const weather = express.Router();

weather.get("/hello", getWeather);

export default weather;
