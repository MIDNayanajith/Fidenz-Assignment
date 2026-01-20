import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const WeatherChart = ({ data }) => {
  return (
    <div className="bg-white rounded-xl shadow p-6 mb-8">
      <h2 className="text-2xl font-bold mb-4 text-blue-600">
        Comfort Score and Temperature Trend Across Cities
      </h2>
      <ResponsiveContainer width="100%" height={400}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="city" angle={-45} textAnchor="end" height={70} />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line
            type="monotone"
            dataKey="comfortScore"
            stroke="#2196F3"
            activeDot={{ r: 8 }}
            name="Comfort Score"
          />
          <Line
            type="monotone"
            dataKey="temperature"
            stroke="#82ca9d"
            name="Temperature (°C)"
          />
          <Line
            type="monotone"
            dataKey="humidity"
            stroke="#8884d8"
            name="Humidity (%)"
          />
          <Line
            type="monotone"
            dataKey="windSpeed"
            stroke="#ffc658"
            name="Wind Speed (m/s)"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default WeatherChart;
