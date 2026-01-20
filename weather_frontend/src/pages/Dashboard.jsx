import { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { withAuthenticationRequired } from "@auth0/auth0-react";
import { LogoutButton } from "../components/LogoutButton";
import WeatherChart from "../components/WeatherChart";
import FilterSort from "../components/FilterSort";

const API_BASE_URL = import.meta.env.VITE_API_URL;

const Dashboard = () => {
  const { getAccessTokenSilently } = useAuth0();
  const [originalData, setOriginalData] = useState([]);
  const [displayData, setDisplayData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = await getAccessTokenSilently();
        const res = await fetch(`${API_BASE_URL}/getWeather`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await res.json();
        setOriginalData(data);
        setDisplayData(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [getAccessTokenSilently]);

  const handleUpdateDisplay = (updatedData) => {
    setDisplayData(updatedData);
  };

  if (loading)
    return <div className="text-center mt-20">Loading weather data...</div>;

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <h1 className="text-3xl font-bold">
            Weather Comfort Index Dashboard
          </h1>

          <LogoutButton />
        </div>
        <div className="w-full md:w-auto mb-8">
          <FilterSort data={originalData} onUpdate={handleUpdateDisplay} />
        </div>

        {/* Line Chart Component */}
        <WeatherChart data={displayData} />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayData.map((city) => (
            <div
              key={city.city}
              className="bg-white rounded-xl shadow p-6 hover:shadow-lg transition"
            >
              <h3 className="text-xl font-semibold mb-2">{city.city}</h3>
              <p className="text-gray-600 capitalize">{city.description}</p>
              <p className="text-3xl font-bold mt-4">{city.temperature}°C</p>
              <p className="text-sm text-gray-500">
                Humidity: {city.humidity}%
              </p>
              <p className="text-sm text-gray-500">
                Wind: {city.windSpeed} m/s
              </p>
              <div className="mt-4 flex items-center justify-between">
                <span className="text-lg font-semibold text-blue-600">
                  Score: {city.comfortScore}
                </span>
                <span className="text-sm text-gray-500">Rank #{city.rank}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Wrap and name the component for Fast Refresh
const ProtectedDashboard = withAuthenticationRequired(Dashboard, {
  onRedirecting: () => <div>Loading...</div>,
});

export default ProtectedDashboard;
