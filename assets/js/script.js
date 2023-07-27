

//start creating the variables
let searchBtnEl = $("#search-btn");
let searchInputEl = $("#search-input");
let presentWeatherEl = $("#weather-information");
let weatherForecastEl = $("#days-history");

const API_KEY = "f6db0a47aab47705d7072b6b5344e991";
let searchHistory = [];

function searchHandle() {
  let cityName = searchInputEl.val();

  let url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}&days=5`;
  // console.log(url)
  fetch(url)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      processData(data);
    })

}
searchBtnEl.on("click", searchHandle);

function processData(data) {
  // Current weather data
  let weatherArray = data.list;
  let cityName = data.name;
  //  let weatherDataToSave = [];

  for (let i = 0; i < 5; i++) {
    let thisCard = document.querySelector("#day" + i)
    let weatherData = weatherArray[i * 8];
    console.log(weatherData);
    let date = new Date(weatherData.dt * 1000);
    let temperature = Math.round(weatherData.main.temp - 273.15);
    let humidity = weatherData.main.humidity;
    let icon = weatherData.weather[0].icon;
    

    thisCard.childNodes[1].innerHTML = temperature;

  // Display weather icon using OpenWeatherMap's icons
    let iconUrl = `http://openweathermap.org/img/w/${icon}.png`;
    let iconEl = document.createElement("img");
    iconEl.setAttribute("src", iconUrl);
    iconEl.setAttribute("alt", "Weather Icon");

    thisCard.children[0].appendChild(iconEl);
 }
 // Display current weather information
 let currentDate = new Date().toLocaleDateString();
 let currentTemperature = Math.round(data.main.temp - 273.15);
 let currentHumidity = data.main.humidity;
 let currentWindSpeed = data.wind.speed;
 let currentIcon = data.weather[0].icon;

  $("#city-name").text(cityName);
  $("#date").text(currentDate);
  $("#temperature").text(currentTemperature);
  $("#humidity").text(currentHumidity);
  $("#wind-speed").text(currentWindSpeed);

  let currentIconUrl = `http://openweathermap.org/img/w/${currentIcon}.png`;
  let currentIconEl = document.createElement("img");
  currentIconEl.setAttribute("src", currentIconUrl);
  currentIconEl.setAttribute("alt", "Weather Icon");
  $("#current-icon").html(currentIconEl);

  // Save the city to search history and update the local storage
  searchHistory.push(cityName);
  localStorage.setItem("search", JSON.stringify(searchHistory));
  updateSearchHistory();

}

// Call this function when the "Clear History" button is clicked
 $("#clear-history-btn").on("click", clearSearchHistory);

// On page load, retrieve weather data from local storage if available
document.addEventListener("DOMContentLoaded", () => {
  let storedSearchHistory = localStorage.getItem("search");
  if (storedSearchHistory) {
    searchHistory = JSON.parse(storedSearchHistory);
    
  }
})
















