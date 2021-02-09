const API_KEY = "7e477f605c19fe3a025d257043b559d3";//YOUR API_KEY
const WEATHER_API = "https://api.openweathermap.org/data/2.5/weather?";

const weather = document.querySelector(".js-weather .weather__text");
const weatherIcon = document.querySelector('.weather-icon');

//날씨 가져오기
function getWeather(coords) {
  fetch(
    `${WEATHER_API}lat=${coords.lat}&lon=${
      coords.lng
    }&appid=${API_KEY}&units=metric`
  ).then(response => response.json())
  .then(json => {
      const name = json.name;
      const temperature = json.main.temp;
      const feelsLike=json.main.feels_like;
      const {icon} = json.weather[0];
      weather.innerHTML = `<img src="icons/${icon}.png "><br> ${name} ${Math.floor(temperature)}° <br> feels like ${feelsLike}° `;
    });
}

//위도 경도 가져오기
function handleGeoSuccess(position) {
  const lat = position.coords.latitude;
  const lng = position.coords.longitude;
  const coords = {
    lat,
    lng
  };
  localStorage.setItem("coords", JSON.stringify(coords));
  console.log(position);
  getWeather(coords);

}

//위치 가져오기 실패
function handleGeoFailure() {
  console.log("no location");
  
}

//날씨 가져오기
function loadWeather() {
  const currentCoords = localStorage.getItem("coords");
  if (currentCoords !== null) {
    const parsedCoords = JSON.parse(currentCoords);
    getWeather(parsedCoords);
    return;
  } else {
    navigator.geolocation.getCurrentPosition(
      handleGeoSuccess,
      handleGeoFailure
    );
  }
}

function init() {
  loadWeather();
}

init();
