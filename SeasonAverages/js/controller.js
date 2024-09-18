import { getStandings } from "./model.js";
import { displayStandings } from "./view.js";

const teamPages = {
  "Boston Celtics": "/Players/players.html#boston-celtics",
  "Oklahoma City Thunder": "/Players/players.html#oklahoma-city-thunder",
  "Denver Nuggets": "/Players/players.html#denver-nuggets",
  "Minnesota Timberwolves": "/Players/players.html#minnesota-timberwolves",
  "Los Angeles Clippers": "/Players/players.html#los-angeles-clippers",
  "New York Knicks": "/Players/players.html#new-york-knicks",
  "Dallas Mavericks": "/Players/players.html#dallas-mavericks",
  "New Orleans Pelicans": "/Players/players.html#new-orleans-pelicans",
  "Phoenix Suns": "/Players/players.html#phoenix-suns",
  "Milwaukee Bucks": "/Players/players.html#milwaukee-bucks",
  "Cleveland Cavaliers": "/Players/players.html#cleveland-cavaliers",
  "Philadelphia 76ers": "/Players/players.html#philadelphia-76ers",
  "Indiana Pacers": "/Players/players.html#indiana-pacers",
  "Orlando Magic": "/Players/players.html#orlando-magic",
  "Los Angeles Lakers": "/Players/players.html#los-angeles-lakers",
  "Golden State Warriors": "/Players/players.html#golden-state-warriors",
  "Miami Heat": "/Players/players.html#miami-heat",
  "Sacramento Kings": "/Players/players.html#sacramento-kings",
  "Houston Rockets": "/Players/players.html#houston-rockets",
  "Chicago Bulls": "/Players/players.html#chicago-bulls",
  "Atlanta Hawks": "/Players/players.html#atlanta-hawks",
  "Brooklyn Nets": "/Players/players.html#brooklyn-nets",
  "Utah Jazz": "/Players/players.html#utah-jazz",
  "Memphis Grizzlies": "/Players/players.html#memphis-grizzlies",
  "Toronto Raptors": "/Players/players.html#toronto-raptors",
  "San Antonio Spurs": "/Players/players.html#san-antonio-spurs",
  "Portland Trail Blazers": "/Players/players.html#portland-trail-blazers",
  "Charlotte Hornets": "/Players/players.html#charlotte-hornets",
  "Washington Wizards": "/Players/players.html#washington-wizards",
  "Detroit Pistons": "/Players/players.html#detroit-pistons",
};

document.addEventListener("DOMContentLoaded", async () => {
  try {
    const storedStandings = localStorage.getItem("standings");
    if (storedStandings) {
      const standings = JSON.parse(storedStandings);
      displayStandings(standings, teamPages);
    } else {
      const standings = await getStandings();
      localStorage.setItem("standings", JSON.stringify(standings));
      displayStandings(standings, teamPages);
    }
  } catch (error) {
    console.error("Error loading standings:", error);
  }
});
