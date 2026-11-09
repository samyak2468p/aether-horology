# AETHER HOROLOGY — Implementation & Design Plan

## Product approach
AETHER HOROLOGY is a multi-page cyber-luxury horology storefront that pairs a high-contrast editorial front end with real local commerce interactions and API-ready backend boundaries. The first implementation focuses on a complete, navigable experience in the initialized React/Express/tRPC/Drizzle project: a seeded in-code catalog with 16+ products, route-level collection/product pages, persistent cart and currency state, search, filters, newsletter/contact forms, and a checkout handoff that is explicitly marked as demo until Stripe keys are configured.

## Design direction
Three possible movements were considered: precision cyber-luxury (0.06), brutalist atelier catalog (0.05), and nocturnal aerospace instrument (0.04). Chosen direction: **precision cyber-luxury**.

- **Design Movement:** precision cyber-luxury — a collision of haute horlogerie restraint and aerospace telemetry.
- **Core Principles:** engineered contrast; editorial asymmetry; exposed technical structure; tactile but disciplined motion.
- **Color Philosophy:** midnight blue gives the watches a gallery-like void; electric blue and neon cyan signal instrumentation; cyber yellow is reserved for limited allocation and high-intent actions.
- **Layout Paradigm:** asymmetric 12-column editorial composition with full-bleed hero stages, diagonal/rail accents, and modular product bays rather than centered card grids.
- **Signature Elements:** live world-time strip, crosshair corner markers, and a luminous precision reticle around watch surfaces.
- **Interaction Philosophy:** every interaction should feel like a calibrated instrument: fast feedback, explicit state, and no decorative controls that do nothing.
- **Animation:** restrained spring entrance, ambient radial glow, sweeping seconds hand, hover parallax, and reduced-motion fallbacks. Heavy scroll choreography is represented with CSS/IntersectionObserver-friendly primitives so the storefront remains performant.
- **Typography System:** Space Grotesk for display and Plus Jakarta Sans for UI/body, with JetBrains Mono for serials, prices, clocks, specs and telemetry.
- **Brand Essence:** an international horology maison for collectors who want mechanical craft and biometric intelligence in one system; exacting, electric, uncompromising.
- **Brand Voice:** headlines are declarative and technical; CTAs are short and directional. Example lines: “BEYOND TIME. ENGINEERED FOR ETERNITY.” and “ENTER THE CALIBER.”
- **Wordmark & Logo:** AETHER is set as a wide, high-contrast wordmark with a clipped A monogram that can also act as a crosshair.
- **Signature Brand Color:** electric blue #0051FF, used as the owning signal across links, active states and hero telemetry.

## Architecture
- `client/src/App.tsx`: route map and global providers.
- `client/src/pages/`: Home, Collections, ProductDetail, Smartwatches, Mechanical, LimitedEditions, Craftsmanship, Contact, and 404 views.
- `client/src/components/`: persistent utility bar, header, cart drawer, search modal, product cards, watch stage and reusable section primitives.
- `client/src/lib/catalog.ts`: typed seeded catalog, category metadata, conversion rates and formatters.
- `client/src/contexts/StoreContext.tsx`: cart, currency, language, wishlist and search state persisted to localStorage.
- `client/src/index.css`: tokenized visual system, responsive layout, watch illustration and motion primitives.
- `public/manus-routes.json`: complete route manifest for Preview and publication.
- `server/`: existing tRPC/Express boundary retained for future catalog, account and Stripe Checkout procedures.

## Functional boundaries
The app uses local seed data for a deterministic Preview and defines checkout readiness around `STRIPE_SECRET_KEY`/`VITE_STRIPE_PUBLISHABLE_KEY`-style environment hooks without pretending that payment succeeded. Cart, filters, search, currency conversion, language labels, quantity controls, forms, quick view and route navigation are all real browser state. Database and server capabilities remain enabled for the next persistence phase.
