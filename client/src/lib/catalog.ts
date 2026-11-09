export type Category =
  | "Luxury Analog"
  | "Contemporary Designer"
  | "Minimalist"
  | "Premium Mechanical"
  | "Digital"
  | "Modern Smartwatch"
  | "Fitness & Lifestyle"
  | "Limited Edition";

export type Product = {
  id: string;
  slug: string;
  name: string;
  ref: string;
  category: Category;
  price: number;
  badge?: string;
  description: string;
  movement: string;
  caseMaterial: string;
  strap: string;
  water: string;
  stock: number;
  rating: number;
  specs: string[];
  accent: string;
  limited?: boolean;
  smart?: boolean;
};

export const categories: { name: Category; count: number; tone: string }[] = [
  { name: "Luxury Analog", count: 3, tone: "haute" },
  { name: "Contemporary Designer", count: 2, tone: "design" },
  { name: "Minimalist", count: 2, tone: "mono" },
  { name: "Premium Mechanical", count: 3, tone: "mechanical" },
  { name: "Digital", count: 2, tone: "digital" },
  { name: "Modern Smartwatch", count: 2, tone: "smart" },
  { name: "Fitness & Lifestyle", count: 1, tone: "active" },
  { name: "Limited Edition", count: 2, tone: "limited" },
];

