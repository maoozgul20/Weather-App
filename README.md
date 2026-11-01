# Advance Weather App (HTML, CSS & JavaScript)

A responsive weather app built with plain HTML, CSS and JavaScript, with no frameworks and no build step. Search for any city to see its current weather, shown on a glassmorphism card with animated details and a background photo that matches the conditions.

![App Screenshot](Screenshot.jpeg)

## Features

* 🌤️ **Live weather** from the [OpenWeatherMap API](https://openweathermap.org/api)
* 🔍 **Search any city** with the Search button or the Enter key, including names with spaces or accents (e.g. *São Paulo*)
* 🎯 **Weather details**: temperature, feels like, condition, humidity, pressure and visibility
* 🖼️ **Dynamic backgrounds** for clear, cloudy, rain, drizzle, thunderstorm, snow, and mist/fog/haze/dust conditions
* ✨ **Smooth animations**, with staggered entrance of each detail row
* ⏳ **Loading state**: the button shows "Loading…" while a search runs
* ⚠️ **Clear error messages** for unknown cities, network problems or a missing API key
* 📱 **Responsive design** that fits phones as well as desktops
* ♿ **Accessible**: labelled search box, results announced to screen readers, and reduced motion for users who ask for it

## Getting Started

### 1. Get a free API key

Sign up at [openweathermap.org](https://home.openweathermap.org/users/sign_up) and copy your key from the **API keys** page. New keys can take up to a couple of hours to activate.

### 2. Download the project

```bash
git clone https://github.com/maoozgul20/Weather-App.git
cd Weather-App
```

Or click **Code → Download ZIP** on GitHub and unzip it.

### 3. Add your API key

Make a copy of `config.example.js` named `config.js`, then open it and paste in your key:

```javascript
window.WEATHER_API_KEY = 'YOUR_API_KEY_HERE';
```

`config.js` is listed in `.gitignore`, so your key is never committed.

### 4. Run it

Open `index.html` in any modern browser, type a city name and press **Enter**.

## Project Structure

| File | Purpose |
| --- | --- |
| `index.html` | Page structure: search form and weather card |
| `style.css` | Glassmorphism styling, animations and mobile layout |
| `script.js` | Fetches weather data, updates the page, handles errors and backgrounds |
| `config.example.js` | Template for `config.js`, which holds your API key |
| `config.js` | Your own API key (you create this; not committed) |

## Troubleshooting

| Message | What to do |
| --- | --- |
| *Missing API key* | Create `config.js` from `config.example.js` (step 3). |
| *Error: Invalid API key* | Check the key, or wait for a new key to activate. |
| *City not found* | Check the spelling, or add the country code, e.g. `London,GB`. |
| *Couldn't load weather* | Check your internet connection and try again. |

## A note on API key security

Any key used by front-end JavaScript can be seen by anyone who opens the site's developer tools. Keeping it in `config.js` keeps it out of GitHub, but if you publish the app online, consider sending requests through a small serverless function (Netlify, Vercel or Cloudflare) that holds the key on the server.

## Ideas for Future Improvements

* 📍 Use my location (browser geolocation)
* 🌡️ °C / °F toggle
* 📅 5-day forecast
* 💾 Remember the last searched city
* 🌬️ Wind speed, sunrise and sunset times
* 🌙 Day and night backgrounds

## Technologies Used

* HTML5
* CSS3 (glassmorphism, keyframe animations, media queries)
* JavaScript (Fetch API, async/await, DOM manipulation)
* [OpenWeatherMap API](https://openweathermap.org/current)
* [Unsplash](https://unsplash.com) for background images

## License

This project is open source under the [MIT License](LICENSE).
