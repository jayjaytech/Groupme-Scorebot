var GROUPME_BOT_ID = "your_bot_id_here";

// ESPN URLs
var ESPN = {
  mlb: { scoreboard: "https://site.api.espn.com/apis/site/v2/sports/baseball/mlb/scoreboard", standings: "https://site.api.espn.com/apis/v2/sports/baseball/mlb/standings", sport: "baseball/mlb" },
  nba: { scoreboard: "https://site.api.espn.com/apis/site/v2/sports/basketball/nba/scoreboard", standings: "https://site.api.espn.com/apis/v2/sports/basketball/nba/standings", sport: "basketball/nba" },
  nhl: { scoreboard: "https://site.api.espn.com/apis/site/v2/sports/hockey/nhl/scoreboard", standings: "https://site.api.espn.com/apis/v2/sports/hockey/nhl/standings", sport: "hockey/nhl" },
  nfl: { scoreboard: "https://site.api.espn.com/apis/site/v2/sports/football/nfl/scoreboard", standings: "https://site.api.espn.com/apis/v2/sports/football/nfl/standings", sport: "football/nfl" }
};

// Team names map to the abbreviation this bot uses internally. A few NHL teams
// have ESPN display codes that differ, so matching goes through teamMatches().
var TEAMS = {
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
    "athletics": "OAK", "a's": "OAK", "phillies": "PHI", "pirates": "PIT",
    "padres": "SD", "giants": "SF", "mariners": "SEA", "cardinals": "STL",
    "rays": "TB", "rangers": "TEX", "blue jays": "TOR", "jays": "TOR",
    "nationals": "WSH", "nats": "WSH"
  },
  nhl: {
    "ducks": "ANA", "bruins": "BOS", "sabres": "BUF", "flames": "CGY",
    "hurricanes": "CAR", "canes": "CAR", "blackhawks": "CHI",
    "avalanche": "COL", "avs": "COL", "blue jackets": "CBJ",
    "stars": "DAL", "red wings": "DET", "oilers": "EDM", "panthers": "FLA",
    "kings": "LAK", "wild": "MIN", "canadiens": "MTL", "habs": "MTL",
    "predators": "NSH", "preds": "NSH", "devils": "NJD", "islanders": "NYI",
    "rangers": "NYR", "senators": "OTT", "flyers": "PHI", "penguins": "PIT",
    "pens": "PIT", "kraken": "SEA", "sharks": "SJS", "blues": "STL",
    "lightning": "TB", "bolts": "TB", "maple leafs": "TOR", "leafs": "TOR",
    "mammoth": "UTA", "utah": "UTA", "canucks": "VAN",
    "golden knights": "VGK", "knights": "VGK", "capitals": "WSH",
    "caps": "WSH", "jets": "WPG"
  }
};

var SHORT_NAMES = {
  "ari": ["mlb"], "atl": ["mlb", "nba", "nfl"], "bal": ["mlb", "nfl"], "bos": ["mlb", "nba", "nhl"],
  "chc": ["mlb"], "cws": ["mlb"], "cin": ["mlb"], "cle": ["mlb", "nba", "nfl"],
  "col": ["mlb", "nhl"], "det": ["mlb", "nba", "nhl"], "hou": ["mlb", "nfl", "nba"],
  "kc": ["mlb", "nfl"], "laa": ["mlb"], "lad": ["mlb"], "mia": ["mlb", "nba", "nfl"],
  "mil": ["mlb"], "min": ["mlb", "nba", "nfl"], "nym": ["mlb"], "nyy": ["mlb"],
  "oak": ["mlb"], "phi": ["mlb", "nba", "nfl", "nhl"], "pit": ["mlb", "nfl", "nhl"],
  "sd": ["mlb"], "sea": ["mlb", "nfl", "nhl"], "stl": ["mlb", "nhl"], "tb": ["mlb", "nhl"], "tex": ["mlb"],
  "tor": ["mlb", "nhl"], "wsh": ["mlb", "nba", "nfl", "nhl"],
  "bkn": ["nba"], "cha": ["nba"], "chi": ["nba", "nfl"], "dal": ["nba", "nfl", "nhl"],
  "den": ["nba", "nfl"], "gsw": ["nba"], "ind": ["nba", "nfl"], "lac": ["nba", "nfl"],
  "lal": ["nba"], "mem": ["nba"], "no": ["nba", "nfl"], "okc": ["nba"],
  "orl": ["nba"], "phx": ["nba"], "por": ["nba"], "sac": ["nba"], "sa": ["nba"], "utah": ["nba", "nhl"],
  "buf": ["nfl", "nhl"], "car": ["nfl", "nhl"], "gb": ["nfl"], "jax": ["nfl"],
  "lv": ["nfl"], "lar": ["nfl"], "ne": ["nfl"], "nyg": ["nfl"], "nyj": ["nfl"], "ten": ["nfl"],
  "ana": ["nhl"], "cgy": ["nhl"], "cbj": ["nhl"], "edm": ["nhl"], "fla": ["nhl"],
  "la": ["nhl"], "lak": ["nhl"], "mtl": ["nhl"], "nsh": ["nhl"], "nj": ["nhl"], "njd": ["nhl"],
  "nyi": ["nhl"], "nyr": ["nhl"], "ott": ["nhl"], "sjs": ["nhl"], "sj": ["nhl"],
  "uta": ["nhl"], "van": ["nhl"], "vgk": ["nhl"], "wpg": ["nhl"]
};

