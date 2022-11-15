

const weather = document.querySelector(".js-weather");

const API_KEY = "2d182233075ff374281bc8717b23c186";
const COORDS = "coords";

function getWeather(lat, lng){

  fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${API_KEY}&units=metric`
  ).then(function(response){

    return response.json();
  }).then(function(json){ 
    
    // 온도
    const temperature = json.main.temp;
    // 위치 정보
    const place = json.name;
    weather.innerText = `${temperature} @ ${place}`;
  })

  
}

function saveCoords(coordObj){
  localStorage.setItem(COORDS, JSON.stringify(coordObj));
}


function handleGeoSucces(position){
 
  // 위도
  const latitude = position.coords.latitude;
  // 경도 
  const longitude = position.coords.longitude;
  // coordsObj 
  const coordsObj = {
    latitude,
    longitude
  };
  saveCoords(coordsObj);
  getWeather(latitude, longitude);
}

function handleGeoError(){
  console.log("Cant access geo location");
}

function askForCoords(){
 
  navigator.geolocation.getCurrentPosition(handleGeoSucces, handleGeoError)
}

function loadCoords(){
  const loadedCoords = localStorage.getItem(COORDS);
  if(loadedCoords === null) {
   
    askForCoords();
  } else {

    const parsedCoords = JSON.parse(loadedCoords);
    getWeather(parsedCoords.latitude, parsedCoords.longitude);
  }
}

function init(){
  loadCoords();
}

init();



