// display city name on page after user search submission
function display(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#city-input");
  let showCity = document.querySelector("#display-city");
  let city = cityInput.value;

  if (cityInput.value) {
    showCity.innerHTML = city;
  } else {
    alert(`Please input a city`);
  }
}

let search = document.querySelector("#search");
search.addEventListener("submit", display);


// include current time on app (day and time)
function formatDate(now) {
  let hours = now.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }

  let minutes = now.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[now.getDay()];

  return `<b>${day}</b> ${hours}:${minutes}`;
}

let dayMain = document.querySelector("#day-main");
let currentTime = new Date();
dayMain.innerHTML = formatDate(currentTime);


 // display current temperature of searched city
 function displayWeather(response) {
    let tempFahrenheit = document.querySelector("#temp-main");
    tempFahrenheit.innerHTML = Math.round(response.data.main.temp);
  
    let weatherStatus = document.querySelector("#weather-status");
    weatherStatus.innerHTML = response.data.weather[0].main;
  
    let humidity = document.querySelector("#humidity");
    humidity.innerHTML = `Humidity: ${response.data.main.humidity}%`;
  
    let windSpeed = document.querySelector("#wind-speed");
    windSpeed.innerHTML = `Wind: ${Math.round(response.data.wind.speed)} mph`
  
  }
  function getWeatherInfo() {
    let cityInput = document.querySelector("#city-input");
    let city = cityInput.value;
    let apiKey = "f5e814a04eddfab1740f07bf0328eee2";
    let units = "imperial";
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
    axios.get(url).then(displayWeather);
  };
  let weather = document.querySelector("#search");
  weather.addEventListener("submit", getWeatherInfo)
  
  