var SHORT_NAME_ABBR = {
  nhl: { la: "LAK", lak: "LAK", nj: "NJD", njd: "NJD", sj: "SJS", sjs: "SJS", uta: "UTA", utah: "UTA" }
};

var DISPLAY_NAMES = {
  mlb: {
    ARI: "Diamondbacks", ATL: "Braves", BAL: "Orioles", BOS: "Red Sox", CHC: "Cubs",
    CWS: "White Sox", CIN: "Reds", CLE: "Guardians", COL: "Rockies", DET: "Tigers",
    HOU: "Astros", KC: "Royals", LAA: "Angels", LAD: "Dodgers", MIA: "Marlins",
    MIL: "Brewers", MIN: "Twins", NYM: "Mets", NYY: "Yankees", OAK: "Athletics",
    PHI: "Phillies", PIT: "Pirates", SD: "Padres", SF: "Giants", SEA: "Mariners",
    STL: "Cardinals", TB: "Rays", TEX: "Rangers", TOR: "Blue Jays", WSH: "Nationals"
  },
  nba: {
    ATL: "Hawks", BOS: "Celtics", BKN: "Nets", CHA: "Hornets", CHI: "Bulls",
    CLE: "Cavaliers", DAL: "Mavericks", DEN: "Nuggets", DET: "Pistons", GSW: "Warriors",
    HOU: "Rockets", IND: "Pacers", LAC: "Clippers", LAL: "Lakers", MEM: "Grizzlies",
    MIA: "Heat", MIL: "Bucks", MIN: "Timberwolves", NO: "Pelicans", NY: "Knicks",
    OKC: "Thunder", ORL: "Magic", PHI: "76ers", PHX: "Suns", POR: "Trail Blazers",
    SAC: "Kings", SA: "Spurs", TOR: "Raptors", UTAH: "Jazz", WSH: "Wizards"
  },
  nfl: {
    ARI: "Cardinals", ATL: "Falcons", BAL: "Ravens", BUF: "Bills", CAR: "Panthers",
    CHI: "Bears", CIN: "Bengals", CLE: "Browns", DAL: "Cowboys", DEN: "Broncos",
    DET: "Lions", GB: "Packers", HOU: "Texans", IND: "Colts", JAX: "Jaguars",
    KC: "Chiefs", LV: "Raiders", LAC: "Chargers", LAR: "Rams", MIA: "Dolphins",
    MIN: "Vikings", NE: "Patriots", NO: "Saints", NYG: "Giants", NYJ: "Jets",
    PHI: "Eagles", PIT: "Steelers", SF: "49ers", SEA: "Seahawks", TB: "Buccaneers",
    TEN: "Titans", WSH: "Commanders"
  },
  nhl: {
    ANA: "Ducks", BOS: "Bruins", BUF: "Sabres", CGY: "Flames", CAR: "Hurricanes",
    CHI: "Blackhawks", COL: "Avalanche", CBJ: "Blue Jackets", DAL: "Stars",
    DET: "Red Wings", EDM: "Oilers", FLA: "Panthers", LAK: "Kings", MIN: "Wild",
    MTL: "Canadiens", NSH: "Predators", NJD: "Devils", NYI: "Islanders",
    NYR: "Rangers", OTT: "Senators", PHI: "Flyers", PIT: "Penguins", SEA: "Kraken",
    SJS: "Sharks", STL: "Blues", TB: "Lightning", TOR: "Maple Leafs", UTA: "Mammoth",
    VAN: "Canucks", VGK: "Golden Knights", WSH: "Capitals", WPG: "Jets"
  }
};

