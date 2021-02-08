const weather = document.querySelector(".js-weather");

const API_KEY = "7e477f605c19fe3a025d257043b559d3";//YOUR API_KEY
const COORDS = 'coords';

function getWeather(lat, lng) {
  fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${API_KEY}&units=metric`).then(function (reponse) {
    return reponse.json();
  }).then(function (json) {
    console.log(json);
    let temperature = json.main.temp;
    let feels_like=json.main.feels_like;
    let place = json.name;
    let temp_max=json.main.temp_max;
    let temp_min=json.main.temp_min;
    //let icon=json.weather[0].icon;
    weather.innerText = `${place}\n${temperature}/${temp_min}°\n체감온도:${feels_like}°\n`;
  });
}

function saveCoords(coordsObj) {
 // localStorage.setItem(COORDS, JSON.stringify(coordsObj));
}

function handleGeoSucces(position) {
  
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let coordsObj = {
    latitude: latitude,
    longitude: longitude
  };
  console.log(coordsObj);
  saveCoords(coordsObj);
  getWeather(latitude, longitude);
}

function handleGeoError() {
  console.log("Cant access geo location");
}

function askForCoords() {
  //getCurrentPosition -> watchPosition으로 변경함 
  navigator.geolocation.getCurrentPosition(handleGeoSucces, handleGeoError);
}

function loadCoords() {
  let loadedCoords = localStorage.getItem(COORDS);
  if (loadedCoords === null) {
    askForCoords();
  } else {
    let parsedCoords = JSON.parse(loadedCoords);
    getWeather(parsedCoords.latitude, parsedCoords.longitude);
  }
}

function init() {
  loadCoords();
}

init();