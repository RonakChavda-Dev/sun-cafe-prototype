"use client";

import Link from "next/link";
import { useState } from "react";
import { PhotoFrame } from "@/components/ui";
import { SEAT_COUNT } from "@/lib/cafe-layout";
import { PHOTOS, type PhotoKey } from "@/lib/photos";

const PLACES: { id: string; tab: string; photo: PhotoKey; text: string }[] = [
  {
    id: "window",
    tab: "Window bar",
    photo: "windowSeats",
    text: "Twenty-two stools along the south glass. The first seats the morning reaches, and the brightest at noon.",
  },
  {
    id: "floor",
    tab: "The floor",
    photo: "barHall",
    text: "Small tables in loose rows and two long shared tables between the skylights, all on one oak floor.",
  },
  {
    id: "lounge",
    tab: "The lounge",
    photo: "eveningBanquette",
    text: "Low seats in the west corner, where the last sun lands before the lamps come on.",
  },
];

/** One wide picture of the hall, three places to choose between, two ways in. */
export function HallShowcase() {
  const [active, setActive] = useState(PLACES[0].id);
  const place = PLACES.find((p) => p.id === active)!;

  return (
    <section aria-labelledby="hall-title" className="bg-surface">
      <div className="frame grid items-center gap-12 py-[var(--section)] lg:grid-cols-12 lg:gap-x-[var(--gutter)]">
        <div className="lg:col-span-7">
          {/* Every picture here is landscape, so one 3:2 frame shows each of them whole */}
          <div className="relative">
            {PLACES.map((p) => (
              <PhotoFrame
                key={p.id}
                photo={PHOTOS[p.photo]}
                ratio="3 / 2"
                sizes="(min-width: 1024px) 56vw, 92vw"
                className={`transition-opacity duration-500 ${p.id === active ? "opacity-100" : "pointer-events-none absolute inset-0 opacity-0"}`}
              />
            ))}
          </div>
        </div>

        <div className="lg:col-span-4 lg:col-start-9">
          <h2 id="hall-title" className="head">
            The hall
          </h2>
          <div role="tablist" aria-label="Places in the hall" className="mt-8 flex flex-wrap gap-2">
            {PLACES.map((p) => (
              <button
                key={p.id}
                type="button"
                role="tab"
                aria-selected={p.id === active}
                aria-controls="hall-panel"
                onClick={() => setActive(p.id)}
                className="chip aria-selected:bg-accent aria-selected:text-accent-ink"
              >
                {p.tab}
              </button>
            ))}
          </div>
          <div id="hall-panel" role="tabpanel" aria-live="polite">
            <p className="mt-8 text-ink/90">
              {place.text} {SEAT_COUNT} seats in all, under one roof with two skylights.
            </p>
          </div>
          <div className="mt-10 flex flex-wrap gap-3">
            <Link href="/space" className="btn btn-sun">
              Walk the hall in 3D
            </Link>
            <Link href="/visit#seat-finder" className="btn btn-plain">
              Find your seat
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