var ESPN_ABBR_ALIASES = {
  nhl: {
    LAK: ["LA"],
    NJD: ["NJ"],
    SJS: ["SJ"]
  }
};

var ESPN_TEAM_CODES = {
  nhl: {
    LAK: "la",
    NJD: "nj",
    SJS: "sj"
  }
};

var ESPN_TEAM_IDS = {
  mlb: {
    ARI: 109, ATL: 15, BAL: 1, BOS: 2, CHC: 16, CWS: 4, CIN: 17, CLE: 5,
    COL: 27, DET: 6, HOU: 18, KC: 7, LAA: 3, LAD: 19, MIA: 28, MIL: 8,
    MIN: 9, NYM: 121, NYY: 10, OAK: 11, PHI: 22, PIT: 23, SD: 25, SF: 26,
    SEA: 12, STL: 24, TB: 30, TEX: 13, TOR: 14, WSH: 20
  },
  nba: {
    ATL: 1, BOS: 2, BKN: 17, CHA: 30, CHI: 4, CLE: 5, DAL: 6, DEN: 7,
    DET: 8, GSW: 9, HOU: 10, IND: 11, LAC: 12, LAL: 13, MEM: 29, MIA: 14,
    MIL: 15, MIN: 16, NO: 3, NY: 18, OKC: 25, ORL: 19, PHI: 20, PHX: 21,
    POR: 22, SAC: 23, SA: 24, TOR: 28, UTAH: 26, WSH: 27
  },
  nfl: {
    ARI: 22, ATL: 1, BAL: 33, BUF: 2, CAR: 29, CHI: 3, CIN: 4, CLE: 5,
    DAL: 6, DEN: 7, DET: 8, GB: 9, HOU: 34, IND: 11, JAX: 30, KC: 12,
    LV: 13, LAC: 24, LAR: 14, MIA: 15, MIN: 16, NE: 17, NO: 18, NYG: 19,
    NYJ: 20, PHI: 21, PIT: 23, SF: 25, SEA: 26, TB: 27, TEN: 10, WSH: 28
  },
  // NHL numeric IDs are intentionally omitted. ESPN's team-code schedule
  // endpoint plus scoreboard fallback is safer than stale hand-maintained IDs.
  nhl: {}
};

var AMBIGUOUS = {
  "sf": "Did you mean:\nSF Giants (MLB) - type: giants mlb\nSF 49ers (NFL) - type: 49ers",
  "ny": "Did you mean:\nKnicks (NBA) - type: knicks\nGiants (NFL) - type: giants nfl\nJets (NFL) - type: jets nfl\nYankees (MLB) - type: yankees\nMets (MLB) - type: mets",
  "sea": "Did you mean:\nMariners (MLB) - type: mariners\nSeahawks (NFL) - type: seahawks\nKraken (NHL) - type: kraken",
  "utah": "Did you mean:\nUtah Jazz (NBA) - type: jazz\nUtah Mammoth (NHL) - type: mammoth",
  "giants": "Did you mean:\nSF Giants (MLB) - type: giants mlb\nNY Giants (NFL) - type: giants nfl",
  "rangers": "Did you mean:\nTexas Rangers (MLB) - type: rangers mlb\nNY Rangers (NHL) - type: rangers nhl",
  "kings": "Did you mean:\nSacramento Kings (NBA) - type: kings nba\nLA Kings (NHL) - type: kings nhl",
  "panthers": "Did you mean:\nCarolina Panthers (NFL) - type: panthers nfl\nFlorida Panthers (NHL) - type: panthers nhl",
  "jets": "Did you mean:\nNY Jets (NFL) - type: jets nfl\nWinnipeg Jets (NHL) - type: jets nhl",
  "cardinals": "Did you mean:\nArizona Cardinals (NFL) - type: cardinals nfl\nSt. Louis Cardinals (MLB) - type: cardinals mlb"
};

