/**
 * Deterministic daylight model for Sun Cafe.
 *
 * Maps a time of day (minutes after midnight, 06:00–20:00) to a sun direction,
 * light colours and intensities. The 3D hall and the UI both read from here.
 */

export type RGB = [number, number, number];
export type Vec3 = [number, number, number];

export const DAY_START = 6 * 60;
export const DAY_END = 20 * 60;

const DEG = Math.PI / 180;

export function clamp(v: number, lo: number, hi: number) {
  return Math.min(hi, Math.max(lo, v));
}

function smoothstep(a: number, b: number, v: number) {
  const t = clamp((v - a) / (b - a), 0, 1);
  return t * t * (3 - 2 * t);
}

export type Sun = {
  /** 0 at 06:00, 1 at 20:00 */
  progress: number;
  /** azimuth from due south, radians (negative = east, morning) */
  azimuth: number;
  elevation: number;
  /**
   * Unit vector pointing from the hall toward the sun, in hall space
   * (x east, y up, z south).
   */
  dir: Vec3;
};

export function sunAt(minutes: number): Sun {
  const hours = minutes / 60;
  const progress = clamp((minutes - DAY_START) / (DAY_END - DAY_START), 0, 1);
  const azimuth = (-62 + 124 * progress) * DEG;
  const arc = Math.max(0, Math.sin((Math.PI * (hours - 5.8)) / 14.4));
  const elevation = Math.max(2.5, 58 * Math.pow(arc, 1.4)) * DEG;
  const dir: Vec3 = [
    -Math.sin(azimuth) * Math.cos(elevation),
    Math.sin(elevation),
    Math.cos(azimuth) * Math.cos(elevation),
  ];
  return { progress, azimuth, elevation, dir };
}

export type Palette = {
  skyTop: RGB;
  skyBottom: RGB;
  light: RGB;
  ambient: RGB;
  ambientLevel: number;
  intensity: number;
};

const hex = (h: string): RGB => [
  parseInt(h.slice(1, 3), 16),
  parseInt(h.slice(3, 5), 16),
  parseInt(h.slice(5, 7), 16),
];

const KEYFRAMES: [number, Palette][] = [
  [6, { skyTop: hex("#7d93b4"), skyBottom: hex("#f1c7a4"), light: hex("#ffc89a"), ambient: hex("#9fb0c8"), ambientLevel: 0.55, intensity: 0.55 }],
  [8, { skyTop: hex("#9cc1db"), skyBottom: hex("#f3e1c8"), light: hex("#ffe2bd"), ambient: hex("#c6d3de"), ambientLevel: 0.75, intensity: 0.85 }],
  [11, { skyTop: hex("#8bbde2"), skyBottom: hex("#dbebf0"), light: hex("#fff4e4"), ambient: hex("#e4e8ea"), ambientLevel: 0.9, intensity: 1 }],
  [14, { skyTop: hex("#84b5dc"), skyBottom: hex("#e6eee8"), light: hex("#ffefd4"), ambient: hex("#ece6dc"), ambientLevel: 0.92, intensity: 1 }],
  [16.5, { skyTop: hex("#98b6d0"), skyBottom: hex("#f6ddb2"), light: hex("#ffd38c"), ambient: hex("#eedcc2"), ambientLevel: 0.82, intensity: 0.95 }],
  [18, { skyTop: hex("#8a8db6"), skyBottom: hex("#f5a46e"), light: hex("#ffa95e"), ambient: hex("#d8b49a"), ambientLevel: 0.62, intensity: 0.8 }],
  [19, { skyTop: hex("#4c578a"), skyBottom: hex("#d68676"), light: hex("#ff9060"), ambient: hex("#8f8098"), ambientLevel: 0.38, intensity: 0.3 }],
  [20, { skyTop: hex("#1f2646"), skyBottom: hex("#56496d"), light: hex("#ff9060"), ambient: hex("#4d4a68"), ambientLevel: 0.2, intensity: 0 }],
];

const mixRGB = (a: RGB, b: RGB, t: number): RGB => [
  a[0] + (b[0] - a[0]) * t,
  a[1] + (b[1] - a[1]) * t,
  a[2] + (b[2] - a[2]) * t,
];

export function paletteAt(minutes: number): Palette {
  const hours = minutes / 60;
  if (hours <= KEYFRAMES[0][0]) return KEYFRAMES[0][1];
  for (let i = 0; i < KEYFRAMES.length - 1; i++) {
    const [ta, a] = KEYFRAMES[i];
    const [tb, b] = KEYFRAMES[i + 1];
    if (hours <= tb) {
      const t = (hours - ta) / (tb - ta);
      return {
        skyTop: mixRGB(a.skyTop, b.skyTop, t),
        skyBottom: mixRGB(a.skyBottom, b.skyBottom, t),
        light: mixRGB(a.light, b.light, t),
        ambient: mixRGB(a.ambient, b.ambient, t),
        ambientLevel: a.ambientLevel + (b.ambientLevel - a.ambientLevel) * t,
        intensity: a.intensity + (b.intensity - a.intensity) * t,
      };
    }
  }
  return KEYFRAMES[KEYFRAMES.length - 1][1];
}

/** 0–1: how far the lamps have taken over from the sun. */
export function lampLevel(minutes: number) {
  return smoothstep(18.2, 19.6, minutes / 60);
}

export const toHex = ([r, g, b]: RGB) =>
  `#${[r, g, b].map((v) => Math.round(clamp(v, 0, 255)).toString(16).padStart(2, "0")).join("")}`;

export function captionFor(minutes: number) {
  const h = minutes / 60;
  if (h < 8)
    return { title: "First light", body: "A low, cool sun rakes in from the east and reaches the far tables before anyone sits at them." };
  if (h < 11)
    return { title: "Morning", body: "Window shapes slide across the oak floor. The window bar fills first." };
  if (h < 14)
    return { title: "Midday", body: "The sun is high. Light pools close under the glass, and two bright squares drop through the skylights near the coffee bar." };
  if (h < 16.75)
    return { title: "Afternoon", body: "Warmer light swings west. Shadows of chair legs begin to stretch across the floor." };
  if (h < 19)
    return { title: "Golden hour", body: "The west windows take over and the lounge turns honey-coloured." };
  return { title: "Evening", body: "The sun has gone. Thirteen lamps come up over the tables." };
}

export function formatTime(minutes: number) {
  const h24 = Math.floor(minutes / 60);
  const m = Math.round(minutes % 60);
  const suffix = h24 >= 12 ? "PM" : "AM";
  const h12 = h24 % 12 === 0 ? 12 : h24 % 12;
  return `${String(h12).padStart(2, "0")}:${String(m).padStart(2, "0")} ${suffix}`;
}

export function bearingLabel(azimuth: number) {
  const deg = (azimuth * 180) / Math.PI;
  if (deg < -35) return "Low in the east";
  if (deg < -10) return "South-east";
  if (deg <= 10) return "Due south";
  if (deg <= 35) return "South-west";
  return "Low in the west";
}

