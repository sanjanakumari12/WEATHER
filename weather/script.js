document.addEventListener('DOMContentLoaded', () => {
    const searchBox = document.querySelector('.search-box input');
    const searchButton = document.querySelector('.search-box button');
    const weatherBox = document.querySelector('.weather-box');
    const temperatureElement = document.querySelector('.temperature');
    const weatherIcon = document.querySelector('.weather img');

    searchButton.addEventListener('click', () => {
        const location = searchBox.value;
        if (location) {
            fetchWeather(location);
        }
    });

    const fetchWeather = async (location) => {
        try {
            const apiKey = 'YOUR_API_KEY'; // Replace with your OpenWeatherMap API key
            const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric`);
            const data = await response.json();

            if (data.cod === 200) {
                temperatureElement.innerHTML = `${Math.round(data.main.temp)}<span>°C</span>`;
                weatherIcon.src = `http://openweathermap.org/img/wn/${data.weather[0].icon}.png`;
                weatherIcon.alt = data.weather[0].description;
                weatherBox.style.display = 'block';
            } else {
                alert('Location not found!');
            }
        } catch (error) {
            console.error('Error fetching weather data:', error);
            alert('An error occurred while fetching weather data.');
        }
    }
});
