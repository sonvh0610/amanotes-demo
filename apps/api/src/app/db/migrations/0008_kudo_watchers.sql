create table if not exists kudo_watchers (
  kudo_id uuid not null references kudos(id) on delete cascade,
  user_id uuid not null references users(id) on delete cascade,
  created_at timestamptz not null default now(),
  unique (kudo_id, user_id)
);

create index if not exists kudo_watchers_kudo_idx on kudo_watchers(kudo_id);
create index if not exists kudo_watchers_user_idx on kudo_watchers(user_id);

insert into kudo_watchers (kudo_id, user_id)
select id, sender_id from kudos
on conflict do nothing;

insert into kudo_watchers (kudo_id, user_id)
select id, receiver_id from kudos
on conflict do nothing;
