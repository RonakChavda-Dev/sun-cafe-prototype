import type { PhotoKey } from "./photos";

/* ------------------------------------------------------------------ */
/* Menu                                                                */
/* ------------------------------------------------------------------ */

export type MenuCategory = "espresso" | "slow" | "cold" | "other" | "oven";

export const MENU_CATEGORIES: { id: MenuCategory; label: string; note: string }[] = [
  { id: "espresso", label: "Espresso bar", note: "Pulled to order at the north counter." },
  { id: "slow", label: "Slow bar", note: "Filter and pour-over, poured where you can watch." },
  { id: "cold", label: "Cold", note: "For the hours when the window bar gets warm." },
  { id: "other", label: "Not coffee", note: "For the person you came with." },
  { id: "oven", label: "From the oven", note: "Whatever the morning bake decided." },
];

export type MenuItem = {
  name: string;
  category: MenuCategory;
  description: string;
  photo: PhotoKey;
  /** the hour the item is paired with, minutes after midnight */
  pairedAt: number;
  servedIn: string;
};

export const MENU: MenuItem[] = [
  {
    name: "The House Cup",
    category: "espresso",
    description: "Espresso, steamed milk and a soft cocoa finish. The one most people stop asking about.",
    photo: "flatWhiteTop",
    pairedAt: 8 * 60 + 30,
    servedIn: "Ivory stoneware, saucer and spoon",
  },
  {
    name: "Window Seat",
    category: "espresso",
    description: "A cappuccino with a deep cap of foam, made a little smaller than you expect.",
    photo: "cappuccinoBrown",
    pairedAt: 10 * 60,
    servedIn: "Brown glaze, thick wall",
  },
  {
    name: "Short & Dark",
    category: "espresso",
    description: "A double espresso, pulled into glass so you can see where it stops.",
    photo: "doubleShot",
    pairedAt: 11 * 60 + 15,
    servedIn: "Small glass, water on the side",
  },
  {
    name: "Golden Hour",
    category: "espresso",
    description: "A warm, mellow latte-inspired signature with a toasted-milk edge. Ordered most once the west windows light up.",
    photo: "goldenLatte",
    pairedAt: 17 * 60 + 45,
    servedIn: "Wide cup, low saucer",
  },
  {
    name: "Night Shift",
    category: "espresso",
    description: "A deeper, bolder espresso-based drink for the last light and the first lamp.",
    photo: "cortadoDark",
    pairedAt: 19 * 60 + 30,
    servedIn: "Charcoal glaze",
  },
  {
    name: "First Light",
    category: "slow",
    description: "A clean filter coffee, poured slowly into a warmed carafe while the hall is still blue.",
    photo: "dripCarafe",
    pairedAt: 6 * 60 + 45,
    servedIn: "Glass carafe, one cup",
  },
  {
    name: "Bloom",
    category: "slow",
    description: "A single paper-filter cup. The barista stops talking for the first thirty seconds.",
    photo: "filterTop",
    pairedAt: 13 * 60,
    servedIn: "Handleless cup",
  },
  {
    name: "The Long Pour",
    category: "slow",
    description: "Pour-over for two, brewed at the slow bar and carried to your table in the kettle's wake.",
    photo: "copperKettle",
    pairedAt: 15 * 60,
    servedIn: "Two small cups, shared",
  },
  {
    name: "Afternoon Ice",
    category: "cold",
    description: "Espresso over cold milk and ice. Stir it, or watch it settle on its own.",
    photo: "icedPour",
    pairedAt: 14 * 60 + 30,
    servedIn: "Tumbler",
  },
  {
    name: "Marble",
    category: "cold",
    description: "An iced latte in a ribbed glass, swirled just enough to keep its layers.",
    photo: "icedRibbed",
    pairedAt: 16 * 60,
    servedIn: "Tall ribbed glass",
  },
  {
    name: "Slow Melt",
    category: "cold",
    description: "Cold coffee first, milk poured over the ice at the table.",
    photo: "icedMilkPour",
    pairedAt: 15 * 60 + 30,
    servedIn: "Rocks glass",
  },
  {
    name: "Green Hour",
    category: "other",
    description: "A matcha latte, whisked and poured with a heart. For the one who doesn't drink coffee.",
    photo: "matcha",
    pairedAt: 16 * 60 + 30,
    servedIn: "White cup",
  },
  {
    name: "Something on the Side",
    category: "oven",
    description: "A rotating pastry pairing. Whatever the oven decided this morning, cut to share or not.",
    photo: "croissants",
    pairedAt: 11 * 60,
    servedIn: "Slate, sugar to finish",
  },
  {
    name: "Butter & Patience",
    category: "oven",
    description: "A plain croissant, laminated the slow way. Best before ten.",
    photo: "croissantDark",
    pairedAt: 8 * 60,
    servedIn: "Paper and a plate",
  },
  {
    name: "The Afternoon Slice",
    category: "oven",
    description: "Chocolate cake on a wooden round, with whatever fruit came in that week.",
    photo: "cakeWood",
    pairedAt: 15 * 60 + 30,
    servedIn: "Oak round",
  },
  {
    name: "Dark Slice",
    category: "oven",
    description: "A tall layered chocolate cake, cut thin. Made for sharing after the lamps come on.",
    photo: "cakeDark",
    pairedAt: 18 * 60 + 30,
    servedIn: "Black plate, brass fork",
  },
];

