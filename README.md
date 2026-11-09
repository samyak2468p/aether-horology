# AETHER HOROLOGY

AETHER HOROLOGY is a cyber-luxury watch and wearable-technology storefront that combines mechanical horology with biometric telemetry. The experience is built as a responsive multi-route React application with an Express/tRPC/Drizzle foundation for future catalog, account and payments persistence.

## What is included

The storefront includes a live international status bar, UTC/Geneva/Tokyo/New York clocks, persistent cart state, currency conversion for USD/EUR/GBP/JPY/CHF/INR/AED, EN/FR/DE/JP language state, Cmd/Ctrl+K predictive search, category and product routes, wishlist state, product detail views, smartwatch and mechanical editorial pages, limited-edition allocation messaging, contact/newsletter forms, responsive mobile layouts, and reduced-motion support.

The catalog is seeded with 16 instruments across eight categories: Luxury Analog, Contemporary Designer, Minimalist, Premium Mechanical, Digital, Modern Smartwatch, Fitness & Lifestyle, and Limited Edition. The product data is intentionally local and deterministic for Preview; the server and Drizzle database foundation are enabled for the next persistence phase.

## Stack

- React 19 + TypeScript + Vite
- Express + tRPC + Drizzle ORM
- MySQL-compatible managed database
- Wouter routing
- Tailwind CSS v4 with custom CSS design tokens
- Framer Motion-ready interaction foundation and Lucide icons
- pnpm 10.18.0

## Local development

```bash
pnpm install
pnpm dev
```

The development server listens on `http://localhost:3000` by default. Use `pnpm check` for TypeScript diagnostics, `pnpm test` for the test suite, and `pnpm build` for the production client/server build.

## Environment

Copy `.env.example` to `.env` and provide only the values required for the services you are enabling. Never commit `.env` or live credentials. `DATABASE_URL` is required for database-backed persistence. Stripe variables are intentionally optional in the current Preview: when they are absent, the UI shows an explicit configuration notice and does not claim that a payment succeeded.

```bash
cp .env.example .env
```

## Routes

- `/` — editorial home and featured instruments
- `/collections` — catalog search, category, sort, price and stock controls
- `/product/:slug` — product detail, variants, wishlist and add-to-bag
- `/smartwatches` — Horizon biometric system
- `/mechanical` — caliber and mechanical collection story
- `/limited-editions` — serialized allocation story
- `/craftsmanship` — atelier and layered construction story
- `/contact` — collector concierge form

The machine-readable route manifest is available at `/manus-routes.json`.

## Payments and production readiness

No payment transaction is faked by this repository. The checkout UI is deliberately guarded until a live payment provider is configured. For production Stripe Checkout, add the server-side secret and browser-safe publishable key through the deployment secret manager, then connect the checkout handoff to the server boundary. Webhook signing and order persistence should be enabled before accepting live orders.

## Project structure

```text
client/src/App.tsx                    Route map and storefront UI
client/src/contexts/StoreContext.tsx Cart, currency, language and wishlist state
client/src/lib/catalog.ts             Seed catalog and currency helpers
client/src/index.css                  Cyber-luxury design system and responsive styles
client/public/manus-routes.json       Route manifest
server/                                Express, tRPC, auth and database boundary
drizzle/                              Schema and migrations
plan.md                               Design and implementation decisions
TODO.md                               Delivery outcomes and remaining work
```

## Visual direction

The interface uses a midnight-blue canvas, electric-blue interaction states, neon-cyan telemetry, cyber-yellow allocation signals, architectural hairlines, crosshair markers, technical mono labels, and an instrument-like watch illustration built entirely from CSS. The design is intentionally sharp and editorial rather than a generic rounded-card storefront.

## License

MIT. See `LICENSE`.
