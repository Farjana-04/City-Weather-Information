// Start creating the variables
let searchBtnEl = $("#search-btn")
let searchInputEl = $("#search-input");
let presentWeatherEl = $("#weather-information")
let weatherForecastEl = $("#weather-forecast")

// Initialize the city array that is saved in the local storage.
let cities = JSON.parse(localStorage.getItem('cities')) || [];

const API_KEY = "f6db0a47aab47705d7072b6b5344e991";
let searchHistory = cities;

function searchHandle() {
  let cityName = searchInputEl.val()
  addToSearchHistory(cityName)
  getWeather(cityName)

}
function getWeather(cityName) {
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}`;
  fetch(url)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      // Process the current weather data
      console.log(data.coord)
      displayCurrentWeather(data);
      getFutureweather(data.coord.lat, data.coord.lon)
    })
}
function getFutureweather(lat, lon) {
  let url = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}`
  fetch(url)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      // Process the current weather data
      console.log(data.list)
      // displayFutureWeather(data.list[2])
      displayFutureWeather(0, data.list[9])
      displayFutureWeather(1, data.list[17])
      displayFutureWeather(2, data.list[25])
      displayFutureWeather(3, data.list[33])
      displayFutureWeather(4, data.list[39])

    })
}
updateSearchHistoryUI();
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
    <h4>${cityName} (${date.toLocaleDateString()})</h4>
    <img src="http://openweathermap.org/img/w/${icon}.png" alt="Weather Icon">
    <p>Temperature: ${temperature}°C</p>
    <p>Humidity: ${humidity}%</p>
    <p>Wind Speed: ${windSpeed} m/s</p>
  `);
}

function addToSearchHistory(cityName) {
  if (!searchHistory.includes(cityName)) {
    searchHistory.push(cityName)
    // City name has been saved to the local storage.
    localStorage.setItem('cities', JSON.stringify(searchHistory));
    updateSearchHistoryUI()
  }
}

function updateSearchHistoryUI() {
  // Clear previous search history UI
  $("#search-history").empty();

  // Loop through searchHistory and create buttons for each city
  for (let i = 0; i < searchHistory.length; i++) {
    let historyBtnEl = $(`<button class="city-button">${searchHistory[i]}</button>`)
    historyBtnEl.on("click", (e) => {

      getWeather(searchHistory[i])
    })
    $("#search-history").append(historyBtnEl);
  }
}

function displayFutureWeather(dayIndex, forecast) {
  console.log(dayIndex, forecast)

  let dayEl = $(`#day${dayIndex}`)
  
 // Extract the relevant information for each day
  let date = new Date(forecast.dt * 1000);
  let temperature = Math.round(forecast.main.temp - 273.15);
  let humidity = forecast.main.humidity;
  let icon = forecast.weather[0].icon;
  // dateEl.text(date)
  dayEl.html(`
    <h4> (${date.toLocaleDateString()})</h4>
    <img src="http://openweathermap.org/img/w/${icon}.png" alt="Weather Icon">
    <p>Temperature: ${temperature}°C</p>
    <p>Humidity: ${humidity}%</p>
    
  `);


}





















