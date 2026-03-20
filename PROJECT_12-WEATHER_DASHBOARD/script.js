const API_KEY = "16b32ad59824da26eb03a57487bc254e"
const errorMessage = document.getElementById("error-message");
const cityName = document.getElementById("city-name");
const temperature = document.getElementById("temperature");
const description = document.getElementById("description");
const humidity = document.getElementById("humidity");

document.getElementById("search-btn").addEventListener("click", () => {
  const city = document.getElementById("city-input").value.trim();
  if (city) {
    getWeatherData(city);
  } else {
    displayError("Please enter a city name.");
  }
});

function getWeatherData(cityName) {
  const geocodingUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}&units=metric`;
  fetch(geocodingUrl)
    .then(response => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then(data => displayWeatherData(data))
    .catch(error => {
      console.error("Error fetching weather data:", error)
      displayError("City not found. Please try again.");
    });
}

function displayWeatherData(data) {
  errorMessage.textContent = "";
  cityName.textContent = `Weather in ${data.name}`;
  temperature.textContent = `Temperature: ${data.main.temp}°C`;
  description.textContent = `Condition: ${data.weather[0].description}`;
  humidity.textContent = `Humidity: ${data.main.humidity}%`;
}
function displayError(message) {
  errorMessage.textContent = message;
  cityName.textContent = "";
  temperature.textContent = "";
  description.textContent = "";
  humidity.textContent = "";
}