create table if not exists public.jobs (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  title text not null,
  company text not null,
  description text not null,
  location text not null,
  job_type text not null check (job_type in ('Full-Time', 'Part-Time', 'Contract')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists idx_jobs_location_jobtype on public.jobs (location, job_type);
create index if not exists idx_jobs_created_at on public.jobs (created_at desc);

alter table public.jobs enable row level security;

create policy "Public can read jobs" on public.jobs
for select using (true);

create policy "Users can insert their jobs" on public.jobs
for insert with check (auth.uid() = user_id);

create policy "Owner can update" on public.jobs
for update using (auth.uid() = user_id);

create policy "Owner can delete" on public.jobs
for delete using (auth.uid() = user_id);

create or replace function public.set_updated_at() returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger trg_set_updated_at
before update on public.jobs
for each row execute function public.set_updated_at();

-- Insert sample data (optional)
INSERT INTO public.jobs (
    title, 
    company, 
    description, 
    location, 
    job_type,
    user_id
) VALUES 
(
    'Senior Frontend Developer',
    'TechCorp Inc.',
    'We are looking for an experienced frontend developer to join our team. You will be responsible for developing user-facing features and ensuring a great user experience.',
    'San Francisco, CA',
    'Full-Time',
    '00000000-0000-0000-0000-000000000000'  -- Replace with actual user ID
),
(
    'Product Designer',
    'Design Studio',
    'Join our creative team as a Product Designer. You will work on designing intuitive and beautiful user experiences for our digital products.',
    'New York, NY',
    'Full-Time',
    '00000000-0000-0000-0000-000000000000'  -- Replace with actual user ID
),
(
    'Marketing Specialist',
    'Growth Co.',
    'We are seeking a creative marketing specialist to help grow our brand and reach new customers through various marketing channels.',
    'Remote',
    'Contract',
    '00000000-0000-0000-0000-000000000000'  -- Replace with actual user ID
);
