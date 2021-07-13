// 저장하고, 저장값이 없다면 요청하고. 저장한게 없다면 가마니 js

const weather = document.querySelector(".js-weather");

const API_KEY = "2d182233075ff374281bc8717b23c186";
const COORDS = "coords";

function getWeather(lat, lng){
  // fetch 안에는 가져올 데이터가 들어가면 된다. 
  // 앞에 https://를 넣어주고, 대신 따옴표가 아닌 backtick(`)을 사용할 것. 
  // 결과를 실행하면, 개발자 도구 network탭에서 확인할 수 있는데 
  // network 패널은 우리가 request한 내용을 보여준다. 그리고 거기에 대한 response도 보여준다. 
  // metric(미터 표기법) 사용하기 위해 units=metric 추가했다. (api 확인)
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${API_KEY}&units=metric`
  ).then(function(response){
    // console.log(response); 이게 서버에서 들어온 json 데이터
    // console.log(response.json());  // json 데이터 가져오기, 왜냐하면 response에는 network 정보만 보인다. 
    // body를 가져왔지만 내용물은 보이지 않는다. 지금 필요한건 body안에 들은 내용물.
    return response.json();
  }).then(function(json){ // json 데이터가 준비되면 실행되는 명령
    // console.log(json);  // 객체가 콘솔에 찍힌다.
    // 온도
    const temperature = json.main.temp;
    // 위치 정보
    const place = json.name;
    weather.innerText = `${temperature} @ ${place}`;
  })

  
}

// then은 함수를 호출한다. 언제? 데이터가 우리에게 넘어왔을 때 (데이터가 들어오는데 시간이 좀 걸리는 경우가 있다.)
// fetch가 완료되지 않고 다음 작업을 지시하면, fetch는 정상적으로 완료가 안될 수도 있다.

// 좌표 저장하는 함수
// 저장값은 함수여야하니까 stringify
// 저장되면 위치를 새로 묻지 않는다. 왜냐면 이미 저장됐으니까.
function saveCoords(coordObj){
  localStorage.setItem(COORDS, JSON.stringify(coordObj));
}

// localstorage에 좌표값이 없을 때만 실행되는 함수
function handleGeoSucces(position){
  // console.log(positon);에서 승인값 console창 확인하면 position객체로 사용자 위치정보를 알 수 있다.
  // 위도
  const latitude = position.coords.latitude;
  // 경도 
  const longitude = position.coords.longitude;
  // coordsObj 
  // 자바스크립트 꿀팁 : 객체의 key값과 변수 이름이 같을 경우 value 생략 가능 
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
  // api 사용
  // geo는 객체 그 안의 getCurrentPosition함수 이용할거야
  // getCurrentPosition는 두 개를 받는데, 하나는 좌표를 가져오는데 성공했을 때 처리할 함수
  // 나머지 하나는 에러 났을 때의 함수
  navigator.geolocation.getCurrentPosition(handleGeoSucces, handleGeoError)
}

function loadCoords(){
  const loadedCoords = localStorage.getItem(COORDS);
  if(loadedCoords === null) {
    // 좌표를 요청하는 함수
    askForCoords();
  } else {
    // getWeather
    const parsedCoords = JSON.parse(loadedCoords);
    getWeather(parsedCoords.latitude, parsedCoords.longitude);
  }
}

function init(){
  loadCoords();
}

init();



// local storage에 아무것도 없으면 결국 getWeather함수가 실행된다.
// askForCoords 함수가 실행되고, 이 함수안에서 정상적으로 위치 정보를 가져오게 되면
// handleGeoSuccess가 실행되는데, 이 안에서 api가 최종적으로 호출되기 때문에.