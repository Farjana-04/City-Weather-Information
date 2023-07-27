

//start creating the variables
let searchBtnEl = $("#search-btn");
let searchInputEl = $("#search-input");
let presentWeatherEl = $("#weather-information");
let weatherForecastEl = $("#days-history");
let searchHistory = [];


const API_KEY = "f6db0a47aab47705d7072b6b5344e991";

function searchHandle() {
  let cityName = searchInputEl.val();

  let url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}`;
  fetch(url)
    .then(function (response) {
      if (!response.ok) {
        throw new Error("City not found!");
      }
      return response.json();
    })
    .then(function (data) {
      processData(data);
    })

}
searchInputEl.on("keypress", function (event) {
  if (event.key === "Enter") {
    searchHandle();
  }
});


searchBtnEl.on("click", searchHandle);

function processData(data) {
  // Current weather data
  let cityName = data.name;
  let currentDate = new Date(data.dt * 1000).toLocaleDateString();
  let currentTemperature = Math.round(data.main.temp - 273.15);
  let currentHumidity = data.main.humidity;
  let currentIcon = data.weather[0].icon;
  let currentWindSpeed = data.wind.speed;

  $("#city-name").text(cityName);
  $("#current-date").text(currentDate);
  $("#current-temperature").text(currentTemperature);
  $("#current-humidity").text(currentHumidity);
  $("#current-wind-speed").text(currentWindSpeed);

  let currentIconUrl = `http://openweathermap.org/img/w/${currentIcon}.png`;
  let currentIconEl = document.createElement("img");
  currentIconEl.setAttribute("src", currentIconUrl);
  currentIconEl.setAttribute("alt", "Weather Icon");
  $("#current-icon").html(currentIconEl);

  // Save the city to search history and update the local storage
  searchHistory.push(cityName);
  localStorage.setItem("search", JSON.stringify(searchHistory));
  updateSearchHistory();

  // 5-day weather forecast data
  let url = `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${API_KEY}&cnt=5`;
  fetch(url)
    .then(function (response) {
      if (!response.ok) {
        throw new Error("Forecast data not available.");
      }
      return response.json();
    })
    .then(function (data) {
      processForecastData(data);
    })

}
function processForecastData(data) {
  let weatherArray = data.list;
  weatherForecastEl.empty();

  for (let i = 0; i < 5; i++) {
    let thisCard = document.querySelector("#day" + i)
    let weatherData = weatherArray[i * 8];
    let date = new Date(weatherData.dt * 1000).toLocaleDateString();
    let temperature = Math.round(weatherData.main.temp - 273.15);
    let humidity = weatherData.main.humidity;
    let icon = weatherData.weather[0].icon;
    let windSpeed = weatherData.wind.speed;

    thisCard.childNodes[1].innerHTML = temperature



    // Display weather icon using OpenWeatherMap's icons
    let iconUrl = `http://openweathermap.org/img/w/${icon}.png`;
    let iconEl = document.createElement("img");
    iconEl.setAttribute("src", iconUrl);
    iconEl.setAttribute("alt", "Icon");

    thisCard.children[0].appendChild(iconEl);


  }
}

function renderSearchHistory() {

  // Call this function when the "Clear History" button is clicked
  $("#clear-history-btn").on("click", clearSearchHistory);

  // Initial update of the search history when the page loads
  updateSearchHistory();
}
// On page load, retrieve weather data from local storage if available
document.addEventListener("DOMContentLoaded", () => {
  let storedSearchHistory = localStorage.getItem("search");
  if (storedSearchHistory) {
    searchHistory = JSON.parse(storedSearchHistory);
    updateSearchHistory();
  }
})

// Save the updated search history to local storage
localStorage.setItem("search", JSON.stringify(searchHistory));

let weatherDataArray = [];

function saveWeatherDataToLocalStorage() {
  localStorage.setItem("weatherData", JSON.stringify(weatherDataArray));
}

// Save weather data to local storage whenever it's updated
weatherDataArray.push(data); // Make sure to push the data into the array wherever you receive it.
saveWeatherDataToLocalStorage();
document.addEventListener("DOMContentLoaded", () => {
  let storedData = localStorage.getItem("weatherData");
  if (storedData) {
    weatherDataArray = JSON.parse(storedData);
  }
});










