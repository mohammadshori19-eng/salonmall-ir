-- SalonMall marketplace schema v2
-- Security hardening + customer/seller support tables + initial catalog categories.
-- Designed only for the dedicated SalonMall Supabase project.

-- Automatically create a customer profile for every new auth user.
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = ''
as $$
begin
  insert into public.profiles (id, full_name, phone, role)
  values (
    new.id,
    coalesce(new.raw_user_meta_data ->> 'full_name', ''),
    new.phone,
    'customer'
  )
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- A signed-in user may edit only safe profile fields; role escalation is server-only.
revoke update on table public.profiles from authenticated;
grant update (full_name, phone) on table public.profiles to authenticated;

-- Seller verification state is controlled by the platform, not by the seller.
revoke update on table public.sellers from authenticated;
grant update (shop_name, city) on table public.sellers to authenticated;

-- Only approved sellers may create or modify offers.
drop policy if exists "seller owns offers" on public.offers;
create policy "approved seller manages offers"
on public.offers
for all
using (
  exists (
    select 1 from public.sellers s
    where s.id = seller_id
      and s.owner_id = auth.uid()
      and s.status = 'approved'
  )
)
with check (
  exists (
    select 1 from public.sellers s
    where s.id = seller_id
      and s.owner_id = auth.uid()
      and s.status = 'approved'
  )
);

-- Customers can review only products they actually received.
drop policy if exists "buyer creates review" on public.reviews;
create policy "verified buyer creates review"
on public.reviews
for insert
with check (
  buyer_id = auth.uid()
  and exists (
    select 1
    from public.orders o
    join public.order_items oi on oi.order_id = o.id
    where o.buyer_id = auth.uid()
      and o.status = 'delivered'
      and oi.product_id = reviews.product_id
  )
);

create table if not exists public.product_images (
  id uuid primary key default gen_random_uuid(),
  product_id uuid not null references public.products(id) on delete cascade,
  image_url text not null,
  alt_text text,
  sort_order int not null default 0,
  created_at timestamptz not null default now()
);

create table if not exists public.favorites (
  user_id uuid not null references public.profiles(id) on delete cascade,
  product_id uuid not null references public.products(id) on delete cascade,
  created_at timestamptz not null default now(),
  primary key (user_id, product_id)
);

create table if not exists public.addresses (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  title text,
  recipient_name text not null,
  recipient_phone text not null,
  province text not null,
  city text not null,
  address_line text not null,
  postal_code text,
  is_default boolean not null default false,
  created_at timestamptz not null default now()
);

create table if not exists public.seller_documents (
  id uuid primary key default gen_random_uuid(),
  seller_id uuid not null references public.sellers(id) on delete cascade,
  document_type text not null,
  storage_path text not null,
  verified boolean not null default false,
  created_at timestamptz not null default now()
);

create index if not exists product_images_product_sort_idx
  on public.product_images(product_id, sort_order);
create index if not exists favorites_user_created_idx
  on public.favorites(user_id, created_at desc);
create index if not exists addresses_user_idx
  on public.addresses(user_id);
create index if not exists seller_documents_seller_idx
  on public.seller_documents(seller_id);

alter table public.product_images enable row level security;
alter table public.favorites enable row level security;
alter table public.addresses enable row level security;
alter table public.seller_documents enable row level security;

create policy "public product images"
on public.product_images for select
using (
  exists (
    select 1 from public.products p
    where p.id = product_id and p.active
  )
);

create policy "user manages favorites"
on public.favorites for all
using (user_id = auth.uid())
with check (user_id = auth.uid());

create policy "user manages addresses"
on public.addresses for all
using (user_id = auth.uid())
with check (user_id = auth.uid());

create policy "seller reads own documents"
on public.seller_documents for select
using (
  exists (
    select 1 from public.sellers s
    where s.id = seller_id and s.owner_id = auth.uid()
  )
);

create policy "seller uploads own documents"
on public.seller_documents for insert
with check (
  verified = false
  and exists (
    select 1 from public.sellers s
    where s.id = seller_id and s.owner_id = auth.uid()
  )
);

-- Core category set for the first SalonMall catalog.
insert into public.categories (name, slug, sort_order, active)
values
  ('ماشین اصلاح', 'clippers', 10, true),
  ('قیچی و ابزار', 'scissors-tools', 20, true),
  ('محصولات مو', 'hair-products', 30, true),
  ('محصولات پوستی', 'skin-care', 40, true),
  ('تجهیزات سالن', 'salon-equipment', 50, true),
  ('مبلمان و دکور', 'furniture-decor', 60, true),
  ('رنگ و دکلره', 'hair-color-bleach', 70, true),
  ('عطر و ادکلن', 'fragrance', 80, true)
on conflict (slug) do update
set name = excluded.name,
    sort_order = excluded.sort_order,
    active = excluded.active;
