import Image from "next/image";
import Link from "next/link";
import { Reveal } from "@/components/reveal";
import { PhotoFrame } from "@/components/ui";
import { SEAT_COUNT } from "@/lib/cafe-layout";
import { DAY_MOMENTS } from "@/lib/content";
import { formatTime } from "@/lib/daylight";
import { PHOTOS, type PhotoKey } from "@/lib/photos";

function Thumb({ photo, focus }: { photo: PhotoKey; focus?: string }) {
  const p = PHOTOS[photo];
  return (
    <span className="relative mx-[0.14em] inline-block h-[0.82em] w-[1.25em] overflow-hidden rounded-[0.22em] align-[-0.08em]" aria-hidden="true">
      <Image src={p.src} alt="" fill sizes="96px" quality={90} className="object-cover" style={focus ? { objectPosition: focus } : undefined} />
    </span>
  );
}

/** A statement with small pictures of the things it names, set into the line. */
export function IntroStatement() {
  return (
    <section aria-label="About Sun Cafe" className="frame section grid place-items-center">
      <Reveal as="p" className="max-w-[30ch] text-center font-[family-name:var(--font-display)] text-[clamp(1.75rem,1.1rem+2.4vw,3.25rem)] leading-[1.12] tracking-[-0.01em] max-sm:text-left">
        One long hall <Thumb photo="bigHall" /> built around one long window <Thumb photo="windowSeats" />. We pour the
        coffee <Thumb photo="flatWhiteTop" /> and let the light move the {SEAT_COUNT} chairs.
      </Reveal>
    </section>
  );
}

const STAGE_NAMES = ["First light", "High noon", "Golden hour", "Lamplight"];
const STAGE_FOCUS = ["50% 60%", "50% 50%", "50% 40%", "35% 50%"];

/** The day in four photographs, each a door into the 3D hall at that hour. */
export function DayStages() {
  return (
    <section aria-labelledby="day-title" className="frame section">
      <div className="grid gap-y-6 lg:grid-cols-12 lg:items-end lg:gap-x-[var(--gutter)]">
        <Reveal className="lg:col-span-7">
          <h2 id="day-title" className="head">
            A day in <em>four lights</em>
          </h2>
        </Reveal>
        <Reveal delay={0.08} className="max-w-[44ch] text-muted lg:col-span-4 lg:col-start-9">
          <p>The furniture never moves. The light does the rearranging, from the first low sun to the last lamp.</p>
        </Reveal>
      </div>
      <ol className="mt-14 grid gap-x-[var(--gutter)] gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
        {DAY_MOMENTS.map((m, i) => (
          <Reveal as="li" key={m.time} delay={i * 0.08} className={i % 2 ? "lg:mt-16" : ""}>
            <Link href={`/space?t=${m.time}#studio`} className="group block">
              <PhotoFrame photo={PHOTOS[m.photo]} ratio="4 / 5" focus={STAGE_FOCUS[i]} sizes="(min-width: 1024px) 24vw, (min-width: 640px) 46vw, 92vw" />
              <p className="mt-5 text-sm font-semibold tabular-nums text-accent">{formatTime(m.time).replace(/^0/, "")}</p>
              <h3 className="mt-1 font-[family-name:var(--font-display)] text-[2rem] leading-none">{STAGE_NAMES[i]}</h3>
              <p className="mt-3 max-w-[36ch] text-muted">{m.body}</p>
              <span className="link mt-3 inline-block font-semibold group-hover:underline">See the hall at this hour</span>
            </Link>
          </Reveal>
        ))}
      </ol>
    </section>
  );
}

/** A warm panel: the statement, two short texts, and one photograph shown whole. */
export function LightPanel() {
  return (
    <section aria-labelledby="light-title" className="px-[var(--margin)]">
      <div className="relative mx-auto grid max-w-[104rem] items-center gap-12 overflow-hidden rounded-[var(--radius)] bg-surface p-6 md:p-12 lg:grid-cols-12 lg:gap-x-[var(--gutter)] lg:p-16">
        <div className="glow -left-[10%] -top-[30%] h-[80%] w-[60%]" aria-hidden="true" />
        <Reveal className="relative lg:col-span-5">
          <PhotoFrame photo={PHOTOS.sunCup} sizes="(min-width: 1024px) 34vw, 90vw" className="mx-auto max-w-[30rem]" />
        </Reveal>
        <div className="relative lg:col-span-6 lg:col-start-7">
          <Reveal>
            <h2 id="light-title" className="head max-w-[13ch]">
              Half in the sun, <em>half in the shade.</em>
            </h2>
          </Reveal>
          <div className="mt-12 grid gap-10 sm:grid-cols-2">
            <Reveal delay={0.08}>
              <h3 className="lead font-semibold">Light, not glare</h3>
              <p className="mt-3 text-muted">
                One wall of glass, pale walls everywhere else. The hall is designed around the changing day rather than
                against it.
              </p>
            </Reveal>
            <Reveal delay={0.16}>
              <h3 className="lead font-semibold">Room to linger</h3>
              <p className="mt-3 text-muted">
                Move one table over and you are somewhere else entirely. Nobody minds if you follow the sun with your cup.
              </p>
            </Reveal>
          </div>
          <Reveal delay={0.24}>
            <Link href="/about" className="btn btn-sun mt-12">
              How the hall was planned
            </Link>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/** The closing invitation: a warm photograph, one line and one action. */
export function VisitBand() {
  return (
    <section aria-labelledby="visit-title" className="px-[var(--margin)] pb-[var(--section)] pt-[var(--section)]">
      <div className="relative mx-auto max-w-[104rem] overflow-hidden rounded-[var(--radius)]">
        <Image
          src={PHOTOS.goldenRoom.src}
          alt={PHOTOS.goldenRoom.alt}
          fill
          quality={90}
          sizes="100vw"
          placeholder="blur"
          className="object-cover"
          style={{ objectPosition: "50% 45%" }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#120d0a]/90 via-[#120d0a]/55 to-[#120d0a]/10" aria-hidden="true" />
        <div className="relative grid min-h-[70svh] content-center p-8 md:p-14 lg:p-20">
          <h2 id="visit-title" className="display max-w-[10ch]">
            Step into <em>the light.</em>
          </h2>
          <p className="lead mt-6 max-w-[32ch] text-ink/90">
            There is no door to walk through, but there is a seat in the hall that suits your hour.
          </p>
          <div className="mt-9 flex flex-wrap gap-3">
            <Link href="/visit" className="btn btn-sun">
              Find your seat
            </Link>
            <Link href="/space" className="btn btn-plain">
              Explore the hall
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
