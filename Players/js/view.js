import { fetchPlayersByTeam } from "./model.js";
import { getTeamLogo } from "./data.js";

const positionTranslations = {
  "Point Guard": "Base",
  "Shooting Guard": "Escorta",
  "Small Forward": "Aler",
  "Power Forward": "Ala pivot",
  Center: "Pivot",
  Manager: "Entrenador",
};

export function showLoadingScreen() {
  const loadingScreen = document.getElementById("loading-screen");
  if (loadingScreen) {
    loadingScreen.style.display = "flex";
  }
}

export function hideLoadingScreen() {
  const loadingScreen = document.getElementById("loading-screen");
  if (loadingScreen) {
    loadingScreen.style.display = "none";
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
    const teamLogo = getTeamLogo(team.idTeam); // Afegeix la crida a getTeamLogo
    const teamCard = document.createElement("div");
    teamCard.className = "team-card";
    teamCard.innerHTML = `
      <div class="card" data-team-id="${team.idTeam}">
        <div class="card-body">
          <h5 class="card-title">${team.strTeam}</h5>
          <img src="${teamLogo}" class="card-img-top" alt="${team.strTeam} Logo" loading="lazy">
        </div>
      </div>
    `;

    teamCard.addEventListener("click", async () => {
      showLoadingScreen();
      try {
        const result = await fetchPlayersByTeam(team.idTeam);
        hideLoadingScreen();
        loadPlayersByTeam(result);
      } catch (error) {
        hideLoadingScreen();
        showError("players-list", `Failed to load players for the team with ID: ${team.idTeam}`);
      }
      const modal = new bootstrap.Modal(document.getElementById("playersModal"));
      modal.show();
    });

    teamsList.appendChild(teamCard);
  });
}

export function loadPlayersByTeam(players) {
  const playersList = document.getElementById("players-list");
  playersList.innerHTML = ""; // Buida la llista de jugadors

  if (Array.isArray(players.player) && players.player.length > 0) {
    // Eliminar duplicats basats en el nom del jugador
    const uniquePlayers = Array.from(new Set(players.player.map((player) => player.strPlayer))).map(
      (name) => {
        return players.player.find((player) => player.strPlayer === name);
      }
    );

    // Separar els jugadors i els entrenadors
    const playersWithoutManagers = uniquePlayers.filter(
      (player) => player.strPosition !== "Manager"
    );
    const managers = uniquePlayers.filter((player) => player.strPosition === "Manager");

    // Traduir posicions al català i mostrar targetes
    playersWithoutManagers.forEach((player) => {
      const playerName = `${player.strPlayer}`;
      const playerImage =
        player.strCutout ||
        "https://www.thesportsdb.com/images/media/player/cutout/uzhu1c1712335650.png"; // Imatge per defecte
      const playerCard = document.createElement("div");
      playerCard.className = "card col-md-4";
      playerCard.innerHTML = `
        <img src="${playerImage}" class="card-img-top" alt="Player Image" loading="lazy"
         onerror="this.onerror=null;this.src='https://www.thesportsdb.com/images/media/player/cutout/uzhu1c1712335650.png';">
        <div class="card-body">
          <h5 class="card-title">${playerName}</h5>
          <p class="card-text">Posició: ${
            positionTranslations[player.strPosition] || player.strPosition
          }</p>
        </div>
      `;

      playersList.appendChild(playerCard);
    });

    // Afegir entrenadors al final
    managers.forEach((manager) => {
      const managerName = `${manager.strPlayer}`;
      const managerImage =
        manager.strCutout ||
        "https://www.thesportsdb.com/images/media/player/cutout/uzhu1c1712335650.png"; // Imatge per defecte
      const managerCard = document.createElement("div");
      managerCard.className = "card col-md-4";
      managerCard.innerHTML = `
        <img src="${managerImage}" class="card-img-top" alt="Player Image" loading="lazy" onerror="this.onerror=null;this.src='https://www.thesportsdb.com/images/media/player/cutout/uzhu1c1712335650.png';">
        <div class="card-body">
          <h5 class="card-title">${managerName}</h5>
          <p class="card-text">Posició: ${
            positionTranslations[manager.strPosition] || manager.strPosition
          }</p>
        </div>
      `;

      playersList.appendChild(managerCard);
    });
  } else {
    showError("players-list", "No players found for this team.");
  }
}

export function showPlayerDetails(player) {
  const playerDetails = document.getElementById("playerDetails");
  if (!playerDetails) {
    console.error("Element with ID 'playerDetails' not found.");
    return;
  }

  const playerImage =
    player.strCutout ||
    "https://www.thesportsdb.com/images/media/player/cutout/uzhu1c1712335650.png"; // Imatge per defecte

  playerDetails.innerHTML = `
    <img src="${playerImage}" class="card-img-top" alt="Player Image" loading="lazy" onerror="this.onerror=null;this.src='https://www.thesportsdb.com/images/media/player/cutout/uzhu1c1712335650.png';">
    <div class="card-body">
      <h5 class="card-title">${player.strPlayer}</h5>
      <p class="card-text">Equip: ${player.strTeam}</p>
      <p class="card-text">Posició: ${
        positionTranslations[player.strPosition] || player.strPosition
      }</p>
      ${player.strHeight ? `<p class="card-text">Alçada: ${player.strHeight}</p>` : ""}
      ${player.strWeight ? `<p class="card-text">Pes: ${player.strWeight}</p>` : ""}
      <p class="card-text"><img src="./images/samarreta.png" class="shirt-icon" alt="Shirt Icon"> : ${
        player.strNumber || "N/A"
      }</p>
            <p class="card-text">País: ${player.strNationality || "N/A"}</p>
      <p class="card-text">Data de naixement: ${player.dateBorn || "N/A"}</p>
    </div>
  `;

  const modal = new bootstrap.Modal(document.getElementById("playerModal"));
  modal.show();
}

// Assegura que l'element del modal està present
document.addEventListener("DOMContentLoaded", () => {
  const playerModal = document.getElementById("playerModal");
  if (!playerModal) {
    const modalDiv = document.createElement("div");
    modalDiv.innerHTML = `
    <div class="modal fade" id="playerModal" tabindex="-1" aria-labelledby="playerModalLabel" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="playerModalLabel">Detalls del Jugador</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body" id="playerDetails">
            <!-- Els detalls del jugador es carregaran aquí dinàmicament -->
          </div>
        </div>
      </div>
    </div>
  `;
    document.body.appendChild(modalDiv);
  }
});
