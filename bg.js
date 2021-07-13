// body로 설정할거야.
const body = document.querySelector("body");

const IMG_NUMBER = 3;



function paintImage(imgNumber){
  const image = new Image();
  image.src = `images/${imgNumber + 1}.jpg`
  // +1을 하는 이유는 Math.random() 함수가 0을 줄 수 있기 때문에.
  image.classList.add("bgImage");
  // ▲ 새로운 className을 얻음
  body.prepend(image);

}

function genRandom(){
  const number = Math.floor(Math.random() * IMG_NUMBER);
// 자바스크립트에는 math라는 모듈이 있다.
// 그 중에서 Math.random() 함수를 이용할 것
// Math.floor는 버림, ceiling은 올림  
  return number;
}

function init(){
  // 숫자 생성
  const randomNumber = genRandom();
  paintImage(randomNumber);
}

init();