function doPost(e) {
  try {
    var body = JSON.parse(e.postData.contents);
    if (body.sender_type === "bot") return respond("ok");

    var cache = CacheService.getScriptCache();
    var msgId = body.id ? String(body.id) : null;
    if (msgId) {
      if (cache.get("msg_" + msgId)) return respond("duplicate");
      cache.put("msg_" + msgId, "1", 300);
    }

    var text = (body.text || "")
      .toLowerCase()
      .replace(/[\u2018\u2019\u201A\u201B]/g, "'")
      .replace(/[\u201C\u201D\u201E\u201F]/g, '"')
      .trim();

    if (!text) return respond("ok");

    var reply = getReply(text);
    if (reply) sendGroupMeMessage(reply);
  } catch (err) {
    Logger.log("doPost ERROR: " + err);
    try { sendGroupMeMessage("Something went wrong. Try again."); } catch (e2) {}
  }
  return respond("ok");
}

function respond(msg) {
  return ContentService.createTextOutput(msg);
}

function testScore() {
  Logger.log(getReply("mets 5/20"));
  Logger.log(getReply("yankees 3/19/23"));
  Logger.log(getReply("mlb scores 5/1"));
  Logger.log(getReply("chiefs 9/7/25"));
  Logger.log(getReply("lakers next game"));
  Logger.log(getReply("sf"));
  Logger.log(getReply("giants"));
  Logger.log(getReply("kings nhl"));
  Logger.log(getReply("sharks"));
  Logger.log(getReply("kraken"));
  Logger.log(getReply("mammoth"));
  Logger.log(getReply("mlb standings"));
  Logger.log(getReply("trail blazers"));
  Logger.log(getReply("red sox"));
  Logger.log(getReply("mets 2/31"));
}

function parseDate(text) {
  var match = text.match(/\b(\d{1,2})\/(\d{1,2})(?:\/(\d{2,4}))?\b/);
  if (!match) return null;

  var month = parseInt(match[1], 10);
  var day = parseInt(match[2], 10);
  var year = match[3] ? parseInt(match[3], 10) : null;

  if (month < 1 || month > 12 || day < 1 || day > 31) return null;

  var now = new Date();
  var todayMidnight = new Date(now.getFullYear(), now.getMonth(), now.getDate());

  if (!year) {
    year = now.getFullYear();
    var currentMonth = now.getMonth() + 1;
    if (month < currentMonth) year += 1;
  } else if (year < 100) {
    year += year < 50 ? 2000 : 1900;
  }

  var d = new Date(year, month - 1, day);
  if (d.getFullYear() !== year || d.getMonth() !== month - 1 || d.getDate() !== day) {
    return null;
  }

  var isFuture = d > todayMidnight;
  var isToday = d.getTime() === todayMidnight.getTime();

  var mm = String(month).padStart(2, "0");
  var dd = String(day).padStart(2, "0");
  var dateStr = "" + year + mm + dd;
  var label = d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });

  return { dateStr: dateStr, label: label, isFuture: isFuture, isToday: isToday };
}

function getReply(text) {
  var wantsScores = text.includes("score") || text.includes("scores") || text.includes("all games") || text.includes("games today");
  var wantsStandings = text.includes("standings") || text.includes("standing") || text.includes("record");
  var wantsNext = text.includes("next game") || text.includes("next up") || text.includes("schedule");

  var parsedDate = parseDate(text);
  var match = detectTeam(text);
  var leagueOnly = detectLeagueOnly(text, match);

  if (leagueOnly) {
    if (wantsStandings) return getAllStandings(leagueOnly);
    if (parsedDate) return getAllScoresOnDate(leagueOnly, parsedDate);
    return getAllScores(leagueOnly);
  }

  if (!match) return null;
  if (match.ambiguous) return match.ambiguous;

  var league = match.league;
  var abbr = match.abbr;
  var name = match.name;

  if (wantsStandings) return getTeamStandings(league, abbr, name);
  if (wantsNext) return getNextGame(league, abbr, name);
  if (parsedDate) return getScoreOnDate(league, abbr, name, parsedDate);
  return getScore(league, abbr, name);
}

function detectLeagueOnly(text, team) {
  if (team && !team.ambiguous) return null;
  if (text.includes("mlb") || text.includes("baseball")) return "mlb";
  if (text.includes("nba") || text.includes("basketball")) return "nba";
  if (text.includes("nhl") || text.includes("hockey")) return "nhl";
  if (text.includes("nfl") || text.includes("football")) return "nfl";
  return null;
}

