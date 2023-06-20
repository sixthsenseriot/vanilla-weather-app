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
    let backgroundWeather = document.querySelector("#background-weather");
  
    fahrenheitTemperature = response.data.main.temp;

    const weatherDescription = response.data.weather[0].description;
    const weatherStatus = weatherDescription.charAt(0).toUpperCase() + weatherDescription.slice(1);
  
    temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
    cityElement.innerHTML = response.data.name;
    statusElement.innerHTML = weatherStatus;
    cloudElement.innerHTML = `Cloudiness: ${response.data.clouds.all}%`;
    humidityElement.innerHTML = `Humidity: ${response.data.main.humidity}%`;
    windElement.innerHTML = `Wind: ${Math.round(response.data.wind.speed)} mph`;

    // change icon based on weather
    if (response.data.weather[0].main == "Clear") {
        iconElement.innerHTML = `<i class="fa-solid fa-sun"></i>`;
        backgroundWeather.setAttribute("src", `images/clear.jpg`);
    };
    if (response.data.weather[0].main == "Clouds") {
        if (response.data.weather[0].description == "few clouds") {
            iconElement.innerHTML = `<i class="fa-solid fa-cloud-sun"></i>`;
            backgroundWeather.setAttribute("src", `images/partlycloudy.jpg`);
        } else {
            iconElement.innerHTML = `<i class="fa-solid fa-cloud"></i>`;
            backgroundWeather.setAttribute("src", `images/cloudy.jpg`);
        }
    };
    if (response.data.weather[0].main == "Thunderstorm") {
        iconElement.innerHTML = `<i class="fa-solid fa-cloud-bolt"></i>`;
        backgroundWeather.setAttribute("src", `images/thunder.jpg`);
    };
    if (response.data.weather[0].main == "Drizzle") {
        iconElement.innerHTML = `<i class="fa-solid fa-cloud-showers-heavy"></i>`;
        backgroundWeather.setAttribute("src", `images/heavyrain.jpg`);
    };
    if (response.data.weather[0].main == "Snow") {
        if (response.data.weather[0].discription == "sleet" ||
            response.data.weather[0].discription == "light shower sleet" ||
            response.data.weather[0].discription == "shower sleet") {
                iconElement.innerHTML = `<i class="fa-solid fa-cloud-meatball"></i>`;
                backgroundWeather.setAttribute("src", `images/sleet.jpg`);
            } else {
                iconElement.innerHTML = `<i class="fa-regular fa-snowflake"></i>`;
                backgroundWeather.setAttribute("src", `images/snow.jpg`);
            }
    };
    if (response.data.weather[0].main == "Rain") {
        if (response.data.weather[0].description == "light intensity shower rain" ||
            response.data.weather[0].description == "shower rain" ||
            response.data.weather[0].description == "heavy intensity shower rain" ||
            response.data.weather[0].description == "ragged shower rain" || 
            response.data.weather[0].description == "freezing rain") {
                iconElement.innerHTML = `<i class="fa-solid fa-cloud-showers-heavy"></i>`;
                backgroundWeather.setAttribute("src", `images/heavyrain.jpg`);        
        } else {
            iconElement.innerHTML = `<i class="fa-solid fa-cloud-sun-rain"></i>`;
            backgroundWeather.setAttribute("src", `images/lightrain.jpg`);
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
            backgroundWeather.setAttribute("src", `images/mist.jpg`);
    };
    if (response.data.weather[0].main == "Ash") {
        iconElement.innerHTML = `<i class="fa-solid fa-volcano"></i>`;
        backgroundWeather.setAttribute("src", `images/ash.jpg`);
    };
    if (response.data.weather[0].main == "Tornado") {
        iconElement.innerHTML = `<i class="fa-solid fa-tornado"></i>`;
        backgroundWeather.setAttribute("src", `images/tornado.jpg`);
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

    // change 6 day forecast icon based on weather
    let dayOneIcon = document.querySelector("#day-one-icon");
    let dayTwoIcon = document.querySelector("#day-two-icon");
    let dayThreeIcon = document.querySelector("#day-three-icon");
    let dayFourIcon = document.querySelector("#day-four-icon");
    let dayFiveIcon = document.querySelector("#day-five-icon");

    let forOneCode = response.data.forecast.forecastday[1].day.condition.code;
    let forTwoCode = response.data.forecast.forecastday[2].day.condition.code;
    let forThreeCode = response.data.forecast.forecastday[3].day.condition.code
    let forFourCode = response.data.forecast.forecastday[4].day.condition.code;
    let forFiveCode = response.data.forecast.forecastday[5].day.condition.code;

    // 6 day - sun icon
    if (forOneCode == 1000) {
        dayOneIcon.innerHTML = `<i class="fa-solid fa-sun"></i>`;
    };
    if (forTwoCode == 1000) {
        dayTwoIcon.innerHTML = `<i class="fa-solid fa-sun"></i>`;
    };
    if (forThreeCode == 1000) {
        dayThreeIcon.innerHTML = `<i class="fa-solid fa-sun"></i>`;        
    };
    if (forFourCode == 1000) {
        dayFourIcon.innerHTML = `<i class="fa-solid fa-sun"></i>`;        
    };
    if (forFiveCode == 1000) {
        dayFiveIcon.innerHTML = `<i class="fa-solid fa-sun"></i>`;        
    };

    // 6 day - rain heavy icon
    if (forOneCode == 1186 || forOneCode == 1189 || forOneCode == 1192 || forOneCode == 1195 || 
        forOneCode == 1201 || forOneCode == 1243 || forOneCode == 1246) {
            dayOneIcon.innerHTML = `<i class="fa-solid fa-cloud-showers-heavy"></i>`;
    };
    if (forTwoCode == 1186 || forTwoCode == 1189 || forTwoCode == 1192 || forTwoCode == 1195 || 
        forTwoCode == 1201 || forTwoCode == 1243 || forTwoCode == 1246) {
            dayTwoIcon.innerHTML = `<i class="fa-solid fa-cloud-showers-heavy"></i>`;
    };
    if (forThreeCode == 1186 || forThreeCode == 1189 || forThreeCode == 1192 || forThreeCode == 1195 || 
        forThreeCode == 1201 || forThreeCode == 1243 || forThreeCode == 1246) {
            dayThreeIcon.innerHTML = `<i class="fa-solid fa-cloud-showers-heavy"></i>`;
    };
    if (forFourCode == 1186 || forFourCode == 1189 || forFourCode == 1192 || forFourCode == 1195 || 
        forFourCode == 1201 || forFourCode == 1243 || forFourCode == 1246) {
            dayFourIcon.innerHTML = `<i class="fa-solid fa-cloud-showers-heavy"></i>`;
    };
    if (forFiveCode == 1186 || forFiveCode == 1189 || forFiveCode == 1192 || forFiveCode == 1195 || 
        forFiveCode == 1201 || forFiveCode == 1243 || forFiveCode == 1246) {
            dayFiveIcon.innerHTML = `<i class="fa-solid fa-cloud-showers-heavy"></i>`;
    };

    // 6 day - rain moderate / light icon
    if (forOneCode == 1063 || forOneCode == 1072 || forOneCode == 1150 || forOneCode == 1153 || 
        forOneCode == 1168 || forOneCode == 1180 || forOneCode == 1183 || forOneCode == 1198 || 
        forOneCode == 1240) {
            dayOneIcon.innerHTML = `<i class="fa-solid fa-cloud-sun-rain"></i>`;
    };
    if (forTwoCode == 1063 || forTwoCode == 1072 || forTwoCode == 1150 || forTwoCode == 1153 || 
        forTwoCode == 1168 || forTwoCode == 1180 || forTwoCode == 1183 || forTwoCode == 1198 || 
        forTwoCode == 1240) {
            dayTwoIcon.innerHTML = `<i class="fa-solid fa-cloud-sun-rain"></i>`;
    };
    if (forThreeCode == 1063 || forThreeCode == 1072 || forThreeCode == 1150 || forThreeCode == 1153 || 
        forThreeCode == 1168 || forThreeCode == 1180 || forThreeCode == 1183 || forThreeCode == 1198 || 
        forThreeCode == 1240) {
            dayThreeIcon.innerHTML = `<i class="fa-solid fa-cloud-sun-rain"></i>`;
    };
    if (forFourCode == 1063 || forFourCode == 1072 || forFourCode == 1150 || forFourCode == 1153 || 
        forFourCode == 1168 || forFourCode == 1180 || forFourCode == 1183 || forFourCode == 1198 || 
        forFourCode == 1240) {
            dayFourIcon.innerHTML = `<i class="fa-solid fa-cloud-sun-rain"></i>`;
    };
    if (forFiveCode == 1063 || forFiveCode == 1072 || forFiveCode == 1150 || forFiveCode == 1153 || 
        forFiveCode == 1168 || forFiveCode == 1180 || forFiveCode == 1183 || forFiveCode == 1198 || 
        forFiveCode == 1240) {
            dayFiveIcon.innerHTML = `<i class="fa-solid fa-cloud-sun-rain"></i>`;
    };

    // 6 day - snow icon
    if (forOneCode == 1066 || forOneCode == 1114 || forOneCode == 1117 || forOneCode == 1210 ||
        forOneCode == 1213 || forOneCode == 1216 || forOneCode == 1222 || forOneCode == 1225 ||
        forOneCode == 1255 || forOneCode == 1258 || forOneCode == 1279 || forOneCode == 1282 ||
        forOneCode == 1219) {
            dayOneIcon.innerHTML = `<i class="fa-regular fa-snowflake"></i>`;
    };
    if (forTwoCode == 1066 || forTwoCode == 1114 || forTwoCode == 1117 || forTwoCode == 1210 ||
        forTwoCode == 1213 || forTwoCode == 1216 || forTwoCode == 1222 || forTwoCode == 1225 ||
        forTwoCode == 1255 || forTwoCode == 1258 || forTwoCode == 1279 || forTwoCode == 1282 ||
        forTwoCode == 1219) {
            dayTwoIcon.innerHTML = `<i class="fa-regular fa-snowflake"></i>`;
    };
    if (forThreeCode == 1066 || forThreeCode == 1114 || forThreeCode == 1117 || forThreeCode == 1210 ||
        forThreeCode == 1213 || forThreeCode == 1216 || forThreeCode == 1222 || forThreeCode == 1225 ||
        forThreeCode == 1255 || forThreeCode == 1258 || forThreeCode == 1279 || forThreeCode == 1282 ||
        forThreeCode == 1219) {
            dayThreeIcon.innerHTML = `<i class="fa-regular fa-snowflake"></i>`;
    };
    if (forFourCode == 1066 || forFourCode == 1114 || forFourCode == 1117 || forFourCode == 1210 ||
        forFourCode == 1213 || forFourCode == 1216 || forFourCode == 1222 || forFourCode == 1225 ||
        forFourCode == 1255 || forFourCode == 1258 || forFourCode == 1279 || forFourCode == 1282 ||
        forFourCode == 1219) {
            dayFourIcon.innerHTML = `<i class="fa-regular fa-snowflake"></i>`;
    };
    if (forFiveCode == 1066 || forFiveCode == 1114 || forFiveCode == 1117 || forFiveCode == 1210 ||
        forFiveCode == 1213 || forFiveCode == 1216 || forFiveCode == 1222 || forFiveCode == 1225 ||
        forFiveCode == 1255 || forFiveCode == 1258 || forFiveCode == 1279 || forFiveCode == 1282 ||
        forFiveCode == 1219) {
            dayFiveIcon.innerHTML = `<i class="fa-regular fa-snowflake"></i>`;
    };

    // 6 day - sleet icon
    if (forOneCode == 1252 || forOneCode == 1069 || forOneCode == 1204 || forOneCode == 1207 ||
        forOneCode == 1237 || forOneCode == 1261 || forOneCode == 1249 || forOneCode == 1264) {
            dayOneIcon.innerHTML = `<i class="fa-solid fa-cloud-meatball"></i>`;
    };
    if (forTwoCode == 1252 || forTwoCode == 1069 || forTwoCode == 1204 || forTwoCode == 1207 ||
        forTwoCode == 1237 || forTwoCode == 1261 || forTwoCode == 1249 || forTwoCode == 1264) {
            dayTwoIcon.innerHTML = `<i class="fa-solid fa-cloud-meatball"></i>`;
    };
    if (forThreeCode == 1252 || forThreeCode == 1069 || forThreeCode == 1204 || forThreeCode == 1207 ||
        forThreeCode == 1237 || forThreeCode == 1261 || forThreeCode == 1249 || forThreeCode == 1264) {
            dayThreeIcon.innerHTML = `<i class="fa-solid fa-cloud-meatball"></i>`;
    };
    if (forFourCode == 1252 || forFourCode == 1069 || forFourCode == 1204 || forFourCode == 1207 ||
        forFourCode == 1237 || forFourCode == 1261 || forFourCode == 1249 || forFourCode == 1264) {
            dayFourIcon.innerHTML = `<i class="fa-solid fa-cloud-meatball"></i>`;
    };
    if (forFiveCode == 1252 || forFiveCode == 1069 || forFiveCode == 1204 || forFiveCode == 1207 ||
        forFiveCode == 1237 || forFiveCode == 1261 || forFiveCode == 1249 || forFiveCode == 1264) {
            dayFiveIcon.innerHTML = `<i class="fa-solid fa-cloud-meatball"></i>`;
    };

    // 6 day - thunder icon
    if (forOneCode == 1087 || forOneCode == 1273 || forOneCode == 1276) {
        dayOneIcon.innerHTML = `<i class="fa-solid fa-cloud-bolt"></i>`;
    };
    if (forTwoCode == 1087 || forTwoCode == 1273 || forTwoCode == 1276) {
        dayTwoIcon.innerHTML = `<i class="fa-solid fa-cloud-bolt"></i>`;
    };
    if (forThreeCode == 1087 || forThreeCode == 1273 || forThreeCode == 1276) {
        dayThreeIcon.innerHTML = `<i class="fa-solid fa-cloud-bolt"></i>`;
    };
    if (forFourCode == 1087 || forFourCode == 1273 || forFourCode == 1276) {
        dayFourIcon.innerHTML = `<i class="fa-solid fa-cloud-bolt"></i>`;
    };
    if (forFiveCode == 1087 || forFiveCode == 1273 || forFiveCode == 1276) {
        dayFiveIcon.innerHTML = `<i class="fa-solid fa-cloud-bolt"></i>`;
    };

    // 6 day - cloud sun icon
    if (forOneCode == 1003) {
        dayOneIcon.innerHTML = `<i class="fa-solid fa-cloud-sun"></i>`;
    };
    if (forTwoCode == 1003) {
        dayTwoIcon.innerHTML = `<i class="fa-solid fa-cloud-sun"></i>`;
    };
    if (forThreeCode == 1003) {
        dayThreeIcon.innerHTML = `<i class="fa-solid fa-cloud-sun"></i>`;
    };
    if (forFourCode == 1003) {
        dayFourIcon.innerHTML = `<i class="fa-solid fa-cloud-sun"></i>`;
    };
    if (forFiveCode == 1003) {
        dayFiveIcon.innerHTML = `<i class="fa-solid fa-cloud-sun"></i>`;
    };

    // 6 day - cloudy icon
    if (forOneCode == 1006 || forOneCode == 1009) {
        dayOneIcon.innerHTML = `<i class="fa-solid fa-cloud"></i>`;
    };
    if (forTwoCode == 1006 || forTwoCode == 1009) {
        dayTwoIcon.innerHTML = `<i class="fa-solid fa-cloud"></i>`;
    };
    if (forThreeCode == 1006 || forThreeCode == 1009) {
        dayThreeIcon.innerHTML = `<i class="fa-solid fa-cloud"></i>`;
    };
    if (forFourCode == 1006 || forFourCode == 1009) {
        dayFourIcon.innerHTML = `<i class="fa-solid fa-cloud"></i>`;
    };
    if (forFiveCode == 1006 || forFiveCode == 1009) {
        dayFiveIcon.innerHTML = `<i class="fa-solid fa-cloud"></i>`;
    };

    // 6 day - mist icon
    if (forOneCode == 1030 || forOneCode == 1135 || forOneCode == 1147) {
        dayOneIcon.innerHTML = `<i class="fa-solid fa-bars-staggered"></i>`;
    };
    if (forTwoCode == 1030 || forTwoCode == 1135 || forTwoCode == 1147) {
        dayTwoIcon.innerHTML = `<i class="fa-solid fa-bars-staggered"></i>`;
    };
    if (forThreeCode == 1030 || forThreeCode == 1135 || forThreeCode == 1147) {
        dayThreeIcon.innerHTML = `<i class="fa-solid fa-bars-staggered"></i>`;
    };
    if (forFourCode == 1030 || forFourCode == 1135 || forFourCode == 1147) {
        dayFourIcon.innerHTML = `<i class="fa-solid fa-bars-staggered"></i>`;
    };
    if (forFiveCode == 1030 || forFiveCode == 1135 || forFiveCode == 1147) {
        dayFiveIcon.innerHTML = `<i class="fa-solid fa-bars-staggered"></i>`;
    };

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