import { useEffect, useMemo, useState, type ReactNode } from "react";
import { Link, Route, Switch, useLocation } from "wouter";
import {
  ArrowRight,
  ChevronDown,
  ChevronRight,
  Heart,
  Menu,
  Minus,
  PackageCheck,
  Plus,
  Search,
  ShieldCheck,
  ShoppingBag,
  Sparkles,
  X,
  Zap,
} from "lucide-react";
import { Toaster, toast } from "sonner";
import { StoreProvider, useStore } from "@/contexts/StoreContext";
import { categories, formatPrice, products, type Product } from "@/lib/catalog";
import "./index.css";

const labels: Record<string, Record<string, string>> = {
  EN: {
    collections: "Collections",
    smart: "Smartwatches",
    mechanical: "Mechanical",
    limited: "Limited Editions",
    craft: "Craftsmanship",
    contact: "Contact",
    bag: "Bag",
    explore: "Explore timepieces",
  },
  FR: {
    collections: "Collections",
    smart: "Smartwatches",
    mechanical: "Mécanique",
    limited: "Éditions limitées",
    craft: "Savoir-faire",
    contact: "Contact",
    bag: "Sac",
    explore: "Explorer",
  },
  DE: {
    collections: "Kollektionen",
    smart: "Smartwatches",
    mechanical: "Mechanik",
    limited: "Limitierte Editionen",
    craft: "Handwerk",
    contact: "Kontakt",
    bag: "Tasche",
    explore: "Zeitmesser entdecken",
  },
  JP: {
    collections: "コレクション",
    smart: "スマートウォッチ",
    mechanical: "メカニカル",
    limited: "限定版",
    craft: "クラフト",
    contact: "コンタクト",
    bag: "バッグ",
    explore: "タイムピースを見る",
  },
};

