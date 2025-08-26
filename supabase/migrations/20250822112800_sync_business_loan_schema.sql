-- Sync Business Loan Schema (idempotent)
-- Creates missing tables/columns, RLS, triggers, and helpful indexes
-- Safe to run multiple times.

-- 0) Ensure extensions
create extension if not exists pgcrypto;

-- 1) Tables: create if not exists (minimal skeleton)
create table if not exists public.business_loan_applications (
  id bigserial primary key,
  application_number text unique,
  user_id uuid references auth.users(id) on delete set null,
  status text not null default 'draft',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.business_loan_owners (
  id bigserial primary key,
  application_id bigint not null references public.business_loan_applications(id) on delete cascade,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- 2) Add/align columns on business_loan_applications (nullable to avoid blocking)
alter table public.business_loan_applications
  add column if not exists legal_business_name text,
  add column if not exists trading_name text,
  add column if not exists registration_number text,
  add column if not exists date_of_registration date,
  add column if not exists tax_identification_number text,
  add column if not exists vat_number text,
  add column if not exists business_sector text,
  add column if not exists industry text,
  add column if not exists years_in_business integer,
  add column if not exists number_of_employees integer,
  add column if not exists business_structure text,
  add column if not exists business_address text,
  add column if not exists city text,
  add column if not exists province text,
  add column if not exists postal_code text,
  add column if not exists business_email text,
  add column if not exists business_phone text,
  add column if not exists website text,
  add column if not exists business_description text,
  -- Financial Information
  add column if not exists annual_turnover decimal(15,2),
  add column if not exists projected_turnover decimal(15,2),
  add column if not exists gross_profit decimal(15,2),
  add column if not exists net_profit decimal(15,2),
  add column if not exists bank_name text,
  add column if not exists account_number text,
  add column if not exists average_balance decimal(15,2),
  add column if not exists financial_statements_url text,
  add column if not exists bank_statements_url text,
  add column if not exists tax_returns_url text,
  -- Loan Details
  add column if not exists loan_amount decimal(15,2),
  add column if not exists loan_term integer,
  add column if not exists repayment_frequency text,
  add column if not exists loan_purpose text,
  add column if not exists collateral_items jsonb,
  add column if not exists business_plan_url text,
  add column if not exists collateral_documents_url text,
  add column if not exists other_documents_url text,
  -- References & Declarations
  add column if not exists business_references jsonb,
  add column if not exists declarations jsonb,
  -- Extra timestamps/metadata
  add column if not exists submitted_at timestamptz,
  add column if not exists reviewed_at timestamptz,
  add column if not exists reviewed_by uuid references auth.users(id),
  add column if not exists metadata jsonb;

-- 3) Add/align columns on business_loan_owners
alter table public.business_loan_owners
  add column if not exists full_name text,
  add column if not exists id_number text,
  add column if not exists date_of_birth date,
  add column if not exists gender text,
  add column if not exists residential_address text,
  add column if not exists email text,
  add column if not exists phone_number text,
  add column if not exists marital_status text,
  add column if not exists position text,
  add column if not exists ownership_percentage decimal(5,2),
  -- Banking Information
  add column if not exists bank_name text,
  add column if not exists account_number text,
  add column if not exists average_monthly_balance decimal(15,2),
  -- Spouse Information
  add column if not exists spouse_name text,
  add column if not exists spouse_id_number text,
  add column if not exists spouse_phone_number text,
  -- Next of Kin
  add column if not exists next_of_kin_name text,
  add column if not exists next_of_kin_relationship text,
  add column if not exists next_of_kin_address text,
  add column if not exists next_of_kin_phone text,
  add column if not exists next_of_kin_id_number text;

-- Ensure unique owner per application + id_number
do $$ begin
  if not exists (
    select 1 from pg_constraint 
    where conname = 'unique_owner_per_application') then
    alter table public.business_loan_owners
      add constraint unique_owner_per_application unique (application_id, id_number);
  end if;
end $$;

-- 4) RLS enable & permissive policies (anon inserts + readable)
alter table public.business_loan_applications enable row level security;
alter table public.business_loan_owners enable row level security;

-- Applications policies
drop policy if exists "Anyone can insert business loan applications" on public.business_loan_applications;
create policy "Anyone can insert business loan applications"
  on public.business_loan_applications for insert with check (true);

drop policy if exists "View business loan applications" on public.business_loan_applications;
create policy "View business loan applications"
  on public.business_loan_applications for select using (
    auth.uid() = user_id or user_id is null or exists (
      select 1 from public.user_roles where user_id = auth.uid() and role = 'admin'
    )
  );

-- Owners policies
drop policy if exists "View business loan owners" on public.business_loan_owners;
create policy "View business loan owners"
  on public.business_loan_owners for select using (
    exists (
      select 1 from public.business_loan_applications a
      where a.id = business_loan_owners.application_id
        and (a.user_id = auth.uid() or a.user_id is null)
    )
  );

drop policy if exists "Insert business loan owners" on public.business_loan_owners;
create policy "Insert business loan owners"
  on public.business_loan_owners for insert with check (
    exists (
      select 1 from public.business_loan_applications a
      where a.id = business_loan_owners.application_id
        and (a.user_id = auth.uid() or a.user_id is null)
    )
  );

-- 5) Helpful indexes
create index if not exists idx_business_loan_applications_user_id on public.business_loan_applications(user_id);
create index if not exists idx_business_loan_applications_status on public.business_loan_applications(status);
create index if not exists idx_business_loan_applications_created_at on public.business_loan_applications(created_at);
create index if not exists idx_business_loan_owners_application_id on public.business_loan_owners(application_id);

-- 6) Triggers for updated_at
create or replace function update_updated_at_column()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

drop trigger if exists update_business_loan_applications_updated_at on public.business_loan_applications;
create trigger update_business_loan_applications_updated_at
before update on public.business_loan_applications
for each row execute function update_updated_at_column();

drop trigger if exists update_business_loan_owners_updated_at on public.business_loan_owners;
create trigger update_business_loan_owners_updated_at
before update on public.business_loan_owners
for each row execute function update_updated_at_column();

-- 7) Generate application number after insert
create or replace function generate_business_application_number()
returns trigger as $$
begin
  update public.business_loan_applications
  set application_number = 'BL-' || to_char(now(), 'YYYYMMDD-') || lpad(new.id::text, 6, '0')
  where id = new.id;
  return new;
end;
$$ language plpgsql;

drop trigger if exists generate_business_loan_application_number on public.business_loan_applications;
create trigger generate_business_loan_application_number
after insert on public.business_loan_applications
for each row execute function generate_business_application_number();

-- 8) Storage bucket for file uploads (idempotent)
-- Will no-op if already exists
select storage.create_bucket('documents', public := true);

-- Public read
create policy if not exists "Public read for documents"
  on storage.objects for select using (bucket_id = 'documents');
-- Anon insert
create policy if not exists "Anon can upload to documents"
  on storage.objects for insert with check (bucket_id = 'documents');

-- 9) Refresh PostgREST schema cache
notify pgrst, 'reload schema';
