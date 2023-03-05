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