function useClock(zone: string) {
  const [now, setNow] = useState(() => new Date());
  useEffect(() => {
    const id = window.setInterval(() => setNow(new Date()), 1000);
    return () => window.clearInterval(id);
  }, []);
  return new Intl.DateTimeFormat("en-GB", {
    timeZone: zone,
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  }).format(now);
}
function StatusBar() {
  const utc = useClock("UTC"),
    geneva = useClock("Europe/Zurich"),
    tokyo = useClock("Asia/Tokyo"),
    ny = useClock("America/New_York");
  return (
    <div className="status-bar">
      <span className="status-live">
        <i /> AETHER INTERNATIONAL / INSURED EXPRESS AIR COURIER AVAILABLE
      </span>
      <span className="clocks">
        <b>UTC</b> {utc} <b>GVA</b> {geneva} <b>TYO</b> {tokyo} <b>NYC</b> {ny}
      </span>
    </div>
  );
}
function Header() {
  const [, navigate] = useLocation();
  const {
    currency,
    setCurrency,
    language,
    setLanguage,
    cartCount,
    setCartOpen,
    setSearchOpen,
  } = useStore();
  const [menuOpen, setMenuOpen] = useState(false);
  const t = labels[language] ?? labels.EN;
  return (
    <>
      <StatusBar />
      <header className="site-header">
        <Link href="/" className="wordmark">
          <span className="mark">A</span>
          <span>AETHER</span>
          <small>HOROLOGY / 01</small>
        </Link>
        <nav className="main-nav">
          <div className="nav-menu">
            <button onClick={() => setMenuOpen(v => !v)}>
              {t.collections}
              <ChevronDown size={14} />
            </button>
            {menuOpen && (
              <div className="mega-menu">
                <div>
                  <span className="eyebrow">CURATED SYSTEMS</span>
                  <h3>
                    Choose your
                    <br />
                    <em>frequency.</em>
                  </h3>
                </div>
                <div className="mega-links">
                  {categories.map(c => (
                    <Link
                      key={c.name}
                      href={`/collections?category=${encodeURIComponent(c.name)}`}
                      onClick={() => setMenuOpen(false)}
                    >
                      <span>{c.name}</span>
                      <b>{String(c.count).padStart(2, "0")}</b>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
          <Link href="/smartwatches">{t.smart}</Link>
          <Link href="/mechanical">{t.mechanical}</Link>
          <Link href="/limited-editions">{t.limited}</Link>
          <Link href="/craftsmanship">{t.craft}</Link>
          <Link href="/contact">{t.contact}</Link>
        </nav>
        <div className="header-actions">
          <button
            className="icon-btn"
            aria-label="Search"
            onClick={() => setSearchOpen(true)}
          >
            <Search size={18} />
            <kbd>⌘K</kbd>
          </button>
          <select
            value={currency}
            onChange={e => setCurrency(e.target.value)}
            aria-label="Currency"
          >
            {["USD", "EUR", "GBP", "JPY", "CHF", "INR", "AED"].map(c => (
              <option key={c}>{c}</option>
            ))}
          </select>
          <select
            value={language}
            onChange={e => setLanguage(e.target.value)}
            aria-label="Language"
          >
            {["EN", "FR", "DE", "JP"].map(c => (
              <option key={c}>{c}</option>
            ))}
          </select>
          <button className="bag-btn" onClick={() => setCartOpen(true)}>
            <ShoppingBag size={17} /> <span>{t.bag}</span>
            <b>{String(cartCount).padStart(2, "0")}</b>
          </button>
          <button
            className="mobile-menu"
            onClick={() => navigate("/collections")}
          >
            <Menu size={20} />
          </button>
        </div>
      </header>
    </>
  );
}
function Footer() {
  return (
    <footer>
      <div className="footer-top">
        <div>
          <span className="eyebrow">AETHER / PRIVATE HOROLOGY DISPATCH</span>
          <h2>
            Keep your
            <br />
            <em>edge.</em>
          </h2>
        </div>
        <form
          onSubmit={e => {
            e.preventDefault();
            toast.success("Dispatch confirmed", {
              description: "Your first transmission is on its way.",
            });
          }}
        >
          <input
            required
            type="email"
            placeholder="collector@domain.com"
            aria-label="Email"
          />
          <button type="submit">
            Subscribe <ArrowRight size={17} />
          </button>
          <small>
            By subscribing you agree to receive considered transmissions from
            AETHER.
          </small>
        </form>
      </div>
      <div className="footer-bottom">
        <Link href="/" className="wordmark">
          <span className="mark">A</span>
          <span>AETHER</span>
        </Link>
        <span>© 2026 AETHER HOROLOGY / GENEVA · TOKYO · NYC</span>
        <span>Privacy / Terms / Warranty</span>
      </div>
    </footer>
  );
}
function CartDrawer() {
  const {
    cart,
    cartOpen,
    setCartOpen,
    updateQuantity,
    removeFromCart,
    cartSubtotal,
    clearCart,
  } = useStore();
  if (!cartOpen) return null;
  return (
    <div className="overlay" onClick={() => setCartOpen(false)}>
      <aside className="cart-drawer" onClick={e => e.stopPropagation()}>
        <div className="drawer-head">
          <div>
            <span className="eyebrow">YOUR SELECTION</span>
            <h2>
              Instrument bag <sup>{cart.length}</sup>
            </h2>
          </div>
          <button className="close-btn" onClick={() => setCartOpen(false)}>
            <X />
          </button>
        </div>
        {cart.length === 0 ? (
          <div className="empty-state">
            <ShoppingBag size={42} />
            <p>Your bag is awaiting its first instrument.</p>
            <Link
              href="/collections"
              onClick={() => setCartOpen(false)}
              className="text-link"
            >
              Explore collections <ArrowRight size={15} />
            </Link>
          </div>
        ) : (
          <>
            <div className="cart-lines">
              {cart.map(line => (
                <div className="cart-line" key={line.product.id}>
                  <WatchVisual product={line.product} small />
                  <div className="line-info">
                    <strong>{line.product.name}</strong>
                    <span>{line.product.ref}</span>
                    <b>
                      {formatPrice(line.product.price * line.quantity, "USD")}
                    </b>
                    <div className="qty">
                      <button
                        onClick={() => updateQuantity(line.product.id, -1)}
                      >
                        <Minus size={13} />
                      </button>
                      <span>{line.quantity}</span>
                      <button
                        onClick={() => updateQuantity(line.product.id, 1)}
                      >
                        <Plus size={13} />
                      </button>
                      <button
                        className="remove"
                        onClick={() => removeFromCart(line.product.id)}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="drawer-total">
              <span>Subtotal</span>
              <strong>{cartSubtotal}</strong>
            </div>
            <button
              className="checkout-btn"
              onClick={() =>
                toast.info("Checkout is ready for gateway configuration", {
                  description:
                    "Add STRIPE_SECRET_KEY to enable live payment handoff. No payment was processed.",
                })
              }
            >
              Proceed to checkout <ArrowRight size={17} />
            </button>
            <button className="clear-btn" onClick={clearCart}>
              Clear bag
            </button>
          </>
        )}
      </aside>
    </div>
  );
}
function SearchModal() {
  const { searchOpen, setSearchOpen, addToCart, currency } = useStore();
  const [query, setQuery] = useState("");
  if (!searchOpen) return null;
  const results = products
    .filter(p =>
      `${p.name} ${p.ref} ${p.category} ${p.movement} ${p.caseMaterial}`
        .toLowerCase()
        .includes(query.toLowerCase())
    )
    .slice(0, 6);
  return (
    <div className="overlay" onClick={() => setSearchOpen(false)}>
      <div className="search-modal" onClick={e => e.stopPropagation()}>
        <div className="search-input">
          <Search />
          <input
            autoFocus
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Search name, caliber, material..."
          />
          <kbd>ESC</kbd>
        </div>
        <div className="search-results">
          {results.map(p => (
            <Link
              href={`/product/${p.slug}`}
              key={p.id}
              onClick={() => setSearchOpen(false)}
            >
              <WatchVisual product={p} small />
              <div>
                <span className="eyebrow">{p.category}</span>
                <strong>{p.name}</strong>
                <small>
                  {p.ref} · {formatPrice(p.price, currency)}
                </small>
              </div>
              <ChevronRight size={17} />
            </Link>
          ))}
          {!results.length && (
            <div className="empty-search">
              No instrument found. Try “tourbillon”, “titanium” or “smart”.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
function WatchVisual({
  product,
  small = false,
}: {
  product: Product;
  small?: boolean;
}) {
  return (
    <div className={`watch-visual ${product.accent} ${small ? "small" : ""}`}>
      <div className="watch-shadow" />
      <div className="watch-case">
        <div className="watch-bezel">
          <div className="watch-dial">
            <span className="dial-mark m1" />
            <span className="dial-mark m2" />
            <span className="dial-mark m3" />
            <span className="dial-mark m4" />
            <span className="watch-hand hour" />
            <span className="watch-hand minute" />
            <span className="watch-hand second" />
            {product.smart ? (
              <span className="telemetry">
                92
                <br />
                <small>BPM</small>
              </span>
            ) : (
              <span className="subdial">
                28
                <br />
                <small>800</small>
              </span>
            )}
          </div>
        </div>
      </div>
      <div className="watch-band top" />
      <div className="watch-band bottom" />
    </div>
  );
}
function SectionHeader({
  eyebrow,
  title,
  link,
}: {
  eyebrow: string;
  title: ReactNode;
  link?: string;
}) {
  return (
    <div className="section-header">
      <div>
        <span className="eyebrow">{eyebrow}</span>
        <h2>{title}</h2>
      </div>
      {link && (
        <Link className="text-link" href={link}>
          View all <ArrowRight size={15} />
        </Link>
      )}
    </div>
  );
}
function ProductCard({
  product,
  compact = false,
}: {
  product: Product;
  compact?: boolean;
}) {
  const { addToCart, currency, toggleWishlist, isWishlisted } = useStore();
  return (
    <article className={`product-card ${compact ? "compact" : ""}`}>
      <Link href={`/product/${product.slug}`} className="card-media">
        <span className="card-index">{product.ref}</span>
        <WatchVisual product={product} />
        <span className="quick-view">
          View instrument <ArrowRight size={14} />
        </span>
      </Link>
      <div className="card-meta">
        <div>
          <span className="eyebrow">{product.category}</span>
          <h3>{product.name}</h3>
        </div>
        <button
          className={`heart-btn ${isWishlisted(product.id) ? "active" : ""}`}
          onClick={() => toggleWishlist(product.id)}
          aria-label="Add to wishlist"
        >
          <Heart
            size={16}
            fill={isWishlisted(product.id) ? "currentColor" : "none"}
          />
        </button>
      </div>
      <div className="card-spec">
        <span>{product.ref}</span>
        <strong>{formatPrice(product.price, currency)}</strong>
      </div>
      <div className="card-bottom">
        <span className={`stock ${product.stock < 6 ? "low" : ""}`}>
          <i /> {product.stock < 6 ? `${product.stock} allocated` : "In stock"}
        </span>
        <button onClick={() => addToCart(product)} className="add-btn">
          Add to bag <Plus size={14} />
        </button>
      </div>
    </article>
  );
}
function Hero() {
  const [mode, setMode] = useState<"mechanical" | "smart">("mechanical");
  return (
    <section className={`hero ${mode}`}>
      <div className="hero-grid" />
      <div className="hero-copy">
        <span className="eyebrow">AETHER HOROLOGY / SYSTEM 01</span>
        <h1>
          Beyond time.
          <br />
          <em>Engineered</em>
          <br />
          for eternity.
        </h1>
        <p>
          Mechanical intelligence and biometric telemetry, composed for the
          exacting collector.
        </p>
        <div className="hero-actions">
          <Link href="/collections" className="primary-btn">
            Explore timepieces <ArrowRight size={17} />
          </Link>
          <Link href="/smartwatches" className="secondary-btn">
            Experience Horizon <Zap size={16} />
          </Link>
        </div>
      </div>
      <div className="hero-stage">
        <div className="stage-label top-label">
          <span>
            LIVE CALIBER / {mode === "mechanical" ? "AT-01" : "SIP-GEN2"}
          </span>
          <span>LAT 46°12'N / LON 6°09'E</span>
        </div>
        <div className="hero-watch-wrap">
          <div className="orbit orbit-one" />
          <div className="orbit orbit-two" />
          <WatchVisual
            product={mode === "mechanical" ? products[0] : products[11]}
          />
        </div>
        <div className="telemetry-panel">
          <div>
            <span>MODE</span>
            <strong>
              {mode === "mechanical" ? "MECHANICAL" : "BIOMETRIC"}
            </strong>
          </div>
          <div>
            <span>{mode === "mechanical" ? "RESERVE" : "BPM"}</span>
            <strong>{mode === "mechanical" ? "72:00" : "72"}</strong>
          </div>
          <div>
            <span>{mode === "mechanical" ? "VPH" : "SPO2"}</span>
            <strong>{mode === "mechanical" ? "28,800" : "98%"}</strong>
          </div>
        </div>
        <div className="mode-toggle">
          <button
            className={mode === "mechanical" ? "active" : ""}
            onClick={() => setMode("mechanical")}
          >
            Mechanical caliber
          </button>
          <button
            className={mode === "smart" ? "active" : ""}
            onClick={() => setMode("smart")}
          >
            Smart telemetry
          </button>
        </div>
      </div>
      <div className="hero-foot">
        <span>SCROLL TO SYNCHRONIZE</span>
        <span className="scroll-line" />
        <span>01 / 08</span>
      </div>
    </section>
  );
}
function Home() {
  const [bestFilter, setBestFilter] = useState("All best sellers");
  const best =
    bestFilter === "All best sellers"
      ? products.slice(0, 4)
      : products
          .filter(p =>
            bestFilter === "Smart"
              ? p.smart
              : bestFilter === "Mechanical"
                ? p.category.includes("Mechanical") ||
                  p.category === "Luxury Analog"
                : p.category === bestFilter
          )
          .slice(0, 4);
  return (
    <>
      <Hero />
      <main>
        <section className="intro-rail">
          <span className="eyebrow">01 / THE COLLECTION</span>
          <p>
            There is a particular moment when an object stops being an accessory
            and starts becoming an <em>instrument.</em>
          </p>
          <span className="rail-note">
            PRECISION ENGINEERED
            <br />
            GENEVA / TOKYO / NYC
          </span>
        </section>
        <section className="section-block feature-block">
          <SectionHeader
            eyebrow="Featured / 001—004"
            title={
              <>
                The art of the
                <br />
                <em>uninterrupted second.</em>
              </>
            }
            link="/collections"
          />
          <div className="product-grid featured-grid">
            {products.slice(0, 4).map(p => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
        <section className="smart-banner">
          <div className="smart-copy">
            <span className="eyebrow">HORIZON / SIP-GEN2</span>
            <h2>
              Intelligence
              <br />
              <em>at the wrist.</em>
            </h2>
            <p>
              A sapphire micro-OLED, clinical-grade sensors and a 14-day
              solid-state battery. The Horizon is an instrument for the human
              signal.
            </p>
            <Link href="/smartwatches" className="primary-btn yellow">
              Explore Horizon <ArrowRight size={17} />
            </Link>
          </div>
          <div className="smart-stage">
            <div className="metric-ring ring-a">
              <span>ECG</span>
            </div>
            <div className="metric-ring ring-b">
              <span>
                98
                <br />
                <small>SPO2</small>
              </span>
            </div>
            <WatchVisual product={products[11]} />
          </div>
          <div className="smart-features">
            <span>01 / SAPPHIRE MICRO-OLED</span>
            <span>02 / CLINICAL BIOMETRICS</span>
            <span>03 / DUAL-BAND TELEMETRY</span>
          </div>
        </section>
        <section className="story-section">
          <div className="story-index">
            <span className="eyebrow">02 / THE ARCHITECTURE OF SECONDS</span>
            <strong>1888—2026</strong>
          </div>
          <div className="story-copy">
            <h2>
              Centuries of
              <br />
              <em>geometry.</em>
            </h2>
            <p>
              We build timepieces at the intersection of hand-finished
              mechanics, aerospace metallurgy and silicon engineering. Nothing
              ornamental. Nothing accidental.
            </p>
            <Link href="/craftsmanship" className="text-link">
              Trace the architecture <ArrowRight size={15} />
            </Link>
          </div>
          <div className="story-diagram">
            <div className="diagram-circle">
              <span>AT</span>
            </div>
            <div className="diagram-line line-a" />
            <div className="diagram-line line-b" />
            <span className="diagram-note note-a">GRADE 5 TITANIUM</span>
            <span className="diagram-note note-b">28,800 VPH</span>
          </div>
        </section>
        <section className="section-block best-section">
          <SectionHeader
            eyebrow="Collector signal / 04—16"
            title={
              <>
                Selected by
                <br />
                <em>the exacting.</em>
              </>
            }
          />
          <div className="filter-row">
            {["All best sellers", "Mechanical", "Smart", "Minimalist"].map(
              f => (
                <button
                  className={bestFilter === f ? "active" : ""}
                  onClick={() => setBestFilter(f)}
                  key={f}
                >
                  {f}
                </button>
              )
            )}
          </div>
          <div className="product-grid">
            {best.map(p => (
              <ProductCard key={p.id} product={p} compact />
            ))}
          </div>
        </section>
        <section className="craft-strip">
          <div>
            <span className="eyebrow">ENGINEERED IN LAYERS</span>
            <h2>
              Under the
              <br />
              <em>surface.</em>
            </h2>
          </div>
          <div className="craft-layers">
            <div>
              <b>01</b>
              <span>
                SAPPHIRE
                <br />
                CRYSTAL
              </span>
            </div>
            <div>
              <b>02</b>
              <span>
                TITANIUM
                <br />
                MONOBLOC
              </span>
            </div>
            <div>
              <b>03</b>
              <span>
                IN-HOUSE
                <br />
                CALIBER
              </span>
            </div>
            <div>
              <b>04</b>
              <span>
                INTEGRATED
                <br />
                BRACELET
              </span>
            </div>
          </div>
          <Link href="/craftsmanship" className="text-link">
            Explore the build <ArrowRight size={15} />
          </Link>
        </section>
        <section className="limited-callout">
          <div>
            <span className="eyebrow">LIMITED ALLOCATION / 015—250</span>
            <h2>
              Zero-G
              <br />
              <em>Carbon.</em>
            </h2>
            <p>
              Forged carbon. Luminous ceramic. One of 250 serialized
              instruments.
            </p>
            <Link href="/limited-editions" className="dark-btn">
              Reserve your serial <ArrowRight size={17} />
            </Link>
          </div>
          <div className="limited-art">
            <WatchVisual product={products[14]} />
            <div className="allocation">
              <span>ALLOCATION REMAINING</span>
              <strong>
                03 <small>/ 250</small>
              </strong>
              <i>
                <b />
              </i>
            </div>
          </div>
        </section>
        <section className="quote-section">
          <span className="eyebrow">COLLECTOR TRANSMISSIONS / 06</span>
          <blockquote>
            “AETHER does not ask whether you are a mechanical or digital person.
            It asks what you want time to become.”
          </blockquote>
          <span className="quote-by">
            — MARC L. / INDUSTRIAL DESIGNER / GENEVA
          </span>
        </section>
      </main>
      <Footer />
    </>
  );
}
function Collections() {
  const params = new URLSearchParams(window.location.search);
  const [query, setQuery] = useState(params.get("category") ?? "");
  const [sort, setSort] = useState("Featured");
  const [filter, setFilter] = useState("All");
  const [maxPrice, setMaxPrice] = useState(16000);
  const [stockOnly, setStockOnly] = useState(false);
  const [list, setList] = useState(false);
  const result = useMemo(() => {
    let list = products.filter(
      p =>
        (!query ||
          `${p.name} ${p.category} ${p.movement} ${p.caseMaterial}`
            .toLowerCase()
            .includes(query.toLowerCase())) &&
        (filter === "All" || p.category === filter) &&
        p.price <= maxPrice &&
        (!stockOnly || p.stock > 0)
    );
    return sort === "Price: low"
      ? [...list].sort((a, b) => a.price - b.price)
      : sort === "Price: high"
        ? [...list].sort((a, b) => b.price - a.price)
        : list;
  }, [query, sort, filter, maxPrice, stockOnly]);
  return (
    <>
      <main className="collection-page">
        <div className="page-heading">
          <span className="eyebrow">AETHER / CATALOG 001—016</span>
          <h1>
            Find your
            <br />
            <em>frequency.</em>
          </h1>
          <p>
            Eight systems. One uncompromising approach to the passage of time.
          </p>
        </div>
        <div className="catalog-tools">
          <div className="tool-search">
            <Search size={16} />
            <input
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder="Search the catalog"
            />
          </div>
          <div className="tool-controls">
            <select value={filter} onChange={e => setFilter(e.target.value)}>
              <option>All</option>
              {categories.map(c => (
                <option key={c.name}>{c.name}</option>
              ))}
            </select>
            <select value={sort} onChange={e => setSort(e.target.value)}>
              <option>Featured</option>
              <option>Price: low</option>
              <option>Price: high</option>
            </select>
            <label className="price-range">
              <span>MAX {formatPrice(maxPrice, "USD")}</span>
              <input
                type="range"
                min="1600"
                max="16000"
                step="400"
                value={maxPrice}
                onChange={e => setMaxPrice(Number(e.target.value))}
                aria-label="Maximum price"
              />
            </label>
            <button
              className={stockOnly ? "active" : ""}
              onClick={() => setStockOnly(v => !v)}
            >
              In stock
            </button>
            <button
              className={list ? "active" : ""}
              onClick={() => setList(!list)}
            >
              View {list ? "grid" : "list"}
            </button>
          </div>
        </div>
        <div className={`catalog-grid ${list ? "list-view" : ""}`}>
          {result.map(p => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
        {!result.length && (
          <div className="empty-state catalog-empty">
            <Sparkles />
            <h3>No instrument found.</h3>
            <p>Try another category, material or caliber.</p>
          </div>
        )}
      </main>
      <Footer />
    </>
  );
}
function ProductDetail({ slug }: { slug: string }) {
  const product = products.find(p => p.slug === slug) ?? products[0];
  const { addToCart, currency, toggleWishlist, isWishlisted } = useStore();
  const [strap, setStrap] = useState(product.strap);
  const [qty, setQty] = useState(1);
  return (
    <>
      <main className="detail-page">
        <div className="detail-visual">
          <span className="eyebrow">{product.ref} / TECHNICAL OBJECT</span>
          <WatchVisual product={product} />
          <div className="visual-caption">
            <span>01 / FRONT DIAL</span>
            <span>SWIPE TO ROTATE</span>
          </div>
        </div>
        <div className="detail-copy">
          <span className="eyebrow">
            {product.category} / {product.badge ?? "AETHER SYSTEM"}
          </span>
          <h1>{product.name}</h1>
          <p className="detail-lede">{product.description}</p>
          <div className="detail-price">
            {formatPrice(product.price, currency)}{" "}
            <span>INCL. DUTIES & TAXES</span>
          </div>
          <div className="detail-select">
            <span>STRAP / MATERIAL</span>
            <div>
              {[product.strap, "Brushed titanium", "Obsidian leather"].map(
                s => (
                  <button
                    key={s}
                    className={strap === s ? "active" : ""}
                    onClick={() => setStrap(s)}
                  >
                    {s}
                  </button>
                )
              )}
            </div>
          </div>
          <div className="detail-actions">
            <div className="qty">
              <button onClick={() => setQty(Math.max(1, qty - 1))}>
                <Minus size={13} />
              </button>
              <span>{qty}</span>
              <button onClick={() => setQty(qty + 1)}>
                <Plus size={13} />
              </button>
            </div>
            <button
              className="primary-btn"
              onClick={() => {
                for (let i = 0; i < qty; i++) addToCart(product);
                toast.success(`${product.name} added to bag`);
              }}
            >
              Add to bag <ArrowRight size={17} />
            </button>
            <button
              className={`heart-square ${isWishlisted(product.id) ? "active" : ""}`}
              onClick={() => toggleWishlist(product.id)}
            >
              <Heart
                size={18}
                fill={isWishlisted(product.id) ? "currentColor" : "none"}
              />
            </button>
          </div>
          <div className="detail-notes">
            <div>
              <ShieldCheck size={18} />
              <span>
                <b>5-year international warranty</b>Hand-finished and
                individually tested.
              </span>
            </div>
            <div>
              <PackageCheck size={18} />
              <span>
                <b>Insured express delivery</b>Complimentary delivery to
                supported destinations.
              </span>
            </div>
          </div>
          <div className="spec-table">
            {[
              ["MOVEMENT", product.movement],
              ["CASE", product.caseMaterial],
              ["WATER", product.water],
              [
                "STOCK",
                product.stock < 6
                  ? `${product.stock} allocated`
                  : "Ready to ship",
              ],
            ].map(([a, b]) => (
              <div key={a}>
                <span>{a}</span>
                <strong>{b}</strong>
              </div>
            ))}
          </div>
        </div>
      </main>
      <section className="related section-block">
        <SectionHeader
          eyebrow="Continue the signal"
          title={
            <>
              Related
              <br />
              <em>instruments.</em>
            </>
          }
        />
        <div className="product-grid">
          {products
            .filter(p => p.id !== product.id && p.category === product.category)
            .slice(0, 3)
            .map(p => (
              <ProductCard key={p.id} product={p} />
            ))}
        </div>
      </section>
      <Footer />
    </>
  );
}
function EditorialPage({
  type,
}: {
  type: "smart" | "mechanical" | "limited" | "craft" | "contact";
}) {
  const data = {
    smart: {
      over: "HORIZON / BIOMETRIC SYSTEM",
      title: (
        <>
          The body
          <br />
          <em>in motion.</em>
        </>
      ),
      copy: "Clinical-grade sensors, a sapphire micro-OLED and 14 days of reserve. Horizon turns the body into a live, legible instrument.",
      link: "/collections?category=Modern Smartwatch",
      cta: "Shop Horizon",
      product: products[11],
    },
    mechanical: {
      over: "MECHANICAL / CALIBER AT",
      title: (
        <>
          Time,
          <br />
          <em>disassembled.</em>
        </>
      ),
      copy: "Skeletonized bridges, visible balance wheels and a 72-hour power reserve. The mechanical collection keeps its promises where you can see them.",
      link: "/collections?category=Premium Mechanical",
      cta: "Explore mechanical",
      product: products[6],
    },
    limited: {
      over: "LIMITED EDITIONS / SERIALIZED",
      title: (
        <>
          Nothing
          <br />
          <em>repeated.</em>
        </>
      ),
      copy: "Numbered carbon cases and luminous ceramic bezels for collectors who want the story to include their serial.",
      link: "/product/ae-15-zero-g-carbon",
      cta: "Reserve Zero-G",
      product: products[14],
    },
    craft: {
      over: "CRAFTSMANSHIP / THE ATELIER",
      title: (
        <>
          Built in
          <br />
          <em>layers.</em>
        </>
      ),
      copy: "From raw titanium to the final sweep of a second hand, every AETHER instrument is shaped by a choreography of material, force and light.",
      link: "/collections",
      cta: "View the collection",
      product: products[0],
    },
    contact: {
      over: "CONCIERGE / GLOBAL SERVICE",
      title: (
        <>
          Start a<br />
          <em>conversation.</em>
        </>
      ),
      copy: "Our collectors' desk can advise on fit, movement, delivery windows, servicing and private appointments across time zones.",
      link: "/collections",
      cta: "Explore timepieces",
      product: products[1],
    },
  }[type];
  return (
    <>
      <main className={`editorial-page ${type}`}>
        <div className="editorial-copy">
          <span className="eyebrow">{data.over}</span>
          <h1>{data.title}</h1>
          <p>{data.copy}</p>
          {type === "contact" ? (
            <form
              className="contact-form"
              onSubmit={e => {
                e.preventDefault();
                toast.success("Transmission received", {
                  description:
                    "A collector concierge will respond within one business day.",
                });
              }}
            >
              <input required placeholder="Name" />
              <input required type="email" placeholder="Email" />
              <select>
                <option>I'm interested in...</option>
                <option>Mechanical timepieces</option>
                <option>Horizon smartwatches</option>
                <option>Private collector service</option>
              </select>
              <textarea required placeholder="How can we help?" />
              <button className="primary-btn">
                Send transmission <ArrowRight size={17} />
              </button>
            </form>
          ) : (
            <Link href={data.link} className="primary-btn">
              {data.cta} <ArrowRight size={17} />
            </Link>
          )}
        </div>
        <div className="editorial-stage">
          <span className="stage-number">
            0
            {type === "smart"
              ? "3"
              : type === "mechanical"
                ? "4"
                : type === "limited"
                  ? "5"
                  : type === "craft"
                    ? "6"
                    : "7"}
          </span>
          <WatchVisual product={data.product} />
          <div className="stage-specs">
            <span>CASE / {data.product.caseMaterial}</span>
            <span>RESERVE / {data.product.specs[1]}</span>
            <span>WATER / {data.product.water}</span>
          </div>
        </div>
      </main>
      <section className="editorial-lower">
        <span className="eyebrow">AETHER PRINCIPLE</span>
        <h2>
          Precision is not
          <br />
          <em>a style. It is a standard.</em>
        </h2>
      </section>
      <Footer />
    </>
  );
}
function NotFound() {
  return (
    <main className="not-found">
      <span className="eyebrow">ERROR / 404</span>
      <h1>
        Signal
        <br />
        <em>lost.</em>
      </h1>
      <Link href="/" className="primary-btn">
        Return to origin <ArrowRight size={17} />
      </Link>
    </main>
  );
}
function AppShell() {
  const [location] = useLocation();
  return (
    <>
      <Header />
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/collections" component={Collections} />
        <Route path="/product/:slug">
          {params => <ProductDetail slug={params.slug} />}
        </Route>
        <Route path="/smartwatches">
          {() => <EditorialPage type="smart" />}
        </Route>
        <Route path="/mechanical">
          {() => <EditorialPage type="mechanical" />}
        </Route>
        <Route path="/limited-editions">
          {() => <EditorialPage type="limited" />}
        </Route>
        <Route path="/craftsmanship">
          {() => <EditorialPage type="craft" />}
        </Route>
        <Route path="/contact">{() => <EditorialPage type="contact" />}</Route>
        <Route path="/404" component={NotFound} />
        <Route component={NotFound} />
      </Switch>
      <CartDrawer />
      <SearchModal />
      {location !== "/404" && <div className="cursor-reticle" />}
    </>
  );
}
export default function App() {
  return (
    <StoreProvider>
      <AppShell />
      <Toaster position="bottom-right" theme="dark" />
    </StoreProvider>
  );
}
