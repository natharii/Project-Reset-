// OpenWeatherMap API Configuration
const API_KEY = 'demo'; // Replace with your actual API key from openweathermap.org
const BASE_URL = 'https://api.openweathermap.org/data/2.5';
const GEO_URL = 'https://api.openweathermap.org/geo/1.0';

// Weather icons mapping
const weatherIcons = {
    '01d': '☀️',
    '01n': '🌙',
    '02d': '⛅',
    '02n': '🌤️',
    '03d': '☁️',
    '03n': '☁️',
    '04d': '☁️',
    '04n': '☁️',
    '09d': '🌧️',
    '09n': '🌧️',
    '10d': '🌦️',
    '10n': '🌧️',
    '11d': '⛈️',
    '11n': '⛈️',
    '13d': '❄️',
    '13n': '❄️',
    '50d': '🌫️',
    '50n': '🌫️'
};

// Initialize page
document.addEventListener('DOMContentLoaded', function() {
    const cityInput = document.getElementById('cityInput');
    cityInput.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            searchWeather();
        }
    });
    
    // Load demo data on page load
    loadDemoData();
});

// Search for weather by city
function searchWeather() {
    const city = document.getElementById('cityInput').value.trim();
    if (!city) {
        showError('Please enter a city name.');
        return;
    }
    
    fetchWeatherByCity(city);
}

// Get current location weather
function getCurrentLocation() {
    if (navigator.geolocation) {
        showLoading(true);
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const lat = position.coords.latitude;
                const lon = position.coords.longitude;
                fetchWeatherByCoords(lat, lon);
            },
            (error) => {
                showError('Unable to access your location. Please enable location services.');
                showLoading(false);
            }
        );
    } else {
        showError('Geolocation is not supported by your browser.');
    }
}

// Fetch weather by city name
function fetchWeatherByCity(city) {
    showLoading(true);
    hideError();
    
    // Using Open-Meteo API (free, no API key required) as fallback
    const url = `https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=1&language=en&format=json`;
    
    fetch(url)
        .then(response => response.json())
        .then(data => {
            if (data.results && data.results.length > 0) {
                const result = data.results[0];
                fetchWeatherByCoords(result.latitude, result.longitude, result.name, result.country);
            } else {
                showError('City not found. Please try another city.');
                showLoading(false);
            }
        })
        .catch(error => {
            console.error('Error:', error);
            showError('Failed to fetch city data. Please try again.');
            showLoading(false);
        });
}

// Fetch weather by coordinates using Open-Meteo (free API)
function fetchWeatherByCoords(lat, lon, cityName = '', country = '') {
    showLoading(true);
    hideError();
    
    const weatherUrl = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,apparent_temperature,precipitation,weather_code,wind_speed_10m,pressure_msl,visibility&hourly=temperature_2m,weather_code&daily=weather_code,temperature_2m_max,temperature_2m_min,sunrise,sunset,precipitation_sum,wind_speed_10m_max&timezone=auto`;
    
    fetch(weatherUrl)
        .then(response => response.json())
        .then(data => {
            // Get reverse geocoding for city name if not provided
            if (!cityName) {
                const reverseUrl = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`;
                return fetch(reverseUrl)
                    .then(res => res.json())
                    .then(geoData => {
                        cityName = geoData.address?.city || geoData.address?.town || 'Unknown Location';
                        country = geoData.address?.country || '';
                        return data;
                    });
            }
            return data;
        })
        .then(data => {
            displayWeather(data, cityName, country);
            updateLastUpdate();
            showLoading(false);
        })
        .catch(error => {
            console.error('Error:', error);
            showError('Failed to fetch weather data. Please try again.');
            showLoading(false);
        });
}

