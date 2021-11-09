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
  let temperature = Number(document.querySelector("#temp").innerHTML);

  if (currentUnit.innerHTML === "°C") {
    currentUnit.innerHTML = "°F";
    unusedUnit.innerHTML = "°C";
    displayTemp.innerHTML = temperature * 1.8 + 32;
  } else {
    currentUnit.innerHTML = "°C";
    unusedUnit.innerHTML = "°F";
    displayTemp.innerHTML = (temperature - 32) / 1.8;
  }
}

unusedtUnit.addEventListener("click", unitConverter);

//City search engine
let citySearched = document.querySelector("#city-search-form");

function getCityInfo(response) {
  let cityInfo = response.data;
  console.log(cityInfo);

  let temperature = cityInfo.main.temp;
  console.log(temperature);
  let description = cityInfo.weather[0].description;
  console.log(description);
  let weather = cityInfo.weather[0].main;
  console.log(weather);
  let humidity = cityInfo.main.humidity;
  console.log(humidity);
  let pressure = cityInfo.main.pressure;
  console.log(pressure);
  let wind = cityInfo.wind.speed;
  console.log(wind);
}

function inputCity(event) {
  event.preventDefault();
  city = document.querySelector("#city-input");
  console.log(city.value);

  let apiKey = "ce5b2bb33ecd8a0125c5f9876d5e019d";
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${city.value}&appid=${apiKey}&units=metric`;

  axios.get(url).then(getCityInfo);

  //Display succesful searched city
  let h2 = document.querySelector("#city");
  h2.innerHTML = city.value;
}

citySearched.addEventListener("submit", inputCity);
