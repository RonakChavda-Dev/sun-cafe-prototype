import type { Metadata } from "next";
import Link from "next/link";
import { Reveal } from "@/components/reveal";
import { PageHero, PhotoFrame, SectionIntro } from "@/components/ui";
import { FaqList } from "@/components/visit/faq-list";
import { SeatFinder } from "@/components/visit/seat-finder";
import { FAQ } from "@/lib/content";
import { PHOTOS } from "@/lib/photos";

export const metadata: Metadata = {
  title: "Visit",
  description: "Sun Cafe is fictional, so there is no address. Find the seat in the imaginary hall that suits your hour instead.",
};

const EXPECT = [
  ["Order at the north counter.", "Espresso to the left, slow bar to the right, the pastry case in between."],
  ["Take your cup to any seat.", "Cups are numbered underneath; there is one for each chair in the hall."],
  ["Move when the light does.", "Nobody minds if you carry your cup to a sunnier table."],
  ["Stay as long as you like.", "There is no time limit on a seat, only on the daylight."],
];

export default function VisitPage() {
  return (
    <>
      <PageHero
        photo={PHOTOS.orangePlants}
        title={
          <>
            A visit you take <em>from here</em>
          </>
        }
        intro={
          <p>
            Sun Cafe is imaginary: no street, no opening hours, no door. What it does have is a hall full of seats, and one
            of them suits the hour you have in mind.
          </p>
        }
      >
        <a href="#seat-finder" className="btn btn-sun">
          Find your seat
        </a>
      </PageHero>

      <section id="seat-finder" aria-labelledby="finder-title" className="frame section scroll-mt-4">
        <div className="mb-14">
          <SectionIntro
            id="finder-title"
            title={
              <>
                Find <em>your seat</em>
              </>
            }
            body={<p className="text-muted">Two questions. The answer is a part of the hall, and a way to see it at that hour in 3D.</p>}
          />
        </div>
        <SeatFinder />
      </section>

      <section aria-labelledby="expect-title" className="bg-surface">
        <div className="frame grid items-center gap-12 py-[var(--section)] lg:grid-cols-12 lg:gap-x-[var(--gutter)]">
          <Reveal className="lg:col-span-5">
            <PhotoFrame photo={PHOTOS.croissantCoffee} sizes="(min-width: 1024px) 40vw, 92vw" />
          </Reveal>
          <div className="lg:col-span-6 lg:col-start-7">
            <Reveal>
              <h2 id="expect-title" className="head max-w-[14ch]">
                If it were real, it would go like this
              </h2>
            </Reveal>
            <ol className="mt-12 space-y-8">
              {EXPECT.map(([t, b], i) => (
                <Reveal as="li" key={t} delay={i * 0.06} className="flex gap-4">
                  <span className="dot mt-[0.5em]" aria-hidden="true" />
                  <div>
                    <h3 className="font-semibold">{t}</h3>
                    <p className="mt-1 text-muted">{b}</p>
                  </div>
                </Reveal>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <section aria-labelledby="faq-title" className="frame section grid gap-12 lg:grid-cols-12 lg:gap-x-[var(--gutter)]">
        <div className="lg:col-span-4">
          <h2 id="faq-title" className="head max-w-[10ch]">
            Honest answers
          </h2>
          <p className="mt-6 max-w-[34ch] text-muted">
            Curious who made the pictures?{" "}
            <Link href="/credits" className="link font-semibold text-ink">
              See the credits
            </Link>
          </p>
          <Reveal className="mt-10 hidden w-full max-w-[22rem] lg:block">
            <PhotoFrame photo={PHOTOS.cupSaucer} sizes="22rem" />
          </Reveal>
        </div>
        <div className="lg:col-span-7 lg:col-start-6">
          <FaqList items={FAQ} />
        </div>
      </section>
    </>
  );
}
