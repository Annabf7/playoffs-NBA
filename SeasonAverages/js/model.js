//https://www.proballers.com/basketball/league/3/nba/standings
//https://thesportsdb.com/api/v1/json/%7B674871%7D/lookuptable.php?l=4387&s=2023-2024 FUCKED

export async function getStandings() {
  try {
    const response = await fetch("./js/standings.json");
    const data = await response.json();

    data.standings.forEach((team) => {
      team.win_percentage = (team.wins / team.games_played) * 100;
    });

    data.standings.sort((a, b) => {
      if (b.win_percentage !== a.win_percentage) {
        return b.win_percentage - a.win_percentage;
      }

      if (b.point_difference !== a.point_difference) {
        return b.point_difference - a.point_difference;
      }

      const pointsForPerGameA = a.points_for / a.games_played;
      const pointsForPerGameB = b.points_for / b.games_played;
      if (pointsForPerGameB !== pointsForPerGameA) {
        return pointsForPerGameB - pointsForPerGameA;
      }

      return 0; // Per defecte, són iguals en tots els criteris anteriors
    });

    return data.standings;
  } catch (error) {
    console.error("Error fetching standings:", error);
    throw error;
  }
}
