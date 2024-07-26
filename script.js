const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");
const errorDiv = document.getElementById("error-div");

inputBox.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        addTask();
    }
});

let taskToDelete;

function addTask() {
    const task = inputBox.value.trim();
    if (!task) {
        const error = document.createElement("h4");
        error.innerHTML = `C'mon that's not a task!`;
        errorDiv.appendChild(error);

        setTimeout(() => {
            errorDiv.removeChild(error);
        }, 3000);

        return;
    }

    const li = document.createElement("li");
    li.innerHTML = `
        <div class='divCheckbox'>
            <label class='labelCheckbox'>
                <input type="checkbox">
                <span class='spanTask'>${task}</span>
            </label>
            <div class='actions'>
                <span class="edit-btn">Edit</span>
                <span class="delete-btn">Delete</span>
            </div>
        </div>
    `;

    listContainer.appendChild(li);
    inputBox.value = "";
    updateCounters();

    const checkbox = li.querySelector("input");
    const editBtn = li.querySelector(".edit-btn");
    const taskSpan = li.querySelector("span");
    const deleteBtn = li.querySelector(".delete-btn");

    checkbox.addEventListener("click", function () {
        li.classList.toggle("completed", checkbox.checked);
        updateCounters();
    });

    editBtn.addEventListener("click", function () {
        enterEditMode(li, taskSpan);
    });

    deleteBtn.addEventListener("click", function () {
        taskToDelete = li;
        $('#deleteModal').modal('show');
    });
}

function enterEditMode(li, taskSpan) {
    const input = document.createElement("input");
    input.type = "text";
    input.value = taskSpan.textContent;
    input.classList.add("edit-input");

    taskSpan.replaceWith(input);
    input.focus();

    input.addEventListener("keypress", function (e) {
        if (e.key === "Enter") {
            saveEditedTask(li, input);
        }
    });

    input.addEventListener("blur", function () {
        saveEditedTask(li, input);
    });
}

function saveEditedTask(li, input) {
    const task = input.value.trim();
    if (!task) {
        input.focus();
        return;
    }

    const taskSpan = document.createElement("span");
    taskSpan.textContent = task;
    input.replaceWith(taskSpan);

    const editBtn = li.querySelector(".edit-btn");
    editBtn.addEventListener("click", function () {
        enterEditMode(li, taskSpan);
    });

    const checkbox = li.querySelector("input");
    checkbox.checked = false;
    li.classList.remove("completed");
    updateCounters();
}

document.getElementById('confirmDeleteBtn').addEventListener('click', function () {
    if (taskToDelete) {
        taskToDelete.remove();
        updateCounters();
        $('#deleteModal').modal('hide');
    }
});

const completedCounter = document.getElementById("completed-counter");
const uncompletedCounter = document.getElementById("uncompleted-counter");

function updateCounters() {
    const completedTasks = document.querySelectorAll(".completed").length;
    const uncompletedTasks = document.querySelectorAll("li:not(.completed)").length;

    completedCounter.textContent = completedTasks;
    uncompletedCounter.textContent = uncompletedTasks;
}
