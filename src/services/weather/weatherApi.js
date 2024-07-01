import axios from "axios";
import dotenv from "dotenv";
import { logger } from "../../utils/logger.js";
dotenv.config();
const { WEATHER_API_KEY } = process.env;

/**
 * Fetches the current weather conditions for a given IP address.
 *
 * @param {string} ipAdress - The IP address to fetch the weather conditions for.
 * @returns {Promise<object>} - The current weather data for the given IP address.
 */
export class WeatherApi {
  static async fetchtWeatherCondition(ipAdress) {
    try {
      const response = await axios.get(
        "http://api.weatherapi.com/v1/current.json",
        {
          params: {
            key: WEATHER_API_KEY,
            q: ipAdress,
          },
        }
      );
      return response.data;
    } catch (err) {
      logger.error(err.message);
    }
  }
}
