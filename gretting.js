const form = document.querySelector(".js-form"),
  input = form.querySelector("input"),
  greeting = document.querySelector(".js-greetings");

const changeBtn=document.querySelector(".js-change");  
const sayHi = document.querySelector(".js-sayHi");


const USER_LS = "currentUser",
  SHOWING_ON = "showing";



function saveName(text) {
  localStorage.setItem(USER_LS, text);
}


function handleSubmit(event){
 
  event.preventDefault(); 
  const currentValue = input.value;
  paintGreeting(currentValue);
  saveName(currentValue);
}



function askForName(){
 
  form.classList.add(SHOWING_ON); 
  
  form.addEventListener("submit", handleSubmit)
}



function paintGreeting(text){

  form.classList.remove(SHOWING_ON);
  greeting.classList.add(SHOWING_ON);
  greeting.innerText = `Hello~! ${text}'s diary♡`
}


function loadName(){
  const currentUser = localStorage.getItem(USER_LS);
  if(currentUser === null) {
    
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