interface Task {
  id: number;
  title: string;
  completed: boolean;
}

const inputElement = document.getElementById("task") as HTMLInputElement;
const buttonElement = document.getElementById("button") as HTMLButtonElement;
const listElement = document.getElementById("lists") as HTMLUListElement;

let tasks: Task[] = [];

buttonElement.addEventListener("click", function (event: MouseEvent) {
  event.preventDefault();
  const note = inputElement.value.trim();

  if (note !== "") {
    const newTask: Task = {
      id: Date.now(),
      title: note,
      completed: false,
    };
    tasks.push(newTask);

    renderTasks();

    inputElement.value = "";
  } else {
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
