"use client";

import Link from "next/link";
import { useSyncExternalStore, type ReactNode } from "react";
import { DAY_END, DAY_START, bearingLabel, formatTime, sunAt } from "@/lib/daylight";

/** The visitor's local time in minutes, refreshed every minute; null on the server. */
function subscribe(onChange: () => void) {
  const id = window.setInterval(onChange, 60_000);
  return () => window.clearInterval(id);
}
const localMinutes = () => {
  const d = new Date();
  return d.getHours() * 60 + d.getMinutes();
};
const serverMinutes = () => null;

export function useLocalMinutes() {
  return useSyncExternalStore(subscribe, localMinutes, serverMinutes);
}

function describe(minutes: number) {
  const daylight = minutes >= DAY_START && minutes <= DAY_END - 20;
  if (!daylight) {
    return {
      line: `It is ${formatTime(minutes).replace(/^0/, "")} where you are. The sun has left the hall and the lamps are on.`,
      studioAt: DAY_END - 15,
    };
  }
  const sun = sunAt(minutes);
  const where = bearingLabel(sun.azimuth).toLowerCase();
  const seat =
    minutes < 11 * 60 ? "the window bar has the light" : minutes < 15 * 60 ? "the skylights are lighting the floor by the bar" : "the lounge is catching the west sun";
  return {
    line: `It is ${formatTime(minutes).replace(/^0/, "")} where you are. The sun would be ${where}, and ${seat}.`,
    studioAt: Math.round(minutes / 5) * 5,
  };
}

/**
 * Wraps the hero's pool of warm light and moves it to the height the sun has at the visitor's local hour:
 * high at noon, low at the ends of the day, below the horizon at night.
 */
export function LiveSunDisc({ children, className }: { children: ReactNode; className?: string }) {
  const minutes = useLocalMinutes();
  let shift = 0;
  if (minutes !== null) {
    const inDay = minutes >= DAY_START && minutes <= DAY_END;
    const lift = inDay ? sunAt(minutes).elevation / ((58 * Math.PI) / 180) : 0;
    shift = Math.round((1 - lift) * 14);
  }
  return (
    <div className={className} style={{ transform: `translateY(${shift}%)`, transition: "transform 1200ms var(--ease-expo)" }}>
      {children}
    </div>
  );
}

/** One line about the light right now, with a way into the 3D hall at the same hour. */
export function LiveSunLine() {
  const minutes = useLocalMinutes();
  if (minutes === null) {
    return (
      <p className="max-w-[44ch] text-muted">
        The hall changes by the hour.{" "}
        <Link href="/space" className="link font-semibold text-ink">
          Open it at any time of day
        </Link>
      </p>
    );
  }
  const { line, studioAt } = describe(minutes);
  return (
    <p className="max-w-[44ch] text-muted" aria-live="polite">
      {line}{" "}
      <Link href={`/space?t=${studioAt}#studio`} className="link font-semibold text-ink">
        See it now
      </Link>
    </p>
  );
}
