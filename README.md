# Groupme-Scorebot MBL-NFL-NHL-NBA
[README.md](https://github.com/user-attachments/files/28236984/README.md)
# GroupMe Sports Score Bot

A Google Apps Script bot for GroupMe that returns real-time scores, standings, and schedules for NBA, MLB, NFL, and NHL using the ESPN API.

---

## How It Works

The script runs on Google Apps Script and acts as a webhook. When someone sends a message in GroupMe, it gets sent to the script, which checks if a team name was mentioned, fetches the score from ESPN, and replies in the chat.

---

## Setup

### 1. GroupMe Bot
- Go to [dev.groupme.com](https://dev.groupme.com)
- Sign in and click **Bots → Create Bot**
- Pick your group and give it a name
- Copy the **Bot ID**

### 2. Google Apps Script
- Go to [script.google.com](https://script.google.com)
- Create a new project
- Paste in the code from `GroupMe_SportsBot_v6.gs`
- Replace `YOUR_BOT_ID_HERE` with your actual Bot ID at the top of the file
- Click **Save**

### 3. Deploy
- Click **Deploy → New Deployment**
- Type: **Web App**
- Execute as: **Me**
- Who has access: **Anyone**
- Click **Deploy** and copy the Web App URL

### 4. Set the Webhook
- Go back to [dev.groupme.com](https://dev.groupme.com)
- Edit your bot and paste the Web App URL into **Callback URL**
- Save

---

## Commands

| What you type | What you get |
|---|---|
| `mets` | Today's score or next scheduled game |
| `mets next game` | Next game with date, time, and opponent |
| `mets standings` | Team record, games behind, streak |
| `mlb scores` | All MLB scores today |
| `nba scores` | All NBA scores today |
| `nfl scores` | All NFL scores today |
| `nhl scores` | All NHL scores today |
| `mlb standings` | Full MLB standings by division |
| `nba standings` | Full NBA standings |
| `nfl standings` | Full NFL standings |
| `nhl standings` | Full NHL standings |

Short abbreviations also work: `nym`, `gsw`, `kc`, `pit`, etc.

---

## Supported Teams

All 30 MLB teams, 30 NBA teams, 32 NFL teams, and 32 NHL teams are supported.

**Conflict teams** — add the league name to clarify:
- `giants nfl` → New York Giants | `giants` alone → SF Giants (MLB)
- `cardinals nfl` → Arizona Cardinals | `cardinals` alone → STL Cardinals (MLB)
- `rangers nhl` → NY Rangers | `rangers mlb` → Texas Rangers
- `jets nhl` → Winnipeg Jets | `jets` alone → NY Jets (NFL)

---

## Notes

- Data comes from the ESPN API — no API key needed
- The bot stays silent if it does not recognize a team name
- If a team has no game today it automatically looks up the next scheduled game
- To update the bot, edit the code in Google Apps Script and redeploy as a new version — the webhook URL stays the same
