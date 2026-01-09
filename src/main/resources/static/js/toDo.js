// 1. Récupérer le formulaire
const form = document.getElementById("add");

// 2. Attacher un événement
// Lequel ? Soumission de formulaire (submit)
// Quoi faire ? Exécuter une fonction en charge du traitement du formulaire
form.addEventListener("submit", handleFormSubmit);

// 3. Définir la fonction
// - Récupérer les données
// - Envoyer les données à l'API
function handleFormSubmit(event) {
    event.preventDefault();

    alert("Requête interceptée");
    const formData = new FormData(event.currentTarget);
    console.log(formData);
}

const data = {
    name : taskName,
    desc: taskDescription
}
//interception requete