// Display weather data
function displayWeather(data, cityName, country) {
    const current = data.current;
    const daily = data.daily;
    const timezone = data.timezone;
    
    // Map WMO weather codes to descriptions
    const weatherDescriptions = {
        0: 'Clear Sky',
        1: 'Mainly Clear',
        2: 'Partly Cloudy',
        3: 'Overcast',
        45: 'Foggy',
        48: 'Foggy',
        51: 'Light Drizzle',
        53: 'Moderate Drizzle',
        55: 'Dense Drizzle',
        61: 'Slight Rain',
        63: 'Moderate Rain',
        65: 'Heavy Rain',
        71: 'Slight Snow',
        73: 'Moderate Snow',
        75: 'Heavy Snow',
        80: 'Slight Rain Showers',
        81: 'Moderate Rain Showers',
        82: 'Violent Rain Showers',
        85: 'Slight Snow Showers',
        86: 'Heavy Snow Showers',
        95: 'Thunderstorm',
        96: 'Thunderstorm with Hail',
        99: 'Thunderstorm with Hail'
    };
    
    // Map weather codes to emojis
    const weatherEmojis = {
        0: '☀️', 1: '🌤️', 2: '⛅', 3: '☁️', 45: '🌫️', 48: '🌫️',
        51: '🌦️', 53: '🌧️', 55: '🌧️', 61: '🌧️', 63: '🌧️', 65: '⛈️',
        71: '❄️', 73: '❄️', 75: '❄️', 80: '🌧️', 81: '⛈️', 82: '⛈️',
        85: '❄️', 86: '❄️', 95: '⛈️', 96: '⛈️', 99: '⛈️'
    };
    
    const weatherCode = current.weather_code;
    const weatherDesc = weatherDescriptions[weatherCode] || 'Unknown';
    const weatherEmoji = weatherEmojis[weatherCode] || '🌤️';
    const temp = Math.round(current.temperature_2m);
    const feelsLike = Math.round(current.apparent_temperature);
    const humidity = current.relative_humidity_2m;
    const windSpeed = Math.round(current.wind_speed_10m);
    const pressure = current.pressure_msl;
    const visibility = current.visibility ? (current.visibility / 1000).toFixed(1) : 'N/A';
    
    // Update current weather
    document.getElementById('cityName').textContent = `${cityName}, ${country}`;
    document.getElementById('temperature').textContent = `${temp}°C`;
    document.getElementById('weatherDesc').textContent = weatherDesc;
    document.getElementById('weatherIcon').textContent = weatherEmoji;
    document.getElementById('humidity').textContent = `${humidity}%`;
    document.getElementById('windSpeed').textContent = `${windSpeed} km/h`;
    document.getElementById('feelsLike').textContent = `${feelsLike}°C`;
    document.getElementById('pressure').textContent = `${pressure} hPa`;
    document.getElementById('visibility').textContent = visibility + ' km';
    document.getElementById('uvIndex').textContent = 'Data not available';
    
    // Show sections
    document.getElementById('currentWeather').style.display = 'block';
    
    // Display sunrise/sunset
    if (daily.sunrise && daily.sunset) {
        const sunrise = new Date(daily.sunrise[0]).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
        const sunset = new Date(daily.sunset[0]).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
        document.getElementById('sunrise').textContent = sunrise;
        document.getElementById('sunset').textContent = sunset;
        document.getElementById('sunSection').style.display = 'grid';
    }
    
    // Display 5-day forecast
    if (daily.time) {
        const forecastGrid = document.getElementById('forecastGrid');
        forecastGrid.innerHTML = '';
        
        for (let i = 0; i < Math.min(5, daily.time.length); i++) {
            const date = new Date(daily.time[i]);
            const dateStr = date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
            const minTemp = Math.round(daily.temperature_2m_min[i]);
            const maxTemp = Math.round(daily.temperature_2m_max[i]);
            const code = daily.weather_code[i];
            const desc = weatherDescriptions[code] || 'Unknown';
            const emoji = weatherEmojis[code] || '🌤️';
            
            const card = document.createElement('div');
            card.className = 'forecast-card';
            card.innerHTML = `
                <div class="forecast-date">${dateStr}</div>
                <div class="forecast-icon">${emoji}</div>
                <div class="forecast-temp">${minTemp}°-${maxTemp}°</div>
                <div class="forecast-desc">${desc}</div>
            `;
            forecastGrid.appendChild(card);
        }
        document.getElementById('forecastSection').style.display = 'block';
    }
}

// Load demo data for demonstration
function loadDemoData() {
    const demoData = {
        current: {
            temperature_2m: 22,
            relative_humidity_2m: 65,
            apparent_temperature: 20,
            precipitation: 0,
            weather_code: 2,
            wind_speed_10m: 12,
            pressure_msl: 1013,
            visibility: 10000
        },
        daily: {
            time: [
                '2024-07-18', '2024-07-19', '2024-07-20', '2024-07-21', '2024-07-22'
            ],
            weather_code: [2, 61, 3, 0, 1],
            temperature_2m_max: [24, 20, 22, 25, 23],
            temperature_2m_min: [18, 15, 16, 19, 17],
            sunrise: ['2024-07-18T05:30:00', '2024-07-19T05:31:00', '2024-07-20T05:32:00', '2024-07-21T05:33:00', '2024-07-22T05:34:00'],
            sunset: ['2024-07-18T21:30:00', '2024-07-19T21:29:00', '2024-07-20T21:28:00', '2024-07-21T21:27:00', '2024-07-22T21:26:00'],
            precipitation_sum: [0, 5, 0, 0, 0],
            wind_speed_10m_max: [15, 18, 12, 10, 14]
        },
        timezone: 'UTC'
    };
    
    displayWeather(demoData, 'Demo City', 'Demo Country');
}

// Show loading spinner
function showLoading(show) {
    document.getElementById('loadingSpinner').style.display = show ? 'block' : 'none';
}

// Show error message
function showError(message) {
    const errorDiv = document.getElementById('errorMessage');
    errorDiv.textContent = message;
    errorDiv.style.display = 'block';
}

// Hide error message
function hideError() {
    document.getElementById('errorMessage').style.display = 'none';
}

// Update last update timestamp
function updateLastUpdate() {
    const now = new Date();
    const dateString = now.toLocaleString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
    document.getElementById('lastUpdate').textContent = dateString;
}

// Auto-refresh weather data every 10 minutes
setInterval(() => {
    const cityInput = document.getElementById('cityInput');
    if (cityInput.value) {
        searchWeather();
    }
}, 600000); // 10 minutes