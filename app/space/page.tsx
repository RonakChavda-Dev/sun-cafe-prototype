import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";
import { Reveal } from "@/components/reveal";
import { CafeStudio } from "@/components/space/cafe-studio";
import { PageHero, PhotoFrame, SectionIntro } from "@/components/ui";
import { SEAT_COUNT, ZONES } from "@/lib/cafe-layout";
import { PHOTOS, ZONE_PHOTOS } from "@/lib/photos";
import fallback from "@/public/images/studio-fallback.jpg";

export const metadata: Metadata = {
  title: "The Space",
  description: `Explore the Sun Cafe hall from above: ${SEAT_COUNT} seats, a long south window and light that changes through the day. A fictional, real-time 3D space.`,
};

const FACTS = [
  { value: String(SEAT_COUNT), label: "seats in six places" },
  { value: "24 m", label: "of south-facing glass" },
  { value: "2", label: "skylights in the roof" },
  { value: "13", label: "lamps for after sundown" },
];

function StudioPlaceholder() {
  return (
    <div className="relative aspect-[4/5] overflow-hidden rounded-[var(--radius)] bg-surface sm:aspect-[4/3] lg:aspect-[16/9]">
      <Image src={fallback} alt="A render of the Sun Cafe hall from above in morning light." fill sizes="100vw" quality={90} placeholder="blur" className="object-cover" />
    </div>
  );
}

export default function SpacePage() {
  return (
    <>
      <PageHero
        photo={PHOTOS.barHall}
        title={
          <>
            One big room, <em>lit by the day</em>
          </>
        }
        intro={
          <p>
            Sun Cafe is one open hall: a wall of steel windows to the south, two skylights in the roof and no dark
            corners, only better and worse hours to sit in each part.
          </p>
        }
      >
        <a href="#studio" className="btn btn-sun">
          Open the daylight studio
        </a>
      </PageHero>

      <section aria-labelledby="facts-title" className="bg-surface">
        <h2 id="facts-title" className="sr-only">
          The hall in numbers
        </h2>
        <dl className="frame grid grid-cols-2 gap-y-10 py-16 lg:grid-cols-4 lg:gap-x-[var(--gutter)]">
          {FACTS.map((f, i) => (
            <Reveal key={f.label} delay={i * 0.07}>
              <dt className="sr-only">{f.label}</dt>
              <dd>
                <span className="display block tabular-nums text-accent">{f.value}</span>
                <span className="mt-3 block text-ink/85">{f.label}</span>
              </dd>
            </Reveal>
          ))}
        </dl>
      </section>

      <section id="studio" aria-labelledby="studio-title" className="frame section scroll-mt-4">
        <div className="mb-12 lg:mb-16">
          <SectionIntro
            id="studio-title"
            title={
              <>
                The whole hall, <em>from above</em>
              </>
            }
            body={
              <p>
                Move the sun through a day. Light only gets in where the building lets it, through the south glass, the
                side windows and the skylights, and every chair throws its own shadow.
              </p>
            }
          />
        </div>
        <Suspense fallback={<StudioPlaceholder />}>
          <CafeStudio />
        </Suspense>
      </section>

      <section aria-labelledby="zones-title" className="frame pb-[var(--section)]">
        <SectionIntro
          id="zones-title"
          title={
            <>
              Six places <em>to sit</em>
            </>
          }
          body={<p>Each part of the hall has its hour. Switch on the zones in the studio to find them on the plan.</p>}
        />
        <ul className="mt-16 grid gap-x-[var(--gutter)] gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
          {ZONES.map((z, i) => (
            <Reveal as="li" key={z.id} delay={(i % 3) * 0.08} className="group">
              <PhotoFrame
                photo={PHOTOS[ZONE_PHOTOS[z.id].photo]}
                ratio="4 / 5"
                focus={ZONE_PHOTOS[z.id].focus}
                sizes="(min-width: 1024px) 31vw, (min-width: 640px) 46vw, 92vw"
              />
              <h3 className="mt-6 font-[family-name:var(--font-display)] text-[2.25rem] leading-none">{z.name}</h3>
              <p className="mt-2 font-semibold text-accent">{z.seats}</p>
              <p className="mt-2 max-w-[38ch] text-muted">{z.note}</p>
            </Reveal>
          ))}
        </ul>
      </section>

      <section aria-labelledby="drink-title" className="bg-surface">
        <div className="frame grid items-center gap-12 py-[var(--section)] lg:grid-cols-12 lg:gap-x-[var(--gutter)]">
          <div className="lg:col-span-6">
            <h2 id="drink-title" className="head max-w-[14ch]">
              Something to drink <em>while you sit</em>
            </h2>
            <p className="mt-6 max-w-[38ch] text-muted">Every drink on the menu is paired with the hour it suits best.</p>
            <Link href="/menu" className="btn btn-sun mt-10">
              See the menu
            </Link>
          </div>
          <PhotoFrame photo={PHOTOS.goldenLatte} sizes="(min-width: 1024px) 40vw, 92vw" className="lg:col-span-6" />
        </div>
      </section>
    </>
  );
}
