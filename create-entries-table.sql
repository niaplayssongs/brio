create table if not exists entries (
  id            uuid primary key default gen_random_uuid(),
  slug          text unique not null,
  content       jsonb not null,
  subject_type  text,
  region        text,
  decade        text,
  country       text,
  mood_tags     text[],
  genre_tags    text[],
  title         text,
  created_at    timestamptz default now()
);
