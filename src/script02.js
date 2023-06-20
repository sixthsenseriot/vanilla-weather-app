// clock for current day and time
function clock() {
    var date = new Date()
    var ampm = date.getHours() >= 12 ? ' PM' : ' AM';
    let hours = date.getHours();
    hours = ((hours + 11) % 12 + 1);
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
    
    // display upcoming days
    var daysOfTheWeek = [
        "Sun",
        "Mon",
        "Tue",
        "Wed",
        "Thu",
        "Fri",
        "Sat"
    ]
    var upcomingDays = [];
    currentDayOfWeek = date.getDay();
    for (var i = 1; i <= 5; i++) {
        var upcomingDayIndex = (currentDayOfWeek + i) % 7;
        var upcomingDay = daysOfTheWeek[upcomingDayIndex];
        upcomingDays.push(upcomingDay);
    }
    document.getElementById('day-one').innerHTML = upcomingDays[0];
    document.getElementById('day-two').innerHTML = upcomingDays[1];
    document.getElementById('day-three').innerHTML = upcomingDays[2];
    document.getElementById('day-four').innerHTML = upcomingDays[3];
    document.getElementById('day-five').innerHTML = upcomingDays[4];

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
    humidityElement.innerHTML = `Humidity: ${response.data.main.humidity}%`;
    windElement.innerHTML = `Wind: ${Math.round(response.data.wind.speed)} mph`;

    // change icon based on weather
    if (response.data.weather[0].main == "Clear") {
        iconElement.innerHTML = `<i class="fa-solid fa-sun"></i>`;
    };
    if (response.data.weather[0].main == "Clouds") {
        if (response.data.weather[0].description == "scattered clouds") {
            iconElement.innerHTML = `<i class="fa-solid fa-cloud"></i>`;
        } else {
            iconElement.innerHTML = `<i class="fa-solid fa-cloud-sun"></i>`;
        }
    };
    if (response.data.weather[0].main == "Thunderstorm") {
        iconElement.innerHTML = `<i class="fa-solid fa-cloud-bolt"></i>`;
    };
    if (response.data.weather[0].main == "Drizzle") {
        iconElement.innerHTML = `<i class="fa-solid fa-cloud-showers-heavy"></i>`;
    };
    if (response.data.weather[0].main == "Snow") {
        iconElement.innerHTML = `<i class="fa-regular fa-snowflake"></i>`;
    };
    if (response.data.weather[0].main == "Rain") {
        if (response.data.weather[0].description == "freezing rain") {
            iconElement.innerHTML = `<i class="fa-regular fa-snowflake"></i>`;
        } else if (response.data.weather[0].description == "light intensity shower rain" ||
            response.data.weather[0].description == "shower rain" ||
            response.data.weather[0].description == "heavy intensity shower rain" ||
            response.data.weather[0].description == "ragged shower rain") {
            iconElement.innerHTML = `<i class="fa-solid fa-cloud-showers-heavy"></i>`;        
        } else {
            iconElement.innerHTML = `<i class="fa-solid fa-cloud-sun-rain"></i>`;
        }
    };
    if (response.data.weather[0].main == "Mist" ||
        response.data.weather[0].main == "Smoke" ||
        response.data.weather[0].main == "Haze" ||
        response.data.weather[0].main == "Dust" ||
        response.data.weather[0].main == "Fog" ||
        response.data.weather[0].main == "Sand" ||
        response.data.weather[0].main == "Squall") {
            iconElement.innerHTML = `<i class="fa-solid fa-bars-staggered"></i>`;
    };
    if (response.data.weather[0].main == "Ash") {
        iconElement.innerHTML = `<i class="fa-solid fa-volcano"></i>`;
    };
    if (response.data.weather[0].main == "Tornado") {
        iconElement.innerHTML = `<i class="fa-solid fa-tornado"></i>`;
    };
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
        searchSix(cityInputElement.value);
    } else {
        document.getElementById("city-input").placeholder = `please input a city`;
        const timeOut = setTimeout(revert, 1000);
        function revert() {
            document.getElementById("city-input").placeholder = `search city`
        };
    }
}


// 6 day forecast - display weather temperature
function displaySixWeather(response) {
    let dayOneTemp = document.querySelector("#day-one-temp");
    let dayTwoTemp = document.querySelector("#day-two-temp");
    let dayThreeTemp = document.querySelector("#day-three-temp");
    let dayFourTemp = document.querySelector("#day-four-temp");
    let dayFiveTemp = document.querySelector("#day-five-temp");

    fahrenOneA = response.data.forecast.forecastday[1].hour[8].temp_f;
    fahrenOneB = response.data.forecast.forecastday[1].hour[22].temp_f;
    
    fahrenTwoA = response.data.forecast.forecastday[2].hour[8].temp_f;
    fahrenTwoB = response.data.forecast.forecastday[2].hour[22].temp_f;
    
    fahrenThreeA = response.data.forecast.forecastday[3].hour[8].temp_f;
    fahrenThreeB = response.data.forecast.forecastday[3].hour[22].temp_f;
    
    fahrenFourA = response.data.forecast.forecastday[4].hour[8].temp_f;
    fahrenFourB = response.data.forecast.forecastday[4].hour[22].temp_f;
    
    fahrenFiveA = response.data.forecast.forecastday[5].hour[8].temp_f;
    fahrenFiveB = response.data.forecast.forecastday[5].hour[22].temp_f;

    dayOneTemp.innerHTML = `${Math.round(fahrenOneA)}° | ${Math.round(fahrenOneB)}°`;
    dayTwoTemp.innerHTML = `${Math.round(fahrenTwoA)}° | ${Math.round(fahrenTwoB)}°`;
    dayThreeTemp.innerHTML = `${Math.round(fahrenThreeA)}° | ${Math.round(fahrenThreeB)}°`;
    dayFourTemp.innerHTML = `${Math.round(fahrenFourA)}° | ${Math.round(fahrenFourB)}°`;
    dayFiveTemp.innerHTML = `${Math.round(fahrenFiveA)}° | ${Math.round(fahrenFiveB)}°`;
}
// 6 day forecast - url and search
function searchSix(city) {
    let apiKey = "1fbfa7e03f9e47a983e215114231906";
    let days = 6;
    let apiUrl = `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${city}&days=${days}&aqi=no&alerts=no`;
    axios.get(apiUrl).then(displaySixWeather);
}


