
-- Enable UUID extension (Not needed for PG 13+, used gen_random_uuid() instead)
-- create extension if not exists "uuid-ossp";

-- USERS TABLE
create table if not exists public.users (
  id text primary key, -- Google ID or Supabase Auth ID
  email text unique not null,
  name text,
  avatar_url text,
  is_admin boolean default false,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- PRODUCTS TABLE
create table if not exists public.products (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  description text,
  price decimal(10, 2) not null,
  base_image_url text not null,
  category text check (category in ('tshirt', 'hoodie')),
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- DESIGNS TABLE (Gallery designs)
create table if not exists public.designs (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  author text not null,
  image_url text not null,
  is_ai boolean default false,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- ORDERS TABLE
create table if not exists public.orders (
  id text default gen_random_uuid()::text primary key,
  user_id text references public.users(id),
  total_amount decimal(10, 2) not null,
  status text check (status in ('pending', 'processing', 'shipped', 'delivered')) default 'pending',
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- ORDER ITEMS TABLE
create table if not exists public.order_items (
  id uuid default gen_random_uuid() primary key,
  order_id text references public.orders(id) on delete cascade,
  product_id uuid references public.products(id),
  design_id uuid references public.designs(id), -- Optional, if picked from gallery
  custom_design_url text, -- Optional, if generated/uploaded
  quantity integer not null default 1,
  size text not null,
  color text not null,
  price_at_purchase decimal(10, 2) not null
);

-- RLS POLICIES (Row Level Security) - Optional but recommended
alter table public.users enable row level security;
alter table public.orders enable row level security;
alter table public.order_items enable row level security;

-- Allow users to read their own data
create policy "Users can view own profile" on public.users for select using (auth.uid()::text = id);
create policy "Users can view own orders" on public.orders for select using (auth.uid()::text = user_id);

-- Allow public read access to products and designs
alter table public.products enable row level security;
create policy "Public products are viewable by everyone" on public.products for select using (true);

alter table public.designs enable row level security;
create policy "Public designs are viewable by everyone" on public.designs for select using (true);
