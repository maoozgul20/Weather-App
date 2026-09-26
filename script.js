const apiKey = '504717ab0c5555f24c88cd498f2b168c';
        const apiUrl = 'https://api.openweathermap.org/data/2.5/weather';

        const weather = document.querySelector('.weather-card')
        const cityInput = document.getElementById('city');
        const getWeatherBtn = document.getElementById('getWeatherBtn');
        const cityName = document.getElementById('cityName');
        const temperature = document.getElementById('temperature');
        const feellike = document.getElementById('feellike');
        const weatherDescription = document.getElementById('weatherDescription');
        const humidity = document.getElementById('humidity');
        const weatherIcon = document.getElementById('weatherIcon');
        const pressure = document.getElementById('pressure');
        const visibility = document.getElementById('visibility');

        const weatherBackgrounds = {
            Clear: 'url("https://images.unsplash.com/photo-1601297183305-6df142704ea2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80")',
            Clouds: 'url("https://images.unsplash.com/photo-1534088568595-a066f410bcda?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2002&q=80")',
            Rain: 'url("https://images.unsplash.com/photo-1519692933481-e162a57d6721?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80")',
            Snow: 'url("https://images.unsplash.com/photo-1491002052546-bf38f186af56?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2008&q=80")',
            Thunderstorm: 'url("https://images.unsplash.com/photo-1605727216801-e27ce1d0cc28?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2071&q=80")',
            Drizzle: 'url("https://images.unsplash.com/photo-1541919329513-35f7af297129?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80")',
            Mist: 'url("https://images.unsplash.com/photo-1543968996-ee822b8176ba?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1928&q=80")'
        };

        const getWeather = async (city) => {
            try {
                const response = await fetch(`${apiUrl}?q=${city}&appid=${apiKey}&units=metric`);
                const data = await response.json();

                if (data.cod === 200) {
                    displayWeather(data);
                } else {
                    cityName.textContent = 'City not found';
                    clearWeatherInfo();
                }
            } catch (error) {
                console.error("Error fetching the weather data", error);
            }
        };

        const displayWeather = (data) => {
            cityName.textContent = `${data.name}, ${data.sys.country}`;
            
            // Reset animations
            const weatherCard = document.querySelector('.weather-card');
            const weatherItems = weatherCard.querySelectorAll('.weather-item');
            weatherCard.style.opacity = '0';
            weatherCard.style.transform = 'translateY(20px)';
            weatherItems.forEach(item => {
                item.style.opacity = '0';
                item.style.transform = 'translateY(20px)';
            });
            weatherIcon.classList.remove('icon-show');
            
            // Update content
            temperature.textContent = `${Math.round(data.main.temp)}°C`;
            feellike.textContent = `${Math.round(data.main.feels_like)}°C`;
            weatherDescription.textContent = `${data.weather[0].description}`;
            humidity.textContent = `${data.main.humidity}%`;
            pressure.textContent = `${data.main.pressure} hPa`;
            visibility.textContent = `${data.visibility / 1000} km`;

            const iconCode = data.weather[0].icon;
            weatherIcon.src = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
            weatherIcon.style.display = 'block';

            // Trigger animations
            setTimeout(() => {
                weatherCard.style.opacity = '1';
                weatherCard.style.transform = 'translateY(0)';
                weatherIcon.classList.add('icon-show');

                weatherItems.forEach((item, index) => {
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'translateY(0)';
                    }, index * 100);
                });
            }, 300);

            // Set background based on weather
            const weatherMain = data.weather[0].main;
            document.body.style.backgroundImage = weatherBackgrounds[weatherMain] || weatherBackgrounds.Clear;
        };

        const clearWeatherInfo = () => {
            cityName.textContent = '';
            const weatherCard = document.querySelector('.weather-card');
            weatherCard.style.opacity = '0';
            weatherIcon.style.display = 'none';
            weatherIcon.classList.remove('icon-show');
            document.body.style.backgroundImage = 'url("https://images.unsplash.com/photo-1580193769210-b8d1c049a7d9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2074&q=80")';
        };

        getWeatherBtn.addEventListener('click', () => {
            const city = cityInput.value.trim();
            if (city) {
                weather.style.display = 'block'
                getWeather(city);
            }
        });

        cityInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                const city = cityInput.value.trim();
                if (city) {
                    weather.style.display = 'block'
                    getWeather(city);
                }
            }
        });
