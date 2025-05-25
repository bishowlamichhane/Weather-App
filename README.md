# Weather Dashboard

A modern, animated weather dashboard built with React, TailwindCSS, and WeatherAPI.

## Features

- **Live Weather Search:**
  - Enter any city to instantly fetch and display current weather and hourly forecast.
- **Professional, Animated UI:**

  - Animated weather icons (sun, clouds, rain, stars) float in the background.
  - Vibrant, multi-layered background with gradients, images, and overlays.
  - Smooth fade/slide-in animations for cards, tables, and sections.

- **Responsive Design:**
  - Works beautifully on desktop and mobile.
- **Weather-Oriented Visuals:**
  - Weather icons, color-coded backgrounds, and animated elements reflect the current conditions.

## Design Highlights

- **Vibrant Background:**
  - Deep gradients, a weather-themed background image, and a radial glow overlay make the UI pop.
- **Animated Icons:**
  - Weather icons (from `react-icons/wi`) are animated with CSS for a lively feel.
- **Table & Card Animations:**
  - Table rows and cards fade/slide in for a premium experience.
- **Interactive Search:**
  - Large, rounded, and shadowed search bar for city lookup.

## How Data is Fetched

- **WeatherAPI Integration:**
  - Uses [WeatherAPI](https://www.weatherapi.com/) for real-time weather data.
  - Fetches both current weather and hourly forecast for the searched city.
- **API Call Example:**
  ```js
  const response = await axios.get(
    `http://api.weatherapi.com/v1/forecast.json?key=YOUR_API_KEY&q=CityName&days=1&aqi=no&alerts=no`
  );
  ```
- **Environment Variables:**
  - The API key is stored in a `.env` file as `VITE_WEATHER_API_KEY` for security.
- **Data Usage:**
  - Displays temperature, condition, icon, humidity, cloud cover, "feels like", rain chance, and a full hourly forecast table.

Enjoy your beautiful, animated weather dashboard! 🌦️
