import Link from "next/link";
import { PhotoFrame } from "@/components/ui";
import { PHOTOS } from "@/lib/photos";
import { LiveSunDisc, LiveSunLine } from "./live-sun";

type Callout = {
  title: string;
  body: string;
  /** marker on the photograph, in % of the frame */
  at: [number, number];
  /** height of the note beside the frame, in % of the frame */
  labelY: number;
};

// The frame keeps the photograph's own 2:3 shape, so these points sit exactly on the cup.
const CALLOUTS: Callout[] = [
  { title: "The first minute", body: "is for looking. Drink it in the second.", at: [47, 41], labelY: 30 },
  { title: "The rim", body: "Turned thin, then left a little uneven.", at: [62, 67.5], labelY: 55 },
  { title: "The handle", body: "Pressed by hand, with a rest for the thumb.", at: [73, 74], labelY: 78 },
];

const photo = PHOTOS.heroSteam;

export function HomeHero() {
  return (
    <section aria-labelledby="hero-title" className="relative isolate overflow-hidden">
      {/* Low sun: a pool of warm light that sits higher or lower with the visitor's hour */}
      <LiveSunDisc className="pointer-events-none absolute -z-10 aspect-square w-[150vw] max-lg:left-[-25vw] max-lg:top-[38svh] lg:right-[-18vw] lg:top-[-22vh] lg:w-[92vw]">
        <div className="glow inset-0" />
      </LiveSunDisc>

      <div className="frame grid min-h-[100svh] items-center gap-y-12 pb-16 pt-[calc(var(--header-h)+8svh)] lg:grid-cols-12 lg:gap-x-[var(--gutter)] lg:pb-10 lg:pt-[var(--header-h)]">
        <div className="lg:col-span-6">
          <h1 id="hero-title" className="display rise">
            More light
            <br />
            in <em>every cup.</em>
          </h1>
          <p className="lead rise mt-8 max-w-[34ch] text-ink/90" style={{ animationDelay: "120ms" }}>
            Sun Cafe is an imaginary coffee hall behind 24 metres of south-facing glass. Every drink on the menu belongs
            to an hour of the day.
          </p>
          <div className="rise mt-9 flex flex-wrap items-center gap-3" style={{ animationDelay: "220ms" }}>
            <Link href="/space" className="btn btn-sun">
              Walk the hall in 3D
            </Link>
            <Link href="/menu" className="btn btn-plain">
              See the menu
            </Link>
          </div>
          <div className="rise mt-9" style={{ animationDelay: "320ms" }}>
            <LiveSunLine />
          </div>
        </div>

        <div className="lg:col-span-6">
          <div className="relative mx-auto w-full max-w-[28rem] lg:mr-[15rem] lg:w-[min(52svh,100%)] lg:max-w-none">
            <PhotoFrame photo={photo} sizes="(min-width: 1024px) 52svh, 90vw" priority className="settle" />

            {/* Leader lines from each mark on the cup to its note */}
            <svg className="pointer-events-none absolute inset-y-0 left-0 hidden h-full w-[calc(100%+2.5rem)] overflow-visible lg:block" aria-hidden="true">
              {CALLOUTS.map((c) => (
                <line
                  key={c.title}
                  x1={`${c.at[0]}%`}
                  y1={`${c.at[1]}%`}
                  x2="100%"
                  y2={`${c.labelY}%`}
                  stroke="rgb(246 236 220 / 0.55)"
                  strokeWidth="1"
                  strokeDasharray="3 4"
                />
              ))}
            </svg>
            {CALLOUTS.map((c) => (
              <span
                key={c.title}
                aria-hidden="true"
                className="absolute grid h-5 w-5 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-accent"
                style={{ left: `${c.at[0]}%`, top: `${c.at[1]}%` }}
              >
                <span className="h-2 w-2 rounded-full bg-accent-ink" />
              </span>
            ))}
            <ul className="hidden lg:block">
              {CALLOUTS.map((c) => (
                <li
                  key={c.title}
                  className="absolute left-[calc(100%+3rem)] w-[12rem] -translate-y-1/2"
                  style={{ top: `${c.labelY}%` }}
                >
                  <p className="font-semibold text-accent">{c.title}</p>
                  <p className="small mt-1 text-ink/90">{c.body}</p>
                </li>
              ))}
            </ul>
          </div>

          {/* On smaller screens the notes follow the photograph */}
          <ul className="mx-auto mt-8 grid max-w-[28rem] gap-4 lg:hidden">
            {CALLOUTS.map((c) => (
              <li key={c.title} className="flex gap-3">
                <span className="dot mt-[0.5em]" aria-hidden="true" />
                <p>
                  <span className="font-semibold text-accent">{c.title}. </span>
                  {c.body}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
