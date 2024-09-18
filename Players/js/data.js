// data.js
export const teamLogos = {
  134880: "https://cdn.nba.com/logos/nba/1610612737/global/L/logo.svg",
  134860: "https://cdn.nba.com/logos/nba/1610612738/global/L/logo.svg",
  134861: "https://cdn.nba.com/logos/nba/1610612751/global/L/logo.svg",
  134881: "https://cdn.nba.com/logos/nba/1610612766/global/L/logo.svg",
  134870: "https://cdn.nba.com/logos/nba/1610612741/global/L/logo.svg",
  134871: "https://cdn.nba.com/logos/nba/1610612739/global/L/logo.svg",
  134875: "https://cdn.nba.com/logos/nba/1610612742/global/L/logo.svg",
  134885: "https://cdn.nba.com/logos/nba/1610612743/global/L/logo.svg",
  134872: "https://cdn.nba.com/logos/nba/1610612765/global/L/logo.svg",
  134865: "https://cdn.nba.com/logos/nba/1610612744/global/L/logo.svg",
  134876: "https://cdn.nba.com/logos/nba/1610612745/global/L/logo.svg",
  134873: "https://cdn.nba.com/logos/nba/1610612754/global/L/logo.svg",
  134866: "https://cdn.nba.com/logos/nba/1610612746/global/L/logo.svg",
  134867: "https://cdn.nba.com/logos/nba/1610612747/global/L/logo.svg",
  134877: "https://cdn.nba.com/logos/nba/1610612763/global/L/logo.svg",
  134882: "https://cdn.nba.com/logos/nba/1610612748/global/L/logo.svg",
  134874: "https://cdn.nba.com/logos/nba/1610612749/global/L/logo.svg",
  134886: "https://cdn.nba.com/logos/nba/1610612750/global/L/logo.svg",
  134878: "https://cdn.nba.com/logos/nba/1610612740/global/L/logo.svg",
  134862: "https://cdn.nba.com/logos/nba/1610612752/global/L/logo.svg",
  134887: "https://cdn.nba.com/logos/nba/1610612760/global/L/logo.svg",
  134883: "https://cdn.nba.com/logos/nba/1610612753/global/L/logo.svg",
  134863: "https://cdn.nba.com/logos/nba/1610612755/global/L/logo.svg",
  134868: "https://cdn.nba.com/logos/nba/1610612756/global/L/logo.svg",
  134888: "https://cdn.nba.com/logos/nba/1610612757/global/L/logo.svg",
  134869: "https://cdn.nba.com/logos/nba/1610612758/global/L/logo.svg",
  134879: "https://cdn.nba.com/logos/nba/1610612759/global/L/logo.svg",
  134864: "https://cdn.nba.com/logos/nba/1610612761/global/L/logo.svg",
  134889: "https://cdn.nba.com/logos/nba/1610612762/global/L/logo.svg",
  134884: "https://cdn.nba.com/logos/nba/1610612764/global/L/logo.svg",
};

export function getTeamLogo(identifier) {
  if (teamLogos[identifier]) {
    return teamLogos[identifier];
  }

  // Map team name to ID if identifier is not an ID
  const teamNameToId = {
    "Atlanta Hawks": 134880,
    "Boston Celtics": 134860,
    "Brooklyn Nets": 134861,
    "Charlotte Hornets": 134881,
    "Chicago Bulls": 134870,
    "Cleveland Cavaliers": 134871,
    "Dallas Mavericks": 134875,
    "Denver Nuggets": 134885,
    "Detroit Pistons": 134872,
    "Golden State Warriors": 134865,
    "Houston Rockets": 134876,
    "Indiana Pacers": 134873,
    "Los Angeles Clippers": 134866,
    "LA Clippers": 134866,
    "Los Angeles Lakers": 134867,
    "Memphis Grizzlies": 134877,
    "Miami Heat": 134882,
    "Milwaukee Bucks": 134874,
    "Minnesota Timberwolves": 134886,
    "New Orleans Pelicans": 134878,
    "New York Knicks": 134862,
    "Oklahoma City Thunder": 134887,
    "Orlando Magic": 134883,
    "Philadelphia 76ers": 134863,
    "Phoenix Suns": 134868,
    "Portland Trail Blazers": 134888,
    "Sacramento Kings": 134869,
    "San Antonio Spurs": 134879,
    "Toronto Raptors": 134864,
    "Utah Jazz": 134889,
    "Washington Wizards": 134884,
  };
  const teamId = teamNameToId[identifier];
  return teamLogos[teamId] || "https://example.com/default_logo.png";
}
