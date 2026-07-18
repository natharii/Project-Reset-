# Weather Dashboard

A real-time weather dashboard that fetches data from public weather APIs with a beautiful blue and green 2000s aesthetic design.

## Features

### 🌤️ Current Weather Display
- Real-time temperature, humidity, and wind speed
- Weather description with emoji icons
- Feels-like temperature
- Pressure and visibility data
- Beautiful 2000s retro design

### 🔍 Weather Search
- Search weather by city name
- Get current location weather with one click
- Instant weather updates

### 📍 Location Services
- Automatic location detection using geolocation API
- One-click weather for your current position
- Reverse geocoding for city names

### 🌅 Sunrise & Sunset Times
- Display exact sunrise times
- Display exact sunset times
- Beautiful sunrise/sunset themed cards

### 📅 5-Day Forecast
- Extended weather forecast
- Daily high/low temperatures
- Weather conditions for each day
- Weather emoji indicators

### 🌡️ Detailed Weather Information
- Temperature in Celsius
- Humidity percentage
- Wind speed (km/h)
- Atmospheric pressure (hPa)
- Visibility distance
- Feels-like temperature

### 🎨 2000s Aesthetic Design
- Neon cyan and lime green colors
- Glowing effects and shadows
- Retro typography (Trebuchet MS)
- Responsive grid layouts
- Smooth animations and transitions
- Dark blue background gradients

## APIs Used

### Primary Weather API
**Open-Meteo Weather API** (Free, no API key required)
- Endpoint: `https://api.open-meteo.com/v1/forecast`
- No authentication needed
- Unlimited free requests
- Global weather data coverage
- Provides current and forecast data

### Geocoding APIs
**Open-Meteo Geocoding** (Free)
- Forward geocoding (city name to coordinates)
- Provides latitude/longitude for weather fetching

**Nominatim by OpenStreetMap** (Free)
- Reverse geocoding (coordinates to city name)
- Gets city information from coordinates

### Browser APIs
- **Geolocation API** - Gets user's current coordinates
- **Fetch API** - Makes HTTP requests to weather services

## File Structure

```
weather/
├── index.html        # Main page structure
├── styles.css        # 2000s aesthetic styling
├── script.js         # Weather fetching and display logic
└── README.md         # This file
```

## How to Use

### Search by City
1. Enter a city name in the search box
2. Click "Search" or press Enter
3. View real-time weather data

### Get Current Location Weather
1. Click "📍 Current Location" button
2. Allow location access when prompted
3. Weather for your location loads instantly

### View Forecast
- Scroll to the "5-Day Forecast" section
- See daily temperature and weather conditions

### Check Sunrise/Sunset
- View the "🌅 Sunrise" and "🌇 Sunset" cards
- Times are in your local timezone

## Setup Instructions

### Without API Key (Recommended for Testing)
The dashboard works out-of-the-box using free public APIs:
- No API key registration needed
- No configuration required
- Just open `index.html` in a browser

### With OpenWeatherMap API (Optional)
For more features and higher request limits:

1. Sign up at [OpenWeatherMap](https://openweathermap.org/api)
2. Get your free API key
3. Replace `'demo'` in `script.js` line 2:
   ```javascript
   const API_KEY = 'your_actual_api_key_here';
   ```

## Color Scheme

- **Header**: Cyan to Lime Green gradient (#00ccff → #00ff99)
- **Current Weather**: Blue/Green theme
- **Details**: Cyan text on transparent blue background
- **Forecast**: Matching blue/green theme
- **Background**: Dark blue gradient
- **Accents**: Neon cyan (#00ccff) and Lime Green (#00ff99)

## Browser Compatibility

- Chrome/Chromium: ✅ Full support
- Firefox: ✅ Full support
- Safari: ✅ Full support
- Edge: ✅ Full support
- Mobile browsers: ✅ Full support (responsive design)

## Technology Stack

- **Frontend**: HTML5, CSS3, Vanilla JavaScript
- **APIs**: Open-Meteo, Nominatim, Geolocation API
- **Styling**: CSS Grid, Flexbox, Gradients, Animations

## Weather Data Accuracy

- Data provided by Open-Meteo
- Updates every 10 minutes (auto-refresh)
- Hourly and daily forecast data
- Global weather coverage
- Accurate to within ~1km

## Limitations

- Weather alerts not available with free API
- Air quality data not available in basic tier
- UV index data requires additional API
- Some advanced weather metrics may not be available

## Future Enhancements

- [ ] Add multiple city comparison
- [ ] Save favorite locations
- [ ] Weather alerts and notifications
- [ ] Air quality information
- [ ] Historical weather data
- [ ] Weather maps and radar
- [ ] Dark mode toggle
- [ ] Custom units (Fahrenheit, Kelvin)
- [ ] Weather trends and analytics
- [ ] Push notifications for severe weather

## Troubleshooting

### "City not found" Error
- Check spelling of city name
- Try using a major city name
- Some small towns may not be in the database

### Location Permission Denied
- Enable location services in browser settings
- Check privacy settings
- Some browsers require HTTPS for geolocation

### Weather Data Not Loading
- Check internet connection
- Verify API is accessible
- Try searching for a different city
- Clear browser cache and reload

## Data Privacy

- No personal data is stored
- Location is only used for weather fetching
- No cookies or tracking
- All requests are made directly to public APIs
- No data is sold or shared

## License

Free to use and modify for personal or commercial projects.

## Credits

- Weather data: [Open-Meteo](https://open-meteo.com/)
- Geocoding: [Nominatim](https://nominatim.org/)
- Design inspiration: 2000s web aesthetics

---

**Weather Dashboard - Stay informed about weather conditions worldwide** 🌍🌤️
