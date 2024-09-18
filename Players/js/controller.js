import { fetchTeamsSportsDB, fetchPlayersByTeam, fetchPlayerByName } from "./model.js";
import {
  renderTeams,
  loadPlayersByTeam,
  showLoadingScreen,
  hideLoadingScreen,
  showError,
  showPlayerDetails,
} from "./view.js";

async function loadTeams() {
  const containerId = "teams-list";
  showLoadingScreen(); // Mostra la pantalla de càrrega

  try {
    const data = await fetchTeamsSportsDB();
    if (data.teams && data.teams.length > 0) {
      renderTeams(data.teams);
    } else {
      showError(containerId, "No teams found.");
    }
  } catch (error) {
    showError(containerId, `Error fetching teams: ${error.message}`);
  } finally {
    hideLoadingScreen(); // Amaga la pantalla de càrrega
  }
}

document.addEventListener("DOMContentLoaded", () => {
  loadTeams();
  setupModalEvents();

  // Carregar l'últim equip seleccionat si existeix
  const lastSelectedTeamId = localStorage.getItem("lastSelectedTeamId");
  if (lastSelectedTeamId) {
    loadPlayers(lastSelectedTeamId);
  }

  // Afegir listener pel formulari de cerca
  const searchForm = document.getElementById("searchForm");
  searchForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    const searchInput = document.getElementById("searchInput").value.trim();
    if (searchInput) {
      await searchPlayerByName(searchInput);
    }
  });
});

async function loadPlayers(teamId) {
  showLoadingScreen(); // Mostra la pantalla de càrrega

  try {
    const result = await fetchPlayersByTeam(teamId);
    hideLoadingScreen(); // Amaga la pantalla de càrrega
    loadPlayersByTeam(result);
    localStorage.setItem("lastSelectedTeamId", teamId); // Emmagatzema l'ID de l'últim equip seleccionat
  } catch (error) {
    hideLoadingScreen(); // Amaga la pantalla de càrrega
    showError("players-list", `Failed to load players for the team with ID: ${teamId}`);
  }
}

async function searchPlayerByName(playerName) {
  showLoadingScreen();
  try {
    const result = await fetchPlayerByName(playerName);
    hideLoadingScreen();
    if (result.player && result.player.length > 0) {
      const player = result.player[0];

      // Validar que el jugador pertany a la NBA
      if (player.strSport !== "Basketball" || player.strTeam === "") {
        showError("players-list", `No player found with name: ${playerName} in the NBA.`);
        return;
      }

      showPlayerDetails(player); // Mostrar els detalls del jugador trobat
    } else {
      showError("players-list", `No player found with name: ${playerName} in the NBA.`);
    }
  } catch (error) {
    hideLoadingScreen();
    console.error("Error cercant jugador:", error); // Debug log
    showError("players-list", `Failed to find player: ${playerName}`);
  }
}

function setupModalEvents() {
  const playersModal = document.getElementById("playersModal");
  const playerModal = document.getElementById("playerModal");

  if (playersModal && playerModal) {
    playersModal.addEventListener("hidden.bs.modal", function () {});

    playerModal.addEventListener("hidden.bs.modal", function () {
      if (!playersModal.classList.contains("show")) {
      }
    });

    playerModal.addEventListener("show.bs.modal", function () {
      if (playersModal.classList.contains("show")) {
        playersModal.classList.add("modal-blur");
      }
    });

    playerModal.addEventListener("hidden.bs.modal", function () {
      playersModal.classList.remove("modal-blur");
    });
  }
}
