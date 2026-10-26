import Link from "next/link";
import { PhotoFrame } from "@/components/ui";
import { PHOTOS } from "@/lib/photos";
import { LiveSunDisc, LiveSunLine } from "./live-sun";

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
          <div className="mx-auto w-full max-w-[28rem] lg:mr-0 lg:w-[min(52svh,100%)] lg:max-w-none">
            <PhotoFrame photo={photo} sizes="(min-width: 1024px) 52svh, 90vw" priority className="settle" />
          </div>
        </div>
      </div>
    </section>
  );
}