function detectTeam(text) {
  var isMLB = text.includes("baseball") || text.includes("mlb");
  var isNHL = text.includes("hockey") || text.includes("nhl");
  var isNFL = text.includes("football") || text.includes("nfl");
  var isNBA = text.includes("basketball") || text.includes("nba");
  var hasSportHint = isMLB || isNHL || isNFL || isNBA;

  var order = [
    { league: "nba", hint: isNBA },
    { league: "mlb", hint: isMLB },
    { league: "nhl", hint: isNHL },
    { league: "nfl", hint: isNFL }
  ];

  if (!hasSportHint) {
    for (var phrase in AMBIGUOUS) {
      if (makeRegex(phrase).test(text)) return { ambiguous: AMBIGUOUS[phrase] };
    }
  }

  if (hasSportHint) {
    for (var oi = 0; oi < order.length; oi++) {
      var item = order[oi];
      if (!item.hint) continue;
      var found = findTeamNameInLeague(text, item.league);
      if (found) return found;
    }
  }

  if (!hasSportHint) {
    for (var oi2 = 0; oi2 < order.length; oi2++) {
      var item = order[oi2];
      var found = findTeamNameInLeague(text, item.league);
      if (found) return found;
    }
  }

  var cleanText = text.replace(/\d{1,2}\/\d{1,2}(?:\/\d{2,4})?/g, "").trim();
  var words = cleanText ? cleanText.split(/\s+/) : [];
  for (var wi = 0; wi < words.length; wi++) {
    var word = words[wi];
    var leagues = SHORT_NAMES[word];
    if (!leagues) continue;

    for (var li = 0; li < leagues.length; li++) {
      var lg = leagues[li];
      if ((lg === "mlb" && isMLB) || (lg === "nba" && isNBA) ||
          (lg === "nhl" && isNHL) || (lg === "nfl" && isNFL)) {
        var abbr = shortWordToAbbr(lg, word);
        return { league: lg, abbr: abbr, name: displayNameFromAbbr(lg, abbr) };
      }
    }

    var fallbackLeague = leagues[0];
    var fallbackAbbr = shortWordToAbbr(fallbackLeague, word);
    return { league: fallbackLeague, abbr: fallbackAbbr, name: displayNameFromAbbr(fallbackLeague, fallbackAbbr) };
  }

  return null;
}

function findTeamNameInLeague(text, league) {
  for (var name in TEAMS[league]) {
    if (makeRegex(name).test(text)) {
      var abbr = TEAMS[league][name];
      return { league: league, abbr: abbr, name: displayNameFromAbbr(league, abbr) };
    }
  }
  return null;
}

function makeRegex(name) {
  var escaped = name.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  var spaced = escaped.replace(/\s+/g, "\\s+");
  return new RegExp("\\b" + spaced + "\\b", "i");
}

function shortWordToAbbr(league, word) {
  var leagueAliases = SHORT_NAME_ABBR[league] || {};
  return leagueAliases[word] || word.toUpperCase();
}

function displayNameFromAbbr(league, abbr) {
  var names = DISPLAY_NAMES[league] || {};
  return names[abbr] || abbr;
}

function getTeamsFromGame(game) {
  if (!game || !game.competitions || !game.competitions.length) return null;
  var comp = game.competitions[0];
  if (!comp.competitors || !comp.competitors.length) return null;
  var home = comp.competitors.find(function(c) { return c.homeAway === "home"; });
  var away = comp.competitors.find(function(c) { return c.homeAway === "away"; });
  if (!home || !away || !home.team || !away.team) return null;
  return { comp: comp, home: home, away: away };
}

function getScore(league, abbr, displayName) {
  try {
    var data = apiGet(ESPN[league].scoreboard);
    var events = data && data.events ? data.events : [];
    var games = findTeamGames(events, league, abbr);
    if (!games.length) return getNextGame(league, abbr, displayName);
    return games.map(function(game) {
      return formatGame(league.toUpperCase(), game);
    }).join("\n\n");
  } catch (err) {
    Logger.log("getScore ERROR: " + err);
    return "Could not load the " + displayName + " score. Try again in a moment.";
  }
}

