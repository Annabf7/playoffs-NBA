const apiKeySportsDB = "674871";
const baseUrlSportsDB = "https://www.thesportsdb.com/api/v1/json/";

export async function fetchLeagueData() {
  try {
    const response = await fetch(`${baseUrlSportsDB}${apiKeySportsDB}/lookupleague.php?id=4387`);
    const data = await response.json();
    return data.leagues[0];
  } catch (error) {
    console.error("Error fetching league data:", error);
  }
}
