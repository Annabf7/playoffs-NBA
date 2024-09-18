import { fetchLeagueData } from "./model.js";
import { showModal, updatePageContent } from "./view.js"; 

document.addEventListener("DOMContentLoaded", (event) => {
  // Comprovar si el modal ha estat obert prèviament i guardar al LocalStorage
  if (localStorage.getItem("modalOpened") === "true") {
    const savedLeagueData = JSON.parse(localStorage.getItem("leagueData"));
    if (savedLeagueData) {
      updatePageContent(savedLeagueData);
      showModal(savedLeagueData);
    }
  }
});

document.getElementById("heroSection").addEventListener("click", function () {
  fetchLeagueData()
    .then((league) => {
      if (league) {
        updatePageContent(league);
        showModal(league); // Utilitza la funció showModal importada
        // Guardar estat al LocalStorage
        saveStateToLocalStorage(league);
      }
    })
    .catch((error) => console.error("Error fetching league data:", error));
});

function saveStateToLocalStorage(league) {
  localStorage.setItem("leagueData", JSON.stringify(league));
  localStorage.setItem("modalOpened", "true");
}
