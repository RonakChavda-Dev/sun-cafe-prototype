import type { StaticImageData } from "next/image";

import barHall from "@/public/images/bar-hall.jpg";
import barMachine from "@/public/images/bar-machine.jpg";
import beansBowl from "@/public/images/beans-bowl.jpg";
import beansMacro from "@/public/images/beans-macro.jpg";
import bigHall from "@/public/images/big-hall.jpg";
import cakeDark from "@/public/images/cake-dark.jpg";
import cakeWood from "@/public/images/cake-wood.jpg";
import cappuccinoBrown from "@/public/images/cappuccino-brown.jpg";
import copperKettle from "@/public/images/copper-kettle.jpg";
import cortadoDark from "@/public/images/cortado-dark.jpg";
import croissantCoffee from "@/public/images/croissant-coffee.jpg";
import croissantDark from "@/public/images/croissant-dark.jpg";
import croissants from "@/public/images/croissants.jpg";
import cupOnBeans from "@/public/images/cup-on-beans.jpg";
import cupSaucer from "@/public/images/cup-saucer.jpg";
import doubleShot from "@/public/images/double-shot.jpg";
import dripCarafe from "@/public/images/drip-carafe.jpg";
import espressoDrip from "@/public/images/espresso-drip.jpg";
import espressoPour from "@/public/images/espresso-pour.jpg";
import eveningBanquette from "@/public/images/evening-banquette.jpg";
import filterTop from "@/public/images/filter-top.jpg";
import flatWhiteTop from "@/public/images/flat-white-top.jpg";
import glassShadow from "@/public/images/glass-shadow.jpg";
import goldenLatte from "@/public/images/golden-latte.jpg";
import goldenRoom from "@/public/images/golden-room.jpg";
import goldenWindow from "@/public/images/golden-window.jpg";
import hallWindows from "@/public/images/hall-windows.jpg";
import heroSteam from "@/public/images/hero-steam.jpg";
import icedMilkPour from "@/public/images/iced-milk-pour.jpg";
import icedPour from "@/public/images/iced-pour.jpg";
import icedRibbed from "@/public/images/iced-ribbed.jpg";
import latteLeaf from "@/public/images/latte-leaf.jpg";
import matcha from "@/public/images/matcha.jpg";
import milkPour from "@/public/images/milk-pour.jpg";
import morningMug from "@/public/images/morning-mug.jpg";
import orangePlants from "@/public/images/orange-plants.jpg";
import plantRoom from "@/public/images/plant-room.jpg";
import pourOver from "@/public/images/pour-over.jpg";
import sunCup from "@/public/images/sun-cup.jpg";
import windowSeats from "@/public/images/window-seats.jpg";

export type Photo = {
  src: StaticImageData;
  alt: string;
  /** photographer credit on Unsplash */
  by: string;
  handle: string;
  /** Unsplash photo page slug */
  slug: string;
};

const p = (src: StaticImageData, alt: string, by: string, handle: string, slug: string): Photo => ({
  src,
  alt,
  by,
  handle,
  slug,
});

