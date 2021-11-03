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

//City search engine
let citySearched = document.querySelector("#city-search-form");

function cityDisplay(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input");
  let currentCity = document.querySelector("h2");
  currentCity.innerHTML = city.value.toUpperCase();
}

citySearched.addEventListener("submit", cityDisplay);

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
