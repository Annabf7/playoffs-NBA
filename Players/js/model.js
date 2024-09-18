const apiKeySportsDB = "674871";
const baseUrlSportsDB = "https://www.thesportsdb.com/api/v1/json/";

export async function fetchData(url) {
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

export async function fetchPlayersByTeam(teamId) {
  const url = `${baseUrlSportsDB}${apiKeySportsDB}/lookup_all_players.php?id=${teamId}`;
  return await fetchData(url);
}

export async function fetchTeamsSportsDB() {
  const url = `${baseUrlSportsDB}${apiKeySportsDB}/search_all_teams.php?l=NBA`;
  return await fetchData(url);
}

export async function fetchPlayerByName(playerName) {
  const url = `${baseUrlSportsDB}${apiKeySportsDB}/searchplayers.php?p=${playerName}`;
  return await fetchData(url);
}
