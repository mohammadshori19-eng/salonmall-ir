# SalonMall Data Model

این سند قرارداد داده‌ای مارکت‌پلیس سالن‌مال است. اجرای دیتابیس باید در پروژه مستقل SalonMall انجام شود و هیچ دیتابیس AKA یا MohamadShori نباید استفاده یا تغییر داده شود.

## Core entities
- users: customer / seller / admin identity
- seller_profiles: seller verification and storefront metadata
- catalog_products: canonical product record
- product_images: canonical media
- categories / brands
- seller_offers: seller-specific price, stock, lead time, status
- carts / cart_items
- orders / order_items
- addresses / shipments
- payments
- ledger_entries: immutable financial movements
- settlements / settlement_items
- returns / disputes
- reviews
- visual_search_jobs / visual_search_candidates

## Catalog rule
A physical product has one canonical catalog record. Sellers do not create duplicate product pages. Each seller creates an offer linked to catalog_product_id.

## Order snapshot
Every order item must snapshot product title, seller, gross price, discount, seller receivable, platform commission, shipping allocation and refund state at purchase time.

## Financial rule
Never derive settlement only from current product price. Settlement is calculated from immutable order/ledger snapshots.

## Visual search
Upload -> normalize -> embedding/recognition -> candidate catalog_products -> attribute/brand rerank -> results -> seller_offers.

## Security
- RLS by role and ownership.
- Seller can only mutate own offers/storefront/order fulfillment fields allowed by policy.
- Customer can only read/write own private cart, addresses and orders.
- Admin actions audited.
- Payment callbacks idempotent.
- No payment secrets in client code.
