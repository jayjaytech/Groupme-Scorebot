const GROUPME_BOT_ID = "YOUR_BOT_ID_HERE";

// ─── ESPN URLS ────────────────────────────────────────────────
const ESPN = {
  mlb:  { scoreboard: "https://site.api.espn.com/apis/site/v2/sports/baseball/mlb/scoreboard",  standings: "https://site.api.espn.com/apis/v2/sports/baseball/mlb/standings" },
  nba:  { scoreboard: "https://site.api.espn.com/apis/site/v2/sports/basketball/nba/scoreboard", standings: "https://site.api.espn.com/apis/v2/sports/basketball/nba/standings" },
  nhl:  { scoreboard: "https://site.api.espn.com/apis/site/v2/sports/hockey/nhl/scoreboard",    standings: "https://site.api.espn.com/apis/v2/sports/hockey/nhl/standings" },
  nfl:  { scoreboard: "https://site.api.espn.com/apis/site/v2/sports/football/nfl/scoreboard",  standings: "https://site.api.espn.com/apis/v2/sports/football/nfl/standings" }
};

// ─── TEAM MAPS ────────────────────────────────────────────────
const TEAMS = {
  nba: {
    "hawks": "ATL", "celtics": "BOS", "nets": "BKN", "hornets": "CHA",
    "bulls": "CHI", "cavaliers": "CLE", "cavs": "CLE", "mavericks": "DAL",
    "mavs": "DAL", "nuggets": "DEN", "pistons": "DET", "warriors": "GSW",
    "rockets": "HOU", "pacers": "IND", "clippers": "LAC", "lakers": "LAL",
    "grizzlies": "MEM", "heat": "MIA", "bucks": "MIL", "timberwolves": "MIN",
    "wolves": "MIN", "pelicans": "NO", "knicks": "NY", "thunder": "OKC",
    "magic": "ORL", "76ers": "PHI", "sixers": "PHI", "suns": "PHX",
    "blazers": "POR", "trail blazers": "POR", "kings": "SAC", "spurs": "SA",
    "raptors": "TOR", "jazz": "UTAH", "wizards": "WSH"
  },
  nfl: {
    "cardinals": "ARI", "falcons": "ATL", "ravens": "BAL", "bills": "BUF",
    "panthers": "CAR", "bears": "CHI", "bengals": "CIN", "browns": "CLE",
    "cowboys": "DAL", "broncos": "DEN", "lions": "DET", "packers": "GB",
    "texans": "HOU", "colts": "IND", "jaguars": "JAX", "jags": "JAX",
    "chiefs": "KC", "raiders": "LV", "chargers": "LAC", "rams": "LAR",
    "dolphins": "MIA", "vikings": "MIN", "patriots": "NE", "saints": "NO",
    "giants": "NYG", "jets": "NYJ", "eagles": "PHI", "steelers": "PIT",
    "49ers": "SF", "niners": "SF", "seahawks": "SEA", "buccaneers": "TB",
    "bucs": "TB", "titans": "TEN", "commanders": "WSH"
  },
  mlb: {
    "diamondbacks": "ARI", "dbacks": "ARI", "braves": "ATL", "orioles": "BAL",
    "red sox": "BOS", "cubs": "CHC", "white sox": "CWS", "reds": "CIN",
    "guardians": "CLE", "rockies": "COL", "tigers": "DET", "astros": "HOU",
    "royals": "KC", "angels": "LAA", "dodgers": "LAD", "marlins": "MIA",
    "brewers": "MIL", "twins": "MIN", "mets": "NYM", "yankees": "NYY",
    "athletics": "OAK", "phillies": "PHI", "pirates": "PIT", "padres": "SD",
    "giants": "SF", "mariners": "SEA", "cardinals": "STL", "rays": "TB",
    "rangers": "TEX", "blue jays": "TOR", "jays": "TOR", "nationals": "WSH", "nats": "WSH"
  },
  nhl: {
    "ducks": "ANA", "bruins": "BOS", "sabres": "BUF", "flames": "CGY",
    "hurricanes": "CAR", "canes": "CAR", "blackhawks": "CHI",
    "avalanche": "COL", "avs": "COL", "blue jackets": "CBJ",
    "stars": "DAL", "red wings": "DET", "oilers": "EDM", "panthers": "FLA",
    "kings": "LAK", "wild": "MIN", "canadiens": "MTL", "habs": "MTL",
    "predators": "NSH", "preds": "NSH", "devils": "NJD", "islanders": "NYI",
    "rangers": "NYR", "senators": "OTT", "flyers": "PHI", "penguins": "PIT",
    "pens": "PIT", "blues": "STL", "lightning": "TB", "bolts": "TB",
    "maple leafs": "TOR", "leafs": "TOR", "canucks": "VAN",
    "golden knights": "VGK", "knights": "VGK",
    "capitals": "WSH", "caps": "WSH", "jets": "WPG"
  }
};

