-- Profiles (no FK to auth.users per Lovable Cloud guideline)
create table if not exists public.profiles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null unique,
  display_name text,
  avatar_url text,
  preferred_field text,
  preferred_template_id text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Resumes stored as a snapshot JSON payload so templates can evolve safely
create table if not exists public.resumes (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null,
  title text not null default 'Untitled',
  document_type text not null default 'resume',
  field_category text not null default 'other',
  template_id text,
  data jsonb not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists idx_resumes_user_id on public.resumes(user_id);
create index if not exists idx_resumes_updated_at on public.resumes(updated_at desc);

-- Public share links
create table if not exists public.resume_shares (
  id uuid primary key default gen_random_uuid(),
  resume_id uuid not null references public.resumes(id) on delete cascade,
  public_id uuid not null unique default gen_random_uuid(),
  is_active boolean not null default true,
  created_at timestamptz not null default now()
);
create index if not exists idx_resume_shares_resume_id on public.resume_shares(resume_id);

-- Enable RLS
alter table public.profiles enable row level security;
alter table public.resumes enable row level security;
alter table public.resume_shares enable row level security;

-- Updated-at trigger
create or replace function public.set_updated_at()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists set_updated_at_profiles on public.profiles;
create trigger set_updated_at_profiles
before update on public.profiles
for each row execute function public.set_updated_at();

drop trigger if exists set_updated_at_resumes on public.resumes;
create trigger set_updated_at_resumes
before update on public.resumes
for each row execute function public.set_updated_at();

-- PROFILES policies
-- Users can read their own profile
create policy "Users can view own profile"
on public.profiles
for select
to authenticated
using (auth.uid() = user_id);

-- Users can insert their own profile
create policy "Users can insert own profile"
on public.profiles
for insert
to authenticated
with check (auth.uid() = user_id);

-- Users can update their own profile
create policy "Users can update own profile"
on public.profiles
for update
to authenticated
using (auth.uid() = user_id);

-- RESUMES policies
create policy "Users can view own resumes"
on public.resumes
for select
to authenticated
using (auth.uid() = user_id);

create policy "Users can create own resumes"
on public.resumes
for insert
to authenticated
with check (auth.uid() = user_id);

create policy "Users can update own resumes"
on public.resumes
for update
to authenticated
using (auth.uid() = user_id);

create policy "Users can delete own resumes"
on public.resumes
for delete
to authenticated
using (auth.uid() = user_id);

-- Public can view shared resumes (read-only)
create policy "Public can view shared resumes"
on public.resumes
for select
to anon
using (
  exists (
    select 1
    from public.resume_shares s
    where s.resume_id = id
      and s.is_active = true
  )
);

-- RESUME_SHARES policies
-- Owners can manage shares for their resumes
create policy "Users can view shares for own resumes"
on public.resume_shares
for select
to authenticated
using (
  exists (
    select 1 from public.resumes r
    where r.id = resume_id
      and r.user_id = auth.uid()
  )
);

create policy "Users can create share for own resumes"
on public.resume_shares
for insert
to authenticated
with check (
  exists (
    select 1 from public.resumes r
    where r.id = resume_id
      and r.user_id = auth.uid()
  )
);

create policy "Users can update share for own resumes"
on public.resume_shares
for update
to authenticated
using (
  exists (
    select 1 from public.resumes r
    where r.id = resume_id
      and r.user_id = auth.uid()
  )
);

create policy "Users can delete share for own resumes"
on public.resume_shares
for delete
to authenticated
using (
  exists (
    select 1 from public.resumes r
    where r.id = resume_id
      and r.user_id = auth.uid()
  )
);

-- Public can read share records to resolve a public_id -> resume_id
create policy "Public can read active shares"
on public.resume_shares
for select
to anon
using (is_active = true);
