//start creating the variables
let searchBtnEl = $("#search-btn")
let searchInputEl = $("#search-input")

const API_KEY = "f6db0a47aab47705d7072b6b5344e991"

function searchHandle(){

    
let cityName = searchInputEl.val()



let url = `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${API_KEY}&days=5`
console.log(url)
fetch(url)
.then(function(response){
    return response.json()
})
.then(function(data){
   processData(data)
    
})


}
searchBtnEl.on("click", searchHandle)

function processData(data){
    
 let weatherArray = data.list;
 let weatherDataToSave = [];
 
for (let i = 0; i < 5; i++) {
   let weatherData = weatherArray[i * 8]; // Access weather data for each day
   console.log(weatherData);
   let date = new Date(weatherData.dt * 1000);
   let temperature = Math.round(weatherData.main.temp - 273.15); // Convert temperature from Kelvin to Celsius
   let description = weatherData.weather[0].description;
   let icon = weatherData.weather[0].icon;

//Save data to an object and add it to the array
let weatherObject = {
   date: date.toISOString(),
   temperature: temperature,
   description: description,
   icon: icon
}
weatherDataToSave.push(weatherObject);
   }
  //Save the weather data array to local storage
  localStorage.setItem("weatherData", JSON.stringify(weatherDataToSave))
  }
//Get the data from local store to retrieve the saved weather data
function getWeatherDataFromLocalStorage(){
   let storedData = localStorage.getItem("weatherData")
   if (storedData){
      let weatherDataArray = JSON.parse(storedData)
      console.log(weatherDataArray);
      return weatherDataArray;
   }else{
      console.log("No weather data found in local storage")
      return []

   
    }
}
 







