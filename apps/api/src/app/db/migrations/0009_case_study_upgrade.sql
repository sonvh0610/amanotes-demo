create table if not exists kudo_tagged_users (
  kudo_id uuid not null references kudos(id) on delete cascade,
  user_id uuid not null references users(id) on delete cascade,
  created_at timestamptz not null default now(),
  constraint kudo_tagged_users_unique unique (kudo_id, user_id)
);

create index if not exists kudo_tagged_users_kudo_idx
  on kudo_tagged_users(kudo_id);

create index if not exists kudo_tagged_users_user_idx
  on kudo_tagged_users(user_id);

create table if not exists ai_monthly_summaries (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references users(id) on delete cascade,
  month_key varchar(7) not null,
  content_hash varchar(64) not null,
  summary text not null,
  source_stats_json jsonb not null,
  generated_at timestamptz not null default now(),
  constraint ai_monthly_summaries_user_month_hash_unique
    unique (user_id, month_key, content_hash)
);

create index if not exists ai_monthly_summaries_user_month_generated_idx
  on ai_monthly_summaries(user_id, month_key, generated_at);