/* ------------------------------------------------------------------ */
/* Home                                                                */
/* ------------------------------------------------------------------ */

export const DAY_MOMENTS: { time: number; title: string; body: string; photo: PhotoKey }[] = [
  {
    time: 7 * 60 + 15,
    title: "Before the first chair",
    body: "Low light runs the length of the window bar. The slow bar pours its first carafe.",
    photo: "morningMug",
  },
  {
    time: 12 * 60 + 30,
    title: "High noon, short shadows",
    body: "The sun climbs over the roof and drops two bright squares through the skylights by the bar.",
    photo: "glassShadow",
  },
  {
    time: 17 * 60 + 45,
    title: "The west windows wake up",
    body: "The lounge turns honey-coloured and Golden Hour becomes the most ordered thing on the menu.",
    photo: "goldenWindow",
  },
  {
    time: 19 * 60 + 45,
    title: "Lamps over every table",
    body: "Thirteen low lamps take over from the sun. The hall gets quieter, not emptier.",
    photo: "eveningBanquette",
  },
];

/* ------------------------------------------------------------------ */
/* About                                                               */
/* ------------------------------------------------------------------ */

export const PRINCIPLES: { title: string; body: string; photo: PhotoKey }[] = [
  {
    title: "Light, not glare",
    body: "One generous wall of glass, sheer linen where it is needed and pale walls everywhere else. A place designed around the changing day rather than against it.",
    photo: "sunCup",
  },
  {
    title: "Room to linger",
    body: "Sixty-odd seats, spread wide. Deep sofas in the west corner, and nobody clearing your cup while there is still coffee in it.",
    photo: "windowSeats",
  },
  {
    title: "Details that matter",
    body: "A thumb rest in every handle, oak worn soft at the edges, spoons heavier than they need to be.",
    photo: "cupSaucer",
  },
  {
    title: "Coffee without the ceremony",
    body: "Plain words on the menu and questions answered gladly. You can order the House Cup without a glossary.",
    photo: "latteLeaf",
  },
];

/** `photo` is used on the home page, `altPhoto` on the About page. */
export const PROCESS: { title: string; body: string; photo: PhotoKey; altPhoto: PhotoKey }[] = [
  { title: "The bean", body: "Roasted for the moment it will be drunk in, not for the shelf.", photo: "beansBowl", altPhoto: "beansMacro" },
  { title: "The shot", body: "Pulled to order, watched until the stream turns pale, then stopped.", photo: "espressoDrip", altPhoto: "espressoDrip" },
  { title: "The pour", body: "Slow-bar coffee is poured where you can see it, and nobody hurries it.", photo: "pourOver", altPhoto: "filterTop" },
  { title: "The cup", body: "Served in stoneware made thick enough to keep it warm into the second chapter.", photo: "latteLeaf", altPhoto: "cappuccinoBrown" },
];

export const HOUSE_DETAILS = [
  { title: "The menu shortens at four.", body: "The afternoon list is slower and a little sweeter, written for the warmer light." },
  { title: "Seats face the window, not the door.", body: "Every table was placed by where its light lands at ten in the morning." },
  { title: "There is one clock, and it is on the wall.", body: "No screens behind the counter. The light usually tells you the time anyway." },
  { title: "The lamps come on one table at a time.", body: "Starting with the long tables, finishing at the window bar." },
];

/* ------------------------------------------------------------------ */
/* Visit                                                               */
/* ------------------------------------------------------------------ */

export const FAQ = [
  {
    q: "Is Sun Cafe a real place?",
    a: "No. Sun Cafe is a fictional brand created for a design portfolio. There is no shop, no team and nothing to buy. The menu, the hall and the copy are all invented.",
  },
  {
    q: "Where is it?",
    a: "Nowhere you can walk to. We have deliberately left out an address, phone number and opening hours rather than make them up.",
  },
  {
    q: "Are the photographs of Sun Cafe?",
    a: "No. They are freely licensed photographs from Unsplash, chosen to show the mood of the place. Each photographer is listed on the credits page.",
  },
  {
    q: "What is the 3D hall?",
    a: "A real-time model built for this site, furnished with freely licensed (CC0) furniture from Poly Haven. The sun is calculated from the slider, so the light and shadows follow the time you choose.",
  },
  {
    q: "Can I book a table?",
    a: "Not here. The seat finder on this page is a way to explore the hall, not a reservation. Nothing you choose is sent anywhere.",
  },
];
