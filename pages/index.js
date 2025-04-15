import { v4 as uuidv4 } from "https://jspm.dev/uuid";
import { initialTodos, validationConfig } from "../utils/constants.js";
import Todo from "../components/Todo.js";
import FormValidator from "../components/FormValidator.js";

const addTodoButton = document.querySelector(".button_action_add");
const addToDoPopup = document.querySelector("#add-todo-popup");
const addTodoForm = addToDoPopup.querySelector(".popup__form");
const todosList = document.querySelector(".todos__list");
const addTodoCloseBtn = addToDoPopup.querySelector(".popup__close");
const todoTemplate = document.querySelector("#todo-template");

const openModal = (modal) => {
  modal.classList.add("popup_visible");
};

const closeModal = (modal) => {
  modal.classList.remove("popup_visible");
};

const generateTodo = (data) => {
  /* const todo = new Todo(data, "#todo-template", {
    onUpdateCompleted: (isCompleted) =>
      todoCounter.updateCompleted(isCompleted),
    onUpdateTotal: (isAdding) => todoCounter.updateTotal(isAdding),
  });
  return todo.getView();
*/
  const todoElement = todoTemplate.content
    .querySelector(".todo")
    .cloneNode(true);
  const todoNameEl = todoElement.querySelector(".todo__name");
  const todoCheckboxEl = todoElement.querySelector(".todo__completed");
  const todoLabel = todoElement.querySelector(".todo__label");
  const todoDate = todoElement.querySelector(".todo__date");
  const todoDeleteBtn = todoElement.querySelector(".todo__delete-btn");

  todoNameEl.textContent = data.name;
  todoCheckboxEl.checked = data.completed;

  // Apply id and for attributes.
  // The id will initially be undefined for new todos.
  todoCheckboxEl.id = `todo-${data.id}`;
  todoLabel.setAttribute("for", `todo-${data.id}`);

  // If a due date has been set, parsing this it with `new Date` will return a
  // number. If so, we display a string version of the due date in the todo.
  const dueDate = new Date(data.date);
  if (!isNaN(dueDate)) {
    todoDate.textContent = `Due: ${dueDate.toLocaleString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })}`;
  }
  todoDeleteBtn.addEventListener("click", () => {
    todoElement.remove();
  });

  return todoElement;
};

const newTodoValidator = new FormValidator(validationConfig, addTodoForm);
newTodoValidator.enableValidation();

addTodoButton.addEventListener("click", () => {
  openModal(addToDoPopup);
});

addTodoCloseBtn.addEventListener("click", () => {
  closeModal(addToDoPopup);
});

addTodoForm.addEventListener("submit", (evt) => {
  evt.preventDefault();
  const name = evt.target.name.value;
  const dateInput = evt.target.date.value;

  // Create a date object and adjust for timezone
  const date = new Date(dateInput);
  date.setMinutes(date.getMinutes() + date.getTimezoneOffset());

  const values = { name, date };
  const todo = generateTodo(values);
  todosList.append(todo);
  closeModal(addToDoPopup);
});

initialTodos.forEach((item) => {
  const todo = generateTodo(item);
  todosList.append(todo);
});