export const PHOTOS = {
  heroSteam: p(heroSteam, "A dark cup of coffee steaming on a bed of roasted beans against a black background", "Mayumi Maciel", "mayumimaciel", "a-cup-of-coffee-with-steam-rising-out-of-it-L-qrDZ85eZ8"),
  sunCup: p(sunCup, "A white cup of black coffee on its saucer, half caught in a hard-edged patch of sunlight", "Jocelyn Morales", "molnj", "white-ceramic-teacup-on-saucer-JJeb7OHQ7a8"),
  cupSaucer: p(cupSaucer, "A white cup and saucer with a thin curl of steam on a dark table", "Matheus Bardemaker", "matheus_bardemaker", "white-ceramic-cup-on-white-ceramic-saucer-wn6CTPy5E6Q"),
  glassShadow: p(glassShadow, "A glass mug of black coffee throwing a long amber shadow in bright sun", "Ben Kolde", "benkolde", "clear-glass-mug-filled-with-brown-liquid--sKBWdCyBLg"), // taste-skill-ignore: alt text
  eveningBanquette: p(eveningBanquette, "A dim room with a slatted timber wall, a long leather banquette and small round tables", "99.films", "99films", "round-brown-wooden-tables-beside-black-leather-sofa-yr9l_xQPDL0"),
  hallWindows: p(hallWindows, "A large dark-ceilinged hall with pendant lamps, long tables and tall windows onto trees", "Valeria Kodra", "vkodra", "a-restaurant-with-a-lot-of-tables-and-chairs-tCDMgX44gh4"),
  barMachine: p(barMachine, "An espresso machine on a pale counter under low hanging lamps", "Roman Denisenko", "romandempire", "a-coffee-shop-with-a-coffee-machine-and-lights-UPTYzwX3QME"),
  goldenRoom: p(goldenRoom, "Late sun lighting a wall of plants above bentwood chairs and small tables", "Volodymyr Dobrovolskyy", "vladimir_d", "a-room-with-a-bunch-of-chairs-and-tables-4lZyKFyzmWw"),
  cappuccinoBrown: p(cappuccinoBrown, "A cappuccino with a heart in a brown cup, glowing on a dark counter", "Kae Ng", "ffkae", "cappuccino-in-brown-mug-_sii6-ed508"),
  icedPour: p(icedPour, "Espresso being poured into a glass of iced milk in the dark", "Iqbal Pohan", "_phopoo", "coffee-is-being-poured-into-a-glass-of-iced-milk-8QDQMcghI0E"),
  goldenLatte: p(goldenLatte, "A golden latte with a rosetta, lit warm against a dark tray", "Aviv Rachmadian", "avivrchmdn", "brown-ceramic-teacup-lLdpXTAFic4"),
  flatWhiteTop: p(flatWhiteTop, "A flat white with a rosetta seen from directly above, a spoon resting on the saucer", "Mehrpouya H", "mehrpouya", "a-latte-with-foam-art-and-a-spoon-vFWnvA6blhE"),
  latteLeaf: p(latteLeaf, "A latte with a leaf pattern seen from above on a speckled dark surface", "Ahmet Yüksek", "ahmetyuksek", "a-cup-of-coffee-with-a-leaf-on-top-of-it-bhbirk_C4-w"),
  cortadoDark: p(cortadoDark, "A small latte with a rosetta in a charcoal ceramic cup", "Yasin Onus", "yasinonus", "a-dark-mug-filled-with-latte-art-coffee-gp5qWuzXi18"),
  cupOnBeans: p(cupOnBeans, "A dark cup resting in a pool of light on roasted coffee beans", "Imagine Reality Studio", "imagine_reality_studio", "a-steaming-cup-of-coffee-sits-on-coffee-beans-NomY9GAy9YE"),
  espressoDrip: p(espressoDrip, "A thin stream of espresso falling from a chrome portafilter", "Mohamed Shaffaf", "shaffuscanvas", "espresso-dripping-from-metal-portafilter-RZJRWMnd0DM"),
  espressoPour: p(espressoPour, "Espresso pouring from a bottomless portafilter in a thick caramel ribbon", "Nathan Dumlao", "nate_dumlao", "espresso-pouring-from-portafilter-So7cyDtlmls"),
  doubleShot: p(doubleShot, "Two espresso shots pulling into small glasses on a machine's drip tray", "Kevin Butz", "kevin_butz", "espresso-cups-on-espresso-maker-BBFRIGifYQ8"),
  croissants: p(croissants, "Croissants on dark slate under a fine dusting of sugar", "Mae Mu", "picoftasty", "two-brown-croissants-m9pzwmxm2rk"),
  croissantDark: p(croissantDark, "A single glossy croissant on a dark grey backdrop", "Kivanc Erdirik", "erdirik", "a-croissant-sitting-on-top-of-a-table-J8-Ah0Vmqx4"),
  milkPour: p(milkPour, "A tattooed hand pouring steamed milk into a glass to draw a rosetta", "Nathan Dumlao", "nate_dumlao", "man-pouring-milk-in-coffee-2z3MOB3kfJU"),
  icedMilkPour: p(icedMilkPour, "Milk poured from a steel pitcher into iced coffee on a marble counter", "juan saav", "juansaavma", "milk-pouring-into-iced-coffee--MQXJPMT838"),
  icedRibbed: p(icedRibbed, "Iced coffee and milk marbling inside a tall ribbed glass", "arh Lee", "arhlee_00", "iced-coffee-with-milk-in-a-ribbed-glass-myYFbmoAm1o"),
  beansBowl: p(beansBowl, "A heap of dark roasted coffee beans catching a soft side light", "Andreas Rasmussen", "andreasdress", "coffee-beans-on-black-ceramic-bowl--TMjWA3hQsE"),
  beansMacro: p(beansMacro, "A close view of roasted coffee beans", "Edwin Sarmiento", "esmcreativo", "roasted-coffee-beans-texture-4sf2fvYw_9s"),
  pourOver: p(pourOver, "A thin stream of water falling into a paper pour-over filter", "Kevin Canlas", "kvncnls", "white-and-brown-liquid-in-stainless-steel-cup-WbdkFHDFbTg"),
  dripCarafe: p(dripCarafe, "A gooseneck kettle pouring over a dripper on a glass carafe in warm light", "Beau Carpenter", "btcarpenter", "a-coffee-maker-pouring-coffee-into-a-cup-KGR2u2rG6c4"),
  copperKettle: p(copperKettle, "A copper kettle pouring into a ceramic dripper beside small cups", "Krists Luhaers", "kristsll", "person-pouring-coffee-on-brown-ceramic-mug-BQcLZoUGc1g"),
  filterTop: p(filterTop, "Water poured onto coffee grounds in a paper filter, seen from above", "Patrick Fore", "patrickian4", "water-pouring-on-brown-mug-YWHK_pePhVw"),
  goldenWindow: p(goldenWindow, "Golden evening sun flaring through a window past a houseplant", "Zach Reiner", "_zachreiner_", "houseplant-in-sunlit-window-2vKgG0pSKkM"),
  windowSeats: p(windowSeats, "Window seats with a small table and chairs in warm afternoon light", "Zhaoli JIN", "godling", "a-room-with-a-table-chairs-and-a-window-hVV-xFbOtRA"),
  morningMug: p(morningMug, "A steaming mug on a wooden table casting a long morning shadow toward a bright window", "Aimee Giles", "aim52", "steaming-mug-on-wooden-table-u1QfqxhsrXQ"), // taste-skill-ignore: alt text
  plantRoom: p(plantRoom, "A plant-filled dining room with light falling across rows of tables", "Maria Orlova", "orlovamaria", "dining-area-with-no-people-inside-building-OED9lb8eNoE"),
  bigHall: p(bigHall, "Sun pouring through tall factory windows onto rows of tables and stools", "Natali N", "nattie_nn", "a-room-filled-with-lots-of-tables-and-chairs-gltUMFm_i4Q"),
  orangePlants: p(orangePlants, "Low sun casting window shapes across an orange wall and leafy plants", "Behzad Ghaffarian", "behz", "green-leafed-plants-beside-table-inside-room-SwMlkCip0Vs"),
  barHall: p(barHall, "A wide, high-ceilinged hall with a long lit bar and tall steel windows", "RR Abrot", "rr_abrot", "people-sitting-inside-establishment-pNIgH0y3upM"),
  cakeWood: p(cakeWood, "A slice of chocolate cake on a wooden round with a strawberry", "Hosniye sadeghi", "hosniyesadeghi", "a-piece-of-chocolate-cake-on-a-wooden-plate-ufhXE1mtqpU"),
  cakeDark: p(cakeDark, "A slice of layered chocolate cake on a black plate with brass cutlery", "Pranjall Kumar", "pranjallk1995", "chocolate-cake-on-black-plate-with-fork-Ak4XaExjT2s"),
  matcha: p(matcha, "A matcha latte with a heart, seen from above on dark timber", "Lex Sirikiat", "pundalex", "latte-with-heart-art-aQ77MNhgbEI"),
  croissantCoffee: p(croissantCoffee, "A croissant and a cup of coffee on a dark wooden table", "sofia inductgroup", "sofia_induct", "croissant-and-coffee-on-a-wooden-table-EbBIpXr8ru0"),
} satisfies Record<string, Photo>;

export type PhotoKey = keyof typeof PHOTOS;


/** Anything shown in a photo frame. */
export type Picture = { src: StaticImageData; alt: string };

/** The photograph that stands for each part of the hall, with where to centre a 4:5 crop of it. */
export const ZONE_PHOTOS: Record<string, { photo: PhotoKey; focus: string }> = {
  "window-bar": { photo: "windowSeats", focus: "55% 50%" },
  floor: { photo: "bigHall", focus: "50% 60%" },
  "long-tables": { photo: "hallWindows", focus: "50% 65%" },
  lounge: { photo: "eveningBanquette", focus: "45% 50%" },
  bar: { photo: "barMachine", focus: "40% 50%" },
  "east-room": { photo: "plantRoom", focus: "50% 70%" },
};
