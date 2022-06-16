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
let date = document.querySelector("#currentDate");
date.innerHTML = formatDate(currentTime);

function scan(response) {
  let temp = document.querySelector(".tmpr");
  temp.innerHTML = Math.round(response.data.main.temp) + "℃";
  console.log(response.data.main.temp);
  let city = document.querySelector(".cityMarker");
  city.innerHTML = response.data.name;
}

function searchCity(city) {
  let units = "metric";
  let apiKey = "75046c41a9e9f0d3f24b0f0bc19e3cba";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;

  axios.get(`${apiUrl}&appid=${apiKey}`).then(scan);
}

function enterCity(event) {
  event.preventDefault();
  let searchInput = document.querySelector(".searchInput");
  let city = document.querySelector(".cityMarker");
  city.innerHTML = `${searchInput.value}`;

  searchCity(searchInput.value);
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
