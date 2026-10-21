"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { useCallback, useEffect, useRef, useState, useSyncExternalStore } from "react";
import { Layers, Pause, Play, RotateCcw } from "lucide-react";
import { SEAT_COUNT } from "@/lib/cafe-layout";
import { DAY_END, DAY_START, bearingLabel, captionFor, formatTime, lampLevel, paletteAt, sunAt } from "@/lib/daylight";
import { SET_TIME_EVENT, type SetTimeDetail } from "@/lib/studio-events";
import type { Quality } from "./cafe-scene";
import { SunDial } from "./sun-dial";
import fallback from "@/public/images/studio-fallback.jpg";

const CafeScene = dynamic(() => import("./cafe-scene"), { ssr: false });

const MORNING = 9 * 60 + 30;

const PRESETS = [
  { label: "First light", minutes: 6 * 60 + 45 },
  { label: "Morning", minutes: MORNING },
  { label: "Midday", minutes: 12 * 60 + 30 },
  { label: "Golden hour", minutes: 17 * 60 + 45 },
  { label: "Evening", minutes: 19 * 60 + 45 },
];

const TICKS = [6, 9, 12, 15, 18, 20];

type Device = { webgl: boolean; quality: Quality } | null;

let device: Device = null;

/** Detected once per page load: WebGL support and a render tier for this device. */
function detectDevice(): Device {
  if (device) return device;
  let webgl = false;
  try {
    const canvas = document.createElement("canvas");
    webgl = !!(canvas.getContext("webgl2") || canvas.getContext("webgl"));
  } catch {
    webgl = false;
  }
  const nav = navigator as Navigator & { deviceMemory?: number };
  const small = window.matchMedia("(max-width: 767px)").matches;
  const weak = (nav.hardwareConcurrency ?? 8) <= 4 || (nav.deviceMemory ?? 8) <= 4;
  device = { webgl, quality: small || weak ? "low" : "high" };
  return device;
}

const subscribeNever = () => () => {};

function parseTime(value: string | null) {
  const t = Number(value);
  return value && t >= DAY_START && t <= DAY_END ? t : null;
}