function getScoreOnDate(league, abbr, displayName, parsedDate) {
  try {
    var data = apiGet(ESPN[league].scoreboard + "?dates=" + parsedDate.dateStr);
    var events = data && data.events ? data.events : [];
    var games = findTeamGames(events, league, abbr);
    if (!games.length) {
      if (parsedDate.isFuture) return league.toUpperCase() + ": No " + displayName + " game scheduled for " + parsedDate.label + ".";
      return league.toUpperCase() + ": No " + displayName + " game found on " + parsedDate.label + ".";
    }
    var header = league.toUpperCase() + ": " + displayName + " - " + parsedDate.label;
    return header + "\n" + games.map(function(game) {
      return formatGame(null, game);
    }).join("\n\n");
  } catch (err) {
    Logger.log("getScoreOnDate ERROR: " + err);
    return "Could not load the " + displayName + " score for " + parsedDate.label + ". Try again in a moment.";
  }
}

function getAllScores(league) {
  try {
    var todayDateStr = Utilities.formatDate(new Date(), "America/New_York", "yyyyMMdd");
    var todayLabel = Utilities.formatDate(new Date(), "America/New_York", "MMM d, yyyy");
    var data = apiGet(ESPN[league].scoreboard + "?dates=" + todayDateStr);
    var events = data && data.events ? data.events : [];
    if (!events.length) return league.toUpperCase() + ": No games today.";
    var lines = [league.toUpperCase() + " Scores - " + todayLabel];
    events.forEach(function(game) { lines.push(formatGame(null, game)); });
    return lines.join("\n");
  } catch (err) {
    Logger.log("getAllScores ERROR: " + err);
    return "Could not load " + league.toUpperCase() + " scores. Try again in a moment.";
  }
}

function getAllScoresOnDate(league, parsedDate) {
  try {
    var data = apiGet(ESPN[league].scoreboard + "?dates=" + parsedDate.dateStr);
    var events = data && data.events ? data.events : [];
    if (!events.length) {
      if (parsedDate.isFuture) return league.toUpperCase() + ": No games scheduled for " + parsedDate.label + ".";
      return league.toUpperCase() + ": No games found on " + parsedDate.label + ".";
    }
    var lines = [league.toUpperCase() + " - " + parsedDate.label];
    events.forEach(function(game) { lines.push(formatGame(null, game)); });
    return lines.join("\n");
  } catch (err) {
    Logger.log("getAllScoresOnDate ERROR: " + err);
    return "Could not load " + league.toUpperCase() + " scores for " + parsedDate.label + ". Try again in a moment.";
  }
}

function getNextGame(league, abbr, displayName) {
  try {
    var scheduleEvents = getScheduleEvents(league, abbr);
    var now = new Date();
    for (var i = 0; i < scheduleEvents.length; i++) {
      var ev = scheduleEvents[i];
      var evDate = new Date(ev.date);
      if (evDate <= now) continue;
      var teams = getTeamsFromGame(ev);
      if (!teams) continue;
      if (!teamMatches(league, teams.home.team.abbreviation, abbr) && !teamMatches(league, teams.away.team.abbreviation, abbr)) continue;
      return formatNextGameLine(league, abbr, displayName, ev, teams);
    }

    for (var j = 1; j <= 10; j++) {
      var d = new Date();
      d.setDate(d.getDate() + j);
      var dateStr = Utilities.formatDate(d, "America/New_York", "yyyyMMdd");
      var data = apiGet(ESPN[league].scoreboard + "?dates=" + dateStr);
      var events = data && data.events ? data.events : [];
      var game = findTeamGame(events, league, abbr);
      if (game) {
        var fallbackTeams = getTeamsFromGame(game);
        if (!fallbackTeams) continue;
        return formatNextGameLine(league, abbr, displayName, game, fallbackTeams);
      }
    }

    return league.toUpperCase() + ": No upcoming games found for " + displayName + ". Season may not have started yet.";
  } catch (err) {
    Logger.log("getNextGame ERROR: " + err);
    return "Could not load next game for " + displayName + ". Try again in a moment.";
  }
}

function getScheduleEvents(league, abbr) {
  var events = [];
  var teamCode = getEspnTeamCode(league, abbr);
  var codeUrl = "https://site.api.espn.com/apis/site/v2/sports/" + ESPN[league].sport + "/teams/" + teamCode + "/schedule";
  appendScheduleEvents(events, league, abbr, codeUrl);

  var teamId = ESPN_TEAM_IDS[league] && ESPN_TEAM_IDS[league][abbr];
  if (teamId && String(teamId) !== String(teamCode)) {
    var idUrl = "https://site.api.espn.com/apis/site/v2/sports/" + ESPN[league].sport + "/teams/" + teamId + "/schedule";
    appendScheduleEvents(events, league, abbr, idUrl);
  }

  return events;
}

