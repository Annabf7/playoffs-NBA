import { fetchRecentGames } from "./model.js";
import { renderGames, showLoadingIndicator, hideLoadingIndicator, showError } from "./view.js";

export async function loadRecentGames() {
  const containerId = "recent-games-list";
  showLoadingIndicator(containerId);

  try {
    let recentGames = localStorage.getItem("recentGames");
    if (recentGames) {
      recentGames = JSON.parse(recentGames);
    } else {
      const data = await fetchRecentGames();
      if (data.events && data.events.length > 0) {
        recentGames = data.events;
        localStorage.setItem("recentGames", JSON.stringify(recentGames));
      } else {
        showError(containerId, "No recent games found.");
        return; // Si no hi ha jocs recents, sortim de la funció
      }
    }
    renderGames(recentGames, containerId);
  } catch (error) {
    showError(containerId, `Error fetching recent games: ${error.message}`);
  } finally {
    hideLoadingIndicator(containerId);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  loadRecentGames();
});
