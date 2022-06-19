function formatDate(date) {
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

  let currentYear = date.getFullYear();
  let currentDay = days[date.getDay()];
  let currentMonth = months[date.getMonth()];
  let currentDate = date.getDate();

  let formattedDate = `Today is ${currentDay}, ${currentMonth} ${currentDate}, ${currentYear}`;

  return formattedDate;
}
let currentTime = new Date();
let date = document.querySelector(".date");
date.innerHTML = formatDate(currentTime);

function scan(response) {
  let temp = document.querySelector("#temperature");
  let city = document.querySelector(".city");
  let humidity = document.querySelector("#humidity");
  let windspeed = document.querySelector("#windspeed");
  let iconElement = document.querySelector("#icon");
  let descriptionElement = document.querySelector("#description");
  temp.innerHTML = `${Math.round(response.data.main.temp)}`;
  city.innerHTML = response.data.name;
  descriptionElement.innerHTML = response.data.weather[0].description;
  humidity.innerHTML = response.data.main.humidity;
  windspeed.innerHTML = Math.round(response.data.wind.speed);
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);
}

function searchCity(city) {
  let units = "metric";
  let apiKey = "75046c41a9e9f0d3f24b0f0bc19e3cba";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;

  axios.get(`${apiUrl}&appid=${apiKey}`).then(scan);
}

function enterCity(event) {
  event.preventDefault();
  let cityInputElement = document.querySelector(".searchInput");
  searchCity(cityInputElement.value);
}

let submitForm = document.querySelector("#submit-form");
submitForm.addEventListener("submit", enterCity);

function showWeather(response) {
  let button = document.querySelector("#current-button");
  let temperature = Math.round(response.data.main.temp);
  button.innerHTML = `It is currently ${temperature}° in ${response.data.name}`;
}

function retrievePosition(position) {
  let apiKey = "75046c41a9e9f0d3f24b0f0bc19e3cba";
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;

  axios.get(url).then(showWeather);
}
function getGeoTemp(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(retrievePosition);
}
let buttonCurrent = document.querySelector("#current-button");
buttonCurrent.addEventListener("click", getGeoTemp);
