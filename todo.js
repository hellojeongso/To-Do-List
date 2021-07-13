const toDoForm = document.querySelector(".js-toDoForm"),
  toDoinput = toDoForm.querySelector("input"),
  toDoList = document.querySelector(".js-toDoList");

const TODOS_LS = "toDos";


// 해야하는 일을 하나만 저장하는게 아니라, 여러 개가 모인 목록으로 저장하기 위해 빈 배열 생성
// 일정이 추가 되면, toDos에 저장된다.
let toDos = [];

// filterFn 함수는 forEach에서 function을 실행하는 것 같이, 각각의 item과 같이 실행된다.
// 함수가 turn를 return하는 아이템들이 있는 array를 만든다.
// 위 toDos array는 object가 있고, 그 object는 숫자로 된 id가 있다. 
//function filterFn(toDo){
// return toDo.id === 1
  // 여기서 true인 것들인 toDos만 return한다. 아이디가 1값인.. 
//}
function checkeToDo(event){
  const btn = event.target;
  const span = btn.nextSibling;
  if(span.classList.contains("checkedList")){
      btn.innerHTML = "&#9744";
      span.classList.remove("checkedList");
  } else {
      btn.innerHTML = "&#9746";
      span.classList.add("checkedList");
  }
}

function deleteToDo(event) {
  const btn = event.target;
  // 지워야 할 li. btn의 부모
  const li = btn.parentNode;
  // toDoList 가져와서 toDoList.removeChild(li)\
  toDoList.removeChild(li);
  // ▲ 실행을 하면 삭제는 되지만, 새로고침하면 삭제가 안되는 상황
  // const cleanToDos = toDos.filter(filterFn);
  // ▲ filter함수는 함수 하나를 실행시킨다. (함수 주석처리하고 안에서 함수 작성)
  // filterFn 함수를 넣으면, array안에 있는 모든 toDos를 통한다. 
  // filter는 array의 모든 아이템을 통해 함수를 실행하고, 
  // true인 아이템들만 가지고 새로운 array를 만든다.
  const cleanToDos = toDos.filter(function(toDo) {
    console.log(toDo.id, li.id);
    // toDo의 id는 숫자, li.id는 String 
    // string을 숫자로 변환
    return toDo.id !== parseInt(li.id);
  });
  //console.log(cleanToDos);
  // console을 보면, x를 눌렀을 때 cleanToDos는 하나의 item을 가지고 있다. (id)
  // 왜냐하면 체크가 된 아이템이 하나밖에 없기 때문이다.

  // cleanToDos와 filter가 하는 것은 finterFn이 체크가 된 아이템들의 array를 주는 것이다.



  toDos = cleanToDos;
  saveToDos(); // toDos 저장
  // 그러면 이제 새로고침해도 다 사라진다. 

}


// toDos를 가져와서 로컬에 저장하는 함수 
function saveToDos(){
  localStorage.setItem(TODOS_LS, JSON.stringify(toDos));
  // localStorage.setItem(TODOS_LS, toDos);는 Key: toDos Value: [object Object].. 로 저장된다
  // (paintToDo에서 Object로 저장됨)
  // 로컬스토리지는 자바스크립트의 data를 저장하지 못한다. 오직 String만 저장 가능
  // (모든 데이터를 string으로 저장한다.) 
  // 그래서 ""형식인 JSON 사용하기
  // JSON.stringify는 자바스크립트 obj를 String으로 바꿔준다. 

}


// 엘리먼트 생성하고, ul안에 넣고 싶은 것 넣기
function paintToDo(text){
  const li = document.createElement("li");  // 비어있는 li 태그 생성
  const chkBtn = document.createElement("button");
  const delBtn = document.createElement("button"); // button 태그 생성
  delBtn.innerText = "✖"
  chkBtn.innerHTML = "&#9744";
  chkBtn.classList.add("vBtn");
  // paintToDo함수에서 delete버튼(delBtn) 만들 때, addEventListener 추가하기
  // 이건 click이벤트가 되고, 함수는 deleteToDo가 된다. 
  delBtn.addEventListener("click", deleteToDo);
  const span = document.createElement("span");
  chkBtn.addEventListener("click", checkeToDo);

  // todoObj = { id: toDos.length + 1;을 보기 좋게 const newId로 생성
  const newId = toDos.length + 1; 

  span.innerText = text //submit function에서 온 text
  li.appendChild(chkBtn);
  li.appendChild(span); // span을 li 안에 넣기
  li.appendChild(delBtn); // 버튼을 li 안에 넣기
  li.id = newId;    // li태그를 삭제할 때, 어떤 li태그를 삭제할 것인지 구분하기 위해 id 속성값을 부여
  toDoList.appendChild(li); // 위에 있는 li 넣기
  const toDoObj = {
    text: text,
    id: newId
  };

  
  
  // todo list가 추가될 때마다 배열의 전체를 다시 저장한다. 
  toDos.push(toDoObj);  // toDos array 안에 toDoObj(element) 넣기
  saveToDos();          // push한 이후에 호출 해야한다. 

}

function handleSubmit(event){
  event.preventDefault();
  const currentValue = toDoinput.value;
  paintToDo(currentValue);
  // todo 생성(submit 같은 느낌) enter치면 넘어간다. 
  // ▼ 작성하기 전에는 input에 text가 그대로 남았다.
  toDoinput.value = "";
  
}

function loadToDos(){
  // 로컬 스토리지에서 key가 TODOS_LS인 값 가져와서 변수에 담기
  const loadedToDos = localStorage.getItem(TODOS_LS);
    if(loadedToDos !== null){
      // 로컬 스토리지에 저장된 값을 불러오기(일정)
      // saveToDos 함수에서 Json을 이용해 string 타입으로 변환하여 저장했기때문에, 불러오는 값도 String이다.
      // 그래서 string을 다시 object로 변환한다. 

      // loadedToDos를 json객체로 변경
      const parsedToDos = JSON.parse(loadedToDos);
      

      // forEach를 사용해서 array에 담긴 것들 각각에 한번씩 함수를 실행시킨다.
      // 괄호 안에서 function을 만들었다. 호출한게 아니라 만든다. 
      // 이 함수는 parsedToDos안에 있는 것들 각각에 대해 실행한다
      // 그 각각을 toDo라고 칭하자.
      parsedToDos.forEach(function(toDo){
        // 각각에 대해서 paintToDo
        paintToDo(toDo.text);
      })
    } 
}



function init(){
  loadToDos(); // load -> 로컬 스토리지에서 옴
  toDoForm.addEventListener("submit", handleSubmit)
}
init();




// toDoList 삭제
// local storage에서 todo 하나 지우고 저장
// html에서도 li태그 삭제하기