// Getting date and time
let now = new Date();

//Converts 24 hour format to 12 hour format
function get12HourTime(date) {
  let hour = date.getHours() % 12;
  let minute = ("0" + date.getMinutes()).slice(-2);
  let period = "";

  if (date.getHours() >= 12) {
    period = "PM";
  } else {
    period = "AM";
  }

  let formattedTime = `${hour}:${minute} ${period}`;

  return formattedTime;
}

//Format date from numerical to alphabetic
function getDate(date) {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  let formattedDate = `${days[date.getDay()]}, ${date.getDate()} ${
    months[date.getMonth()]
  } ${date.getFullYear()}`;

  return formattedDate;
}

let dateDisplay = document.querySelector("h4");

dateDisplay.innerHTML = `${get12HourTime(now)} </br > ${getDate(now)}`;

//Switching temperature unit between celcius and fahrenheit
let unusedtUnit = document.querySelector("#unused-unit");

function unitConverter() {
  let currentUnit = document.querySelector("#current-unit");
  let unusedUnit = document.querySelector("#unused-unit");
  let displayTemp = document.querySelector("#temp");
  let currentTemp = Number(document.querySelector("#temp").innerHTML);
  let temperature = {
    celcius: ((currentTemp - 32) / 1.8).toFixed(1),
    fahrenheit: (currentTemp * 1.8 + 32).toFixed(1),
  };

  if (currentUnit.innerHTML === "°C") {
    currentUnit.innerHTML = "°F";
    unusedUnit.innerHTML = "°C";
    displayTemp.innerHTML = temperature.fahrenheit;
  } else {
    currentUnit.innerHTML = "°C";
    unusedUnit.innerHTML = "°F";
    displayTemp.innerHTML = temperature.celcius;
  }
}

unusedtUnit.addEventListener("click", unitConverter);

//Search engine
//Search by city
let citySearched = document.querySelector("#city-search-form");
//Search by location
let locationSearched = document.querySelector("#location-button");

//Get info from weather api
function getCityInfo(response) {
  let cityInfo = response.data;
  console.log(cityInfo);

  //Extracting info from JSON
  let cityName = cityInfo.name;
  let temperature = Number(cityInfo.main.temp).toFixed(1);
  let description = cityInfo.weather[0].description;
  let weather = cityInfo.weather[0].main;
  let humidity = cityInfo.main.humidity;
  let pressure = cityInfo.main.pressure;
  let wind = cityInfo.wind.speed;

  //Display info on app
  //City Name
  let h2 = document.querySelector("#city");
  h2.innerHTML = cityName.toLowerCase();

  //Temperature
  let h1 = document.querySelector("#temp");
  h1.innerHTML = temperature;

  //Weather
  let h3 = document.querySelector("#weather");
  h3.innerHTML = weather;

  //Humidity
  let humidityDisplay = document.querySelector("#humid");
  humidityDisplay.innerHTML = humidity;

  //Pressure
  let pressureDisplay = document.querySelector("#pressure");
  pressureDisplay.innerHTML = pressure;

  //Wind
  let windDisplay = document.querySelector("#wind");
  windDisplay.innerHTML = wind;
}

function inputCity(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input");
  console.log(city.value);

  let apiKey = "ce5b2bb33ecd8a0125c5f9876d5e019d";
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${city.value}&appid=${apiKey}&units=metric`;

  axios.get(url).then(getCityInfo);
}

function getCityName(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;

  let apiKey = "ce5b2bb33ecd8a0125c5f9876d5e019d";
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;

  axios.get(url).then(getCityInfo);
}

function inputLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(getCityName);
}

citySearched.addEventListener("submit", inputCity);

locationSearched.addEventListener("click", inputLocation);

// function initialCity() {
//   navigator.geolocation.getCurrentPosition(getCityName);
// }

// initialCity();