// Short name aliases (abbreviations and city names)
const SHORT_NAMES = {
  // MLB
  "ari": ["mlb"], "atl": ["mlb","nba","nfl"], "bal": ["mlb","nfl"], "bos": ["mlb","nba","nhl"],
  "chc": ["mlb"], "cws": ["mlb"], "cin": ["mlb"], "cle": ["mlb","nba","nfl"],
  "col": ["mlb","nhl"], "det": ["mlb","nba","nhl"], "hou": ["mlb","nfl","nba"],
  "kc": ["mlb","nfl"], "laa": ["mlb"], "lad": ["mlb"], "mia": ["mlb","nba","nfl"],
  "mil": ["mlb"], "min": ["mlb","nba","nfl"], "nym": ["mlb"], "nyy": ["mlb"],
  "oak": ["mlb"], "phi": ["mlb","nba","nfl","nhl"], "pit": ["mlb","nfl","nhl"],
  "sd": ["mlb"], "sf": ["mlb","nfl"], "sea": ["mlb","nfl"], "stl": ["mlb","nhl"],
  "tb": ["mlb","nhl"], "tex": ["mlb"], "tor": ["mlb","nhl"], "wsh": ["mlb","nba","nfl","nhl"],
  // NBA extras
  "bkn": ["nba"], "cha": ["nba"], "chi": ["nba","nfl"], "dal": ["nba","nfl"],
  "den": ["nba","nfl"], "gsw": ["nba"], "ind": ["nba","nfl"], "lac": ["nba","nfl"],
  "lal": ["nba"], "mem": ["nba"], "mil": ["nba"], "no": ["nba","nfl"],
  "ny": ["nba"], "okc": ["nba"], "orl": ["nba"], "phx": ["nba"],
  "por": ["nba"], "sac": ["nba"], "sa": ["nba"], "utah": ["nba"],
  // NFL extras
  "buf": ["nfl"], "car": ["nfl","nhl"], "gb": ["nfl"], "jax": ["nfl"],
  "lv": ["nfl"], "lar": ["nfl"], "ne": ["nfl"], "nyg": ["nfl"],
  "nyj": ["nfl"], "ten": ["nfl"],
  // NHL extras
  "ana": ["nhl"], "buf": ["nhl"], "cgy": ["nhl"], "cbj": ["nhl"],
  "edm": ["nhl"], "fla": ["nhl"], "lak": ["nhl"], "mtl": ["nhl"],
  "nsh": ["nhl"], "njd": ["nhl"], "nyi": ["nhl"], "nyr": ["nhl"],
  "ott": ["nhl"], "van": ["nhl"], "vgk": ["nhl"], "wpg": ["nhl"]
};

// ─── ENTRY POINT ─────────────────────────────────────────────
function doPost(e) {
  try {
    const body = JSON.parse(e.postData.contents);
    if (body.sender_type === "bot") return respond("ok");
    const text = (body.text || "").trim().toLowerCase();
    if (!text) return respond("ok");
    const reply = getReply(text);
    if (reply) sendGroupMeMessage(reply);
  } catch (err) {
    Logger.log("doPost ERROR: " + err.toString());
    try { sendGroupMeMessage("Something went wrong. Try again."); } catch(e2) {}
  }
  return respond("ok");
}

function respond(msg) { return ContentService.createTextOutput(msg); }

