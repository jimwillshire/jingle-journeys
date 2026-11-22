# Jingle Journeys: bringing it back next Christmas

Read this in November. It assumes you've forgotten everything. Allow 20 to 30 minutes.

If you're reading this on GitHub and the repo is private, that's expected: it gets put away every 1 January (see "The yearly rhythm").

## Where everything lives

| What | Where |
|---|---|
| The app (code) | GitHub: `jimwillshire/jingle-journeys`, branch `main` |
| The live app | https://jimwillshire.github.io/jingle-journeys/ (GitHub Pages, from `main`, root folder) |
| The scores database | Supabase project `jingle-journeys`, region London, Project URL `https://yfvsqmzbzalvmhburpdl.supabase.co` |
| Database password | 1Password (saved when the project was created). The app never needs it. |
| App settings (names, places, journeys, season date) | `config.js` |
| Database set-up script | `supabase.sql` |
| GitHub secrets | Repo **Settings > Secrets and variables > Actions**: `SUPABASE_URL` and `SUPABASE_KEY` (same values as `API_URL` and `API_KEY` in `config.js`) |
| Keep-awake job | `.github/workflows/keep-supabase-awake.yml`: visits the database every 3 days so free Supabase doesn't pause it. Emails you if it fails. |
| 1 December reset job | `.github/workflows/reset-season.yml`: at 00:05 on 1 December, deletes every tap from before `SEASON_START` in `config.js`, so the season starts at zero. |

Only the **publishable key** (`sb_publishable_...`) is in this repo. That is safe: it is designed to sit in a web page, and the database rules only let it add, read and undo taps. **Never** put the database password or the **secret** key (`sb_secret_...`) in this repo.

## The yearly rhythm

- **1 January: put it away.** Repo **Settings** (top row) > scroll to the bottom, **Danger Zone** > **Change visibility** > **Change to private**, then confirm. The live link stops working (GitHub Pages needs a public repo on a free account). The keep-awake job keeps running every 3 days in a private repo, so the database stays awake all year.
- **About 20 November: get it out again.** Follow the steps below, starting with Step 0. Do it a week or so before 1 December so there's time to test.
- **1 December: the season starts.** The reset job wipes the practice taps by itself.

## What will probably have happened since last year

- **If the repo was made private on 1 January (as planned):** the database should still be awake, because the keep-awake job carried on running. Step 2 will probably be a quick check.
- **If the repo was left public all year:** GitHub switches off scheduled jobs in a public repo after 60 days with no changes, so the keep-awake job stopped in the spring and Supabase paused the database about a week later. Supabase normally lets you restore a paused free project for about 90 days; after that it may only offer a download, and you make a fresh project instead (Step 2B). That takes 10 minutes, and old scores don't matter because the season resets anyway.

## Step 0. Make the repo public again

1. Open the repo on github.com: https://github.com/jimwillshire/jingle-journeys
2. **Settings** (top row) > scroll to the bottom, **Danger Zone** > **Change visibility** > **Change to public**, then confirm.
3. Carry on with Step 1 to switch GitHub Pages back on.

## Step 1. Check GitHub Pages is still on

1. Open https://jimwillshire.github.io/jingle-journeys/ in a browser.
2. If the app appears, go to Step 2.
3. If you see a 404 page (expected after the repo has been private), open the repo on github.com and click **Settings > Pages**. Under **Source** choose **Deploy from a branch**, then branch **main**, folder **/ (root)**, then **Save**. Wait 2 minutes and try again.

## Step 2. Wake up the database

Go to **supabase.com**, sign in, and open the `jingle-journeys` project.

### 2A. If it says "Paused" and offers **Restore project**
1. Click **Restore project** and wait (a few minutes).
2. Go to Step 3. Nothing else changes: the URL and key stay the same.

### 2B. If it can't be restored, or the project has gone
1. Click **New project**. Name `jingle-journeys`, region **London (eu-west-2)**. Click **Generate a password**, save it in 1Password, then **Create new project**.
2. On the "Data access" options, leave **Enable Data API** ticked and the other two unticked.
3. When it's ready: **SQL Editor > New query**, paste all of `supabase.sql` from this repo, click **Run**. Expect "Success. No rows returned".
4. Get the two values: click **Connect** at the top, choose **Framework**, and on the `.env.local` tab copy the two lines. The URL is the **Project URL** and the `sb_publishable_...` value is the **publishable key**. (Or **Project Settings > Data API** for the URL and **Project Settings > API Keys** for the publishable key.) Never use the "Direct" connection string: it contains the password.
5. Put the new values in **three** places:
   - `config.js`: `API_URL` and `API_KEY` (see "How to edit a file on the GitHub website" below).
   - GitHub secret `SUPABASE_URL` (new Project URL).
   - GitHub secret `SUPABASE_KEY` (new publishable key).
   To change a secret: repo **Settings > Secrets and variables > Actions**, click the pencil next to its name, paste, **Update secret**.
