import type { Metadata } from "next";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/reveal";
import { PhotoFrame } from "@/components/ui";
import { PHOTOS } from "@/lib/photos";

export const metadata: Metadata = {
  title: "Credits",
  description: "Photographers, 3D assets and fonts used in the Sun Cafe portfolio project.",
};

const POLY_HAVEN = [
  ["gallinera_chair", "Gallinera chair"],
  ["gallinera_table", "Gallinera table"],
  ["round_wooden_table_02", "Round wooden table 02"],
  ["bar_chair_round_01", "Round bar chair 01"],
  ["sofa_03", "Sofa 03"],
  ["modern_arm_chair_01", "Modern armchair 01"],
  ["coffee_table_round_01", "Round coffee table 01"],
  ["side_table_01", "Side table 01"],
  ["potted_plant_01", "Potted plant 01"],
  ["potted_plant_02", "Potted plant 02"],
  ["calathea_orbifolia_01", "Calathea orbifolia 01"],
  ["marble_01", "Marble 01 (texture)"],
  ["wood_floor", "Wood floor (texture)"],
  ["white_plaster_02", "White plaster 02 (texture)"],
  ["lebombo", "Lebombo (HDRI)"],
] as const;

const photos = Object.values(PHOTOS);

export default function CreditsPage() {
  return (
    <div className="frame pb-[var(--section)] pt-[calc(var(--header-h)+10svh)]">
      <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-x-[var(--gutter)]">
        <div className="lg:col-span-6">
          <h1 className="display rise max-w-[12ch]">Who made the pictures</h1>
          <p className="lead rise mt-8 max-w-[40ch]" style={{ animationDelay: "120ms" }}>
            Sun Cafe is fictional; the photographs are real. Every photo here is a free-to-use image from Unsplash, stored
            with the site and shown under the Unsplash License. The round crops of the hall are renders of its 3D model.
          </p>
          <a href="#photo-credits" className="btn btn-sun rise mt-8" style={{ animationDelay: "220ms" }}>
            See every photographer
          </a>
        </div>
        <div className="relative hidden h-[34rem] lg:col-span-5 lg:col-start-8 lg:block" aria-hidden="true">
          <div className="glow -inset-[10%]" />
          <PhotoFrame photo={PHOTOS.heroSteam} sizes="22rem" className="settle absolute right-0 top-0 w-[21rem]" />
          <PhotoFrame photo={PHOTOS.goldenLatte} sizes="20rem" className="settle absolute bottom-6 left-0 w-[19rem] shadow-[0_30px_60px_-20px_rgb(0_0_0/0.7)]" />
        </div>
      </div>

      <section aria-labelledby="photo-credits" className="mt-[var(--section)]">
        <div className="flex items-baseline justify-between gap-6">
          <h2 id="photo-credits" className="head">
            Photography
          </h2>
          <p className="tabular-nums text-muted">{photos.length} photographs</p>
        </div>
        <ul className="mt-10 grid gap-x-[var(--gutter)] gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
          {photos.map((p, i) => (
            <Reveal as="li" key={p.slug} delay={(i % 3) * 0.06} className="grid grid-cols-[6rem_1fr] items-center gap-5 md:grid-cols-[9rem_1fr]">
              <div className="relative aspect-square overflow-hidden rounded-[1rem] bg-surface">
                <Image src={p.src} alt="" fill sizes="144px" quality={90} className="object-cover" />
              </div>
              <div className="min-w-0">
                <p className="truncate font-semibold">{p.by}</p>
                <a
                  href={`https://unsplash.com/photos/${p.slug}`}
                  className="link inline-flex min-h-8 items-center gap-1 text-muted"
                  aria-label={`Photo by ${p.by} on Unsplash: ${p.alt}`}
                >
                  @{p.handle} on Unsplash
                  <ArrowUpRight size={14} aria-hidden />
                </a>
              </div>
            </Reveal>
          ))}
        </ul>
      </section>

      <section aria-labelledby="model-credits" className="mt-[var(--section)]">
        <div className="flex items-baseline justify-between gap-6">
          <h2 id="model-credits" className="head">
            3D models, textures and lighting
          </h2>
          <p className="text-muted">Poly Haven, CC0</p>
        </div>
        <ul className="mt-10 grid gap-x-[var(--gutter)] gap-y-3 sm:grid-cols-2 lg:grid-cols-3">
          {POLY_HAVEN.map(([id, name]) => (
            <li key={id}>
              <a href={`https://polyhaven.com/a/${id}`} className="link inline-flex min-h-11 items-center gap-2">
                <span className="dot" aria-hidden="true" />
                {name}
                <ArrowUpRight size={14} aria-hidden />
              </a>
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="other-credits" className="mt-[var(--section)] grid gap-10 bg-surface p-8 md:grid-cols-2 md:p-12">
        <div>
          <h2 id="other-credits" className="lead font-semibold">
            Type
          </h2>
          <p className="mt-3 text-muted">Bricolage Grotesque, self-hosted through Next.js fonts.</p>
        </div>
        <div>
          <h2 className="lead font-semibold">Built with</h2>
          <p className="mt-3 text-muted">Next.js, React, Tailwind CSS, Motion, three.js and React Three Fiber.</p>
        </div>
      </section>
    </div>
  );
}
