import type { Metadata } from "next";
import Link from "next/link";
import { Reveal } from "@/components/reveal";
import { PageHero, PhotoFrame, SectionIntro } from "@/components/ui";
import { HOUSE_DETAILS, PRINCIPLES, PROCESS } from "@/lib/content";
import { PHOTOS } from "@/lib/photos";

export const metadata: Metadata = {
  title: "About",
  description: "The thinking behind Sun Cafe, a fictional cafe where coffee is considered alongside the room and the light it is enjoyed in.",
};

export default function AboutPage() {
  return (
    <>
      <PageHero
        photo={PHOTOS.milkPour}
        title={
          <>
            Coffee and <em>the room</em>
          </>
        }
        intro={
          <p>
            Most cafes design the cup and then find a room for it. Sun Cafe started the other way round: with a long
            south window, and the question of what would be worth drinking beside it.
          </p>
        }
      >
        <a href="#story-title" className="btn btn-sun">
          Read how it started
        </a>
      </PageHero>

      <section aria-labelledby="story-title" className="frame section grid gap-y-10 lg:grid-cols-12 lg:gap-x-[var(--gutter)]">
        <Reveal className="lg:col-span-5">
          <h2 id="story-title" className="head max-w-[12ch]">
            The hall <em>came first</em>
          </h2>
        </Reveal>
        <Reveal delay={0.08} className="lead grid gap-6 text-ink/85 md:grid-cols-2 md:gap-[var(--gutter)] lg:col-span-7 lg:col-start-6">
          <p>
            Sun Cafe is a portfolio project: a cafe brand that exists only on this site. The brief was to make a coffee
            place feel special without claiming it is, by paying attention to the hours you would spend there.
          </p>
          <p>
            So the hall came first. Tables were placed by where the light lands at ten in the morning, the lounge went
            where the last sun reaches, and the menu was written around the clock.
          </p>
        </Reveal>
      </section>

      <section aria-labelledby="principles-title" className="frame pb-[var(--section)]">
        <SectionIntro
          id="principles-title"
          title={
            <>
              Four things we <em>keep coming back to</em>
            </>
          }
        />
        <ul className="mt-16 space-y-24">
          {PRINCIPLES.map((p, i) => (
            <li key={p.title} className="grid items-center gap-10 md:grid-cols-12 md:gap-x-[var(--gutter)]">
              <Reveal className={`md:col-span-6 ${i % 2 ? "md:order-2 md:col-start-7" : ""}`}>
                <PhotoFrame photo={PHOTOS[p.photo]} sizes="(min-width: 768px) 48vw, 92vw" className="mx-auto max-h-[78svh] w-full" ratio="4 / 3" />
              </Reveal>
              <Reveal delay={0.08} className={`md:col-span-5 ${i % 2 ? "md:order-1 md:col-start-1" : "md:col-start-8"}`}>
                <h3 className="head max-w-[12ch]">{p.title}</h3>
                <p className="lead mt-6 max-w-[34ch] text-ink/85">{p.body}</p>
              </Reveal>
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="process-title" className="bg-surface">
        <div className="frame py-[var(--section)]">
          <SectionIntro
            id="process-title"
            title={
              <>
                From bean <em>to cup</em>
              </>
            }
            body={<p>Not a manifesto, just the order things happen in behind the north counter.</p>}
          />
          <ol className="mt-16 grid gap-x-[var(--gutter)] gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
            {PROCESS.map((p, i) => (
              <Reveal as="li" key={p.title} delay={i * 0.07}>
                <PhotoFrame photo={PHOTOS[p.altPhoto]} ratio="4 / 5" sizes="(min-width: 1024px) 24vw, (min-width: 640px) 46vw, 92vw" />
                <h3 className="mt-6 font-[family-name:var(--font-display)] text-[2rem] leading-none">{p.title}</h3>
                <p className="mt-3 max-w-[30ch] text-muted">{p.body}</p>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      <section aria-labelledby="details-title" className="frame section grid gap-y-12 lg:grid-cols-12 lg:gap-x-[var(--gutter)]">
        <Reveal className="lg:col-span-5">
          <h2 id="details-title" className="head max-w-[10ch]">
            Unwritten <em>rules</em>
          </h2>
        </Reveal>
        <ul className="grid gap-x-[var(--gutter)] gap-y-10 sm:grid-cols-2 lg:col-span-7 lg:col-start-6">
          {HOUSE_DETAILS.map((d, i) => (
            <Reveal as="li" key={d.title} delay={(i % 2) * 0.07} className="flex gap-4">
              <span className="dot mt-[0.55em]" aria-hidden="true" />
              <div>
                <h3 className="lead font-semibold">{d.title}</h3>
                <p className="mt-2 text-muted">{d.body}</p>
              </div>
            </Reveal>
          ))}
        </ul>
      </section>

      <section aria-labelledby="see-title" className="px-[var(--margin)] pb-[var(--section)]">
        <div className="mx-auto grid max-w-[104rem] items-center gap-10 rounded-[var(--radius)] bg-accent p-8 text-accent-ink md:grid-cols-12 md:gap-x-[var(--gutter)] md:p-14">
          <h2 id="see-title" className="head max-w-[14ch] md:col-span-7">
            See how the light moves through it
          </h2>
          <div className="md:col-span-4 md:col-start-9">
            <p className="max-w-[34ch]">The 3D hall follows the sun from six in the morning to eight at night.</p>
            <Link href="/space" className="btn mt-8 bg-accent-ink text-accent hover:bg-[#2a1d14]">
              Open the daylight studio
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
