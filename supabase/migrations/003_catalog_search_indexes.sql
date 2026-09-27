-- SalonMall marketplace schema v3
-- Fast Persian/English catalog and seller search.

create extension if not exists pg_trgm;

create index if not exists products_name_trgm_idx
  on public.products using gin (name gin_trgm_ops);

create index if not exists products_brand_trgm_idx
  on public.products using gin (brand gin_trgm_ops);

create index if not exists sellers_shop_name_trgm_idx
  on public.sellers using gin (shop_name gin_trgm_ops);
