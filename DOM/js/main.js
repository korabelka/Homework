"use strict";

const todoKeys = {
	id: "id",
	text: "text",
	is_completed: "is_completed",
};

const todos = [];

const errTodoNotFound = (todoId) => `Todo with id ${todoId} not found`;

const getNewTodoId = (todos) =>
	todos.reduce((maxId, todo) => Math.max(maxId, todo[todoKeys.id]), 0) + 1;

const createTodo = (todos, text) => {
	const newTodo = {
		[todoKeys.id]: getNewTodoId(todos),
		[todoKeys.text]: text,
		[todoKeys.is_completed]: false,
	};
	todos.push(newTodo);
	return newTodo;
};

const completeTodoById = (todos, todoId) => {
	const todo = todos.find((todo) => todo[todoKeys.id] === todoId);

	if (!todo) {
		console.error(errTodoNotFound(todoId));
		return null;
	}
	todo[todoKeys.is_completed] = !todo[todoKeys.is_completed];
	return todo;
};

const deleteTodoById = (todos, todoId) => {
	const todoIndex = todos.findIndex((todo) => todo[todoKeys.id] === todoId);
	if (todoIndex === -1) {
		console.error(errTodoNotFound(todoId));
		return todos;
	}
	todos.splice(todoIndex, 1);
	return todos;
};

const formEl = document.querySelector(".form");
const inputEl = document.querySelector(".input");
const todosEl = document.querySelector(".todos");

const createTodoElement = (text) => {
	const todoEl = document.createElement("li");
	todoEl.classList.add("todo");

	const todoTextEl = document.createElement("div");
	todoTextEl.classList.add("todo-text");
	todoTextEl.textContent = text;

	const todoActionsEl = document.createElement("div");
	todoActionsEl.classList.add("todo-actions");

	const completeBtn = document.createElement("button");
	completeBtn.classList.add("button-complete", "button");
	completeBtn.innerHTML = "&#10004;";

	const deleteBtn = document.createElement("button");
	deleteBtn.classList.add("button-delete", "button");
	deleteBtn.innerHTML = "&#10006;";

	todoActionsEl.append(completeBtn, deleteBtn);
	todoEl.append(todoTextEl, todoActionsEl);

	return todoEl;
};

const handleCreateTodo = (todos, text) => {
	const newTodo = createTodo(todos, text);
	const todoEl = createTodoElement(newTodo[todoKeys.text]);

	todoEl.dataset.id = newTodo[todoKeys.id];

	todosEl.append(todoEl);
	return newTodo;
};

const handleCompleteTodo = (todos, todoId, todoEl) => {
	const todo = completeTodoById(todos, todoId);
	if (!todo) return;

	todoEl.classList.toggle("completed", todo[todoKeys.is_completed]);
};

const handleDeleteTodo = (todos, todoId, todoEl) => {
	deleteTodoById(todos, todoId);
	todoEl.remove();
};

formEl.addEventListener("submit", (event) => {
	event.preventDefault();

	const text = inputEl.value.trim();
	if (!text) return;

	handleCreateTodo(todos, text);

	inputEl.value = "";
	inputEl.focus();
});

todosEl.addEventListener("click", (event) => {
	const button = event.target.closest("button");
	if (!button) return;

	const todoEl = button.closest(".todo");
	if (!todoEl) return;

	const todoId = Number(todoEl.dataset.id);

	if (button.classList.contains("button-complete")) {
		handleCompleteTodo(todos, todoId, todoEl);
	} else if (button.classList.contains("button-delete")) {
		handleDeleteTodo(todos, todoId, todoEl);
	}
});
