import { fetchTeamsBallDontLie } from "./model.js";
import { showTeamCard } from "./view.js";
import { teamData } from "./data.js"; // Assegura't que teamData està importat

let map;

async function loadTeamsOnMap(conference = "all") {
  try {
    let teams = JSON.parse(localStorage.getItem("teamsData"));

    if (!teams) {
      teams = await fetchTeamsBallDontLie(); // Ja retorna els primers 30 equips
      localStorage.setItem("teamsData", JSON.stringify(teams));
      console.log(`Nombre d'equips carregats: ${teams.length}`);
    } else {
      console.log("Dades carregades des de LocalStorage");
    }

    if (map) {
      map.remove();
    }

    map = L.map("map").setView([37.8, -96], 4);

    L.tileLayer("https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png", {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
      maxZoom: 19,
    }).addTo(map);

    const customIcon = L.icon({
      iconUrl: "images/iconBall.png",
      iconSize: [26, 26],
      iconAnchor: [13, 41],
      popupAnchor: [0, -41],
    });

    let filteredTeams = teams;
    if (conference !== "all") {
      filteredTeams = filteredTeams.filter((team) => team.conference === conference);
    }

    filteredTeams.forEach((team) => {
      const { latitude, longitude } = teamData[team.full_name] || {};

      if (latitude && longitude) {
        const marker = L.marker([latitude, longitude], { icon: customIcon }).addTo(map);
        marker.on("click", () => {
          showTeamCard(team, map); // Passar 'map' com a argument
        });
      } else {
        console.warn(`No data found for team: ${team.full_name}`);
      }
    });
  } catch (error) {
    console.error("Error fetching teams:", error);
  }
}

export function showTeams(conference) {
  loadTeamsOnMap(conference);
}

document.addEventListener("DOMContentLoaded", () => {
  loadTeamsOnMap();
  window.showTeams = showTeams; // Assegura que showTeams està disponible globalment

  // Carregar les dades dels equips des de LocalStorage
  const teamsData = JSON.parse(localStorage.getItem("teamsData"));
  if (teamsData) {
    console.log("Dades carregades des de LocalStorage");
  }
});
