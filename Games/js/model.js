const apiKeySportsDB = "674871";
const baseUrlSportsDB = "https://www.thesportsdb.com/api/v1/json/";

async function fetchData(url) {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
}

export async function fetchRecentGames() {
  const url = `${baseUrlSportsDB}${apiKeySportsDB}/eventspastleague.php?id=4387`;
  return await fetchData(url);
}

export async function fetchGameDetails(gameId) {
  const url = `${baseUrlSportsDB}${apiKeySportsDB}/lookupevent.php?id=${gameId}`;
  const data = await fetchData(url);
  if (data && data.events && data.events.length > 0) {
    console.log(data.events[0]); // Mostra les dades del partit a la consola
    return data.events[0]; // Retorna només el primer element de l'array d'events
  }
  return null; // Retorna null si no hi ha dades
}

export async function fetchTeamLogo(teamName) {
  const url = `${baseUrlSportsDB}${apiKeySportsDB}/searchteams.php?t=${teamName}`;
  const data = await fetchData(url);
  return data.teams ? data.teams[0].strTeamBadge : null;
}
