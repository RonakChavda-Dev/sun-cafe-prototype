"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";
import { PhotoFrame } from "@/components/ui";
import { MENU } from "@/lib/content";
import { formatTime } from "@/lib/daylight";
import { menuSlug } from "@/lib/menu-slug";
import { PHOTOS } from "@/lib/photos";

const PICKS = ["First Light", "The House Cup", "Afternoon Ice", "Golden Hour", "Night Shift"].map(
  (n) => MENU.find((m) => m.name === n)!,
);

/**
 * Pointing at or tabbing to a drink brings its photograph up in one frame level with the row.
 * On touch screens each row shows its own picture instead.
 */
export function SignatureIndex() {
  const root = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(0);
  const [pointing, setPointing] = useState(false);
  const [y, setY] = useState(0);

  const show = (i: number, row: HTMLElement) => {
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    const frame = root.current?.querySelector<HTMLElement>("[data-frame]");
    const box = root.current;
    if (!frame || !box) return;
    const top = row.offsetTop + row.offsetHeight / 2 - frame.offsetHeight / 2;
    setY(Math.min(box.offsetHeight - frame.offsetHeight, Math.max(0, top)));
    setOpen(i);
    setPointing(true);
  };

  return (
    <section aria-labelledby="drinks-title" className="frame section">
      <div className="grid gap-y-6 lg:grid-cols-12 lg:items-end lg:gap-x-[var(--gutter)]">
        <h2 id="drinks-title" className="head lg:col-span-7">
          Five drinks, <em>five hours</em>
        </h2>
        <p className="max-w-[44ch] text-muted lg:col-span-4 lg:col-start-9">
          Every drink on the menu belongs to a time of day. These five cover it from first light to the last lamp.
        </p>
      </div>

      <div
        ref={root}
        className="relative mt-14"
        onPointerLeave={() => setPointing(false)}
        onBlur={(e) => {
          if (!e.currentTarget.contains(e.relatedTarget as Node | null)) setPointing(false);
        }}
      >
        <ul className="lg:max-w-[58%]">
          {PICKS.map((item, i) => (
            <li key={item.name} className="border-b border-line last:border-b-0">
              <Link
                href={`/menu#${menuSlug(item.name)}`}
                onPointerEnter={(e) => show(i, e.currentTarget)}
                onFocus={(e) => show(i, e.currentTarget)}
                className={`grid grid-cols-[1fr_auto] items-baseline gap-x-6 py-6 transition-opacity duration-200 ${
                  pointing && open !== i ? "lg:opacity-45" : ""
                }`}
              >
                <span className="relative col-span-2 mb-5 block aspect-[4/3] overflow-hidden rounded-[var(--radius)] lg:hidden">
                  <Image src={PHOTOS[item.photo].src} alt="" fill sizes="92vw" quality={90} className="object-cover" />
                </span>
                <span className="font-[family-name:var(--font-display)] text-[clamp(2.25rem,1.6rem+2.6vw,4rem)] leading-none">{item.name}</span>
                <span className="lead tabular-nums text-accent">{formatTime(item.pairedAt).replace(/^0/, "")}</span>
                <span className="col-span-2 mt-3 max-w-[52ch] text-muted">{item.description}</span>
              </Link>
            </li>
          ))}
        </ul>

        <div
          data-frame=""
          aria-hidden="true"
          className="pointer-events-none absolute right-0 top-0 hidden w-[36%] lg:block"
          style={{ transform: `translateY(${y}px)`, transition: "transform 420ms var(--ease-out)" }}
        >
          <div className="relative">
            {PICKS.map((item, i) => (
              <PhotoFrame
                key={item.name}
                photo={PHOTOS[item.photo]}
                ratio="4 / 5"
                sizes="36vw"
                className={`transition-opacity duration-300 ${i === open ? "opacity-100" : "absolute inset-0 opacity-0"}`}
              />
            ))}
          </div>
        </div>
      </div>

      <Link href="/menu" className="btn btn-sun mt-14">
        See all sixteen
      </Link>
    </section>
  );
}
