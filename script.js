const form = document.getElementById("form");
const input = document.getElementById("input");
const todosUL = document.getElementById("todo");
const todos = JSON.parse(localStorage.getItem("todos"));

if (todos) {
  todos.forEach((todo) => {
    addTodo(todo);
  });
}

form.addEventListener("submit", (e) => {
  e.preventDefault();

  addTodo();
});

function addTodo(todo) {
  let todoText = input.value;

  if (todo) {
    todoText = todo.text;
  }
  if (todoText) {
    const todoEl = document.createElement("li");
    const xd = document.createElement("div");
    xd.classList.add("xd");
    const editBtn = document.createElement("div");
    editBtn.classList.add("fas");
    editBtn.classList.add("fa-edit");
    if (todo && todo.completed) {
      todoEl.classList.add("completed");
    }
    todoEl.innerText = todoText;
    todoEl.addEventListener("click", () => {
      todoEl.classList.toggle("completed");
      updateLS();
    });
    todoEl.addEventListener("contextmenu", (e) => {
      e.preventDefault();
      xd.remove();
      updateLS();
    });
    xd.appendChild(todoEl);
    xd.appendChild(editBtn);
    todosUL.appendChild(xd);
    input.value = "";
    updateLS();
    editBtn.addEventListener("click", () => editInPromt(todoEl));
  }
}

function updateLS() {
  const todosEl = document.querySelectorAll("li");
  const todos = [];
  todosEl.forEach((todoEl) => {
    todos.push({
      text: todoEl.innerText,
      completed: todoEl.classList.contains("completed"),
    });
  });
  localStorage.setItem("todos", JSON.stringify(todos));
}
function editInPromt(e) {
  let editValue = prompt("Edit the selected item.", e.firstChild.nodeValue);
  e.firstChild.nodeValue = editValue;
  updateLS();
}
