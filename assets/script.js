const apikey = "7d746d476e984cb40b4f79bea395436b";

// handling data with a callback function
// const data = fetch(
//   `https://api.openweathermap.org/data/2.5/weather?q=London,uk&APPID=${apikey}`
// ).then((response) => {
//   console.log(response);
//   console.log("data returned");
// });

// var lastResults = localStorage.setItem(cityIndex);
window.localStorage.getItem(cityIndex);
document.getElementById("cityIndex").innerHTML = "";

// console.log("data fetched");
const dayEl = document.getElementById("day");
const weatherEl = document.getElementById("cityWeather");
const tempEl = document.getElementById("cityTemp");
const windEl = document.getElementById("cityWind");
const UVIndexEl = document.getElementById("cityUVIndex");
const humidityEl = document.getElementById("cityHumidity");

// async function calls
const getData = async (cityName) => {
  try {
    const geoData = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&APPID=${apikey}`
    );
    const geojson = await geoData.json();

    const foreCastData = await fetch(
      `https://api.openweathermap.org/data/2.5/onecall?lat=${geojson.coord.lat}&lon=${geojson.coord.lon}&units=metric&exclude=hourly,minutely&appid=${apikey}`
    );
    const foreCastjson = await foreCastData.json();

    // Current Data extraction for weather
    const date = new Date(foreCastjson.current.dt * 1000);
    const dayAsString = Weekday[date.getDay()];

    dayEl.innerText = `${cityName} - ${dayAsString}`;
    weatherEl.innerText = foreCastjson.current.weather[0].description;
    tempEl.innerText = Math.round(geojson.main.temp) + "C 🌡";
    windEl.innerText = Math.round(geojson.wind.speed) + "km/h wind speed 🌬";
    UVIndexEl.innerText = Math.round(foreCastjson.current.uvi) + " UV Index 🧴";
    humidityEl.innerText = Math.round(geojson.main.humidity) + "% Humidity 💧";

    document.getElementById("dailyCardContainer").innerHTML = "";

    // Forecast data extraction for weather
    foreCastjson.daily.slice(1, 6).forEach((day) => {
      const date = new Date(day.dt * 1000);
      const dayAsString = Weekday[date.getDay()];

      document.getElementById("dailyCardContainer").innerHTML += `
      <div class="dailyCard col card">
        <h4 class="temp">${dayAsString}</h4>
        <h6 class="temp">${day.weather[0].description} </h6>
        <p class="temp">${Math.round(day.temp.day)}C 🌡</p>
        <p class="temp">${Math.round(day.wind_speed)}km/h wind speed 🌬</p>
        <p class="temp">${Math.round(day.uvi)} UV Index 🧴</p>
        <p class="temp">${Math.round(day.humidity)}% Humidity💧</p>
      </div>`;
    });

    // code stops executing until it comes back
    console.log(foreCastjson);
  } catch (err) {
    alert(err);
  }
};

Weekday = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

// getData();
//console.log("a");

const searchForCity = (event) => {
  event.preventDefault();
  const cityQuery = document.getElementById("cityIndex").value;
  getData(cityQuery);
};

document.getElementById("cityIndex").focus();
