# Jingle Journeys: setup (about 15 minutes, all free)

**Coming back to this next Christmas? Read [NEXT-CHRISTMAS.md](NEXT-CHRISTMAS.md) first.** It has everything needed to bring the app back, step by step.

## 1. Scores database: Supabase
1. supabase.com > sign up > New project (region: London). Save the database password in 1Password; the app doesn't need it.
2. SQL Editor > New query > paste all of supabase.sql > Run.
3. Project Settings > API: copy the Project URL and the publishable key (or the legacy anon key).
4. Paste both into config.js (API_URL and API_KEY).

The publishable key is meant to sit in a web page. The database rules only let it add, read and undo taps.

## 2. Host the app: GitHub Pages
Push this folder to a public repo (e.g. jingle-journeys), then Settings > Pages > Deploy from branch > main / root.
Link: https://<your-github-username>.github.io/jingle-journeys/
To update later: commit and push.

## 3. Install on each phone
iPhone: open the link in Safari > Share > Add to Home Screen.
Android: open in Chrome > menu > Install app.

## Changing things
Names, journeys and points live in config.js.
After any change, bump VERSION in sw.js (v3 to v4) before pushing so installed phones refresh.

## Good to know
- Works offline once opened online once: the app opens from the phone's saved copy, and taps queue until there's signal.
- Practice taps before 1 Dec don't count in the season table, and they are wiped automatically on 1 Dec:
  the "Reset scores on 1 December" workflow deletes them from Supabase, and each phone forgets its own copy
  the next time the app opens. It uses the same SUPABASE_URL and SUPABASE_KEY secrets as the keep-awake job.
  To wipe by hand instead, in the SQL Editor: delete from public.taps where trip_date < '2026-12-01';
- Next year, change SEASON_START in config.js to the new 1 December; the workflow runs every 1 December by itself.
- Free Supabase projects pause after a week of no use. Daily school runs keep it awake; if it pauses (e.g. over the holidays), press Restore in the dashboard.
- Keep-screen-on needs iOS 16.4+ (iOS 18.4+ when added to the home screen) or recent Android Chrome.
