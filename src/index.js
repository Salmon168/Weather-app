//Converts 24 hour format to 12 hour format
function get12HourTime(date) {
  let hour = date.getHours();
  if (hour === 0) {
    hour = 12;
  } else if (date.getHours() !== 12) {
    hour = date.getHours() % 12;
  } else {
    hour = 12;
  }
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

//Get local time
let now = new Date();

let currentDate = document.querySelector("#local-time");

currentDate.innerHTML = `${get12HourTime(now)} </br > ${getDate(now)}`;

//Switching temperature unit between celcius and fahrenheit
let unusedUnit = document.querySelector("#unused-unit");

function unitConverter() {
  tempElements = [
    "temp",
    "feel",
    "min-temp",
    "maxi-temp",
    "min-forecast-temp-1",
    "min-forecast-temp-2",
    "min-forecast-temp-3",
    "min-forecast-temp-4",
    "min-forecast-temp-5",
    "min-forecast-temp-6",
    "max-forecast-temp-1",
    "max-forecast-temp-2",
    "max-forecast-temp-3",
    "max-forecast-temp-4",
    "max-forecast-temp-5",
    "max-forecast-temp-6",
  ];
  let currentUnit = document.querySelector("#current-unit");
  tempElements.forEach(function tempChange(tempi) {
    let currentTemp = document.querySelector(`#${tempi}`);
    tempNum = Number(currentTemp.innerHTML);
    let temperature = {
      celcius: ((tempNum - 32) / 1.8).toFixed(1),
      fahrenheit: (tempNum * 1.8 + 32).toFixed(1),
    };

    if (currentUnit.innerHTML === "°C") {
      currentTemp.innerHTML = Math.round(temperature.fahrenheit);
    } else {
      currentTemp.innerHTML = Math.round(temperature.celcius);
    }
  });
  if (currentUnit.innerHTML === "°C") {
    currentUnit.innerHTML = "°F";
    unusedUnit.innerHTML = "°C";
    tempElements.slice(1).forEach(function unitChange(temp) {
      let currentTempUnit = document.querySelector(`#${temp}-unit`);
      currentTempUnit.innerHTML = "°F";
    });
  } else {
    currentUnit.innerHTML = "°C";
    unusedUnit.innerHTML = "°F";
    tempElements.slice(1).forEach(function unitChange(temp) {
      let currentTempUnit = document.querySelector(`#${temp}-unit`);
      currentTempUnit.innerHTML = "°C";
    });
  }
}

unusedUnit.addEventListener("click", unitConverter);

//Search engine
//Search by city
let citySearched = document.querySelector("#city-search-form");
//Search by location
let locationSearched = document.querySelector("#location-button");

function switchTheme(icon) {
  if (icon.includes("d")) {
    let background = document.querySelector(".container");
    background.style.background =
      "linear-gradient(180deg, rgba(42,117,185,1) 0%, rgba(67,147,213,1) 26%, rgba(118,174,225,1) 88%)";
    let bodyColor = document.querySelector("body");
    bodyColor.style.background = "#ffffff";
  }
  if (icon.includes("n")) {
    let background = document.querySelector(".container");
    background.style.background =
      "linear-gradient(180deg,rgba(14, 12, 34, 1) 0%,rgba(66, 94, 127, 1) 90%)";
    let bodyColor = document.querySelector("body");
    bodyColor.style.background = "#cad0d8";
  }
}

function injectForecastHtml(response) {
  console.log(response);

  let forecastDisplay = document.querySelector("#forecast-container");

  let forecastHTML = `<div class="card-group">`;

  forecastNum = [1, 2, 3, 4, 5, 6];

  forecastNum.forEach(function forecast(num) {
    let date = new Date(response.data.daily[num].dt * 1000);
    forecastHTML =
      forecastHTML +
      `
        <div class="card">
          <div class="card-body forecast-day">
            <p class="card-text forecast-day-font">${getDate(date).substring(
              0,
              3
            )}</p>
          </div>
          <img src="" id="forecast-icon-${num}" class="card-img-top" alt="${
        response.data.daily[num].weather[0].main
      }" />
          <div class="forecast"><span class="min-forecast-temp" id="min-forecast-temp-${num}">${Math.round(
        response.data.daily[num].temp.min
      )}</span><span id="min-forecast-temp-${num}-unit">°C</span>   <span class="max-forecast-temp" id="max-forecast-temp-${num}">${Math.round(
        response.data.daily[num].temp.max
      )}</span><span id="max-forecast-temp-${num}-unit">°C</span></div>
        </div>
      `;
  });

  forecastHTML = forecastHTML + `</div>`;

  forecastDisplay.innerHTML = forecastHTML;

  forecastNum.forEach(function forecast(num) {
    let forecastId = response.data.daily[num].weather[0].icon;
    let forecastIcon = document.querySelector(`#forecast-icon-${num}`);
    forecastIcon.setAttribute("src", `src/icons/${forecastId}.gif`);
  });
}

function getForecast(location) {
  let apiKey = "ce5b2bb33ecd8a0125c5f9876d5e019d";
  let link = `https://api.openweathermap.org/data/2.5/onecall?${location}&units=metric&appid=${apiKey}`;
  axios.get(link).then(injectForecastHtml);
}

//Get info from weather api
function getCityInfo(response) {
  let cityInfo = response.data;
  console.log(cityInfo);
  //Extracting info from JSON
  let cityName = cityInfo.name;
  let temperature = Number(cityInfo.main.temp).toFixed(1);
  let weather = cityInfo.weather[0].main;
  let humidity = cityInfo.main.humidity;
  let feel = cityInfo.main.feels_like;
  let wind = cityInfo.wind.speed;
  let min = cityInfo.main.temp_min;
  let max = cityInfo.main.temp_max;

  let timezone = cityInfo.timezone;

  //Display info on app
  //City Name
  let h2 = document.querySelector("#city");
  h2.innerHTML = cityName.toLowerCase();

  //Temperature
  let h1 = document.querySelector("#temp");
  h1.innerHTML = Math.round(temperature);

  //Weather
  let h3 = document.querySelector("#weather");
  h3.innerHTML = weather;

  //Humidity
  let humidityDisplay = document.querySelector("#humid");
  humidityDisplay.innerHTML = humidity;

  //feelsLike
  let feelDisplay = document.querySelector("#feel");
  feelDisplay.innerHTML = Math.round(feel);

  //Wind
  let windDisplay = document.querySelector("#wind");
  windDisplay.innerHTML = wind;

  //min and max
  let mintemp = document.querySelector("#min-temp");
  mintemp.innerHTML = Math.round(min);
  let maxtemp = document.querySelector("#maxi-temp");
  maxtemp.innerHTML = Math.round(max);

  //icon and background
  let iconCode = cityInfo.weather[0].icon;
  let weatherIcon = document.querySelector("#weather-icon");
  weatherIcon.setAttribute("src", `src/icons/${iconCode}.gif`);
  switchTheme(iconCode);

  //forecast
  let lat = cityInfo.coord.lat;
  let lon = cityInfo.coord.lon;
  let locationHtml = `lat=${lat}&lon=${lon}`;
  getForecast(locationHtml);

  //get city Time
  let cityTime = document.querySelector("h4");
  let d = new Date();
  localTime = d.getTime();
  localOffset = d.getTimezoneOffset() * 60000;
  utc = localTime + localOffset;
  let cityDateCode = utc + 1000 * timezone;
  let cityDate = new Date(cityDateCode);
  cityTime.innerHTML = `${get12HourTime(cityDate)} <br /> ${getDate(cityDate)}`;

  //Get refreshed local Time
  let now = new Date();
  let currentDate = document.querySelector("#local-time");
  currentDate.innerHTML = `${get12HourTime(now)} </br > ${getDate(now)}`;
}

function inputCity(city) {
  let apiKey = "ce5b2bb33ecd8a0125c5f9876d5e019d";
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  axios.get(url).then(getCityInfo);
}

function submitCity(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input");
  inputCity(city.value);
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

citySearched.addEventListener("submit", submitCity);

inputCity("Kuala Lumpur");

locationSearched.addEventListener("click", inputLocation);

//Weather forecast

let forecastDisplay = document.querySelector("forecast-container");

let forecastHTML = `<div class="card-group">`;

let forcastNum = [0, 1, 2, 3, 4, 5];

function getCityForecast(response) {
  console.log(response);
}
