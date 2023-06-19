// include current day and time
function formatDate(now) {
    let date = new Date(now);
    let hours = date.getHours();
    if (hours < 10) {
    hours = `0${hours}`;
    }
    let minutes = date.getMinutes();
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
    let day = days[date.getDay()];
    return `<b>${day}</b> ${hours}:${minutes}`;
}
let dayMain = document.querySelector("#day-main");
let currentTime = new Date();
dayMain.innerHTML = formatDate(currentTime);


// display weather of city
function displayTemperature(response) {
    let temperatureElement = document.querySelector("#temp-main");
    let cityElement = document.querySelector("#display-city");
    let statusElement = document.querySelector("#weather-status");
    let humidityElement = document.querySelector("#humidity");
    let windElement = document.querySelector("#wind-speed");
  
    fahrenheitTemperature = response.data.main.temp;
  
    temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
    cityElement.innerHTML = response.data.name;
    statusElement.innerHTML = response.data.weather[0].description;
    humidityElement.innerHTML = `Humidity ${response.data.main.humidity}%`;
    windElement.innerHTML = `Wind: ${Math.round(response.data.wind.speed * 3.6)} mph`;
  }


// api key and url to search
function search(city) {
    let apiKey = "bc2cd97eaa209e7d22d8f3c84081655f";
    let units = "imperial";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
    axios.get(apiUrl).then(displayTemperature);
}


// handle user submission
function handleSubmit(event) {
    event.preventDefault();
    let cityInputElement = document.querySelector("#city-input");
    if (cityInputElement.value) {
        search(cityInputElement.value);
    } else {
        document.getElementById("city-input").placeholder = `please input a city`;
        const timeOut = setTimeout(revert, 900);
        function revert() {
            document.getElementById("city-input").placeholder = `search city`
        };
    }
}


// display celsius temperature
function displayCelsiusTemperature(event) {
    event.preventDefault();
    let temperatureElement = document.querySelector("#temp-main");
    let celsiusTemperature = (fahrenheitTemperature - 32) * (5 / 9);
    temperatureElement.innerHTML = Math.round(celsiusTemperature);
}


// display fahrenheit temperature
function displayFahrenheitTemperature(event) {
    event.preventDefault();
    let temperatureElement = document.querySelector("#temp-main");
    temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
}

let fahrenheitTemperature = null;

let form = document.querySelector("#search");
form.addEventListener("submit", handleSubmit);

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", displayFahrenheitTemperature);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", displayCelsiusTemperature);

search("New York");