// ─── TEST ─────────────────────────────────────────────────────
function testScore() {
  Logger.log(getReply("mets"));
  Logger.log(getReply("mlb scores"));
  Logger.log(getReply("nba standings"));
  Logger.log(getReply("chiefs next game"));
  Logger.log(getReply("lakers standings"));
}

// ─── MAIN ROUTER ─────────────────────────────────────────────
function getReply(text) {
  const wantsScores    = text.includes("scores") || text.includes("all games") || text.includes("games today");
  const wantsStandings = text.includes("standings") || text.includes("standing") || text.includes("record");
  const wantsNext      = text.includes("next game") || text.includes("next up") || text.includes("schedule");

  const leagueOnly = detectLeagueOnly(text); // "mlb","nba","nhl","nfl" or null

  // "mlb scores", "nba standings", "nfl scores" etc — no specific team
  if (leagueOnly) {
    if (wantsStandings) return getAllStandings(leagueOnly);
    if (wantsScores || (!wantsNext && !wantsStandings)) return getAllScores(leagueOnly);
  }

  // Team-specific
  const match = detectTeam(text);
  if (!match) return null; // Unknown — stay silent

  const { league, abbr, name } = match;

  if (wantsStandings) return getTeamStandings(league, abbr, name);
  if (wantsNext)      return getNextGame(league, abbr, name);
  return getScore(league, abbr, name);
}

// ─── LEAGUE DETECTION ────────────────────────────────────────
function detectLeagueOnly(text) {
  // Only return a league if NO team name is matched and text has a league keyword
  const hasTeam = !!detectTeam(text);
  if (hasTeam) return null;
  if (text.includes("mlb") || text.includes("baseball")) return "mlb";
  if (text.includes("nba") || text.includes("basketball")) return "nba";
  if (text.includes("nhl") || text.includes("hockey")) return "nhl";
  if (text.includes("nfl") || text.includes("football")) return "nfl";
  return null;
}

// ─── TEAM DETECTION ──────────────────────────────────────────
function detectTeam(text) {
  const isMLB = text.includes("baseball") || text.includes("mlb");
  const isNHL = text.includes("hockey") || text.includes("nhl");
  const isNFL = text.includes("football") || text.includes("nfl");
  const isNBA = text.includes("basketball") || text.includes("nba");
  const hasSportHint = isMLB || isNHL || isNFL || isNBA;

  const order = [
    { league: "nba", hint: isNBA },
    { league: "mlb", hint: isMLB },
    { league: "nhl", hint: isNHL },
    { league: "nfl", hint: isNFL }
  ];

  // Check full team names first (with sport hint)
  if (hasSportHint) {
    for (const { league, hint } of order) {
      if (!hint) continue;
      for (const [name, abbr] of Object.entries(TEAMS[league])) {
        if (text.includes(name)) return { league, abbr, name: cap(name) };
      }
    }
  }

  // Check full team names without hint
  for (const { league } of order) {
    for (const [name, abbr] of Object.entries(TEAMS[league])) {
      if (text.includes(name)) return { league, abbr, name: cap(name) };
    }
  }

  // Check short abbreviations (e.g. "nym", "gsw", "kc")
  const words = text.split(/\s+/);
  for (const word of words) {
    const leagues = SHORT_NAMES[word];
    if (leagues) {
      // If sport hint narrows it down
      for (const lg of leagues) {
        if ((lg === "mlb" && isMLB) || (lg === "nba" && isNBA) ||
            (lg === "nhl" && isNHL) || (lg === "nfl" && isNFL)) {
          return { league: lg, abbr: word.toUpperCase(), name: word.toUpperCase() };
        }
      }
      // No hint — use first league
      const lg = leagues[0];
      return { league: lg, abbr: word.toUpperCase(), name: word.toUpperCase() };
    }
  }

  return null;
}

// ─── GET SINGLE TEAM SCORE ───────────────────────────────────
function getScore(league, abbr, displayName) {
  try {
    const data = apiGet(ESPN[league].scoreboard);
    const events = (data && data.events) ? data.events : [];
    const game = findTeamGame(events, abbr);

    if (!game) return getNextGame(league, abbr, displayName);
    return formatGame(league.toUpperCase(), game);
  } catch (err) {
    Logger.log("getScore ERROR: " + err);
    return "Could not load the " + displayName + " score. Try again in a moment.";
  }
}

