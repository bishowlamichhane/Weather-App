import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { IoSearch } from "react-icons/io5";
import {
  WiHumidity,
  WiCloudy,
  WiThermometer,
  WiDaySunny,
  WiCloud,
  WiRain,
  WiStars,
} from "react-icons/wi";
import { BsClock } from "react-icons/bs";

import "./App.css";

const App = () => {
  const cityElement = useRef(null);
  const [weatherInfo, setWeatherInfo] = useState(null);
  const [weatherForecast, setWeatherForecast] = useState(null);
  const [similarResults, setSimilarResults] = useState([]);
  const CARDS_TO_SHOW = 5;

  useEffect(() => {
    try {
      const fetchInfo = async () => {
        const res = await axios.get(
          `http://api.weatherapi.com/v1/forecast.json?key=${
            import.meta.env.VITE_WEATHER_API_KEY
          }&q=Nepal&days=1&aqi=no&alerts=no`
        );
        console.log(res.data.forecast);
        setWeatherInfo(res.data);
        setWeatherForecast(res.data.forecast);
      };
      fetchInfo();
    } catch (err) {
      console.error("Error retrieving data");
    }
  }, []);
  const searchingElements = async (e) => {
    try {
      const response = await axios.get(
        `http://api.weatherapi.com/v1/search.json?key=${
          import.meta.env.VITE_WEATHER_API_KEY
        }&q=${e}`
      );
      setSimilarResults(response.data);
    } catch (err) {
      console.error(err);
    }
  };
  const showWeather = async (e) => {
    e.preventDefault();
    try {
      const city = cityElement.current.value;
      const response = await axios.get(
        `http://api.weatherapi.com/v1/forecast.json?key=${
          import.meta.env.VITE_WEATHER_API_KEY
        }&q=${city}&days=1&aqi=no&alerts=no`
      );
      console.log(response.data);
      setWeatherInfo(response.data);
      setWeatherForecast(response.data.forecast);
      setSimilarResults([]);
      cityElement.current.value = "";
    } catch (error) {
      console.error("Error fetching weather data:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-400 via-emerald-300 to-blue-600 p-8 relative overflow-hidden">
      {/* Animated Weather Background Icons */}
      <WiDaySunny
        className="absolute top-[-60px] left-[-60px] text-yellow-300 opacity-30 animate-spin-slow z-0"
        size={180}
      />
      <WiCloud
        className="absolute top-24 left-32 text-blue-200 opacity-40 animate-cloud-move z-0"
        size={120}
      />
      <WiRain
        className="absolute bottom-10 right-32 text-blue-300 opacity-30 animate-raindrop z-0"
        size={100}
      />
      <WiStars
        className="absolute bottom-0 left-0 text-yellow-100 opacity-20 animate-twinkle z-0"
        size={120}
      />
      {/* Weather-themed BG image overlay (more visible) */}
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80')] bg-cover bg-center opacity-30 blur-[2px] z-0"></div>
      {/* Radial gradient overlay for extra pop */}
      <div
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          background:
            "radial-gradient(circle at 60% 40%, rgba(255,255,255,0.25) 0%, rgba(0,0,0,0) 70%)",
        }}
      ></div>
      <div className="max-w-6xl mx-auto relative z-10 animate-fadeInPage">
        {/* Search Bar */}
        <div className="w-full max-w-md mx-auto mb-8 relative">
          <div className="relative flex items-center bg-white rounded-2xl shadow-md">
            <input
              type="text"
              ref={cityElement}
              onChange={(e) => searchingElements(e.target.value)}
              placeholder="Enter your city"
              className="w-full px-6 py-4 text-lg rounded-2xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
            <button
              onClick={showWeather}
              className="absolute right-4 text-gray-500 hover:text-emerald-600 transition-colors"
            >
              <IoSearch size={28} className="cursor-pointer" />
            </button>
          </div>
          {similarResults.length > 0 && (
            <div
              className="absolute left-0 right-0 z-20 bg-white/90 rounded-xl shadow-lg mt-2 p-2 max-h-60 overflow-y-auto animate-fadeInDropdown"
              style={{ top: "100%" }}
            >
              {similarResults.map((result, index) => (
                <div
                  key={
                    result.id ||
                    result.name + result.region + result.country + index
                  }
                  className="px-4 py-2 hover:bg-emerald-100 cursor-pointer rounded transition"
                  onClick={() => {
                    cityElement.current.value = result.name;
                    setSimilarResults([]);
                  }}
                >
                  <span className="font-semibold">{result.name}</span>
                  {result.region && (
                    <span className="text-gray-500 ml-2">{result.region}</span>
                  )}
                  <span className="text-gray-400 ml-2">{result.country}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Weather Dashboard */}
        {weatherInfo && weatherForecast && (
          <div className="flex flex-col lg:flex-row gap-6 animate-fadeInSection">
            {/* Main Weather Card */}
            <div className="lg:w-1/3">
              <div className="bg-white/80 backdrop-blur rounded-2xl shadow-xl overflow-hidden animate-fadeInCard">
                <div className="p-8 relative">
                  {/* Animated sun/cloud in card */}
                  <WiDaySunny
                    className="absolute top-2 right-4 text-yellow-200 opacity-40 animate-spin-slow"
                    size={60}
                  />
                  <div className="flex flex-col items-center text-center">
                    <div className="flex items-center space-x-4 mb-6">
                      <img
                        src={weatherInfo.current.condition.icon}
                        alt={weatherInfo.current.condition.text}
                        className="w-20 h-20 drop-shadow"
                      />
                      <div className="flex items-baseline">
                        <span className="text-7xl font-bold text-gray-900">
                          {Math.round(weatherInfo.current.temp_c)}
                        </span>
                        <span className="text-3xl text-gray-600 ml-1">°C</span>
                      </div>
                    </div>
                    <h2 className="text-2xl font-semibold text-gray-800 mb-2">
                      {weatherInfo.current.condition.text}
                    </h2>
                    <div className="flex items-center text-gray-600 mb-4">
                      <p className="text-lg">
                        {weatherInfo.location.name},{" "}
                        {weatherInfo.location.country}
                      </p>
                    </div>
                    <div className="flex items-center text-gray-500 text-sm">
                      <BsClock className="mr-1" />
                      <p>Last Updated: {weatherInfo.location.localtime}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Weather Stats */}
              <div className="bg-white/80 backdrop-blur rounded-2xl shadow-xl overflow-hidden mt-6 animate-fadeInCard">
                <div className="p-6 grid grid-cols-2 gap-4">
                  <div className="flex flex-col items-center p-4 rounded-xl bg-blue-50">
                    <WiHumidity className="text-4xl text-blue-600 mb-2 animate-bounce" />
                    <p className="text-sm text-gray-600">Humidity</p>
                    <p className="text-xl font-semibold text-gray-800">
                      {weatherInfo.current.humidity}%
                    </p>
                  </div>
                  <div className="flex flex-col items-center p-4 rounded-xl bg-gray-50">
                    <WiCloudy className="text-4xl text-gray-600 mb-2 animate-cloud-move" />
                    <p className="text-sm text-gray-600">Cloud Cover</p>
                    <p className="text-xl font-semibold text-gray-800">
                      {weatherInfo.current.cloud}%
                    </p>
                  </div>
                  <div className="flex flex-col items-center p-4 rounded-xl bg-orange-50">
                    <WiThermometer className="text-4xl text-orange-600 mb-2 animate-pulse" />
                    <p className="text-sm text-gray-600">Feels Like</p>
                    <p className="text-xl font-semibold text-gray-800">
                      {Math.round(weatherInfo.current.feelslike_c)}°C
                    </p>
                  </div>
                  <div className="flex flex-col items-center p-4 rounded-xl bg-purple-50">
                    <WiHumidity className="text-4xl text-purple-600 mb-2 animate-bounce" />
                    <p className="text-sm text-gray-600">Rain Chance</p>
                    <p className="text-xl font-semibold text-gray-800">
                      {weatherInfo.current.chance_of_rain}%
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Hourly Forecast */}
            <div className="lg:w-2/3">
              <div className="bg-white/80 backdrop-blur rounded-3xl shadow-2xl p-8 relative">
                <div className="flex items-center mb-6">
                  <h3 className="text-3xl font-extrabold text-gray-900 tracking-tight mr-4">
                    Today's Forecast
                  </h3>
                  <span className="flex-1 h-1 bg-gradient-to-r from-emerald-400 to-teal-200 rounded"></span>
                </div>
                {weatherForecast.forecastday &&
                weatherForecast.forecastday[0] &&
                weatherForecast.forecastday[0].hour &&
                weatherForecast.forecastday[0].hour.length > 0 ? (
                  <div className="overflow-x-auto max-h-[70vh]">
                    <table className="min-w-full text-left text-gray-700 rounded-2xl overflow-hidden shadow-xl animate-fadeInTable bg-white/60 backdrop-blur border border-emerald-100">
                      <thead className="sticky top-0 bg-white/80 z-10">
                        <tr>
                          <th className="py-3 px-6 font-bold text-lg">Time</th>
                          <th className="py-3 px-6 font-bold text-lg">Temp</th>
                          <th className="py-3 px-6 font-bold text-lg">
                            Condition
                          </th>
                          <th className="py-3 px-6 font-bold text-lg">
                            <span className="inline-flex items-center gap-1">
                              <svg
                                className="w-5 h-5 inline-block text-blue-400"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                viewBox="0 0 24 24"
                              >
                                <path d="M16 13v-1a4 4 0 00-8 0v1" />
                                <path d="M12 17v.01" />
                                <path d="M12 21v.01" />
                                <path d="M12 13v.01" />
                              </svg>
                              Rain
                            </span>
                          </th>
                          <th className="py-3 px-6 font-bold text-lg">
                            <span className="inline-flex items-center gap-1">
                              <svg
                                className="w-5 h-5 inline-block text-blue-400"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                viewBox="0 0 24 24"
                              >
                                <path d="M12 2a7 7 0 017 7c0 5.25-7 13-7 13S5 14.25 5 9a7 7 0 017-7z" />
                              </svg>
                              Humidity
                            </span>
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {weatherForecast.forecastday[0].hour.map(
                          (hourData, index) => (
                            <tr
                              key={index}
                              className="hover:bg-emerald-50/60 transition-colors duration-200 animate-fadeInRow"
                              style={{
                                animationDelay: `${index * 40}ms`,
                                animationFillMode: "forwards",
                              }}
                            >
                              <td className="py-3 px-6 font-semibold text-base">
                                <span className="inline-block bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full font-bold shadow-sm">
                                  {hourData.time.split(" ")[1]}
                                </span>
                              </td>
                              <td className="py-3 px-6 font-bold text-xl align-middle">
                                {Math.round(hourData.temp_c)}°C
                              </td>
                              <td className="py-3 px-6 align-middle">
                                <span className="inline-flex items-center gap-2">
                                  <img
                                    src={hourData.condition.icon}
                                    alt={hourData.condition.text}
                                    className="w-8 h-8 inline-block align-middle"
                                  />
                                  <span className="text-base font-medium align-middle">
                                    {hourData.condition.text}
                                  </span>
                                </span>
                              </td>
                              <td className="py-3 px-6 text-base font-semibold align-middle">
                                <span className="inline-flex items-center gap-1">
                                  <svg
                                    className="w-4 h-4 text-blue-400"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    viewBox="0 0 24 24"
                                  >
                                    <path d="M16 13v-1a4 4 0 00-8 0v1" />
                                    <path d="M12 17v.01" />
                                    <path d="M12 21v.01" />
                                    <path d="M12 13v.01" />
                                  </svg>
                                  {hourData.chance_of_rain}%
                                </span>
                              </td>
                              <td className="py-3 px-6 text-base font-semibold align-middle">
                                <span className="inline-flex items-center gap-1">
                                  <svg
                                    className="w-4 h-4 text-blue-400"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    viewBox="0 0 24 24"
                                  >
                                    <path d="M12 2a7 7 0 017 7c0 5.25-7 13-7 13S5 14.25 5 9a7 7 0 017-7z" />
                                  </svg>
                                  {hourData.humidity}%
                                </span>
                              </td>
                            </tr>
                          )
                        )}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <div className="flex-1 flex items-center justify-center text-gray-400 text-lg">
                    No forecast data available.
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
