// The API key lives in config.js (git-ignored). See config.example.js.
const apiKey = window.WEATHER_API_KEY;
const apiUrl = 'https://api.openweathermap.org/data/2.5/weather';

const form = document.getElementById('searchForm');
const cityInput = document.getElementById('city');
const getWeatherBtn = document.getElementById('getWeatherBtn');
const statusMessage = document.getElementById('statusMessage');
const cityName = document.getElementById('cityName');
const weatherIcon = document.getElementById('weatherIcon');
const weatherCard = document.querySelector('.weather-card');
const temperature = document.getElementById('temperature');
const feellike = document.getElementById('feellike');
const weatherDescription = document.getElementById('weatherDescription');
const humidity = document.getElementById('humidity');
const pressure = document.getElementById('pressure');
const visibility = document.getElementById('visibility');

const unsplash = (id, w) =>
    `url("https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=80")`;

const defaultBackground = unsplash('1580193769210-b8d1c049a7d9', 2074);
const mistBackground = unsplash('1543968996-ee822b8176ba', 1928);

const weatherBackgrounds = {
    Clear: unsplash('1601297183305-6df142704ea2', 1974),
    Clouds: unsplash('1534088568595-a066f410bcda', 2002),
    Rain: unsplash('1519692933481-e162a57d6721', 2070),
    Snow: unsplash('1491002052546-bf38f186af56', 2008),
    Thunderstorm: unsplash('1605727216801-e27ce1d0cc28', 2071),
    Drizzle: unsplash('1541919329513-35f7af297129', 2070),
    Mist: mistBackground,
    Haze: mistBackground,
    Fog: mistBackground,
    Smoke: mistBackground,
    Dust: mistBackground,
    Sand: mistBackground,
    Ash: mistBackground,
    Squall: mistBackground,
    Tornado: mistBackground
};

let latestRequest = 0;

const setLoading = (isLoading) => {
    getWeatherBtn.disabled = isLoading;
    getWeatherBtn.textContent = isLoading ? 'Loading…' : 'Search';
};

const showMessage = (message) => {
    statusMessage.textContent = message;
};

const getWeather = async (city) => {
    if (!apiKey || apiKey === 'YOUR_API_KEY_HERE') {
        clearWeatherInfo();
        showMessage('Missing API key. Copy config.example.js to config.js and add your key.');
        return;
    }

    const requestId = ++latestRequest;
    setLoading(true);
    showMessage('');

    try {
        const url = `${apiUrl}?q=${encodeURIComponent(city)}&appid=${apiKey}&units=metric`;
        const response = await fetch(url);
        const data = await response.json();

        // Ignore responses from older searches that finished late.
        if (requestId !== latestRequest) return;

        if (response.ok) {
            displayWeather(data);
        } else {
            clearWeatherInfo();
            showMessage(response.status === 404 ? 'City not found' : `Error: ${data.message || response.statusText}`);
        }
    } catch (error) {
        if (requestId !== latestRequest) return;
        console.error('Error fetching the weather data', error);
        clearWeatherInfo();
        showMessage("Couldn't load weather. Check your connection and try again.");
    } finally {
        if (requestId === latestRequest) setLoading(false);
    }
};

const displayWeather = (data) => {
    const condition = data.weather[0];

    cityName.textContent = `${data.name}, ${data.sys.country}`;
    temperature.textContent = `${Math.round(data.main.temp)}°C`;
    feellike.textContent = `${Math.round(data.main.feels_like)}°C`;
    weatherDescription.textContent = condition.description;
    humidity.textContent = `${data.main.humidity}%`;
    pressure.textContent = `${data.main.pressure} hPa`;
    visibility.textContent = data.visibility != null ? `${data.visibility / 1000} km` : 'N/A';

    weatherIcon.src = `https://openweathermap.org/img/wn/${condition.icon}@2x.png`;
    weatherIcon.alt = condition.description;
    weatherIcon.hidden = false;

    // Restart the entrance animation: remove the class, force a reflow, add it back.
    weatherCard.hidden = false;
    weatherCard.classList.remove('show');
    weatherIcon.classList.remove('icon-show');
    void weatherCard.offsetWidth;
    weatherCard.classList.add('show');
    weatherIcon.classList.add('icon-show');

    document.body.style.backgroundImage = weatherBackgrounds[condition.main] || defaultBackground;
};

const clearWeatherInfo = () => {
    cityName.textContent = '';
    weatherCard.classList.remove('show');
    weatherCard.hidden = true;
    weatherIcon.hidden = true;
    weatherIcon.classList.remove('icon-show');
    document.body.style.backgroundImage = defaultBackground;
};

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const city = cityInput.value.trim();
    if (city) getWeather(city);
});
