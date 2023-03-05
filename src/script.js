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
  
  