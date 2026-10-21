/**
 * Floor plan for the Sun Cafe hall, in metres.
 *
 *   x: west (-12) → east (+12)
 *   z: north (-7) → south (+7); the long glazed wall faces south
 *   y: up
 */

export type Placement = {
  /** a model file, or a long oak table built in code */
  model: ModelKey | "longTable";
  position: [number, number, number];
  /** rotation around Y in radians */
  rotation?: number;
  scale?: number;
};

export const MODELS = {
  chair: "/models/gallinera_chair.glb",
  lowTable: "/models/gallinera_table.glb",
  roundTable: "/models/round_wooden_table_02.glb",
  stool: "/models/bar_chair_round_01.glb",
  sofa: "/models/sofa_03.glb",
  armchair: "/models/modern_arm_chair_01.glb",
  coffeeTable: "/models/coffee_table_round_01.glb",
  sideTable: "/models/side_table_01.glb",
  plantTall: "/models/potted_plant_01.glb",
  plantWide: "/models/potted_plant_02.glb",
  calathea: "/models/calathea_orbifolia_01.glb",
} as const;

export type ModelKey = keyof typeof MODELS;

export const HALL = { minX: -12, maxX: 12, minZ: -7, maxZ: 7, height: 3.6, wall: 0.3 } as const;

/** Window openings: [start, end] along the wall, from sill to head height. */
export const WINDOWS = {
  sill: 0.45,
  head: 3.1,
  south: [-11.6, -8.8, -8.4, -5.6, -5.2, -2.4, -2.0, 0.8, 1.2, 4.0, 4.4, 7.2, 7.6, 10.4],
  west: [-4.6, -1.8, 1.0, 3.8],
  east: [-4.6, -1.8, 1.0, 3.8],
} as const;

/** Roof openings that let a little sky in over the dining floor. */
export const SKYLIGHTS: { x: [number, number]; z: [number, number] }[] = [
  { x: [-4.5, -1.5], z: [-2.2, 0.2] },
  { x: [2.5, 5.5], z: [-2.2, 0.2] },
];

const Q = Math.PI / 2;

function table2(x: number, z: number): Placement[] {
  return [
    { model: "roundTable", position: [x, 0, z] },
    { model: "chair", position: [x - 0.72, 0, z], rotation: Q },
    { model: "chair", position: [x + 0.72, 0, z], rotation: -Q },
  ];
}

function longTable(x: number, z: number): Placement[] {
  const chairs: Placement[] = [-0.7, 0, 0.7].flatMap((dx) => [
    { model: "chair" as const, position: [x + dx, 0, z - 0.95] as [number, number, number], rotation: 0 },
    { model: "chair" as const, position: [x + dx, 0, z + 0.95] as [number, number, number], rotation: Math.PI },
  ]);
  return [{ model: "longTable", position: [x, 0, z] }, ...chairs];
}

/** Bar stools along the south window counter. */
const windowBar: Placement[] = Array.from({ length: 22 }, (_, i) => {
  const x = -10.6 + i * 1.0;
  return { model: "stool" as const, position: [x, 0, 5.75] as [number, number, number] };
});

const dining: Placement[] = [
  ...[-4.6, -1.4, 1.8, 5.0].flatMap((x) => table2(x, 3.3)),
  ...[-4.6, 5.0].flatMap((x) => table2(x, 1.4)),
  ...longTable(0.2, -1.0),
  ...[-4.6, 5.0].flatMap((x) => table2(x, -3.6)),
  ...[8.8, 10.6].flatMap((x) => table2(x, 2.6)),
  ...[8.8, 10.6].flatMap((x) => table2(x, 0.2)),
  ...longTable(9.7, -2.6),
];

const lounge: Placement[] = [
  { model: "sofa", position: [-9.7, 0, -1.9], rotation: 0 },
  { model: "sofa", position: [-9.7, 0, 2.3], rotation: Math.PI },
  { model: "coffeeTable", position: [-9.7, 0, 0.2] },
  { model: "armchair", position: [-7.6, 0, 0.2], rotation: -Q },
  { model: "sideTable", position: [-11.55, 0, -1.9] },
  { model: "sideTable", position: [-11.55, 0, 2.3] },
  { model: "armchair", position: [-10.6, 0, -5.2], rotation: Math.PI / 4 },
  { model: "armchair", position: [-8.8, 0, -5.4], rotation: -Math.PI / 4 },
  { model: "lowTable", position: [-9.7, 0, -4.5] },
];

const plants: Placement[] = [
  { model: "plantTall", position: [-11.4, 0, 4.6], scale: 1.5 },
  { model: "plantTall", position: [11.4, 0, 4.6], scale: 1.5 },
  { model: "plantWide", position: [-11.3, 0, -6.3], scale: 1.4 },
  { model: "plantWide", position: [11.3, 0, -6.3], scale: 1.4 },
  { model: "plantTall", position: [-6.9, 0, -5.9], scale: 1.3 },
  { model: "plantWide", position: [7.3, 0, -0.9], scale: 1.2 },
  { model: "plantTall", position: [-0.6, 0, 1.4], scale: 1.2 },
  { model: "calathea", position: [-1.3, 1.07, -5.15], scale: 0.32 },
];

export const PLACEMENTS: Placement[] = [...windowBar, ...dining, ...lounge, ...plants];

const SEATS_PER_MODEL: Partial<Record<Placement["model"], number>> = { chair: 1, stool: 1, armchair: 1, sofa: 3 };

export const SEAT_COUNT = PLACEMENTS.reduce((n, p) => n + (SEATS_PER_MODEL[p.model] ?? 0), 0);

/** Warm lamps that take over after sunset: one over each table group. */
export const LAMPS: [number, number][] = [
  [-4.6, 3.3], [-1.4, 3.3], [1.8, 3.3], [5.0, 3.3],
  [0.2, -1.0], [-4.6, -3.6], [5.0, -3.6], [9.7, 1.4], [9.7, -2.6],
  [-9.7, 0.2], [-1.0, -5.2], [-6.0, 5.9], [4.0, 5.9],
];

export type Zone = { id: string; name: string; seats: string; position: [number, number, number]; note: string };

export const ZONES: Zone[] = [
  { id: "window-bar", name: "The window bar", seats: "22 stools", position: [0, 1.4, 6.0], note: "A long counter against the south glass. First to catch the morning." },
  { id: "floor", name: "The floor", seats: "Two-tops", position: [-3, 1.2, 2.3], note: "Small tables in loose rows, moved by hand to wherever the light is." },
  { id: "long-tables", name: "The long tables", seats: "Six apiece", position: [0.2, 1.4, -1.0], note: "Shared tables between the skylights, for spreading out." },
  { id: "lounge", name: "The lounge", seats: "Sofas and armchairs", position: [-9.7, 1.4, 0.2], note: "The west corner. Low seats, slow afternoons, the last sun." },
  { id: "bar", name: "The coffee bar", seats: "Standing", position: [-1.5, 1.6, -5.2], note: "Espresso, slow bar and the pastry case along the north wall." },
  { id: "east-room", name: "The east tables", seats: "Two-tops and a long table", position: [9.7, 1.4, 0.2], note: "Quieter, and bright from the moment the sun clears the roofs." },
];
