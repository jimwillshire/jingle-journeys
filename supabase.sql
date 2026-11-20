-- Run once in Supabase: SQL Editor > New query > paste > Run.

create table if not exists public.taps (
  id          uuid primary key,
  player      text not null,
  route       text not null,
  kind        text not null check (kind in ('tree', 'wreath')),
  trip_date   date not null,
  created_at  timestamptz not null default now()
);
create index if not exists taps_route_date on public.taps (route, trip_date);

-- Totals per route, day, player and kind (what the scoreboard reads).
create or replace view public.scores with (security_invoker = true) as
  select route, trip_date, player, kind, count(*)::int as n
  from public.taps
  group by route, trip_date, player, kind;

-- Family app: anyone with the link can add, read and undo taps. No editing.
alter table public.taps enable row level security;
create policy "read taps"   on public.taps for select to anon using (true);
create policy "add taps"    on public.taps for insert to anon with check (true);
create policy "undo taps"   on public.taps for delete to anon using (true);
grant select, insert, delete on public.taps to anon;
grant select on public.scores to anon;

-- Handy later:
-- Clear practice taps before the real thing starts:
--   delete from public.taps where trip_date < '2026-12-01';
-- Season league table across all journeys:
--   select player, sum(n) as points
--   from public.scores where trip_date >= '2026-12-01' group by player order by points desc;
