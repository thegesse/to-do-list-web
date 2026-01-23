// 1. Récupérer le formulaire
const form = document.getElementById("add");
const listContainer = document.getElementById("List");

listContainer.addEventListener("click", (event) => {
    if (event.target.classList.contains("delete-btn")) {
        const taskId = event.target.getAttribute("data-id");
        const taskElement = event.target.closest(".task-item");
        deleteTask(taskId, taskElement)
    }
});

// 2. Attacher un événement
// Lequel ? Soumission de formulaire (submit)
// Quoi faire ? Exécuter une fonction en charge du traitement du formulaire
form.addEventListener("submit", handleFormSubmit);

// 3. Définir la fonction
// - Récupérer les données
// - Envoyer les données à l'API
async function handleFormSubmit(event) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const data = {
        name : formData.get("name"),
        description: formData.get("description")
    };
    console.log(formData);

    const response = await fetch("/tasks", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    });

    if(response.ok) {
        const newTask = await response.json();
        event.target.reset();
        fetchAndDisplay();

        renderSingleTask(newTask);
    }
}

function renderSingleTask(task) {
    const div = document.createElement("div");
    div.classList.add("task-item");

    const title = document.createElement("strong");
    title.classList.add("task-title");
    title.textContent = task.name;

    const desc = document.createElement("span");
    desc.classList.add("task-desc");
    desc.textContent = `: ${task.description || ''}`;

    const deleteButton = document.createElement("button");
    deleteButton.classList.add("delete-btn");
    deleteButton.textContent = "Supprimer";
    // Set the data-id for the event delegation to find
    deleteButton.setAttribute("data-id", task.id);

    div.append(title, desc, deleteButton);
    listContainer.appendChild(div);
}

async function fetchAndDisplay() {
    const response = await fetch("/tasks");
    const tasks = await response.json();

    const fragment = document.createDocumentFragment();
    listContainer.innerHTML = "";


    tasks.forEach(task => {

    const div = createTaskElement(task);
    fragment.appendChild(div);
    });
    listContainer.appendChild(fragment)
}

function createTaskElement(task) {
    const div = document.createElement("div");
    div.classList.add("task-item");
    div.innerHTML = `
        <strong class="task-title">${task.name}</strong>
        <span class="task-desc">: ${task.description || ''}</span>
        <button class="delete-btn" data-id="${task.id}">Supprimer</button>
    `;
    return div;
}

async function deleteTask(id, element) {

    element.remove();
    const response = await fetch(`/tasks/${id}`, {method: "DELETE"});

    if (!response.ok) {
        alert("task deletion failed");
        fetchAndDisplay()
    }
}

fetchAndDisplay();

