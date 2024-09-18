const apiKey = "45c58983-d578-4198-9fe9-c710ba3438cb";
const baseUrl = "https://api.balldontlie.io/v1/";

async function fetchData(url) {
  try {
    const response = await fetch(url, {
      headers: {
        Authorization: apiKey,
      },
    });
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

export async function fetchTeamsBallDontLie() {
  const url = `${baseUrl}teams`;
  let data = await fetchData(url);
  return data.data.slice(0, 30); // Limitem als primers 30 equips
}
