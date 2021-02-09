const form = document.querySelector(".js-to-do"),
  input = document.querySelector(".js-add-to-do"),
  list = document.querySelector(".js-list");

let toDos = [];

//저장 localStorage
function persistToDos() {
  const stringToDo = JSON.stringify(toDos);
  localStorage.setItem("toDos", stringToDo);
}

//저장 toDos배열에
function saveToDo(text) {
  const toDoObject = {
    id: toDos.length + 1,
    value: text
  };
  toDos.push(toDoObject);
  persistToDos();
}

//Done 더블클릭
function handleDone(event) {
  const target = event.target;
  const li = target.parentElement;
  const toDoId = li.id;
  let x = document.getElementById(toDoId);
  if (x.style.textDecoration === "line-through") {
    x.style.textDecoration = "none";
    x.style.color = "white";

  }
  else {
    x.style.textDecoration = "line-through";
    x.style.color = "gray";

  }
  persistToDos();
}

//삭제
function handleDelete(event) {
  const target = event.target;
  const li = target.parentElement;
  const ul = li.parentElement;
  const toDoId = li.id;
  ul.removeChild(li);
  toDos = toDos.filter(function (toDo) {
    return toDo.id !== parseInt(toDoId);
  });
  persistToDos();
}

//toDo 만들기
function addToDo(text) {
  const toDo = document.createElement("li");
  toDo.className = "toDo";
  toDo.id = toDos.length + 1;
  const deleteBtn = document.createElement("span");
  const doneBtn = document.createElement("span");
  deleteBtn.innerHTML = "x";
  doneBtn.innerHTML = "o";
  deleteBtn.className = "toDo__button";
  doneBtn.className = "toDoDone__button";
  deleteBtn.addEventListener("click", handleDelete);
  doneBtn.addEventListener("dblclick", handleDone);
  const label = document.createElement("label");
  const label2 = document.createElement("label");
  label.innerHTML = text;
  label2.innerHTML = text;
  toDo.appendChild(deleteBtn);
  toDo.appendChild(doneBtn);
  toDo.appendChild(label);
  list.appendChild(toDo);
  saveToDo(text);
}

//제출
function onSubmit(event) {
  event.preventDefault();
  const value = input.value;
  input.value = "";
  addToDo(value);
}

//todo 불러오기
function loadToDos() {
  const loadedToDos = localStorage.getItem("toDos");
  if (loadedToDos !== null) {
    const parsedToDos = JSON.parse(loadedToDos);
    parsedToDos.forEach(function (toDo) {
      addToDo(toDo.value);
    });
  }
  return;
}

function init() {
  loadToDos();
}

form.addEventListener("submit", onSubmit);

init();