export const products: Product[] = [
  {
    id: "ae-01",
    slug: "ae-01-orbit-tourbillon",
    name: "Orbit Tourbillon",
    ref: "AE-01 / OBT",
    category: "Luxury Analog",
    price: 12800,
    badge: "Flagship",
    description:
      "A suspended flying tourbillon framed by a sapphire architecture.",
    movement: "AT-01 Flying Tourbillon",
    caseMaterial: "Grade 5 Titanium",
    strap: "Black alligator",
    water: "5 ATM / 50M",
    stock: 7,
    rating: 4.9,
    specs: ["42mm case", "72-hour reserve", "28,800 vph"],
    accent: "blue",
  },
  {
    id: "ae-02",
    slug: "ae-02-meridian-chrono",
    name: "Meridian Chronograph",
    ref: "AE-02 / MCR",
    category: "Luxury Analog",
    price: 9400,
    badge: "New",
    description:
      "A precision chronograph with a midnight register layout and gold seconds hand.",
    movement: "AM-04 Automatic Chronograph",
    caseMaterial: "Brushed Titanium",
    strap: "Navy calfskin",
    water: "10 ATM / 100M",
    stock: 12,
    rating: 4.8,
    specs: ["41mm case", "Column wheel", "Sapphire crystal"],
    accent: "yellow",
  },
  {
    id: "ae-03",
    slug: "ae-03-axis-atelier",
    name: "Axis Atelier",
    ref: "AE-03 / AXL",
    category: "Contemporary Designer",
    price: 6800,
    description:
      "An asymmetric dial cut from the coordinates of a single second.",
    movement: "AA-02 Micro-rotor",
    caseMaterial: "DLC Titanium",
    strap: "Integrated rubber",
    water: "5 ATM / 50M",
    stock: 15,
    rating: 4.7,
    specs: ["39mm case", "Micro-rotor", "AR sapphire"],
    accent: "cyan",
  },
  {
    id: "ae-04",
    slug: "ae-04-vector-01",
    name: "Vector 01",
    ref: "AE-04 / VCT",
    category: "Contemporary Designer",
    price: 5200,
    description: "Architectural volume, reduced to its most exact silhouette.",
    movement: "AV-01 Automatic",
    caseMaterial: "316L Steel",
    strap: "Ceramic link",
    water: "10 ATM / 100M",
    stock: 9,
    rating: 4.8,
    specs: ["40mm case", "72-hour reserve", "Ceramic bezel"],
    accent: "blue",
  },
  {
    id: "ae-05",
    slug: "ae-05-linear",
    name: "Linear",
    ref: "AE-05 / LNR",
    category: "Minimalist",
    price: 2400,
    description:
      "An ultra-thin study in monochrome balance and negative space.",
    movement: "AL-01 Quartz",
    caseMaterial: "Titanium",
    strap: "Steel mesh",
    water: "5 ATM / 50M",
    stock: 24,
    rating: 4.6,
    specs: ["7.2mm thin", "38mm case", "Swiss quartz"],
    accent: "silver",
  },
  {
    id: "ae-06",
    slug: "ae-06-axiom",
    name: "Axiom",
    ref: "AE-06 / AXM",
    category: "Minimalist",
    price: 2900,
    description:
      "Bauhaus geometry with a luminous edge and a silent seconds track.",
    movement: "AX-02 Automatic",
    caseMaterial: "Brushed Steel",
    strap: "Obsidian leather",
    water: "5 ATM / 50M",
    stock: 18,
    rating: 4.7,
    specs: ["40mm case", "42-hour reserve", "Domed sapphire"],
    accent: "cyan",
  },
  {
    id: "ae-07",
    slug: "ae-07-kinetic-skeleton",
    name: "Kinetic Skeleton",
    ref: "AE-07 / KSN",
    category: "Premium Mechanical",
    price: 11200,
    badge: "Collector",
    description: "The balance wheel is the dial. Every oscillation is visible.",
    movement: "AK-07 Skeleton Automatic",
    caseMaterial: "Forged Carbon",
    strap: "FKM rubber",
    water: "10 ATM / 100M",
    stock: 4,
    rating: 5,
    specs: ["44mm case", "72-hour reserve", "Openworked bridges"],
    accent: "yellow",
  },
  {
    id: "ae-08",
    slug: "ae-08-power-reserve",
    name: "Power Reserve 72",
    ref: "AE-08 / P72",
    category: "Premium Mechanical",
    price: 7800,
    description: "A technical reserve indicator built for the long weekend.",
    movement: "AP-08 Automatic",
    caseMaterial: "Grade 5 Titanium",
    strap: "Nylon weave",
    water: "10 ATM / 100M",
    stock: 6,
    rating: 4.9,
    specs: ["42mm case", "72-hour reserve", "Power indicator"],
    accent: "blue",
  },
  {
    id: "ae-09",
    slug: "ae-09-regulator",
    name: "Regulator 09",
    ref: "AE-09 / REG",
    category: "Premium Mechanical",
    price: 8900,
    description:
      "Independent hours, minutes and seconds in one calibrated field.",
    movement: "AR-09 Regulator",
    caseMaterial: "Brushed Titanium",
    strap: "Black alligator",
    water: "5 ATM / 50M",
    stock: 11,
    rating: 4.8,
    specs: ["41mm case", "60-hour reserve", "Regulator dial"],
    accent: "cyan",
  },
  {
    id: "ae-10",
    slug: "ae-10-pixel",
    name: "Pixel / 1984",
    ref: "AE-10 / PXL",
    category: "Digital",
    price: 1650,
    badge: "Reissued",
    description:
      "A high-contrast matrix display with a deliberately low-resolution soul.",
    movement: "A-Digital Matrix",
    caseMaterial: "Aerospace Alloy",
    strap: "Silicone",
    water: "5 ATM / 50M",
    stock: 31,
    rating: 4.6,
    specs: ["36mm case", "OLED matrix", "10-year cell"],
    accent: "yellow",
  },
  {
    id: "ae-11",
    slug: "ae-11-nightcode",
    name: "Nightcode",
    ref: "AE-11 / NCD",
    category: "Digital",
    price: 2100,
    description:
      "Night-vision numerals, haptic crown and a programmable time field.",
    movement: "A-Digital OLED",
    caseMaterial: "DLC Alloy",
    strap: "FKM rubber",
    water: "10 ATM / 100M",
    stock: 14,
    rating: 4.7,
    specs: ["41mm case", "Always-on OLED", "Crown haptics"],
    accent: "blue",
  },
  {
    id: "ae-12",
    slug: "ae-12-horizon-one",
    name: "Horizon One",
    ref: "AE-12 / HRZ",
    category: "Modern Smartwatch",
    price: 3600,
    badge: "Smart flagship",
    description: "A sapphire micro-OLED instrument for the always curious.",
    movement: "Aether SiP / Gen 2",
    caseMaterial: "Unibody Titanium",
    strap: "Titanium link",
    water: "10 ATM / 100M",
    stock: 19,
    rating: 4.9,
    specs: ["1.9-inch micro-OLED", "14-day battery", "ECG / SpO2"],
    accent: "cyan",
    smart: true,
  },
  {
    id: "ae-13",
    slug: "ae-13-horizon-air",
    name: "Horizon Air",
    ref: "AE-13 / AIR",
    category: "Modern Smartwatch",
    price: 2800,
    description:
      "The lighter biometric instrument for long days and longer horizons.",
    movement: "Aether SiP / Air",
    caseMaterial: "Grade 5 Titanium",
    strap: "FKM fluoroelastomer",
    water: "10 ATM / 100M",
    stock: 22,
    rating: 4.8,
    specs: ["1.7-inch micro-OLED", "10-day battery", "Sleep telemetry"],
    accent: "blue",
    smart: true,
  },
  {
    id: "ae-14",
    slug: "ae-14-athlete",
    name: "Athlete / Dual-GPS",
    ref: "AE-14 / ATH",
    category: "Fitness & Lifestyle",
    price: 2450,
    badge: "Performance",
    description: "Dual-frequency GPS, ECG and SpO2 in a case built for motion.",
    movement: "Aether Performance SiP",
    caseMaterial: "Aerospace Titanium",
    strap: "FKM performance",
    water: "10 ATM / 100M",
    stock: 16,
    rating: 4.8,
    specs: ["Dual-frequency GPS", "ECG / SpO2", "100m water resistance"],
    accent: "yellow",
    smart: true,
  },
  {
    id: "ae-15",
    slug: "ae-15-zero-g-carbon",
    name: "Zero-G Carbon",
    ref: "AE-15 / ZGC",
    category: "Limited Edition",
    price: 14800,
    badge: "1 of 250",
    description:
      "Forged carbon, luminous ceramic and a serial reserved for one collector.",
    movement: "AZ-15 Tourbillon",
    caseMaterial: "Forged Carbon",
    strap: "FKM rubber",
    water: "10 ATM / 100M",
    stock: 3,
    rating: 5,
    specs: ["44mm case", "Limited to 250", "Luminous ceramic bezel"],
    accent: "yellow",
    limited: true,
  },
  {
    id: "ae-16",
    slug: "ae-16-lunar-archive",
    name: "Lunar Archive",
    ref: "AE-16 / LAR",
    category: "Limited Edition",
    price: 9900,
    badge: "1 of 100",
    description:
      "A numbered moonphase archive piece, delivered with an atelier dossier.",
    movement: "AL-16 Moonphase",
    caseMaterial: "Ceramic + Titanium",
    strap: "Nubuck leather",
    water: "5 ATM / 50M",
    stock: 2,
    rating: 4.9,
    specs: ["42mm case", "100-piece series", "Moonphase display"],
    accent: "cyan",
    limited: true,
  },
];

export const currencyRates: Record<string, number> = {
  USD: 1,
  EUR: 0.92,
  GBP: 0.78,
  JPY: 154,
  CHF: 0.89,
  INR: 84,
  AED: 3.67,
};
export const currencySymbols: Record<string, string> = {
  USD: "$",
  EUR: "€",
  GBP: "£",
  JPY: "¥",
  CHF: "CHF ",
  INR: "₹",
  AED: "AED ",
};
export const currencyLocales: Record<string, string> = {
  USD: "en-US",
  EUR: "de-DE",
  GBP: "en-GB",
  JPY: "ja-JP",
  CHF: "de-CH",
  INR: "en-IN",
  AED: "en-AE",
};

export function formatPrice(amount: number, currency: string) {
  const value = amount * (currencyRates[currency] ?? 1);
  return new Intl.NumberFormat(currencyLocales[currency] ?? "en-US", {
    style: "currency",
    currency,
    maximumFractionDigits: currency === "JPY" ? 0 : 0,
  }).format(value);
}
