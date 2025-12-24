import React from 'react';
import './WeatherCard.css';

const WeatherCard = ({ data }) => {
  if(!data || !data.weather || data.weather.length === 0){
    return null;
  }
  
  const {name, main, weather, wind} = data;
  const iconUrl = `https://openweathermap.org/img/wn/${weather[0].icon}@2x.png`;

  return (
    <div className='weather-card'>
      <div className="header">
        <h2>{name}</h2>
        <span className="date">{new Date().toLocaleDateString()}</span>
      </div>

      <div className="main-info">
        <img src={iconUrl} alt="weather icon" className='weather-icon' />
        <h1 className="temp">{Math.round(main.temp)}°C</h1>
        <p className="condition">{weather[0].main}</p>
      </div>

      <div className="details-grid">
        <div className="detail-item">
          <span>Humidity</span>
          <strong>{main.humidity}%</strong>
        </div>
        <div className="detail-item">
          <span>Wind</span>
          <strong>{wind.speed} m/s</strong>
        </div>
        <div className="detail-item">
          <span>Feels Like</span>
          <strong>{Math.round(main.feels_like)}°C</strong>
        </div>
      </div>
    </div>
  );
};

export default WeatherCard

