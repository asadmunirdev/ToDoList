const mainTodoElem = document.querySelector(".todo-lists-elem");
const inputValue = document.querySelector("#inputValue");

const getTodoListFromLocal = () => {
  return JSON.parse(localStorage.getItem("youtubeTodoList"));
};

const addTodoListLocalstorage = (localTodoLists) => {
  return localStorage.setItem(
    "youtubeTodoList",
    JSON.stringify(localTodoLists)
  );
};

let localTodoLists = getTodoListFromLocal() || [];

// adding add to list dynamically
const addTodoDunamicElement = (currElem) => {
  const divElement = document.createElement("div");
  divElement.classList.add("main_todo_div");
  divElement.innerHTML = `<li>${currElem}</li> <button class="deleteBtn">Delete</button>`;
  mainTodoElem.append(divElement);
};

const addTodoList = (e) => {
  e.preventDefault();

  const todoListValue = inputValue.value.trim();

  inputValue.value = "";

  if (todoListValue !== "" && !localTodoLists.includes(todoListValue)) {
    localTodoLists.push(todoListValue);
    localTodoLists = [...new Set(localTodoLists)];
    console.log(localTodoLists);
    localStorage.setItem("youtubeTodoList", JSON.stringify(localTodoLists));

    addTodoDunamicElement(todoListValue);
  }
};

const showTodoList = () => {
  console.log(localTodoLists);

  localTodoLists.forEach((currElem) => {
    addTodoDunamicElement(currElem);
  });
};

showTodoList();

// remove the data
const removeTodoElem = (e) => {
  const todoToRemove = e.target;
  let todoListContent = todoToRemove.previousElementSibling.textContent;
  let parentElem = todoToRemove.parentElement;
  console.log(todoListContent);

  localTodoLists = localTodoLists.filter((currTodo) => {
    return currTodo !== todoListContent.toLowerCase();
  });

  addTodoListLocalstorage(localTodoLists);
  parentElem.remove();
  console.log(localTodoLists);
};

mainTodoElem.addEventListener("click", (e) => {
  e.preventDefault();
  if (e.target.classList.contains("deleteBtn")) {
    removeTodoElem(e);
  }
});

document.querySelector(".btn").addEventListener("click", (e) => {
  addTodoList(e);
});
