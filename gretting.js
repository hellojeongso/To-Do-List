// 로컬 스토리지 : 작은 자바스크립트 정보들을 사용자의 컴퓨터에 저장
// 개발자 도구 Application 탭에서 확인이 가능하다.

// 사용자의 컴퓨터 로컬 스토리지에 저장되어 있지 않으면, 
// 이름을 입력받는 input창을 보여주고, 저장됐다면 환영 문구를 보여준다.

const form = document.querySelector(".js-form"),
  input = form.querySelector("input"),
  greeting = document.querySelector(".js-greetings");

const changeBtn=document.querySelector(".js-change");  
const sayHi = document.querySelector(".js-sayHi");


const USER_LS = "currentUser",
  SHOWING_ON = "showing";
  // showing css 실행




// 로컬스토리지에 값을 저장하는 함수
// localStorage.setItem("key", value); 로컬스토리지에 데이터 입력하기
function saveName(text) {
  localStorage.setItem(USER_LS, text);
}


// form에 submit하면 실행된다.
function handleSubmit(event){
  // preventDefault : 기본 동작을 막는 함수.
  // input창에 text를 입력 후 엔터를 치면 새로고침 된다. (기본 동작)
  event.preventDefault(); // enter쳐도 아무 일이 일어나지 않는다.
  const currentValue = input.value;
  paintGreeting(currentValue);
  saveName(currentValue);
}


// user의 이름 요청
function askForName(){
  // classList.add 클래스를 필요에 따라 삽입한다.
  form.classList.add(SHOWING_ON); // js-form에 class add
  // addEventListner('이벤트 종류', '함수 이름') : 특정 이벤트 발생시 특정 함수 실행
  form.addEventListener("submit", handleSubmit)
}


// 클래스 속성 추가 + 입력한 value를 html에 넣어주는 함수
function paintGreeting(text){
  // classList.remove 클래스를 필요에 따라 삭제한다.
  form.classList.remove(SHOWING_ON);
  greeting.classList.add(SHOWING_ON);
  greeting.innerText = `Hello~! ${text}'s diary♡`
}

// 브라우저 내 로컬스토리지에서 저장된 value를 가져오는 함수
function loadName(){
  const currentUser = localStorage.getItem(USER_LS);
  if(currentUser === null) {
    // null값인 경우
    askForName();

  } else {
    // null값이 아니라면, paintGreeting 함수를 호출한다. 
    // 로컬스토리지에서 가져온 값과 함께.
    paintGreeting(currentUser);

  }

}

function init(){
  loadName();
}
init();