// ─── GET ALL SCORES FOR A LEAGUE ─────────────────────────────
function getAllScores(league) {
  try {
    const data = apiGet(ESPN[league].scoreboard);
    const events = (data && data.events) ? data.events : [];
    if (!events.length) return league.toUpperCase() + ": No games today.";

    const today = Utilities.formatDate(new Date(), "America/New_York", "MMM d");
    const lines = [league.toUpperCase() + " Scores — " + today];
    events.forEach(function(game) {
      lines.push(formatGame(null, game));
    });
    return lines.join("\n");
  } catch (err) {
    Logger.log("getAllScores ERROR: " + err);
    return "Could not load " + league.toUpperCase() + " scores. Try again in a moment.";
  }
}

// ─── GET NEXT GAME ────────────────────────────────────────────
function getNextGame(league, abbr, displayName) {
  try {
    for (var i = 1; i <= 14; i++) {
      const d = new Date();
      d.setDate(d.getDate() + i);
      const dateStr = Utilities.formatDate(d, "America/New_York", "yyyyMMdd");
      const data = apiGet(ESPN[league].scoreboard + "?dates=" + dateStr);
      const events = (data && data.events) ? data.events : [];
      const game = findTeamGame(events, abbr);
      if (game) {
        const comp = game.competitions[0];
        const home = comp.competitors.find(function(c) { return c.homeAway === "home"; });
        const away = comp.competitors.find(function(c) { return c.homeAway === "away"; });
        const isHome = home.team.abbreviation === abbr;
        const opponent = isHome ? away.team.abbreviation : home.team.abbreviation;
        const venue = isHome ? "vs" : "@";
        const date = new Date(game.date);
        const opts = { timeZone: "America/New_York", weekday: "short", month: "short", day: "numeric", hour: "numeric", minute: "2-digit", hour12: true };
        const dateFormatted = date.toLocaleString("en-US", opts) + " ET";
        return league.toUpperCase() + ": " + displayName + " next game\n" + dateFormatted + " " + venue + " " + opponent;
      }
    }
    return league.toUpperCase() + ": No upcoming games found for " + displayName + " in the next 14 days.";
  } catch (err) {
    Logger.log("getNextGame ERROR: " + err);
    return "Could not load next game for " + displayName + ". Try again in a moment.";
  }
}

// ─── GET TEAM STANDINGS ───────────────────────────────────────
function getTeamStandings(league, abbr, displayName) {
  try {
    const data = apiGet(ESPN[league].standings);
    const groups = data.children || data.standings || [];

    var teamEntry = null;
    var divisionName = "";

    // Walk through conferences/divisions to find the team
    groups.forEach(function(conf) {
      var divisions = conf.children || conf.standings || [];
      if (!Array.isArray(divisions)) divisions = [divisions];
      divisions.forEach(function(div) {
        var entries = (div.standings && div.standings.entries) ? div.standings.entries : (div.entries || []);
        entries.forEach(function(entry) {
          if (entry.team && entry.team.abbreviation === abbr) {
            teamEntry = entry;
            divisionName = div.name || conf.name || "";
          }
        });
      });
    });

    if (!teamEntry) return league.toUpperCase() + ": Could not find standings for " + displayName + ".";

    const stats = {};
    (teamEntry.stats || []).forEach(function(s) { stats[s.name] = s.displayValue; });

    const w   = stats["wins"] || stats["w"] || "?";
    const l   = stats["losses"] || stats["l"] || "?";
    const pct = stats["winPercent"] || stats["pct"] || "";
    const gb  = stats["gamesBehind"] || stats["gb"] || "";
    const streak = stats["streak"] || "";

    let line = league.toUpperCase() + ": " + displayName + "\n";
    line += w + "-" + l;
    if (pct) line += " (" + pct + ")";
    if (gb && gb !== "0" && gb !== "-") line += ", " + gb + " GB";
    if (streak) line += ", Streak: " + streak;
    if (divisionName) line += "\n" + divisionName;
    return line;

  } catch (err) {
    Logger.log("getTeamStandings ERROR: " + err);
    return "Could not load standings for " + displayName + ". Try again in a moment.";
  }
}

