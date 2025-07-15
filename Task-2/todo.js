"use strict";
const inputElement = document.getElementById("task");
const buttonElement = document.getElementById("button");
const listElement = document.getElementById("lists");
let tasks = [];
buttonElement.addEventListener("click", function (event) {
    event.preventDefault();
    const note = inputElement.value.trim();
    if (note !== "") {
        const newTask = {
            id: Date.now(),
            title: note,
            completed: false,
        };
        tasks.push(newTask);
        renderTasks();
        inputElement.value = "";
    }
    else {
        alert("Please First write the note");
    }
});
function renderTasks() {
    listElement.innerHTML = "";
    for (const task of tasks) {
        const li = document.createElement("li");
        li.textContent = task.title;
        li.onclick = () => {
            tasks = tasks.filter(t => t.id !== task.id);
            renderTasks();
        };
        listElement.appendChild(li);
    }
}
