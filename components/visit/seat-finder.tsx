"use client";

import Link from "next/link";
import { useId, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { PhotoFrame } from "@/components/ui";
import { ZONES } from "@/lib/cafe-layout";
import { formatTime } from "@/lib/daylight";
import { PHOTOS, ZONE_PHOTOS } from "@/lib/photos";

const PURPOSES = [
  { id: "focus", label: "Get something done" },
  { id: "read", label: "Read for a while" },
  { id: "talk", label: "Talk to someone" },
  { id: "light", label: "Just watch the light" },
] as const;

const TIMES = [
  { id: "morning", label: "Morning", minutes: 9 * 60 },
  { id: "midday", label: "Midday", minutes: 12 * 60 + 30 },
  { id: "afternoon", label: "Afternoon", minutes: 15 * 60 + 30 },
  { id: "evening", label: "Evening", minutes: 19 * 60 + 30 },
] as const;

type Purpose = (typeof PURPOSES)[number]["id"];
type Time = (typeof TIMES)[number]["id"];

/** Which zone suits which purpose at which hour, and why. */
const PICKS: Record<Purpose, Record<Time, { zone: string; why: string }>> = {
  focus: {
    morning: { zone: "east-room", why: "Bright early and quiet, with room to spread a notebook out." },
    midday: { zone: "long-tables", why: "Skylight overhead and enough table for two laptops and a lunch." },
    afternoon: { zone: "long-tables", why: "The sun has swung west; the long tables stay even and glare-free." },
    evening: { zone: "long-tables", why: "The first lamps to come on, and the last to go off." },
  },
  read: {
    morning: { zone: "window-bar", why: "Low sun along the glass. Face out, back to the room." },
    midday: { zone: "lounge", why: "The west corner is still in shade; the sofas are at their coolest." },
    afternoon: { zone: "lounge", why: "Light starts to reach the rug. Stay for one more chapter." },
    evening: { zone: "lounge", why: "Deep seats and a lamp on the side table." },
  },
  talk: {
    morning: { zone: "floor", why: "Two-tops in loose rows, close enough to the bar to order again." },
    midday: { zone: "floor", why: "Short shadows and a full room; the floor hums without being loud." },
    afternoon: { zone: "east-room", why: "The east tables empty out after lunch. Easier to hear each other." },
    evening: { zone: "floor", why: "Pull two tables together under the lamps." },
  },
  light: {
    morning: { zone: "window-bar", why: "The steel window throws its whole grid across the floor in front of you." },
    midday: { zone: "long-tables", why: "Watch the two skylight squares crawl across the floor toward the bar." },
    afternoon: { zone: "window-bar", why: "Shadows of the stools start to stretch toward the north wall." },
    evening: { zone: "lounge", why: "The west windows get the very last of it." },
  },
};

function ChoiceGroup<T extends string>({
  legend,
  name,
  options,
  value,
  onChange,
}: {
  legend: string;
  name: string;
  options: readonly { id: T; label: string }[];
  value: T;
  onChange: (v: T) => void;
}) {
  return (
    <fieldset>
      <legend className="lead font-medium">{legend}</legend>
      <div className="mt-4 flex flex-wrap gap-2">
        {options.map((o) => (
          <label key={o.id} className="chip cursor-pointer has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-accent">
            <input type="radio" name={name} value={o.id} checked={value === o.id} onChange={() => onChange(o.id)} className="sr-only" />
            {o.label}
          </label>
        ))}
      </div>
    </fieldset>
  );
}

export function SeatFinder() {
  const [purpose, setPurpose] = useState<Purpose>("read");
  const [time, setTime] = useState<Time>("afternoon");
  const reduce = useReducedMotion();
  const id = useId();

  const pick = PICKS[purpose][time];
  const zone = ZONES.find((z) => z.id === pick.zone)!;
  const minutes = TIMES.find((t) => t.id === time)!.minutes;

  return (
    <div className="grid gap-10 lg:grid-cols-12 lg:gap-x-[var(--gutter)]">
      <div className="space-y-10 lg:col-span-5">
        <ChoiceGroup legend="I'm coming to…" name={`${id}-purpose`} options={PURPOSES} value={purpose} onChange={setPurpose} />
        <ChoiceGroup legend="Around…" name={`${id}-time`} options={TIMES} value={time} onChange={setTime} />
        <p className="text-muted">Nothing is booked or sent anywhere. This only points you to a part of the hall.</p>
      </div>

      <div className="lg:col-span-7" aria-live="polite">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={`${purpose}-${time}`}
            initial={reduce ? { opacity: 0 } : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, y: -10 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="grid items-center gap-8 rounded-[var(--radius)] bg-surface p-5 sm:grid-cols-2 md:p-8"
          >
            <PhotoFrame photo={PHOTOS[ZONE_PHOTOS[zone.id].photo]} ratio="4 / 5" focus={ZONE_PHOTOS[zone.id].focus} sizes="(min-width: 1024px) 26vw, (min-width: 640px) 45vw, 92vw" />
            <div className="flex flex-col justify-between gap-8">
              <div>
                <p className="small font-semibold text-accent">Your seat</p>
                <h3 className="mt-2 font-[family-name:var(--font-display)] text-[clamp(2.25rem,1.6rem+2vw,3.5rem)] leading-none">{zone.name}</h3>
                <p className="mt-3 font-medium text-ink/85">{zone.seats}</p>
                <p className="mt-5 max-w-[34ch] text-muted">{pick.why}</p>
              </div>
              <Link href={`/space?t=${minutes}#studio`} className="btn btn-sun self-start">
                See it at {formatTime(minutes).replace(/^0/, "")}
              </Link>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
