# SalonMall Architecture v0.1

## Marketplace model
SalonMall owns the canonical catalog. Sellers do not create duplicate product pages; they attach an offer to a canonical product with their price, stock, warranty, shipping SLA and seller-specific metadata.

## Core domains
1. Catalog: categories, brands, products, variants, attributes, media
2. Marketplace: sellers, storefronts, offers, inventory
3. Commerce: carts, orders, order_items, shipments, returns
4. Finance: commissions, seller ledger, settlement batches, refunds
5. Trust: seller verification, ratings, moderation, disputes
6. Discovery: text search, filters, price comparison, image search
7. Admin: catalog moderation, seller approval, commission rules, settlement review

## Image search flow
Upload/camera -> normalize image -> visual recognition/embedding -> candidate products -> attribute/brand matching -> ranked catalog results -> offers and seller comparison.

## Financial principle
Every order item records gross amount, seller receivable, platform commission, discounts, shipping allocation, refunds and settlement state. Payment provider integration must be selected only after confirming current Iranian marketplace/split-settlement requirements.

## Phase 1
Storefront UI + catalog schema + seller onboarding + offers + cart/order foundations.

## Phase 2
Payments, seller ledger, settlements, returns/disputes.

## Phase 3
Visual search, wholesale tools, fulfillment options and advanced seller analytics.
