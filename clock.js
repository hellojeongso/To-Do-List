// 2개의 const 선언 깔끔하게 작성하기 (,)
const clockContainer = document.querySelector(".js-clock"); //js-clock의 element 자식 탐색
const clockTitle = document.querySelector(".clock");

function getTime(){
  const date = new Date(); // 여기서 Date는 Class
  const minutes = date.getMinutes();
  const hours = date.getHours();
  const seconds = date.getSeconds();
  clockTitle.innerText = `${hours < 10 ? `0${hours}` : hours}:${minutes < 10 ? `0${minutes}` : minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;
  
}


function init(){
  getTime();  // 시간을 얻고
  setInterval(getTime, 1000);  // interval 설정. 1초 간격 
                              // getTime()이라고 쓰지 않는 이유는 함수를 참조하기때문이다. ()는 즉시 호출
                              // setInterval() 함수는 일정한 시간 간격으로 코드를 반복 실행하는 함수
} 
init();