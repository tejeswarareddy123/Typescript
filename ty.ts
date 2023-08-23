document.addEventListener("DOMContentLoaded", function() {
const searchInput: HTMLInputElement = document.getElementById("search") as HTMLInputElement;
searchInput.addEventListener("input", filterTasks);

function filterTasks(): void {
  const searchValue: string = searchInput.value.toLowerCase();
  const taskItems: NodeListOf<HTMLLIElement> = document.querySelectorAll(".list-items li");

  taskItems.forEach((taskItem: HTMLLIElement) => {
    const taskName: string = taskItem.querySelector(".task-name").textContent.toLowerCase();
    if (taskName.includes(searchValue)) {
      taskItem.style.display = "block";
    } else {
      taskItem.style.display = "none";
    }
  });
}
});

function createtask(): void {
  const taskName: string = (document.getElementById("taskname") as HTMLInputElement).value.trim();
  if (taskName !== "") {
    const existingTasks: NodeListOf<HTMLSpanElement> = document.querySelectorAll("span");
    let isDuplicate: boolean = false;
    existingTasks.forEach((existingTask: HTMLSpanElement) => {
      if (existingTask.textContent.toLowerCase() === taskName.toLowerCase()) {
        if (existingTask.style.textDecoration === "line-through") {
          isDuplicate = false;
          return;
        }
        isDuplicate = true;
        return;
      }
    });

    if (!isDuplicate) {
      const listItem: HTMLLIElement = document.createElement("li");
      listItem.innerHTML = `
        <input type="checkbox" class="status" id="st">
        <span class="task-name">${taskName}</span> 
        <select name="dropdown" id="drop" class="task-status" onchange="updateStatus(this)">
            <option value="To do">To do</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
        </select>
        <button class="delete-task" onclick="deleteTask(this)">Delete</button>
        `;
      const taskList: HTMLElement = document.querySelector('.list-items');
      taskList.appendChild(listItem);
      disableCheckboxes();
    } else {
      alert(`${taskName} already exists`);
    }
  } else {
    alert('Task Name should not be empty');
  }
}

function deleteTask(button: HTMLButtonElement): void {
  const listItem: HTMLLIElement = button.closest("li");
  if (listItem) {
    listItem.parentNode.removeChild(listItem);
  }
}

function updateStatus(select: HTMLSelectElement): void {
  const listItem: HTMLElement = select.parentNode as HTMLElement;
  const checkbox: HTMLInputElement = listItem.querySelector('.status') as HTMLInputElement;
  const taskName: HTMLElement = listItem.querySelector('.task-name') as HTMLElement;
  if (select.value == 'Completed') {
    checkbox.checked = true;
    taskName.style.textDecoration = "line-through";
    //taskName.classList.add("completed")
    console.log(taskName);
  } else {
    checkbox.checked = false;
    taskName.style.textDecoration = "none";
  }
}

function disableCheckboxes(): void {
  const checkboxes: NodeListOf<HTMLInputElement> = document.querySelectorAll('.status');
  checkboxes.forEach((checkbox: HTMLInputElement) => {
    checkbox.disabled = true;
  });
}