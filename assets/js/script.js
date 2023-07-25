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
    
 let weatherArray = data.list
 
 for(let i=0; i<5; i++){
    console.log(weatherArray[i*8])
    let date = new Date(weatherData.dt * 1000);
    let temperature = Math.round(weatherData.main.temp - 273.15); // Convert temperature from Kelvin to Celsius
    let description = weatherData.weather[0].description;
    let icon = weatherData.weather[0].icon;

   //  let weatherCard = `
   //    <div class="weather-card">
   //      <p>Date: ${date.toDateString()}</p>
   //      <p>Temperature: ${temperature}°C</p>
   //      <p>Description: ${description}</p>
   //      <img src="http://openweathermap.org/img/w/${icon}.png" alt="Weather Icon">
   //    </div>
   //  `;

    weatherContainer.append(weatherCard);
  }
}
 







//Getting and displaying the text for the upcoming five days of the week
// var d = new Date();
// var weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday",];

//Function to get the correct integer for the index of the days array
// function CheckDay(day){
//     if(day + d.getDay() > 6){
//         return day + d.getDay() - 7;
//     }
//     else{
//         return day + d.getDay();
//     }
// }

//     for(i = 0; i<5; i++){
//         document.getElementById("day" + (i+1)).innerHTML = weekday[CheckDay(i)];
//     }
