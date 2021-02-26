//Feature 1: Display the current date and time
//Feature 2: Add a search engine, when searching for a city (i.e. Paris), display the city name on the page after the user submits the form.
//Bonus Feature: Display a fake temperature (i.e 17) in Celsius and add a link to convert it to Fahrenheit. When clicking on it, it should convert the temperature to Fahrenheit. When clicking on Celsius, it should convert it back to Celsius.
function formatDate(date) {
  let hours = date.getHours();
    if (hours < 10) { //because it should return 02 and not 2, so an integer to a string
      hours = `0${hours}`;
    }
let minutes = date.getMinutes();
    if (minutes < 10) {
      minutes = `0${minutes}`;
    }

let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
let day = days[date.getDay()];

return `${day} ${hours}:${minutes}`; 
}

function displayWeatherCondition(response){
  console.log(response)
  document.querySelector("#city").innerHTML = response.data.name; //When using the city name that is given by the API, misspelling such as "Sidney" instead of "Sydney" is automatically corrected.
  document.querySelector("#temperature-value.temperature").innerHTML = Math.round(response.data.main.temp);
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(response.data.wind.speed);
  document.querySelector("#description").innerHTML = response.data.weather[0].main;
}

function searchCity(city){
  let apiEndpoint = "https://api.openweathermap.org/data/2.5/weather";
  let apiKey = "1f80eaaa9280abab4887021bf367220d";
  let units = "metric";
  let apiUrl = `${apiEndpoint}?q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(displayWeatherCondition);
}

function handleSubmit(event) {
  event.preventDefault();
  //let cityElement = document.querySelector("#city");
  //let searchedCity = document.querySelector("#searched-city");
  //cityElement.innerHTML = searchedCity.value;
  //Search for real cities by making an API call to OpenWeather API
  //Once I get the HTTP response, display the city name and the temperature
  //let apiEndpoint = "https://api.openweathermap.org/data/2.5/weather";
  //let apiKey = "1f80eaaa9280abab4887021bf367220d";
  let city = document.querySelector("#searched-city").value;
  //let units = "metric";
  //let apiUrl = `${apiEndpoint}?q=${city}&appid=${apiKey}&units=${units}`;
  //axios.get(apiUrl).then(displayWeatherCondition);
  searchCity(city);
}

function searchLocation(position){
  let apiEndpoint = "https://api.openweathermap.org/data/2.5/weather";
  let apiKey = "1f80eaaa9280abab4887021bf367220d";
  let units = "metric";
  let apiUrl = `${apiEndpoint}?lat=${position.coords.latitude}?lon=${position.coords.longitude}&appid=${apiKey}&units=${units}`; 
  axios.get(apiUrl).then(displayWeatherCondition);
}

function getCurrentLocation(event){
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

function convertToFahrenheit(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature-value");
  temperatureElement.innerHTML = 66;
  //More advanced, if you want to do the math:
  //let temperature = temperatureElement.innerHTML; //This will return a string which is why I need to...
  //temperature = Number(temperature); //...convert the result into a number.
  //temperatureElement.innerHTML = Math.round((temperature * 9) / 5 + 32);
}

function convertToCelcius(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature-value");
  temperatureElement.innerHTML = 19;
}

let dateElement = document.querySelector("#current-date-and-time");
let currentTime = new Date();
let cityElement = document.querySelector("#city");
let searchForm = document.querySelector("#search-form");

searchForm.addEventListener("submit", handleSubmit);

dateElement.innerHTML = formatDate(currentTime); 

let currentLocationButton = document.querySelector("#current-location-button");
currentLocationButton.addEventListener("click", getCurrentLocation);

searchCity("New York");