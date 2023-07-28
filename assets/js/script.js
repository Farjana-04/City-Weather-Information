

// Start creating the variables
let searchBtnEl = $("#search-btn")
let searchInputEl = $("#search-input");
let presentWeatherEl = $("#weather-information")
let weatherForecastEl = $("#days-history")

const API_KEY = "f6db0a47aab47705d7072b6b5344e991"; 
let searchHistory = [];

// Check if there is a previously searched city in localStorage
let previousCity = localStorage.getItem("searchCity");
if (previousCity) {
  searchInputEl.val(previousCity);
  searchHandle(); // Trigger the search for the previous city
}

function searchHandle() {
  let cityName = searchInputEl.val()

  let url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}&days=5`;
  fetch(url)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      // Process the current weather data
      displayCurrentWeather(data);

      // Add the city to the search history
      addToSearchHistory(cityName)

      // Fetch the 5-day forecast
      return fetchForecast(cityName)
    })
    .then(function (forecastData) {
      // Process the 5-day forecast data
      displayForecast(forecastData)
    });
}

searchBtnEl.on("click", searchHandle);

function displayCurrentWeather(data) {
  let cityName = data.name;
  let date = new Date(data.dt * 1000);
  let temperature = Math.round(data.main.temp - 273.15);
  let humidity = data.main.humidity;
  let windSpeed = data.wind.speed;
  let icon = data.weather[0].icon;

  // Display current weather information on the page
  presentWeatherEl.html(`
    <h2>${cityName} (${date.toLocaleDateString()})</h2>
    <img src="http://openweathermap.org/img/w/${icon}.png" alt="Weather Icon">
    <p>Temperature: ${temperature}°C</p>
    <p>Humidity: ${humidity}%</p>
    <p>Wind Speed: ${windSpeed} m/s</p>
  `);
}

function addToSearchHistory(cityName) {
  if (!searchHistory.includes(cityName)) {
    searchHistory.push(cityName)
    updateSearchHistoryUI()
  }
}

function updateSearchHistoryUI() {
  // Clear previous search history UI
  $("#search-history").empty();

  // Loop through searchHistory and create buttons for each city
  for (let i = 0; i < searchHistory.length; i++) {
    $("#search-history").append(`
      <button class="city-button">${searchHistory[i]}</button>
    `);
  }
}

function fetchForecast(cityName){
  let url = `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${API_KEY}`;
  return fetch(url).then(function (response) {
    return response.json();
  });
}
function displayForecast(forecastData) {
  
}

// Handle click on a city in the search history (assuming you have a list of buttons for each city)
$(document).on("click", ".city-button", function () {
  let cityName = $(this).text()
  searchInputEl.val(cityName) // Set the input value to the selected city
  searchHandle(); // Trigger the search for the selected city
})
// Save the search city to localStorage when the search button is clicked
$(document).on("click", "#search-btn", function () {
  let cityName = searchInputEl.val();
  localStorage.setItem("searchCity", cityName);
})

















