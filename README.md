GroupMe Sports Score Bot
A Google Apps Script bot for GroupMe that returns real-time scores, standings, schedules, and historical results for NBA, MLB, NFL, and NHL using the ESPN API. No API key needed.

Commands
What you typeWhat you getmetsToday's score or next scheduled gamemets 5/20Mets score on May 20 this yearmets 5/20/23Mets score on May 20, 2023mets next gameNext game with date, time, and opponentmets standingsTeam record, win %, games behind, streakmlb scoresAll MLB scores todaymlb scores 5/20All MLB scores on May 20nba scoresAll NBA scores todaynfl scoresAll NFL scores todaynhl scoresAll NHL scores todaymlb standingsFull MLB standings by divisionnba standingsFull NBA standingsnfl standingsFull NFL standingsnhl standingsFull NHL standings
Short abbreviations also work: nym, gsw, kc, lal, njd, sjs etc.

Example Replies
Live game:
MLB: NYM 4, WSH 2
Bot 7th
Final:
NBA: BOS 112, NYK 104
Final
Scheduled:
NFL: Chiefs next game
Sun, Sep 7, 1:00 PM ET @ LAC
All scores:
MLB Scores - May 25
NYM 4, WSH 2
Bot 7th
LAD 1, SD 0
Top 3rd
NYY 6, BOS 3
Final
Standings:
MLB: Mets
34-18 (.654), 2.0 GB
Streak: W3
NL East
Ambiguous team:
Did you mean:
SF Giants (MLB) - type: giants mlb
SF 49ers (NFL) - type: 49ers

Supported Teams
All 30 MLB, 30 NBA, 32 NFL, and 32 NHL teams. Use full nickname or short abbreviation.
Teams that need clarification — bot will ask which you mean:
You typeBot asksgiantsGiants MLB or Giants NFL?rangersRangers MLB or Rangers NHL?kingsKings NBA or Kings NHL?panthersPanthers NFL or Panthers NHL?jetsJets NFL or Jets NHL?cardinalsCardinals NFL or Cardinals MLB?sfGiants MLB or 49ers NFL?nyKnicks, Giants, Jets, Yankees, or Mets?seaMariners, Seahawks, or Kraken?utahJazz NBA or Mammoth NHL?
Just follow up with the more specific name and it will get the right team.

Setup
Step 1 — Create the GroupMe Bot

Go to dev.groupme.com and sign in
Click Bots → Create Bot
Pick your group and give it a name (e.g. ScoreBot)
Leave Callback URL blank for now
Click Submit and copy the Bot ID

Step 2 — Set Up Google Apps Script

Go to script.google.com
Click New Project
Delete everything in the editor
Paste in the full contents of Code.gs
At the top of the file, confirm your Bot ID is set:

javascriptvar GROUPME_BOT_ID = "your_bot_id_here";

Click Save

Step 3 — Deploy

Click Deploy → New Deployment
Click the gear icon next to Type → select Web App
Set:

Execute as: Me
Who has access: Anyone


Click Deploy
If prompted, click Authorize access and allow
Copy the Web App URL

Step 4 — Connect to GroupMe

Go back to dev.groupme.com → your bot → Edit
Paste the Web App URL into Callback URL
Click Update

Step 5 — Test
Go to your GroupMe chat and type any team name. The bot should reply within a few seconds.

Updating the Bot
After any code changes you must redeploy:

Click Deploy → Manage Deployments
Click the pencil icon
Change version to New version
Click Deploy

The Callback URL stays the same — no need to update GroupMe again.

How It Works

Every GroupMe message is sent to the script via webhook
The bot normalizes the text, checks for team names and league keywords, then routes to the right function
Scores and standings are fetched live from ESPN's API
Responses are cached for 30 seconds (scoreboard), 5 minutes (standings), and 1 hour (schedules) to stay fast and avoid hitting limits
Duplicate webhook retries from GroupMe are automatically ignored
The bot stays completely silent if it doesn't recognize a team name or league — it won't interrupt normal group chat


Troubleshooting
Bot is not responding

Check that the Callback URL in GroupMe exactly matches your Web App URL
Make sure you deployed with access set to Anyone
Try redeploying as a new version

Bot replied with wrong score

ESPN's API is the data source — if ESPN is slow it may lag by a minute or two
For live games, just ask again

Bot replied with an error message

"Could not load... Try again in a moment." means ESPN's API had a temporary issue — ask again
"Something went wrong." means an unexpected error — check Apps Script logs under View → Logs

Bot is not responding to a team name

Try the full team nickname instead of an abbreviation
For ambiguous teams (giants, rangers, kings, etc.) add the league: giants mlb, rangers nhl
Check that you redeployed after the last code change