export function CafeStudio() {
  const params = useSearchParams();
  // Deep links from other pages: /space?t=1065
  const [minutes, setMinutes] = useState(() => parseTime(params.get("t")) ?? MORNING);
  const [playing, setPlaying] = useState(false);
  const [showZones, setShowZones] = useState(false);
  const [ready, setReady] = useState(false);
  const detected = useSyncExternalStore(subscribeNever, detectDevice, () => null);
  const webgl = detected ? detected.webgl : null;
  const forced = params.get("quality");
  const quality: Quality = forced === "low" || forced === "high" ? forced : (detected?.quality ?? "low");
  const frame = useRef<number | null>(null);
  const minutesRef = useRef(minutes);

  useEffect(() => {
    minutesRef.current = minutes;
  }, [minutes]);

  const stop = useCallback(() => {
    setPlaying(false);
    if (frame.current !== null) cancelAnimationFrame(frame.current);
    frame.current = null;
  }, []);

  useEffect(() => {
    const onSet = (e: Event) => {
      stop();
      setMinutes((e as CustomEvent<SetTimeDetail>).detail.minutes);
    };
    window.addEventListener(SET_TIME_EVENT, onSet);
    return () => window.removeEventListener(SET_TIME_EVENT, onSet);
  }, [stop]);

  useEffect(() => {
    if (!playing) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let last = performance.now();
    let acc = 0;
    let current = minutesRef.current;
    const tick = (now: number) => {
      const dt = now - last;
      last = now;
      if (reduce) {
        acc += dt;
        if (acc > 700) {
          acc = 0;
          current += 30;
        }
      } else {
        current += dt * 0.05; // a full day in under twenty seconds
      }
      if (current >= DAY_END) {
        setMinutes(DAY_END);
        setPlaying(false);
        return;
      }
      setMinutes(current);
      frame.current = requestAnimationFrame(tick);
    };
    frame.current = requestAnimationFrame(tick);
    return () => {
      if (frame.current !== null) cancelAnimationFrame(frame.current);
    };
  }, [playing]);

  const togglePlay = () => {
    if (playing) return stop();
    if (minutes >= DAY_END - 5) setMinutes(DAY_START);
    setPlaying(true);
  };

  const sun = sunAt(minutes);
  const palette = paletteAt(minutes);
  const caption = captionFor(minutes);
  const rounded = Math.round(minutes / 5) * 5;
  const progress = ((minutes - DAY_START) / (DAY_END - DAY_START)) * 100;
  const altitude = Math.round((sun.elevation * 180) / Math.PI);
  const shadowRatio = palette.intensity > 0.05 ? 1 / Math.tan(sun.elevation) : null;

  return (
    <div>
      <div className="relative overflow-hidden rounded-[var(--radius)] bg-[#120d0a] aspect-[4/5] sm:aspect-[4/3] lg:aspect-[16/9]">
        {webgl && <CafeScene minutes={minutes} showZones={showZones} quality={quality} onReady={() => setReady(true)} />}

        {(webgl === false || !ready) && (
          <div className="absolute inset-0">
            <Image
              src={fallback}
              alt="A top-down render of the Sun Cafe hall in morning light: rows of tables, a long window bar and a lounge corner."
              fill
              sizes="(min-width: 1024px) 88rem, 100vw"
              className="object-cover"
              placeholder="blur"
            />
            {webgl !== false && (
              <p className="absolute inset-x-0 bottom-4 text-center small text-ink" role="status">
                <span className="rounded-full bg-bg px-4 py-2">Setting out {SEAT_COUNT} chairs…</span>
              </p>
            )}
          </div>
        )}

        <div className="pointer-events-none absolute left-3 top-3 flex flex-wrap gap-2 sm:left-5 sm:top-5">
          <p className="small rounded-full bg-bg px-3.5 py-2 font-medium text-ink">
            <span className="sm:hidden">The hall in 3D</span>
            <span className="hidden sm:inline">The imaginary hall, in real-time 3D</span>
          </p>
          <p className="small hidden rounded-full bg-bg px-3.5 py-2 font-medium text-ink sm:block">
            {SEAT_COUNT} seats
          </p>
        </div>
        <button
          type="button"
          onClick={() => setShowZones((z) => !z)}
          aria-pressed={showZones}
          className={`small absolute right-3 top-3 inline-flex min-h-11 items-center gap-2 rounded-full px-4 font-semibold transition-colors sm:right-5 sm:top-5 ${
            showZones ? "bg-accent text-accent-ink" : "bg-bg text-ink hover:bg-surface"
          }`}
        >
          <Layers size={14} aria-hidden />
          {showZones ? "Hide zones" : "Show zones"}
        </button>
      </div>

      <div className="mt-8 grid gap-x-10 gap-y-10 lg:mt-10 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <p className="display tabular-nums" aria-hidden="true">
            {formatTime(rounded)}
          </p>
          <div aria-live="polite" className="mt-4">
            <p className="lead font-semibold text-accent">{caption.title}</p>
            <p className="mt-1 max-w-[36ch] text-muted">{caption.body}</p>
          </div>
        </div>

        <div className="lg:col-span-5">
          <label htmlFor="time-of-day" className="flex items-baseline justify-between font-medium">
            <span>Time of day</span>
            <span className="tabular-nums text-muted">{formatTime(rounded)}</span>
          </label>
          <div className="mt-3 rounded-full bg-surface px-4">
            <input
              id="time-of-day"
              type="range"
              className="time-range"
              min={DAY_START}
              max={DAY_END}
              step={5}
              value={rounded}
              aria-valuetext={`${formatTime(rounded)}, ${caption.title}`}
              style={{ ["--progress" as string]: `${progress}%` }}
              onChange={(e) => {
                stop();
                setMinutes(Number(e.target.value));
              }}
            />
          </div>
          <div className="small mt-2 flex justify-between px-4 tabular-nums text-muted" aria-hidden="true" data-ticks="">
            {TICKS.map((h) => (
              <span key={h}>{h > 12 ? `${h - 12} PM` : h === 12 ? "12 PM" : `${h} AM`}</span>
            ))}
          </div>
          {webgl && <p className="small mt-4 text-muted">Drag the plan to turn it; scroll or pinch to zoom.</p>}
          <div className="mt-6 flex flex-wrap gap-2" role="group" aria-label="Jump to a time">
            {PRESETS.map((p) => {
              const active = Math.abs(p.minutes - rounded) < 5;
              return (
                <button
                  key={p.label}
                  type="button"
                  aria-pressed={active}
                  onClick={() => {
                    stop();
                    setMinutes(p.minutes);
                  }}
                  className="chip"
                >
                  {p.label}
                  <span className="tabular-nums">{formatTime(p.minutes).replace(/^0/, "")}</span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="lg:col-span-3">
          <SunDial progress={sun.progress} elevation={sun.elevation} lamp={lampLevel(minutes)} />
          <dl className="mt-4 grid grid-cols-3 gap-3 rounded-[1.5rem] bg-surface p-5 lg:grid-cols-1 lg:gap-2">
            <div className="flex flex-col lg:flex-row lg:justify-between">
              <dt className="small text-muted">Sun altitude</dt>
              <dd className="tabular-nums">{palette.intensity > 0.01 ? `${altitude}°` : "Below the roofs"}</dd>
            </div>
            <div className="flex flex-col lg:flex-row lg:justify-between">
              <dt className="small text-muted">Sun bearing</dt>
              <dd>{bearingLabel(sun.azimuth)}</dd>
            </div>
            <div className="flex flex-col lg:flex-row lg:justify-between">
              <dt className="small text-muted">Shadow length</dt>
              <dd className="tabular-nums">{shadowRatio ? `${shadowRatio.toFixed(1)}× height` : "Lamplight"}</dd>
            </div>
          </dl>
          <div className="mt-6 flex gap-2">
            <button type="button" onClick={togglePlay} className="btn btn-sun flex-1 justify-between">
              {playing ? "Pause the day" : "Play the day"}
              {playing ? <Pause size={18} aria-hidden /> : <Play size={18} aria-hidden />}
            </button>
            <button
              type="button"
              onClick={() => {
                stop();
                setMinutes(MORNING);
              }}
              className="btn btn-plain h-[3.25rem] w-[3.25rem] shrink-0 !px-0"
              aria-label="Reset to morning"
              title="Reset to morning"
            >
              <RotateCcw size={18} aria-hidden />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
