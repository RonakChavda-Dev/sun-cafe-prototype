"use client";

import { Suspense, useEffect, useLayoutEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import { Canvas, useThree } from "@react-three/fiber";
import { Html, OrbitControls, SoftShadows, useEnvironment, useGLTF, useTexture } from "@react-three/drei";
import { Bloom, BrightnessContrast, EffectComposer, HueSaturation, N8AO, ToneMapping, Vignette } from "@react-three/postprocessing";
import { ToneMappingMode } from "postprocessing";
import { HALL, LAMPS, MODELS, PLACEMENTS, SKYLIGHTS, WINDOWS, ZONES, type ModelKey, type Placement } from "@/lib/cafe-layout";
import { lampLevel, paletteAt, sunAt, toHex } from "@/lib/daylight";

const STEEL = new THREE.MeshStandardMaterial({ color: "#1a1816", metalness: 0.7, roughness: 0.38 });
const GLASS = new THREE.MeshPhysicalMaterial({
  color: "#d6e6ea",
  roughness: 0.04,
  metalness: 0,
  transparent: true,
  opacity: 0.12,
  depthWrite: false,
  envMapIntensity: 1.5,
});
const CHROME = new THREE.MeshStandardMaterial({ color: "#d4d1cc", metalness: 1, roughness: 0.16 });
const BLACK_STEEL = new THREE.MeshStandardMaterial({ color: "#121110", metalness: 0.6, roughness: 0.42 });
const RUG = new THREE.MeshStandardMaterial({ color: "#6b4b36", roughness: 1 });
const STAINED_OAK = new THREE.MeshStandardMaterial({ color: "#4f3726", roughness: 0.42, metalness: 0 });
const PAVING = new THREE.MeshStandardMaterial({ color: "#1d1814", roughness: 1 });
const TERRACE = new THREE.MeshStandardMaterial({ color: "#5a4c40", roughness: 0.95 });
/** The cut tops of the walls, drawn dark the way an architectural section is. */
const SECTION = new THREE.MeshStandardMaterial({ color: "#171412", roughness: 0.9 });
const HIDDEN = new THREE.MeshBasicMaterial({ colorWrite: false, depthWrite: false });
const CERAMIC = new THREE.MeshPhysicalMaterial({ color: "#f4f0e8", roughness: 0.25, clearcoat: 0.8, clearcoatRoughness: 0.15 });
const COFFEE = new THREE.MeshPhysicalMaterial({ color: "#3b2113", roughness: 0.15, clearcoat: 1 });
const CREMA = new THREE.MeshStandardMaterial({ color: "#b07a4a", roughness: 0.6 });

/* ------------------------------------------------------------------ */
/* Models                                                              */
/* ------------------------------------------------------------------ */

function useShadowedModel(url: string) {
  const { scene } = useGLTF(url);
  useLayoutEffect(() => {
    scene.traverse((o) => {
      const mesh = o as THREE.Mesh;
      if (mesh.isMesh) {
        mesh.castShadow = true;
        mesh.receiveShadow = true;
      }
    });
  }, [scene]);
  return scene;
}

function Model({ placement }: { placement: Placement & { model: ModelKey } }) {
  const scene = useShadowedModel(MODELS[placement.model]);
  const object = useMemo(() => scene.clone(true), [scene]);
  return (
    <primitive
      object={object}
      position={placement.position}
      rotation-y={placement.rotation ?? 0}
      scale={placement.scale ?? 1}
    />
  );
}

/* ------------------------------------------------------------------ */
/* Cups on the tables                                                  */
/* ------------------------------------------------------------------ */

const CUP_PROFILE = [
  new THREE.Vector2(0.0, 0.0),
  new THREE.Vector2(0.026, 0.0),
  new THREE.Vector2(0.03, 0.006),
  new THREE.Vector2(0.041, 0.05),
  new THREE.Vector2(0.044, 0.068),
  new THREE.Vector2(0.04, 0.068),
  new THREE.Vector2(0.037, 0.052),
];
const CUP_GEO = new THREE.LatheGeometry(CUP_PROFILE, 28);
const SAUCER_GEO = new THREE.CylinderGeometry(0.075, 0.06, 0.01, 32);
const COFFEE_GEO = new THREE.CircleGeometry(0.038, 24);
const HANDLE_GEO = new THREE.TorusGeometry(0.016, 0.0045, 8, 16, Math.PI * 1.2);

function Cup({ position, turn = 0, latte = false }: { position: [number, number, number]; turn?: number; latte?: boolean }) {
  return (
    <group position={position} rotation-y={turn}>
      <mesh geometry={SAUCER_GEO} material={CERAMIC} position-y={0.005} castShadow receiveShadow />
      <mesh geometry={CUP_GEO} material={CERAMIC} position-y={0.01} castShadow receiveShadow />
      <mesh geometry={HANDLE_GEO} material={CERAMIC} position={[0.046, 0.045, 0]} rotation-z={-Math.PI * 0.6} castShadow />
      <mesh geometry={COFFEE_GEO} material={latte ? CREMA : COFFEE} position-y={0.064} rotation-x={-Math.PI / 2} />
    </group>
  );
}

/** Cups set out by the hour: some tables taken, some free. */
function TableSettings() {
  const cups = useMemo(() => {
    const out: { p: [number, number, number]; turn: number; latte: boolean }[] = [];
    let n = 0;
    for (const pl of PLACEMENTS) {
      const [x, , z] = pl.position;
      if (pl.model === "roundTable") {
        n++;
        if (n % 3 === 0) continue; // a free table
        out.push({ p: [x - 0.17, 0.746, z + 0.05], turn: 0.4, latte: n % 2 === 0 });
        if (n % 2) out.push({ p: [x + 0.18, 0.746, z - 0.08], turn: 2.4, latte: true });
      } else if (pl.model === "longTable") {
        for (const dx of [-0.7, 0.05, 0.7]) out.push({ p: [x + dx, 0.875, z - 0.3], turn: 1.2, latte: dx > 0 });
        for (const dx of [-0.35, 0.7]) out.push({ p: [x + dx, 0.875, z + 0.3], turn: -1.9, latte: dx < 0 });
      } else if (pl.model === "stool") {
        n++;
        if (n % 3 === 1) out.push({ p: [x + 0.05, 1.075, HALL.maxZ - HALL.wall / 2 - 0.32], turn: n, latte: n % 2 === 0 });
      }
    }
    return out;
  }, []);
  return (
    <group>
      {cups.map((c, i) => (
        <Cup key={i} position={c.p} turn={c.turn} latte={c.latte} />
      ))}
    </group>
  );
}

/* ------------------------------------------------------------------ */
/* Architecture                                                        */
/* ------------------------------------------------------------------ */

/** Height at which the model is cut for viewing. Above it the walls still exist, but only for the sun. */
const CUT = 1.25;

type BoxSpec = { pos: [number, number, number]; size: [number, number, number] };

function Box({ pos, size, material, cast = true }: BoxSpec & { material: THREE.Material; cast?: boolean }) {
  return (
    <mesh position={pos} castShadow={cast} receiveShadow material={material}>
      <boxGeometry args={size} />
    </mesh>
  );
}

/** Splits a box at the cut height: a visible part below, a shadow-only part above. */
function CutBox({ pos, size, material, cast = true }: BoxSpec & { material: THREE.Material; cast?: boolean }) {
  const y0 = pos[1] - size[1] / 2;
  const y1 = pos[1] + size[1] / 2;
  if (y1 <= CUT) return <Box pos={pos} size={size} material={material} cast={cast} />;
  if (y0 >= CUT) return cast ? <Box pos={pos} size={size} material={HIDDEN} /> : null;
  const lowH = CUT - y0;
  const highH = y1 - CUT;
  return (
    <>
      <Box pos={[pos[0], y0 + lowH / 2, pos[2]]} size={[size[0], lowH, size[2]]} material={material} cast={cast} />
      {cast && <Box pos={[pos[0], CUT + highH / 2, pos[2]]} size={[size[0], highH, size[2]]} material={HIDDEN} />}
    </>
  );
}

/** A wall along one axis with window openings cut into it. */
function wallWithWindows(axis: "x" | "z", fixed: number, from: number, to: number, openings: readonly number[]) {
  const { height, wall } = HALL;
  const { sill, head } = WINDOWS;
  const solid: BoxSpec[] = [];
  const glass: BoxSpec[] = [];
  const frames: BoxSpec[] = [];

  const box = (a0: number, a1: number, y0: number, y1: number, thickness: number = wall): BoxSpec => {
    const len = a1 - a0;
    const mid = (a0 + a1) / 2;
    return axis === "x"
      ? { pos: [mid, (y0 + y1) / 2, fixed], size: [len, y1 - y0, thickness] }
      : { pos: [fixed, (y0 + y1) / 2, mid], size: [thickness, y1 - y0, len] };
  };

  let cursor = from;
  for (let i = 0; i < openings.length; i += 2) {
    const [a, b] = [openings[i], openings[i + 1]];
    if (a > cursor) solid.push(box(cursor, a, 0, height));
    solid.push(box(a, b, 0, sill));
    solid.push(box(a, b, head, height));
    glass.push(box(a, b, sill, head, 0.02));
    // Steel frame: a transom and a central mullion, so the light lands in panes.
    const mid = (a + b) / 2;
    frames.push(box(a, b, 2.35, 2.42, 0.08));
    frames.push(box(mid - 0.035, mid + 0.035, sill, head, 0.08));
    frames.push(box(a, a + 0.05, sill, head, 0.1));
    frames.push(box(b - 0.05, b, sill, head, 0.1));
    frames.push(box(a, b, sill - 0.04, sill, 0.12));
    cursor = b;
  }
  if (cursor < to) solid.push(box(cursor, to, 0, height));
  return { solid, glass, frames };
}

function usePlaster() {
  const tex = useTexture(
    {
      map: "/textures/white_plaster_02_diffuse.jpg",
      normalMap: "/textures/white_plaster_02_nor_gl.jpg",
      roughnessMap: "/textures/white_plaster_02_rough.jpg",
    },
    (loaded) => {
      for (const t of Object.values(loaded)) {
        t.wrapS = t.wrapT = THREE.RepeatWrapping;
        t.repeat.set(3, 1.5);
        t.anisotropy = 8;
      }
      loaded.map.colorSpace = THREE.SRGBColorSpace;
    },
  );
  return useMemo(() => new THREE.MeshStandardMaterial({ ...tex, color: "#efe7dc", normalScale: new THREE.Vector2(0.6, 0.6) }), [tex]);
}

function Architecture() {
  const plaster = usePlaster();
  const { minX, maxX, minZ, maxZ, height, wall } = HALL;
  const south = wallWithWindows("x", maxZ, minX - wall / 2, maxX + wall / 2, WINDOWS.south);
  const west = wallWithWindows("z", minX, minZ, maxZ, WINDOWS.west);
  const east = wallWithWindows("z", maxX, minZ, maxZ, WINDOWS.east);
  const north: BoxSpec = { pos: [0, height / 2, minZ], size: [maxX - minX + wall, height, wall] };

  // Dark caps where the walls are cut, as on an architect's section model.
  const caps: BoxSpec[] = [
    { pos: [0, CUT + 0.006, minZ], size: [maxX - minX + wall, 0.012, wall + 0.01] },
    { pos: [minX, CUT + 0.006, 0], size: [wall + 0.01, 0.012, maxZ - minZ] },
    { pos: [maxX, CUT + 0.006, 0], size: [wall + 0.01, 0.012, maxZ - minZ] },
    ...WINDOWS.south
      .flatMap((v, i, arr) => (i % 2 === 0 ? [] : [[arr[i - 1], v] as const]))
      .reduce<BoxSpec[]>((acc, [a, b], i, list) => {
        // the solid piers between the south openings
        const prev = i === 0 ? minX - wall / 2 : list[i - 1][1];
        acc.push({ pos: [(prev + a) / 2, CUT + 0.006, maxZ], size: [a - prev, 0.012, wall + 0.01] });
        if (i === list.length - 1) acc.push({ pos: [(b + maxX + wall / 2) / 2, CUT + 0.006, maxZ], size: [maxX + wall / 2 - b, 0.012, wall + 0.01] });
        return acc;
      }, []),
  ];

  const parts = [south, west, east];
  return (
    <group>
      <CutBox {...north} material={plaster} />
      {parts.flatMap((p, i) => p.solid.map((b, j) => <CutBox key={`s${i}-${j}`} {...b} material={plaster} />))}
      {parts.flatMap((p, i) => p.frames.map((b, j) => <CutBox key={`f${i}-${j}`} {...b} material={STEEL} />))}
      {parts.flatMap((p, i) => p.glass.map((b, j) => <CutBox key={`g${i}-${j}`} {...b} material={GLASS} cast={false} />))}
      {caps.map((b, i) => (
        <Box key={`c${i}`} {...b} material={SECTION} cast={false} />
      ))}
      <Roof />
    </group>
  );
}

/**
 * Roof with two skylights. It writes neither colour nor depth, so the camera
 * looks straight through it, but it still blocks the sun in the shadow map. taste-skill-ignore: 3D lighting
 */
function Roof() {
  const { minX, maxX, minZ, maxZ, height } = HALL;
  const pad = 0.6;
  const x0 = minX - pad;
  const x1 = maxX + pad;
  const z0 = minZ - pad;
  const z1 = maxZ + pad;
  const [a, b] = SKYLIGHTS;
  const zA = a.z[0];
  const zB = a.z[1];
  const strips: BoxSpec[] = [
    { pos: [(x0 + x1) / 2, height + 0.1, (z0 + zA) / 2], size: [x1 - x0, 0.2, zA - z0] },
    { pos: [(x0 + x1) / 2, height + 0.1, (zB + z1) / 2], size: [x1 - x0, 0.2, z1 - zB] },
    { pos: [(x0 + a.x[0]) / 2, height + 0.1, (zA + zB) / 2], size: [a.x[0] - x0, 0.2, zB - zA] },
    { pos: [(a.x[1] + b.x[0]) / 2, height + 0.1, (zA + zB) / 2], size: [b.x[0] - a.x[1], 0.2, zB - zA] },
    { pos: [(b.x[1] + x1) / 2, height + 0.1, (zA + zB) / 2], size: [x1 - b.x[1], 0.2, zB - zA] },
  ];
  return (
    <group>
      {strips.map((s, i) => (
        <mesh key={i} position={s.pos} castShadow material={HIDDEN}>
          <boxGeometry args={s.size} />
        </mesh>
      ))}
    </group>
  );
}

function Floor() {
  const { minX, maxX, minZ, maxZ } = HALL;
  const w = maxX - minX;
  const d = maxZ - minZ;
  const tex = useTexture(
    {
      map: "/textures/wood_floor_diffuse.jpg",
      normalMap: "/textures/wood_floor_nor_gl.jpg",
      roughnessMap: "/textures/wood_floor_rough.jpg",
    },
    (loaded) => {
      for (const t of Object.values(loaded)) {
        t.wrapS = t.wrapT = THREE.RepeatWrapping;
        // The texture covers about two metres of boards.
        t.repeat.set(w / 2, d / 2);
        t.anisotropy = 16;
      }
      loaded.map.colorSpace = THREE.SRGBColorSpace;
    },
  );
  const floor = useMemo(
    () =>
      new THREE.MeshPhysicalMaterial({
        ...tex,
        color: "#e8d3bb",
        roughness: 0.9,
        clearcoat: 0.25,
        clearcoatRoughness: 0.35,
        envMapIntensity: 0.8,
      }),
    [tex],
  );
  return (
    <group>
      <mesh rotation-x={-Math.PI / 2} receiveShadow material={floor}>
        <planeGeometry args={[w, d]} />
      </mesh>
      {/* A stone terrace around the building, then the dark street. Neither takes the cut-away walls' shadows. */}
      <mesh rotation-x={-Math.PI / 2} position-y={-0.01} material={TERRACE}>
        <planeGeometry args={[w + 5, d + 5]} />
      </mesh>
      <mesh rotation-x={-Math.PI / 2} position-y={-0.03} material={PAVING}>
        <planeGeometry args={[140, 140]} />
      </mesh>
      {/* Lounge rug */}
      <mesh rotation-x={-Math.PI / 2} position={[-9.6, 0.006, 0.2]} receiveShadow material={RUG}>
        <planeGeometry args={[4.2, 6.2]} />
      </mesh>
    </group>
  );
}

function Counters() {
  const marbleTex = useTexture(
    {
      map: "/textures/marble_01_diffuse.jpg",
      normalMap: "/textures/marble_01_nor_gl.jpg",
      roughnessMap: "/textures/marble_01_rough.jpg",
    },
    (loaded) => {
      for (const t of Object.values(loaded)) {
        t.wrapS = t.wrapT = THREE.RepeatWrapping;
        t.repeat.set(3, 1);
        t.anisotropy = 8;
      }
      loaded.map.colorSpace = THREE.SRGBColorSpace;
    },
  );
  const marble = useMemo(
    () => new THREE.MeshPhysicalMaterial({ ...marbleTex, roughness: 0.3, clearcoat: 0.6, clearcoatRoughness: 0.12 }),
    [marbleTex],
  );
  const oak = STAINED_OAK;
  const { minX, maxX, maxZ, minZ, wall } = HALL;
  const inner = maxZ - wall / 2;
  return (
    <group>
      {/* Window bar along the south glass */}
      <Box pos={[(minX + maxX) / 2, 1.05, inner - 0.32]} size={[maxX - minX - 1.2, 0.05, 0.5]} material={oak} />
      {Array.from({ length: 12 }, (_, i) => (
        <Box key={i} pos={[minX + 1.2 + i * 1.98, 0.52, inner - 0.12]} size={[0.06, 1.04, 0.06]} material={BLACK_STEEL} />
      ))}

      {/* Coffee bar along the north wall */}
      <Box pos={[-1.5, 0.5, -5.2]} size={[9, 1.0, 0.8]} material={oak} />
      <Box pos={[-1.5, 1.03, -5.2]} size={[9.1, 0.06, 0.86]} material={marble} />
      <Box pos={[-1.5, 0.45, minZ + wall / 2 + 0.32]} size={[9, 0.9, 0.62]} material={oak} />
      <Box pos={[-1.5, 0.92, minZ + wall / 2 + 0.32]} size={[9.1, 0.05, 0.66]} material={marble} />

      {/* Espresso machine, two grinders and the pastry case */}
      <Box pos={[-3.6, 1.32, -5.3]} size={[1.1, 0.52, 0.55]} material={CHROME} />
      <Box pos={[-3.6, 1.6, -5.42]} size={[1.1, 0.06, 0.3]} material={BLACK_STEEL} />
      {[-4.55, -2.65].map((x) => (
        <group key={x}>
          <mesh position={[x, 1.25, -5.35]} castShadow receiveShadow material={BLACK_STEEL}>
            <cylinderGeometry args={[0.11, 0.13, 0.38, 24]} />
          </mesh>
          <mesh position={[x, 1.55, -5.35]} castShadow material={GLASS}>
            <coneGeometry args={[0.13, 0.25, 24, 1, true]} />
          </mesh>
        </group>
      ))}
      <Box pos={[1.5, 1.28, -5.25]} size={[1.8, 0.45, 0.6]} material={GLASS} cast={false} />
      <Box pos={[1.5, 1.07, -5.25]} size={[1.8, 0.03, 0.6]} material={STEEL} />
      {Array.from({ length: 10 }, (_, i) => (
        <mesh key={i} position={[0.8 + (i % 5) * 0.35, 1.12, -5.4 + Math.floor(i / 5) * 0.3]} castShadow receiveShadow>
          <sphereGeometry args={[0.08, 16, 12]} />
          <meshStandardMaterial color={i % 3 ? "#b9753d" : "#7a4626"} roughness={0.6} />
        </mesh>
      ))}
      {/* A row of cups waiting on the back counter */}
      {Array.from({ length: 8 }, (_, i) => (
        <Cup key={i} position={[-5.4 + i * 0.22, 0.945, minZ + wall / 2 + 0.3]} />
      ))}
    </group>
  );
}

/* ------------------------------------------------------------------ */
/* Lighting                                                            */
/* ------------------------------------------------------------------ */

/** Daylight reflections from a real interior HDRI (CC0, Poly Haven "Lebombo"). */
function Environment({ intensity }: { intensity: number }) {
  const env = useEnvironment({ files: "/env/lebombo_1k.hdr" });
  const anchor = useRef<THREE.Group>(null);
  useEffect(() => {
    const scene = anchor.current?.parent as THREE.Scene | null;
    if (!scene) return;
    scene.environment = env;
    scene.environmentIntensity = intensity;
  }, [env, intensity]);
  return <group ref={anchor} />;
}

function Lighting({ minutes, quality }: { minutes: number; quality: Quality }) {
  const sunRef = useRef<THREE.DirectionalLight>(null);
  const { scene } = useThree();
  const sun = sunAt(minutes);
  const palette = paletteAt(minutes);
  const lamp = lampLevel(minutes);

  useLayoutEffect(() => {
    const light = sunRef.current;
    if (!light) return;
    light.target.position.set(0, 0, 0);
    scene.add(light.target);
    return () => {
      scene.remove(light.target);
    };
  }, [scene]);

  const distance = 45;
  const position: [number, number, number] = [sun.dir[0] * distance, sun.dir[1] * distance, sun.dir[2] * distance];

  return (
    <>
      <directionalLight
        ref={sunRef}
        position={position}
        intensity={palette.intensity * 13}
        color={toHex(palette.light)}
        castShadow
        shadow-mapSize={quality === "high" ? [4096, 4096] : [2048, 2048]}
        shadow-camera-left={-18}
        shadow-camera-right={18}
        shadow-camera-top={18}
        shadow-camera-bottom={-18}
        shadow-camera-near={1}
        shadow-camera-far={110}
        shadow-bias={-0.00015}
        shadow-normalBias={0.02}
      />
      <hemisphereLight args={[toHex(palette.ambient), "#3a2a1e", 0.18 * palette.ambientLevel + 0.02]} />
      <Environment intensity={0.42 * palette.ambientLevel + 0.05} />
      {lamp > 0.01 &&
        LAMPS.map(([x, z], i) => (
          <pointLight key={i} position={[x, 2.8, z]} intensity={lamp * 34} distance={10} decay={2} color="#ffb871" />
        ))}
    </>
  );
}

/* ------------------------------------------------------------------ */
/* Camera                                                              */
/* ------------------------------------------------------------------ */

const TARGET: [number, number, number] = [0, 0.4, 0.3];

function CameraRig() {
  const { camera, size } = useThree();
  useLayoutEffect(() => {
    const cam = camera as THREE.PerspectiveCamera;
    const aspect = size.width / size.height;
    const halfFov = THREE.MathUtils.degToRad(cam.fov / 2);
    // On portrait screens, turn the view so the hall's long side runs up the screen.
    const portrait = aspect < 1.05;
    const long = HALL.maxX - HALL.minX + 1.5;
    const short = HALL.maxZ - HALL.minZ + 3;
    const needW = portrait ? short : long;
    const needH = portrait ? long : short;
    const dist = Math.max(needH / (2 * Math.tan(halfFov)), needW / (2 * Math.tan(halfFov) * aspect)) * 1.02;
    // Looking down at an angle, like a photograph of an architect's model.
    const tilt = THREE.MathUtils.degToRad(30);
    const lean = Math.sin(tilt) * dist;
    cam.position.set(TARGET[0] + (portrait ? lean : 0), TARGET[1] + Math.cos(tilt) * dist, TARGET[2] + (portrait ? 0 : lean));
    cam.lookAt(...TARGET);
    cam.updateProjectionMatrix();
  }, [camera, size]);
  return null;
}

/* ------------------------------------------------------------------ */
/* Scene                                                               */
/* ------------------------------------------------------------------ */

function ZoneLabels() {
  return (
    <>
      {ZONES.map((z) => (
        <Html key={z.id} position={z.position} center zIndexRange={[20, 0]}>
          <div className="pointer-events-none flex items-center gap-2 whitespace-nowrap rounded-full bg-[#120d0a] px-3 py-1.5 text-[13px] font-semibold text-[#f4ead9]">
            <span className="h-2.5 w-2.5 rounded-full bg-[#f2b33d]" aria-hidden="true" />
            {z.name}
          </div>
        </Html>
      ))}
    </>
  );
}

const OAK_TOP = new THREE.MeshPhysicalMaterial({ color: "#8a5e3c", roughness: 0.45, clearcoat: 0.35, clearcoatRoughness: 0.3 });

/** A long oak table on four black steel legs, seating six. */
function LongTable({ position }: { position: [number, number, number] }) {
  const [x, , z] = position;
  return (
    <group position={[x, 0, z]}>
      <Box pos={[0, 0.85, 0]} size={[2.3, 0.05, 0.92]} material={OAK_TOP} />
      {[-1.02, 1.02].flatMap((dx) =>
        [-0.36, 0.36].map((dz) => <Box key={`${dx}${dz}`} pos={[dx, 0.41, dz]} size={[0.05, 0.82, 0.05]} material={BLACK_STEEL} />),
      )}
      <Box pos={[0, 0.2, 0]} size={[2.0, 0.04, 0.04]} material={BLACK_STEEL} />
    </group>
  );
}

function Hall({ minutes, showZones, quality }: { minutes: number; showZones: boolean; quality: Quality }) {
  return (
    <>
      <Lighting minutes={minutes} quality={quality} />
      <Floor />
      <Architecture />
      <Counters />
      <TableSettings />
      {PLACEMENTS.map((p, i) => (p.model === "longTable" ? <LongTable key={i} position={p.position} /> : <Model key={i} placement={{ ...p, model: p.model }} />))}
      {showZones && <ZoneLabels />}
    </>
  );
}

export type Quality = "high" | "low";

export type CafeSceneProps = { minutes: number; showZones: boolean; quality: Quality; onReady?: () => void };

function Ready({ onReady }: { onReady?: () => void }) {
  useEffect(() => {
    onReady?.();
  }, [onReady]);
  return null;
}

export default function CafeScene({ minutes, showZones, quality, onReady }: CafeSceneProps) {
  const high = quality === "high";
  return (
    <Canvas
      shadows="percentage"
      frameloop="demand"
      dpr={high ? [1, 2] : [1, 1.25]}
      camera={{ fov: 30, near: 0.5, far: 200, position: [0, 30, 18] }}
      gl={{ antialias: true, powerPreference: "high-performance" }}
      onCreated={({ gl }) => {
        gl.setClearColor("#120d0a");
      }}
      aria-hidden="true"
    >
      {high && <SoftShadows size={18} samples={12} focus={0.4} />}
      <CameraRig />
      <Suspense fallback={null}>
        <Hall minutes={minutes} showZones={showZones} quality={quality} />
        <EffectComposer multisampling={high ? 4 : 0}>
          <N8AO aoRadius={1.1} distanceFalloff={0.7} intensity={2.6} quality={high ? "high" : "performance"} halfRes={!high} />
          <Bloom luminanceThreshold={0.92} luminanceSmoothing={0.2} intensity={0.35} mipmapBlur />
          <ToneMapping mode={ToneMappingMode.AGX} />
          <BrightnessContrast contrast={0.08} brightness={0.01} />
          <HueSaturation saturation={0.1} />
          <Vignette offset={0.3} darkness={0.5} />
        </EffectComposer>
        <Ready onReady={onReady} />
      </Suspense>
      <OrbitControls
        target={TARGET}
        enablePan={false}
        minPolarAngle={0}
        maxPolarAngle={1.1}
        minDistance={6}
        maxDistance={70}
        enableDamping={false}
      />
    </Canvas>
  );
}

for (const url of Object.values(MODELS)) useGLTF.preload(url);
