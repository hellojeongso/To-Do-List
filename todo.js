const toDoForm = document.querySelector(".js-toDoForm"),
  toDoinput = toDoForm.querySelector("input"),
  toDoList = document.querySelector(".js-toDoList");

const TODOS_LS = "toDos";


let toDos = [];


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
 
  const li = btn.parentNode;
 
  toDoList.removeChild(li);

  const cleanToDos = toDos.filter(function(toDo) {
    console.log(toDo.id, li.id);
  
    return toDo.id !== parseInt(li.id);
  });




  toDos = cleanToDos;
  saveToDos(); 

}


function saveToDos(){
  localStorage.setItem(TODOS_LS, JSON.stringify(toDos));

}



function paintToDo(text){
  const li = document.createElement("li");  
  const chkBtn = document.createElement("button");
  const delBtn = document.createElement("button"); 
  delBtn.innerText = "✖"
  chkBtn.innerHTML = "&#9744";
  chkBtn.classList.add("vBtn");
  
  delBtn.addEventListener("click", deleteToDo);
  const span = document.createElement("span");
  chkBtn.addEventListener("click", checkeToDo);

  
  const newId = toDos.length + 1; 

  span.innerText = text 
  li.appendChild(chkBtn);
  li.appendChild(span); 
  li.appendChild(delBtn); 
  li.id = newId;    
  toDoList.appendChild(li); 
  const toDoObj = {
    text: text,
    id: newId
  };

  
  
  
  toDos.push(toDoObj);  
  saveToDos();          

}

function handleSubmit(event){
  event.preventDefault();
  const currentValue = toDoinput.value;
  paintToDo(currentValue);
  
  toDoinput.value = "";
  
}

function loadToDos(){
  
  const loadedToDos = localStorage.getItem(TODOS_LS);
    if(loadedToDos !== null){
     
      const parsedToDos = JSON.parse(loadedToDos);
      

     
      parsedToDos.forEach(function(toDo){
       
        paintToDo(toDo.text);
      })
    } 
}



function init(){
  loadToDos(); 
  toDoForm.addEventListener("submit", handleSubmit)
}
init();