// 6 day forecast - current location - api key and url to search
function searchSixLocation(position) {
    let lat = position.coords.latitude;
    let lon = position.coords.longitude;
    let apiKey = "1fbfa7e03f9e47a983e215114231906";
    let days = 6;
    let apiUrl = `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${lat},${lon}&days=${days}&aqi=no&alerts=no`;
    axios.get(apiUrl).then(displaySixWeather);
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
    navigator.geolocation.getCurrentPosition(searchSixLocation);
};


// display celsius temperature
function displayCelsiusTemperature(event) {
    event.preventDefault();
    let temperatureElement = document.querySelector("#temp-main");
    let celsiusTemperature = (fahrenheitTemperature - 32) * (5 / 9);
    temperatureElement.innerHTML = Math.round(celsiusTemperature);

    // convert 6 day forecast to celsius
    let dayOneTemp = document.querySelector("#day-one-temp");
    let dayTwoTemp = document.querySelector("#day-two-temp");
    let dayThreeTemp = document.querySelector("#day-three-temp");
    let dayFourTemp = document.querySelector("#day-four-temp");
    let dayFiveTemp = document.querySelector("#day-five-temp");

    let celOneA = (fahrenOneA - 32) * (5 / 9);
    let celOneB = (fahrenOneB - 32) * (5 / 9);

    let celTwoA = (fahrenTwoA - 32) * (5 / 9);
    let celTwoB = (fahrenTwoB - 32) * (5 / 9);
    
    let celThreeA = (fahrenThreeA - 32) * (5 / 9);
    let celThreeB = (fahrenThreeB - 32) * (5 / 9);

    let celFourA = (fahrenFourA - 32) * (5 / 9);
    let celFourB = (fahrenFourB - 32) * (5 / 9);

    let celFiveA = (fahrenFiveA - 32) * (5 / 9);
    let celFiveB = (fahrenFiveB - 32) * (5 / 9);

    dayOneTemp.innerHTML = `${Math.round(celOneA)}° | ${Math.round(celOneB)}°`;
    dayTwoTemp.innerHTML = `${Math.round(celTwoA)}° | ${Math.round(celTwoB)}°`;
    dayThreeTemp.innerHTML = `${Math.round(celThreeA)}° | ${Math.round(celThreeB)}°`;
    dayFourTemp.innerHTML = `${Math.round(celFourA)}° | ${Math.round(celFourB)}°`;
    dayFiveTemp.innerHTML = `${Math.round(celFiveA)}° | ${Math.round(celFiveB)}°`;
}
// display fahrenheit temperature
function displayFahrenheitTemperature(event) {
    event.preventDefault();
    let temperatureElement = document.querySelector("#temp-main");
    temperatureElement.innerHTML = Math.round(fahrenheitTemperature);

    // convert 6 day forecast to fahrenheit
    let dayOneTemp = document.querySelector("#day-one-temp");
    let dayTwoTemp = document.querySelector("#day-two-temp");
    let dayThreeTemp = document.querySelector("#day-three-temp");
    let dayFourTemp = document.querySelector("#day-four-temp");
    let dayFiveTemp = document.querySelector("#day-five-temp");

    dayOneTemp.innerHTML = `${Math.round(fahrenOneA)}° | ${Math.round(fahrenOneB)}°`;
    dayTwoTemp.innerHTML = `${Math.round(fahrenTwoA)}° | ${Math.round(fahrenTwoB)}°`;
    dayThreeTemp.innerHTML = `${Math.round(fahrenThreeA)}° | ${Math.round(fahrenThreeB)}°`;
    dayFourTemp.innerHTML = `${Math.round(fahrenFourA)}° | ${Math.round(fahrenFourB)}°`;
    dayFiveTemp.innerHTML = `${Math.round(fahrenFiveA)}° | ${Math.round(fahrenFiveB)}°`;
}

let fahrenheitTemperature = null;

let fahrenOneA = null;
let fahrenOneB = null;

let fahrenTwoA = null;
let fahrenTwoB = null;

let fahrenThreeA = null;
let fahrenThreeB = null;

let fahrenFourA = null;
let fahrenFourB = null;

let fahrenFiveA = null;
let fahrenFiveB = null;

let form = document.querySelector("#search");
form.addEventListener("submit", handleSubmit);

let locationButton = document.querySelector("#location-button");
locationButton.addEventListener("click", getLocation);

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", displayFahrenheitTemperature);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", displayCelsiusTemperature);

search("New York");
searchSix("New York");