function appendScheduleEvents(events, league, abbr, url) {
  try {
    var data = apiGet(url);
    var incoming = data && data.events ? data.events : [];
    incoming.forEach(function(ev) {
      var teams = getTeamsFromGame(ev);
      if (!teams) return;
      if (teamMatches(league, teams.home.team.abbreviation, abbr) ||
          teamMatches(league, teams.away.team.abbreviation, abbr)) {
        events.push(ev);
      }
    });
  } catch (err) {
    Logger.log("Schedule endpoint failed: " + err);
  }
}

function getEspnTeamCode(league, abbr) {
  var map = ESPN_TEAM_CODES[league] || {};
  return map[abbr] || abbr.toLowerCase();
}

function formatNextGameLine(league, abbr, displayName, game, teams) {
  var isHome = teamMatches(league, teams.home.team.abbreviation, abbr);
  var opponent = isHome ? teams.away.team.abbreviation : teams.home.team.abbreviation;
  var venue = isHome ? "vs" : "@";
  var date = new Date(game.date);
  var opts = { timeZone: "America/New_York", weekday: "short", month: "short", day: "numeric", hour: "numeric", minute: "2-digit", hour12: true };
  return league.toUpperCase() + ": " + displayName + " next game\n" + date.toLocaleString("en-US", opts) + " ET " + venue + " " + opponent;
}

function getTeamStandings(league, abbr, displayName) {
  try {
    var data = apiGet(ESPN[league].standings);
    var groups = getStandingsGroups(data);
    var teamEntry = null;
    var divisionName = "";

    groups.forEach(function(group) {
      var divisions = getStandingsDivisions(group);
      divisions.forEach(function(div) {
        var entries = getStandingsEntries(div);
        entries.forEach(function(entry) {
          if (entry.team && teamMatches(league, entry.team.abbreviation, abbr)) {
            teamEntry = entry;
            divisionName = div.name || group.name || "";
          }
        });
      });
    });

    if (!teamEntry) return league.toUpperCase() + ": Could not find standings for " + displayName + ".";

    var stats = statsByName(teamEntry.stats);
    var w = stats.wins || stats.w || "?";
    var l = stats.losses || stats.l || "?";
    var pct = stats.winPercent || stats.pct || "";
    var gb = stats.gamesBehind || stats.gb || "";
    var streak = stats.streak || "";

    var line = league.toUpperCase() + ": " + displayName + "\n" + w + "-" + l;
    if (pct) line += " (" + pct + ")";
    if (gb && gb !== "0" && gb !== "0.0" && gb !== "-") line += ", " + gb + " GB";
    if (streak) line += ", Streak: " + streak;
    if (divisionName) line += "\n" + divisionName;
    return line;
  } catch (err) {
    Logger.log("getTeamStandings ERROR: " + err);
    return "Could not load standings for " + displayName + ". Try again in a moment.";
  }
}

