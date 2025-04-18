const cityInput = document.getElementById('cityInput');
const search = document.getElementById('search');

import { cityCoordinates } from './daten.js';

async function fetchWeatherData(lat, lon) {
      try {
        const response = await fetch(
            `https://api.brightsky.dev/current_weather?lat=${lat}&lon=${lon}`
        );
        const data = await response.json();
        
        if (data.weather) {
            updateWeatherUI(data);
        } else {
            alert("Wetterdaten nicht verfügbar!");
        }
    } catch (error) {
        console.error("Fehler:", error);
    }
}

function updateWeatherUI(data){
    const weather = data.weather;
   
    document.getElementById("city-name").textContent = cityInput.value;
    document.getElementById("temperature").textContent = `${weather.temperature}°C`;
    document.getElementById("weather-description").textContent = weather.condition;
    document.getElementById("wind").textContent = `Wind: ${weather.wind_speed} km/h`;
}

function Event(){
    const city = cityInput.value.toLowerCase();
    if (cityCoordinates[city]) {
        const { lat, lon } = cityCoordinates[city];
        fetchWeatherData(lat, lon);
    } else {
        alert("Ort nicht gefunden! Versuche Berlin, Hamburg oder München.");
    }
}

search.addEventListener('click', () => {
   Event();
}
);

//enter button unterstützen
cityInput.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        Event();
    }
});
