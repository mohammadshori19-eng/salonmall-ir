# SalonMall build status

## Completed UI flows
- Approved mobile-first storefront master
- Category listing and filters
- Product detail and multi-seller comparison
- Cart and checkout
- Customer login / OTP UI
- Customer orders
- Seller onboarding and storefront
- Seller dashboard and canonical-catalog workflow
- Admin marketplace dashboard
- Camera / image-search upload UI
- Mohammad Shori developer credit

## Marketplace data architecture prepared
A dedicated Supabase schema is prepared at `supabase/migrations/001_marketplace_core.sql` for profiles, sellers, canonical products, seller offers, carts, orders, commissions, settlements, reviews, visual searches, indexes and RLS.

## Not activated yet
Production database/auth is intentionally NOT connected to Mohammad Shori Production or AKA. SalonMall needs its own isolated Supabase project. Real payment/settlement also remains off until the current Iranian marketplace payment/legal flow is selected.