function getAllStandings(league) {
  try {
    var data = apiGet(ESPN[league].standings);
    var groups = getStandingsGroups(data);
    var lines = [league.toUpperCase() + " Standings"];

    groups.forEach(function(group) {
      var divisions = getStandingsDivisions(group);
      divisions.forEach(function(div) {
        var entries = getStandingsEntries(div);
        if (!entries.length) return;
        var label = div.name || group.name || "";
        if (label && lines[lines.length - 1] !== label) lines.push(label);
        entries.forEach(function(entry) {
          if (!entry.team) return;
          var stats = statsByName(entry.stats);
          var w = stats.wins || stats.w || "?";
          var l = stats.losses || stats.l || "?";
          var gb = stats.gamesBehind || stats.gb || "";
          var row = entry.team.abbreviation + " " + w + "-" + l;
          if (gb && gb !== "0" && gb !== "0.0" && gb !== "-") row += " (" + gb + " GB)";
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

function getStandingsGroups(data) {
  if (!data) return [];
  if (data.children && data.children.length) return data.children;
  if (data.standings && data.standings.entries) return [data];
  if (data.standings && data.standings.groups) return data.standings.groups;
  if (data.standings && data.standings.length) return data.standings;
  if (data.entries && data.entries.length) return [data];
  return [];
}

function getStandingsDivisions(group) {
  if (!group) return [];
  if (group.children && group.children.length) return group.children;
  return [group];
}

function getStandingsEntries(node) {
  if (!node) return [];
  if (node.standings && node.standings.entries) return node.standings.entries;
  if (node.entries) return node.entries;
  return [];
}

function statsByName(stats) {
  var output = {};
  (stats || []).forEach(function(s) {
    if (!s || !s.name) return;
    output[s.name] = s.displayValue !== undefined
      ? s.displayValue
      : (s.value !== undefined ? String(s.value) : "");
  });
  return output;
}

function formatGame(leagueLabel, game) {
  var teams = getTeamsFromGame(game);
  if (!teams) return (leagueLabel ? leagueLabel + ": " : "") + "Game data unavailable.";

  var homeAbbr = teams.home.team.abbreviation || "?";
  var awayAbbr = teams.away.team.abbreviation || "?";
  var homeScore = teams.home.score !== undefined && teams.home.score !== "" ? teams.home.score : "-";
  var awayScore = teams.away.score !== undefined && teams.away.score !== "" ? teams.away.score : "-";

  var type = game.status && game.status.type ? game.status.type : {};
  var state = type.state || "pre";
  var shortDetail = type.shortDetail || type.detail || "";

  var statusLine = "";
  if (/postponed/i.test(shortDetail)) {
    statusLine = shortDetail;
  } else if (state === "post" || state === "in") {
    statusLine = shortDetail || state;
  } else {
    var date = new Date(game.date);
    var opts = { timeZone: "America/New_York", month: "short", day: "numeric", hour: "numeric", minute: "2-digit", hour12: true };
    statusLine = date.toLocaleString("en-US", opts) + " ET";
  }

  var scoreLine = awayAbbr + " " + awayScore + ", " + homeAbbr + " " + homeScore;
  var prefix = leagueLabel ? leagueLabel + ": " : "";
  return prefix + scoreLine + "\n" + statusLine;
}

function findTeamGame(events, league, abbr) {
  return findTeamGames(events, league, abbr)[0] || null;
}

function findTeamGames(events, league, abbr) {
  return (events || []).filter(function(ev) {
    var teams = getTeamsFromGame(ev);
    if (!teams) return false;
    return teamMatches(league, teams.home.team.abbreviation, abbr) ||
      teamMatches(league, teams.away.team.abbreviation, abbr);
  });
}

function teamMatches(league, espnAbbr, botAbbr) {
  if (!espnAbbr || !botAbbr) return false;
  var normalizedEspn = String(espnAbbr).toUpperCase();
  var normalizedBot = String(botAbbr).toUpperCase();
  if (normalizedEspn === normalizedBot) return true;
  var aliases = (ESPN_ABBR_ALIASES[league] && ESPN_ABBR_ALIASES[league][normalizedBot]) || [];
  return aliases.indexOf(normalizedEspn) !== -1;
}

function apiGet(url) {
  Logger.log("GET: " + url);
  var cache = CacheService.getScriptCache();
  var digest = Utilities.computeDigest(Utilities.DigestAlgorithm.SHA_256, url);
  var key = "api_" + Utilities.base64EncodeWebSafe(digest).substring(0, 80);
  var cached = cache.get(key);
  if (cached) {
    Logger.log("Cache hit: " + url);
    return JSON.parse(cached);
  }

  var resp = UrlFetchApp.fetch(url, { muteHttpExceptions: true });
  var code = resp.getResponseCode();
  var body = resp.getContentText();
  Logger.log("Response [" + code + "]: " + body.substring(0, 300));
  if (code !== 200) throw new Error("HTTP " + code + " for " + url);

  if (body.length < 95000) {
    cache.put(key, body, getCacheSecondsForUrl(url));
  } else {
    Logger.log("Skipping cache for large response: " + body.length + " chars");
  }
  return JSON.parse(body);
}

function getCacheSecondsForUrl(url) {
  if (url.indexOf("/standings") !== -1) return 300;
  if (url.indexOf("/schedule") !== -1) return 3600;
  return 30;
}

function sendGroupMeMessage(text) {
  var resp = UrlFetchApp.fetch("https://api.groupme.com/v3/bots/post", {
    method: "post",
    contentType: "application/json",
    payload: JSON.stringify({ bot_id: GROUPME_BOT_ID, text: text }),
    muteHttpExceptions: true
  });
  var code = resp.getResponseCode();
  if (code < 200 || code >= 300) {
    Logger.log("GroupMe send failed [" + code + "]: " + resp.getContentText());
  }
}

function cap(str) {
  return str.replace(/\b\w/g, function(c) { return c.toUpperCase(); });
}

