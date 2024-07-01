import { WeatherApi } from "../../services/weather/weatherApi.js";
import { paramSchema } from "./schema.js";

/**
 * Fetches the current weather conditions for the client's IP address and returns a JSON response with the client's IP, location, and a greeting message with the current temperature.
 *
 * @param {Object} req - The Express request object.
 * @param {string} req.ip - The IP address of the client.
 * @param {Object} req.query - The query parameters from the request.
 * @param {string} req.query.visitor_name - The name of the visitor.
 * @param {Object} res - The Express response object.
 * @param {Function} next - The next middleware function.
 * @returns {Promise<void>} - A Promise that resolves when the response is sent.
 */
export async function getWeather(req, res, next) {
  try {
    const params = await paramSchema.validateAsync(req.query);
    const weather = await WeatherApi.fetchtWeatherCondition(req.ip);
    console.log(weather)
    res.status(200).json({
      client_ip: `${req.ip}`,
      location: weather.location.region,
      greeting: `Hello ${params.visitor_name}!, the temperature is ${weather.current.temp_c} degrees Celcius in ${weather.location.region}`,
    });
  } catch (err) {
    next(err);
  }
}
