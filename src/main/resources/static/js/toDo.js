;// 1. Récupérer le formulaire
const form = document.getElementById("add");
const listContainer = document.getElementById("List");

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
    }

}



async function fetchAndDisplay() {
    const response = await fetch("/tasks");
    const tasks = await response.json();

    listContainer.innerHTML = "";


    tasks.forEach(task => {

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



        deleteButton.onclick = () => deleteTask(task.id);

        div.appendChild(title);
        div.appendChild(desc);
        div.appendChild(deleteButton);
        listContainer.appendChild(div);
    });

}

async function deleteTask(id) {
    const response = await fetch(`/tasks/${id}`, {
        method: "DELETE"
    });
    if(response.ok) {
        fetchAndDisplay();

    }

}

fetchAndDisplay();

