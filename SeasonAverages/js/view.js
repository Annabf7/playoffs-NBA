import { teamLogos } from "./data.js";

export function displayStandings(standings, teamPages) {
  const tableBody = document.querySelector("#season-stats-list tbody");
  tableBody.innerHTML = "";

  standings.forEach((team, index) => {
    const logoUrl = teamLogos[team.team];
    const teamPageUrl = teamPages[team.team];

    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${index + 1}</td>
      <td>
        ${
          logoUrl
            ? `<img src="${logoUrl}" alt="${team.team} logo" style="width: 24px; height: 24px; margin-right: 8px;">`
            : ""
        }
        <a href="${teamPageUrl}" class="team-link">${team.team}</a>
      </td>
      <td>${team.games_played}</td>
      <td>${team.wins}</td>
      <td>${team.losses}</td>
      <td>${team.points_for}</td>
      <td>${team.points_against}</td>
      <td>${team.point_difference}</td>
      <td>${team.victory_percentage}%</td>
    `;
    tableBody.appendChild(row);
  });
}
