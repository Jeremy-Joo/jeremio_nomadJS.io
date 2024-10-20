
let toDos = []; 


const toDoForm = document.getElementById("todo-form");
const toDoInput = document.getElementById("todo-input");
const toDoList = document.getElementById("todo-list");

function paintToDo(newToDo) {
    const li = document.createElement("li");
    li.id = newToDo.id;
    const span = document.createElement("span");
    span.innerText = newToDo.text;
    const button = document.createElement("button");
    button.innerText = "❌";
    button.addEventListener("click", deleteToDo);
    li.appendChild(span);
    li.appendChild(button);
    toDoList.appendChild(li);
}

function saveToDos() {
    const currentLoginID = localStorage.getItem("LoginID");
    localStorage.setItem(`${currentLoginID}-todos`, JSON.stringify(toDos));
}

function deleteToDo(event) {
    const li = event.target.parentElement;
    toDos = toDos.filter(toDo => toDo.id !== parseInt(li.id));
    li.remove();
    saveToDos();
}

function handleToDoSubmit(event) {
    event.preventDefault(); 
    const newToDo = toDoInput.value.trim();
    if (newToDo === "") return; 
    const newToDoObj = {
        text: newToDo,
        id: Date.now(),
    };
    toDos.push(newToDoObj);
    paintToDo(newToDoObj);
    saveToDos();
    toDoInput.value = ""; 
}

function loadToDos() {
    const savedToDos = localStorage.getItem(`${localStorage.getItem("LoginID")}-todos`);
    if (savedToDos) {
        const parsedToDos = JSON.parse(savedToDos);
        toDos = parsedToDos; 
        parsedToDos.forEach(paintToDo);
    }
}

toDoForm.addEventListener("submit", handleToDoSubmit);

loadToDos();
