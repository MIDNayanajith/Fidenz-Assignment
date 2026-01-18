import axios from "axios";
import fs from "fs";
import { calculateComfortScore } from "./comfortService.js";
import { weatherCache } from "./cacheService.js";
export const getWeatherData = async (req, res) => {
  try {
    //load cities
    const citiesData = JSON.parse(fs.readFileSync("cities.json", "utf-8")).List;
    const cities = citiesData.map((c) => ({
      code: c.CityCode,
      name: c.CityName,
    }));

    const apiKey = process.env.WEATHER_API_KEY;
    if (!apiKey) {
      return res.status(500).json({ error: "API key not configured" });
    }

    //fetch weather for each citty
    const weatherResult = cities.map(async (city) => {
      const cachekey = `weather_${city.code}`;
      let data = weatherCache.get(cachekey);
      let cacheStatus = "HIT";

      if (data === undefined) {
        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?id=${city.code}&units=metric&appid=${apiKey}`
        );
        data = response.data;
        weatherCache.set(cachekey, data);
        cacheStatus = "MISS";
      }

      const comfortScore = calculateComfortScore(
        data.main.temp,
        data.main.humidity,
        data.wind.speed
      );

      return {
        city: city.name,
        temperature: data.main.temp,
        description: data.weather[0].description,
        humidity: data.main.humidity,
        windSpeed: data.wind.speed,
        comfortScore,
        cacheStatus,
      };
    });
    let weatherData = await Promise.all(weatherResult);

    //sort by descending
    weatherData.sort((a, b) => b.comfortScore - a.comfortScore);

    //Add rank
    weatherData = weatherData.map((item, index) => ({
      ...item,
      rank: index + 1,
    }));

    res.json(weatherData);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch weather data" });
  }
};

//debug function for cache stats
export const getCacheStatus = (req, res) => {
  const stats = weatherCache.getStats();
  res.json(stats);
};
