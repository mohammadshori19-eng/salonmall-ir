-- SalonMall marketplace schema v1
-- Prepared for a NEW dedicated SalonMall Supabase project. Do not apply to existing Mohammad Shori / AKA databases.

create extension if not exists pgcrypto;

create type public.user_role as enum ('customer','seller','admin');
create type public.seller_status as enum ('pending','approved','suspended');
create type public.order_status as enum ('pending','paid','processing','shipped','delivered','cancelled','refunded');
create type public.settlement_status as enum ('pending','approved','paid','held');

create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text,
  phone text,
  role public.user_role not null default 'customer',
  created_at timestamptz not null default now()
);
create table public.sellers (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null references public.profiles(id) on delete cascade,
  shop_name text not null,
  slug text not null unique,
  city text,
  status public.seller_status not null default 'pending',
  rating numeric(2,1) not null default 0,
  created_at timestamptz not null default now()
);
create table public.categories (
  id uuid primary key default gen_random_uuid(),
  parent_id uuid references public.categories(id) on delete set null,
  name text not null,
  slug text not null unique,
  sort_order int not null default 0,
  active boolean not null default true
);
create table public.products (
  id uuid primary key default gen_random_uuid(),
  category_id uuid references public.categories(id) on delete set null,
  name text not null,
  slug text not null unique,
  brand text,
  description text,
  image_url text,
  attributes jsonb not null default '{}'::jsonb,
  active boolean not null default true,
  created_at timestamptz not null default now()
);
create table public.offers (
  id uuid primary key default gen_random_uuid(),
  product_id uuid not null references public.products(id) on delete cascade,
  seller_id uuid not null references public.sellers(id) on delete cascade,
  price bigint not null check(price >= 0),
  compare_at_price bigint check(compare_at_price is null or compare_at_price >= price),
  stock int not null default 0 check(stock >= 0),
  sku text,
  active boolean not null default true,
  created_at timestamptz not null default now(),
  unique(product_id,seller_id)
);
create table public.carts (
  id uuid primary key default gen_random_uuid(),
  buyer_id uuid not null references public.profiles(id) on delete cascade,
  created_at timestamptz not null default now(),
  unique(buyer_id)
);
create table public.cart_items (
  id uuid primary key default gen_random_uuid(),
  cart_id uuid not null references public.carts(id) on delete cascade,
  offer_id uuid not null references public.offers(id) on delete cascade,
  quantity int not null default 1 check(quantity > 0),
  unique(cart_id,offer_id)
);
create table public.orders (
  id uuid primary key default gen_random_uuid(),
  buyer_id uuid not null references public.profiles(id),
  status public.order_status not null default 'pending',
  subtotal bigint not null default 0,
  shipping_total bigint not null default 0,
  grand_total bigint not null default 0,
  shipping_address jsonb not null default '{}'::jsonb,
  payment_reference text,
  created_at timestamptz not null default now()
);
create table public.order_items (
  id uuid primary key default gen_random_uuid(),
  order_id uuid not null references public.orders(id) on delete cascade,
  offer_id uuid references public.offers(id) on delete set null,
  seller_id uuid not null references public.sellers(id),
  product_id uuid not null references public.products(id),
  product_name text not null,
  unit_price bigint not null,
  quantity int not null check(quantity > 0),
  gross_total bigint not null,
  platform_commission bigint not null default 0,
  seller_receivable bigint not null default 0,
  settlement_status public.settlement_status not null default 'pending'
);
create table public.settlements (
  id uuid primary key default gen_random_uuid(),
  seller_id uuid not null references public.sellers(id),
  amount bigint not null check(amount >= 0),
  status public.settlement_status not null default 'pending',
  period_start date,
  period_end date,
  paid_at timestamptz,
  created_at timestamptz not null default now()
);
create table public.reviews (
  id uuid primary key default gen_random_uuid(),
  buyer_id uuid not null references public.profiles(id),
  product_id uuid not null references public.products(id) on delete cascade,
  rating int not null check(rating between 1 and 5),
  body text,
  approved boolean not null default false,
  created_at timestamptz not null default now(),
  unique(buyer_id,product_id)
);
create table public.visual_searches (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references public.profiles(id) on delete set null,
  image_path text,
  matched_product_ids uuid[] not null default '{}',
  created_at timestamptz not null default now()
);

create index offers_product_price_idx on public.offers(product_id,price) where active;
create index products_category_idx on public.products(category_id) where active;
create index order_items_seller_idx on public.order_items(seller_id,settlement_status);
create index orders_buyer_created_idx on public.orders(buyer_id,created_at desc);

alter table public.profiles enable row level security;
alter table public.sellers enable row level security;
alter table public.categories enable row level security;
alter table public.products enable row level security;
alter table public.offers enable row level security;
alter table public.carts enable row level security;
alter table public.cart_items enable row level security;
alter table public.orders enable row level security;
alter table public.order_items enable row level security;
alter table public.settlements enable row level security;
alter table public.reviews enable row level security;
alter table public.visual_searches enable row level security;

create policy "public categories" on public.categories for select using(active);
create policy "public products" on public.products for select using(active);
create policy "public active offers" on public.offers for select using(active);
create policy "public approved sellers" on public.sellers for select using(status='approved');
create policy "own profile" on public.profiles for select using(auth.uid()=id);
create policy "update own profile" on public.profiles for update using(auth.uid()=id);
create policy "seller owns shop" on public.sellers for all using(owner_id=auth.uid()) with check(owner_id=auth.uid());
create policy "seller owns offers" on public.offers for all using(exists(select 1 from public.sellers s where s.id=seller_id and s.owner_id=auth.uid())) with check(exists(select 1 from public.sellers s where s.id=seller_id and s.owner_id=auth.uid()));
create policy "buyer owns cart" on public.carts for all using(buyer_id=auth.uid()) with check(buyer_id=auth.uid());
create policy "buyer owns cart items" on public.cart_items for all using(exists(select 1 from public.carts c where c.id=cart_id and c.buyer_id=auth.uid())) with check(exists(select 1 from public.carts c where c.id=cart_id and c.buyer_id=auth.uid()));
create policy "buyer sees orders" on public.orders for select using(buyer_id=auth.uid());
create policy "buyer sees order items" on public.order_items for select using(exists(select 1 from public.orders o where o.id=order_id and o.buyer_id=auth.uid()));
create policy "seller sees own order items" on public.order_items for select using(exists(select 1 from public.sellers s where s.id=seller_id and s.owner_id=auth.uid()));
create policy "seller sees settlements" on public.settlements for select using(exists(select 1 from public.sellers s where s.id=seller_id and s.owner_id=auth.uid()));
create policy "public approved reviews" on public.reviews for select using(approved);
create policy "buyer creates review" on public.reviews for insert with check(buyer_id=auth.uid());
create policy "own visual searches" on public.visual_searches for all using(user_id=auth.uid()) with check(user_id=auth.uid());
