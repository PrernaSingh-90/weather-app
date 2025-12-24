import React, { useEffect, useRef, useState } from 'react';
import useLocalStorage from './hooks/useLocalStorage';
import SearchBar from './components/SearchBar';
import WeatherCard from './components/WeatherCard';
import Loader from './components/Loader';
import ErrorMessage from './components/ErrorMessage';
import RecentSearches from './components/RecentSearches';
import './index.css';
import bgImage from './assets/bg.jpg';

const API_KEY = "48f16f45673a599912cc268e57f16b23";
const BASE_URL = "https://api.openweathermap.org/data/2.5/weather";

const App = () => {
    const [weatherData, setWeatherData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [recentCities, setRecentCities] = useLocalStorage('recentCities', []);

    const cache = useRef({});

    useEffect(() => {
        if("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    fetchWeatherByCoords(position.coords.latitude, position.coords.longitude);
                },
                (err) => {
                    fetchWeather("Delhi");
                }
            );
        } else {
            fetchWeather("Delhi");
        }
    }, []);

    const fetchWeather = async (city) => {
        if(cache.current[city.toLowerCase()]) {
            console.log('Serving From Cache ⚡');
            setWeatherData(cache.current[city.toLowerCase()]);
            setError(null);
            return;
        }
        
        setLoading(true);
        setError(null);
        setWeatherData(null);
    

    try {
        const response = await fetch(`${BASE_URL}?q=${city}&appid=${API_KEY}&units=metric`);
        if(!response.ok) {
            throw new Error("city not found! Plase try Again.");
        }
        const data = await response.json();

        cache.current[city.toLowerCase()] = data;
        setWeatherData(data);
        addToRecent(city);
    } catch (err) {
        setError(err.message || 'Failed to fetch weather');
    } finally {
        setLoading(false);
    }
  };
  
  const fetchWeatherByCoords = async(lat,lon) => {
    setLoading(true);
    try {
        const response = await fetch(`${BASE_URL}? lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`);
        const data = await response.json();
        setWeatherData(data);
    } catch (err) {
        setError("Could not load location weather.");
    } finally {
        setLoading(false);
    }
  };

  const addToRecent = (city) => {
    setRecentCities((prev) => {
        const filtered = prev.filter(c => c.toLowerCase() !== city.toLowerCase());
        return [city, ...filtered].slice(0,5);
    });
  };
    
  return (
    <div className='app-container' style={{backgroundImage: `url(${bgImage})`}}>
      <div className="glass-panel">
        <h1 className="app-title">Atmosphere.</h1>
        <SearchBar onSearch={fetchWeather}/>
        {loading && <Loader/>}
        {error && <ErrorMessage message={error}/>}
        {weatherData && !loading && <WeatherCard data={weatherData}/>}
        {!loading && (
            <RecentSearches searches={recentCities} onSelect={fetchWeather}/>
        )}
      </div>
    </div>
  );
};

export default App
