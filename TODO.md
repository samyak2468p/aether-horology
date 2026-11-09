# AETHER HOROLOGY — Delivery Outcomes

## Global commerce shell
- [ ] Persistent utility bar shows live UTC, Geneva, Tokyo and New York clocks, insured international shipping copy, currency switcher for USD/EUR/GBP/JPY/CHF/INR/AED, and language selector for EN/FR/DE/JP.
- [ ] Navigation links to Collections, Smartwatches, Mechanical, Limited Editions, Craftsmanship and Contact; Collections exposes category counts; global search supports Cmd/Ctrl+K and predictive filtering by product, caliber, material and category.
- [ ] Cart trigger displays a live item count, opens a drawer, supports quantity changes/removal, and calculates subtotal in the selected currency.

## Catalog and routes
- [ ] Catalog seeds at least 16 detailed products across eight requested categories with price, movement, material, water resistance, stock and technical data.
- [ ] Home route includes cinematic hero, mode toggle, featured products, smartwatch innovation, brand story, best sellers with category filters, new arrivals, craftsmanship, logistics, testimonials, limited-edition drop, newsletter form and footer.
- [ ] Collections supports category, search, sort, price range, movement, material, stock and grid/list state.
- [ ] Product detail supports gallery state, variant/strap selection, quantity, add-to-bag, wishlist, technical specs, shipping/returns, warranty, related products and quick-view behavior.
- [ ] Smartwatches, Mechanical, Limited Editions, Craftsmanship and Contact have dedicated navigable views with their requested editorial and functional content.

## Visual system and accessibility
- [ ] Dark-first palette uses #060A12, #0E1525, #0051FF, #FFD600 and #00F0FF with sharp architectural surfaces, technical type and crosshair motifs.
- [ ] Responsive layouts work across desktop and mobile, with keyboard-focus states, semantic controls, reduced-motion fallbacks and explicit loading/error/empty states where relevant.

## Checkout readiness
- [ ] Checkout displays an honest demo/configuration state when live Stripe keys are unavailable and documents environment-variable hooks without claiming a completed transaction.

## Delivery hygiene
- [ ] `/manus-routes.json` lists all application routes and remains synchronized with the router.
- [ ] TypeScript diagnostics, `pnpm check`, build and Preview startup pass before checkpointing.