// ─── GET ALL STANDINGS FOR A LEAGUE ──────────────────────────
function getAllStandings(league) {
  try {
    const data = apiGet(ESPN[league].standings);
    const groups = data.children || data.standings || [];
    const lines = [league.toUpperCase() + " Standings"];

    groups.forEach(function(conf) {
      var divisions = conf.children || [];
      if (!divisions.length) divisions = [conf];
      divisions.forEach(function(div) {
        var entries = (div.standings && div.standings.entries) ? div.standings.entries : (div.entries || []);
        if (!entries.length) return;
        lines.push(div.name || conf.name || "");
        entries.forEach(function(entry) {
          if (!entry.team) return;
          const stats = {};
          (entry.stats || []).forEach(function(s) { stats[s.name] = s.displayValue; });
          const w = stats["wins"] || stats["w"] || "?";
          const l = stats["losses"] || stats["l"] || "?";
          const gb = stats["gamesBehind"] || stats["gb"] || "";
          let row = entry.team.abbreviation + " " + w + "-" + l;
          if (gb && gb !== "0" && gb !== "-") row += " (" + gb + " GB)";
          lines.push(row);
        });
      });
    });

    return lines.join("\n");
  } catch (err) {
    Logger.log("getAllStandings ERROR: " + err);
    return "Could not load " + league.toUpperCase() + " standings. Try again in a moment.";
  }
}

// ─── FORMAT A SINGLE GAME ────────────────────────────────────
function formatGame(leagueLabel, game) {
  const comp = game.competitions[0];
  const home = comp.competitors.find(function(c) { return c.homeAway === "home"; });
  const away = comp.competitors.find(function(c) { return c.homeAway === "away"; });

  const homeAbbr  = home.team.abbreviation;
  const awayAbbr  = away.team.abbreviation;
  const homeScore = (home.score !== undefined && home.score !== "") ? home.score : "-";
  const awayScore = (away.score !== undefined && away.score !== "") ? away.score : "-";

  const state       = game.status.type.state;
  const shortDetail = game.status.type.shortDetail || game.status.type.detail || "";

  let statusLine = "";
  if (state === "post") {
    statusLine = shortDetail; // "Final", "Final/OT"
  } else if (state === "in") {
    statusLine = shortDetail; // "7:42 - 2nd Qtr", "Bot 6th"
  } else {
    // Scheduled — show date/time
    const date = new Date(game.date);
    const opts = { timeZone: "America/New_York", month: "short", day: "numeric", hour: "numeric", minute: "2-digit", hour12: true };
    statusLine = date.toLocaleString("en-US", opts) + " ET";
  }

  const scoreLine = awayAbbr + " " + awayScore + ", " + homeAbbr + " " + homeScore;
  const prefix = leagueLabel ? leagueLabel + ": " : "";
  return prefix + scoreLine + "\n" + statusLine;
}

// ─── HELPERS ─────────────────────────────────────────────────
function findTeamGame(events, abbr) {
  return events.find(function(ev) {
    return ev.competitions && ev.competitions[0] &&
      ev.competitions[0].competitors.some(function(c) {
        return c.team && c.team.abbreviation === abbr;
      });
  }) || null;
}

function apiGet(url) {
  Logger.log("GET: " + url);
  const resp = UrlFetchApp.fetch(url, { muteHttpExceptions: true });
  const code = resp.getResponseCode();
  const body = resp.getContentText();
  Logger.log("Response [" + code + "]: " + body.substring(0, 300));
  if (code !== 200) throw new Error("HTTP " + code);
  return JSON.parse(body);
}

function sendGroupMeMessage(text) {
  UrlFetchApp.fetch("https://api.groupme.com/v3/bots/post", {
    method: "post",
    contentType: "application/json",
    payload: JSON.stringify({ bot_id: GROUPME_BOT_ID, text: text }),
    muteHttpExceptions: true
  });
}

function cap(str) {
  return str.replace(/\b\w/g, function(c) { return c.toUpperCase(); });
}