6. Also update the Project URL in the table at the top of this file.

## Step 3. Switch the two GitHub jobs back on

1. Open the repo on github.com and click **Actions** (top row).
2. In the left menu click **Keep Supabase awake**. If there's a yellow banner saying the workflow was disabled, click **Enable workflow**.
3. Do the same for **Reset scores on 1 December**. This one must be on **before 1 December**, or the reset won't happen. It also needs this year's `SEASON_START` (Step 4): if the date is still last year's, the job deletes nothing and fails, so GitHub emails you.
4. Test the keep-awake job: click **Keep Supabase awake > Run workflow > Run workflow**. Refresh after 30 seconds. A green tick means it can reach the database. A red cross: click it to read why ("secret is missing" means Step 2B step 5; anything else usually means the database is still paused).

## Step 4. Set this year's season date

1. Edit `config.js` and change `SEASON_START` to this year's 1 December, for example `"2027-12-01"`.
2. While you're there, change any names, places or journeys that are different this year (see "Changing the app" below).
3. Edit `sw.js` and add 1 to the number in `VERSION`, for example `treespotter-v13` to `treespotter-v14`. **Do this every time you change any file**, or phones keep showing the old version.

## Step 5. Check it works

1. Open the live app on a phone (wait 2 minutes after your last change).
2. Pick a player and a journey, tap a tree, then **Finish**. The scoreboard should show the tap, and the bottom corner should say **✓ Synced**. "Can't reach scoreboard" means the database is asleep or `config.js` has the wrong URL or key.
3. Undo the test tap with **Undo** (or ignore it: practice taps are wiped on 1 December).

## Step 6. Put it on the phones

- iPhone: open the link in **Safari**, tap **Share**, then **Add to Home Screen**.
- Android: open it in **Chrome**, menu, **Install app**.
- If a phone already has it but looks out of date: close the app fully and open it again with signal.

## On 1 December

The reset job runs by itself at 00:05 and deletes every tap from before `SEASON_START` in `config.js`. It never touches taps from the season itself, so it's safe to run by hand any time in December (for example if it was switched off on the day, or failed): **Actions > Reset scores on 1 December > Run workflow**, type `WIPE` in the box, **Run workflow**. Or in Supabase **SQL Editor**, run (with this year's date):

```sql
delete from public.taps where trip_date < '2027-12-01';
```

## Changing the app

Everything you'd normally change is in `config.js`:
- **Players**: `PLAYERS`. Each has an `id` (never change an existing id, or that player's scores are lost), a `name`, a `colour` and an `emoji`. `emoji: "candycane"` draws a candy cane, because there is no candy cane emoji.
- **Places**: `PLACES`. A short id on the left, the name shown in the app on the right (emoji welcome).
- **Journeys**: `JOURNEYS`. Each pair like `["home", "max"]` makes both "going" and "coming back".
- **Points**: `POINTS`.

Then bump `VERSION` in `sw.js`.

## How to edit a file on the GitHub website

1. Open the repo on github.com and click the file name (for example `config.js`).
2. Click the **pencil** icon (top right of the file).
3. Make the change.
4. Click the green **Commit changes...** button. Leave "Commit directly to the main branch" selected and click **Commit changes**.
5. GitHub Pages republishes the app within about 2 minutes.

## Getting Claude to do it

Start a Claude Code session with this repo and say:

> Read NEXT-CHRISTMAS.md in jimwillshire/jingle-journeys and walk me through getting Jingle Journeys working for this Christmas. Check the live site, the GitHub jobs and the database, and tell me exactly what I need to click.

A cloud session can't create repos, turn on Pages or set secrets for you, but it can check everything, edit files and push, and give you the clicks for the rest. There is a personal cloud environment called "Jingle Journeys" that lets a session reach the live site and the database; if you make a new Supabase project, its address needs adding to that environment.

## Problems and fixes

| You see | Do this |
|---|---|
| GitHub email: "Keep Supabase awake: All jobs have failed" | Open supabase.com; if the project is paused, **Restore**. Then re-run the job (Step 3, point 4). |
| App says "Can't reach scoreboard" | Same as above. Taps are kept on the phone and sent when it can connect again. |
| App shows "This phone only" | `API_URL` or `API_KEY` in `config.js` is blank. |
| Phone shows the old version | Bump `VERSION` in `sw.js`, then close and reopen the app with signal. |
| 404 at the live link | Step 1. |
| "permission denied" errors | Re-run all of `supabase.sql` in the SQL Editor. It is safe to run again. |
