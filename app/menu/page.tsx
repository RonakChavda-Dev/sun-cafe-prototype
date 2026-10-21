import type { Metadata } from "next";
import Link from "next/link";
import { MenuBoard } from "@/components/menu/menu-board";
import { Reveal } from "@/components/reveal";
import { PageHero, PhotoFrame } from "@/components/ui";
import { PHOTOS } from "@/lib/photos";

export const metadata: Metadata = {
  title: "Menu",
  description: "An imagined menu for an imaginary cafe: espresso, slow-bar coffee, cold drinks and bakes, each paired with an hour of the day.",
};

export default function MenuPage() {
  return (
    <>
      <PageHero
        photo={PHOTOS.cappuccinoBrown}
        title={
          <>
            Sorted by <em>daylight</em>
          </>
        }
        intro={
          <p>
            Sixteen things on the Sun Cafe menu: espresso at the north counter, filter at the slow bar, something cold
            and a bake. Each one names the hour it suits best.
          </p>
        }
      >
        <a href="#espresso" className="btn btn-sun">
          Read the menu
        </a>
      </PageHero>

      <section aria-label="The menu" className="frame pb-[var(--section)]">
        <MenuBoard />
        <p className="mt-20 max-w-[60ch] text-muted">
          An imagined menu for an imaginary cafe. Nothing here is for sale, and prices, ingredient lists and allergen
          notes are left out rather than invented.
        </p>
      </section>

      <section aria-labelledby="bar-title" className="bg-surface">
        <div className="frame grid items-center gap-12 py-[var(--section)] lg:grid-cols-12 lg:gap-x-[var(--gutter)]">
          <Reveal className="lg:col-span-5">
            <PhotoFrame photo={PHOTOS.espressoPour} sizes="(min-width: 1024px) 34vw, 92vw" className="mx-auto max-w-[28rem]" />
          </Reveal>
          <Reveal className="lg:col-span-5 lg:col-start-8" delay={0.08}>
            <h2 id="bar-title" className="head max-w-[13ch]">
              Ask the bar <em>what it would order</em>
            </h2>
            <p className="mt-6 max-w-[38ch] text-muted">
              The menu is short on purpose. If none of it fits the hour, tell the bar how the light looks from your seat
              and let them choose.
            </p>
            <Link href="/space" className="btn btn-sun mt-10">
              Find the bar in 3D
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  );
}
