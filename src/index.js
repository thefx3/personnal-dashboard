import "./style.css"

console.log("Hello from Webpack!")

// Exemple de code JavaScript
function createHeader() {
  const header = document.createElement("h2")
  header.textContent = "Projet configuré avec Webpack"
  header.style.color = "#333"
  return header
}

// Ajouter du contenu à la page
const content = document.getElementById("content")
if (content) {
  content.appendChild(createHeader())
}
