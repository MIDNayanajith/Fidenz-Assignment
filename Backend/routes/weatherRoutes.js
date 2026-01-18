import express from "express";
import { getWeatherData, getCacheStatus } from "../services/weatherService.js";

const router = express.Router();

router.get("/getWeather", getWeatherData);
router.get("/cache-status", getCacheStatus);

export default router;
