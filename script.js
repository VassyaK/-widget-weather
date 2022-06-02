"use strict";

const WeatherBlock = document.querySelector("#weather");

async function loadWeather(e) {
  WeatherBlock.innerHTML = `
    <div class="weatherLoading">
    <img src="/picters/loading.gif" alt="loading...">
</div>
    `;
  const server =
    "https://api.openweathermap.org/data/2.5/weather?units=metric&q=Minsk&appid=81cc5aa219268696b439080a27c986a6";
  const response = await fetch(server, {
    method: "GET",
  });
  const responseResult = await response.json();

  if (response.ok) {
    getWeather(responseResult);
  } else {
    WeatherBlock.innerHTML = responseResult.message;
  }
}

function getWeather(data) {
  const location = data.name;
  const temp = Math.round(data.main.temp);
  const feelsLike = Math.round(data.main.feels_like);
  const weatherStatus = data.weather[0].main;
  const weatherIcon = data.weather[0].icon;

  const template = `
    <div class="weatherHeader">
        <div class="weatherMain">
            <div class="weatherCity">${location}</div>
            <div class="weatherStatus">${weatherStatus}</div>
        </div>
        <div class="weatherIcon">
        <img src="https://openweathermap.org/img/w/${weatherIcon}.png" alt="${weatherStatus}"
            />
        </div>
    </div>
    <div class="weatherTemp">${temp}</div>
    <div class="weatherFeelLike">Feels like: ${feelsLike}</div>`;

  WeatherBlock.innerHTML = template;
}

if (WeatherBlock) {
  loadWeather();
}
