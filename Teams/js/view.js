import { teamData, getTeamLogo } from "./data.js";

export function showLoadingIndicator() {
  const loadingIndicator = document.getElementById("loading-indicator");
  if (loadingIndicator) {
    loadingIndicator.style.display = "flex";
  }
}

export function hideLoadingIndicator() {
  const loadingIndicator = document.getElementById("loading-indicator");
  if (loadingIndicator) {
    loadingIndicator.style.display = "none";
  }
}

export function showError(containerId, message) {
  const container = document.getElementById(containerId);
  const errorDiv = document.createElement("div");
  errorDiv.className = "alert alert-danger";
  errorDiv.innerText = message;
  container.appendChild(errorDiv);
}

export function renderTeams(teams) {
  const teamsList = document.getElementById("teams-list");
  if (!teamsList) {
    console.error("Element with ID 'teams-list' not found.");
    return;
  }
  teamsList.innerHTML = ""; // Buida la llista d'equips

  teams.forEach((team) => {
    const teamCard = document.createElement("div");
    teamCard.className = "team-card";
    teamCard.innerHTML = `
      <div class="card" data-team-id="${team.id}">
        <div class="card-body">
          <h5 class="card-title">${team.full_name}</h5>
          <img src="${getTeamLogo(team.id)}" class="card-img-top" alt="${
      team.full_name
    } Logo" loading="lazy">
        </div>
      </div>
    `;

    teamCard.addEventListener("click", () => {
      showTeamCard(team, map); // Passar 'map' com a argument
      localStorage.setItem("lastSelectedTeam", JSON.stringify(team)); // Emmagatzema l'últim equip seleccionat
    });

    teamsList.appendChild(teamCard);
  });
}

export function showTeamCard(team, map) {
  const cardContainer = document.getElementById("map-card-container");
  const teamLogo = getTeamLogo(team.id) || "https://example.com/default_logo.png"; // Assegura't que utilitzes l'ID correcte

  const teamCard = document.createElement("div");
  teamCard.className = "team-card";
  teamCard.innerHTML = `
    <button class="close-btn">&times;</button>
    <img src="${teamLogo}" alt="${team.full_name} Logo" class="img-fluid card-img-top">
    <h4 class="team-name">${team.full_name}</h4>
    <div class="card-body">
      <table class="team-info-table">
        <tr>
          <th>City</th>
          <td>${team.city}</td>
        </tr>
        <tr>
          <th>Conference</th>
          <td>${team.conference}</td>
        </tr>
        <tr>
          <th>Division</th>
          <td>${team.division}</td>
        </tr>
      </table>
    </div>
  `;

  // Esborra les targetes anteriors i afegeix la nova
  cardContainer.innerHTML = "";
  cardContainer.appendChild(teamCard);

  // Afegir l'esdeveniment de tancament
  const closeBtn = teamCard.querySelector(".close-btn");
  closeBtn.addEventListener("click", () => {
    cardContainer.innerHTML = "";
  });

  // Centra el mapa al marcador i mostra la targeta
  if (map && typeof map.setView === "function") {
    map.setView([teamData[team.full_name].latitude, teamData[team.full_name].longitude], 8);
  } else {
    console.error("Map instance is not valid.");
  }

  // Ajusta la posició de la targeta per centrar-la al contenidor del mapa
  cardContainer.style.display = "block";
  cardContainer.style.left = "50%";
  cardContainer.style.top = "50%";
  cardContainer.style.transform = "translate(-50%, -50%)";
  teamCard.style.position = "relative"; // Ens assegurem que el botó de tancament es col·loqui correctament

  // Emmagatzema l'últim equip seleccionat a LocalStorage
  localStorage.setItem("lastSelectedTeam", JSON.stringify(team));
}
