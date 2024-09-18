import { fetchGameDetails } from "./model.js";
import { getTeamLogo } from "./data.js";
import { loadRecentGames } from "./controller.js";

export function showLoadingIndicator(containerId) {
  const container = document.getElementById(containerId);
  if (!container) {
    console.error(`Element with ID ${containerId} not found.`);
    return; // Si el contenedor no existeix, sortim de la funció
  }
  const loadingIndicator = document.createElement("div");
  loadingIndicator.className = "spinner-border text-primary";
  loadingIndicator.role = "status";
  loadingIndicator.innerHTML = `<span class="visually-hidden">Loading...</span>`;
  container.appendChild(loadingIndicator);
}

export function hideLoadingIndicator(containerId) {
  const container = document.getElementById(containerId);
  if (!container) {
    console.error(`Element with ID ${containerId} not found.`);
    return; // Si el contenedor no existeix, sortim de la funció
  }
  const spinner = container.querySelector(".spinner-border");
  if (spinner) {
    container.removeChild(spinner);
  }
}

export function showError(containerId, message) {
  const container = document.getElementById(containerId);
  const errorDiv = document.createElement("div");
  errorDiv.className = "alert alert-danger";
  errorDiv.innerText = message;
  container.appendChild(errorDiv);
}

export async function renderGames(games, containerId) {
  const container = document.getElementById(containerId);
  container.innerHTML = ""; // Buida la llista de partits

  for (const game of games) {
    const homeTeamLogo = getTeamLogo(game.strHomeTeam);
    const awayTeamLogo = getTeamLogo(game.strAwayTeam);
    const venue = game.strVenue || "TD Garden"; // Assigna "TD Garden" si no hi ha valor

    const gameItem = document.createElement("div");
    gameItem.className = "game-card";
    gameItem.innerHTML = `
      <div class="game-card-title">${game.strEvent}</div>
      <div class="game-card-body">
        <div class="game-card-team-logos">
          <img src="${homeTeamLogo}" alt="${game.strHomeTeam} Logo" class="game-card-logo">
          <img src="${awayTeamLogo}" alt="${game.strAwayTeam} Logo" class="game-card-logo">
        </div>
        <p class="game-card-text-1">${game.dateEvent}</p>
        <p class="game-card-text-2"><img src="./images/pavellon.png" alt="Pavelló" style="width: 20px; height: 20px;"> ${venue}</p>
      </div>
    `;
    gameItem.addEventListener("click", () => showGameDetails(game.idEvent));
    container.appendChild(gameItem);
  }
}

export function renderGameDetails(game) {
  // Processar el camp strResult per obtenir els resultats dels quarts
  const homeTeamResults = [];
  const awayTeamResults = [];

  if (game.strResult) {
    const resultLines = game.strResult.split("<br><br>");
    if (resultLines.length === 2) {
      const awayResults = resultLines[0].match(/(\d+)\s+(\d+)\s+(\d+)\s+(\d+)/);
      const homeResults = resultLines[1].match(/(\d+)\s+(\d+)\s+(\d+)\s+(\d+)/);
      if (awayResults && homeResults) {
        awayTeamResults.push(...awayResults.slice(1));
        homeTeamResults.push(...homeResults.slice(1));
      }
    }
  }

  const container = document.getElementById("gameDetails");
  container.innerHTML = `
    <div class="game-details-container">
      ${
        game.strThumb
          ? `<img src="${game.strThumb}" alt="Imatge del joc" class="game-details-thumb">`
          : ""
      }
      <h5 class="game-details-title">${game.strEvent}</h5>
      <p><strong>Data i Hora de l'Inici:</strong> ${game.strTimestamp || "No disponible"}</p>
      <p><strong>Estadi:</strong> ${game.strVenue || "No disponible"}</p>
      <p><strong>Marcador:</strong> ${game.intHomeScore} - ${game.intAwayScore}</p>
      <p><strong>Ciutat:</strong> ${game.strCity || "No disponible"}</p>
      ${
        game.strVideo
          ? `<p><strong>Vídeo del partit:</strong> <a href="${game.strVideo}" target="_blank">Mira el vídeo</a></p>`
          : ""
      }
      <h6><br></h6>
      <table class="table table-striped">
        <thead>
          <tr>
            <th scope="col">Equip</th>
            <th scope="col">Q1</th>
            <th scope="col">Q2</th>
            <th scope="col">Q3</th>
            <th scope="col">Q4</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>${game.strHomeTeam}</td>
            <td>${homeTeamResults[0] || "N/A"}</td>
            <td>${homeTeamResults[1] || "N/A"}</td>
            <td>${homeTeamResults[2] || "N/A"}</td>
            <td>${homeTeamResults[3] || "N/A"}</td>
          </tr>
          <tr>
            <td>${game.strAwayTeam}</td>
            <td>${awayTeamResults[0] || "N/A"}</td>
            <td>${awayTeamResults[1] || "N/A"}</td>
            <td>${awayTeamResults[2] || "N/A"}</td>
            <td>${awayTeamResults[3] || "N/A"}</td>
          </tr>
        </tbody>
      </table>
    </div>
  `;
}

export function showGameDetails(gameId) {
  const containerId = "gameDetails";
  showLoadingIndicator(containerId);

  fetchGameDetails(gameId)
    .then((data) => {
      if (data) {
        renderGameDetails(data);
      } else {
        showError(containerId, "No game details found.");
      }
    })
    .catch((error) => {
      showError(containerId, `Error fetching game details: ${error.message}`);
    })
    .finally(() => {
      hideLoadingIndicator(containerId);
      const modal = new bootstrap.Modal(document.getElementById("gameDetailsModal"));
      modal.show();
    });
}

document.addEventListener("DOMContentLoaded", () => {
  const gameDetailsModal = document.getElementById("gameDetailsModal");
  if (!gameDetailsModal) {
    const modalDiv = document.createElement("div");
    modalDiv.innerHTML = `
      <div class="modal fade" id="gameDetailsModal" tabindex="-1" aria-labelledby="gameDetailsModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="gameDetailsModalLabel">Detalls del Joc</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body" id="gameDetails">
              <!-- Els detalls del joc es carregaran aquí dinàmicament -->
            </div>
          </div>
        </div>
      </div>
    `;
    document.body.appendChild(modalDiv);
  }

  loadRecentGames();
});
