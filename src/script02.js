// clock for current day and time
function clock() {
    var date = new Date()
    var ampm = date.getHours() >= 12 ? ' PM' : ' AM';
    let hours = date.getHours();
    if (hours < 10) {
        hours = `0${hours}`;
    }
    let minutes = date.getMinutes();
    if (minutes < 10) {
        minutes = `0${minutes}`;
    }
    let seconds = date.getSeconds();
    if (seconds < 10) {
        seconds = `0${seconds}`;
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

    var currentDay = days[date.getDay()]; 
    currentDay = `<b>${currentDay}</b> ${hours}:${minutes}:${seconds} ${ampm}`;
    document.getElementById('day-main').innerHTML = currentDay;
    displayClock();
}
// display live-changing clock
function displayClock(){
    var refresh = 1000; // refresh rate in milli seconds
    mytime = setTimeout('clock()', refresh)
}
displayClock()


// display weather of city
function displayWeather(response) {
    let temperatureElement = document.querySelector("#temp-main");
    let cityElement = document.querySelector("#display-city");
    let statusElement = document.querySelector("#weather-status");
    let cloudElement = document.querySelector("#cloudiness");
    let humidityElement = document.querySelector("#humidity");
    let windElement = document.querySelector("#wind-speed");
    let iconElement = document.querySelector("#icon-main");
  
    fahrenheitTemperature = response.data.main.temp;
  
    temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
    cityElement.innerHTML = response.data.name;
    statusElement.innerHTML = response.data.weather[0].description;
    cloudElement.innerHTML = `Cloudiness: ${response.data.clouds.all}%`;
    humidityElement.innerHTML = `Humidity ${response.data.main.humidity}%`;
    windElement.innerHTML = `Wind: ${Math.round(response.data.wind.speed)} mph`;

    if (response.data.weather[0].description == "clear sky") {
        iconElement.innerHTML = `<i class="fa-solid fa-sun"></i>`;
    }
    if (response.data.weather[0].description == "few clouds") {
        iconElement.innerHTML = `<i class="fa-solid fa-cloud-sun">`;
    }
    if (response.data.weather[0].description == "scattered clouds") {
        iconElement.innerHTML = `<i class="fa-solid fa-cloud"></i>`;
    }
    if (response.data.weather[0].description == "broken clouds") {
        iconElement.innerHTML = `<i class="fa-solid fa-cloud-sun"></i>`;
    }
    if (response.data.weather[0].description == "shower rain") {
        iconElement.innerHTML = `<i class="fa-solid fa-cloud-showers-heavy"></i>`;
    }
    if (response.data.weather[0].description == "rain") {
        iconElement.innerHTML = `<i class="fa-solid fa-cloud-sun-rain"></i>`;
    }
    if (response.data.weather[0].description == "thunderstorm") {
        iconElement.innerHTML = `<i class="fa-solid fa-cloud-bolt"></i>`;
    }
    if (response.data.weather[0].description == "snow") {
        iconElement.innerHTML = `<i class="fa-solid fa-snowflake"></i>`;
    }
    if (response.data.weather[0].description == "mist") {
        iconElement.innerHTML = `<i class="fa-solid fa-bars-staggered"></i>`;
    }
  }
// api key and url to search
function search(city) {
    let apiKey = "bc2cd97eaa209e7d22d8f3c84081655f";
    let units = "imperial";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
    axios.get(apiUrl).then(displayWeather);
}
// handle user submission
function handleSubmit(event) {
    event.preventDefault();
    let cityInputElement = document.querySelector("#city-input");
    if (cityInputElement.value) {
        search(cityInputElement.value);
    } else {
        document.getElementById("city-input").placeholder = `please input a city`;
        const timeOut = setTimeout(revert, 1000);
        function revert() {
            document.getElementById("city-input").placeholder = `search city`
        };
    }
}


// current location - api key and url to search
function searchLocation(position) {
    let lat = position.coords.latitude;
    let lon = position.coords.longitude;
    let apiKey = "bc2cd97eaa209e7d22d8f3c84081655f";
    let units = "imperial";
    let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=${units}`;
    axios.get(url).then(displayWeather);
};
// get current location
function getLocation() {
    navigator.geolocation.getCurrentPosition(searchLocation);
};


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

let locationButton = document.querySelector("#location-button");
locationButton.addEventListener("click", getLocation);

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", displayFahrenheitTemperature);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", displayCelsiusTemperature);

search("New York");