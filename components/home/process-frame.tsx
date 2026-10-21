"use client";

import { useEffect, useRef, useState } from "react";
import { PhotoFrame } from "@/components/ui";
import { PHOTOS, type PhotoKey } from "@/lib/photos";

// All five are portrait photographs, so one 2:3 frame shows each of them whole.
const STEPS: { photo: PhotoKey; title: string; caption: string }[] = [
  { photo: "beansBowl", title: "The bean", caption: "Roasted for the hour it will be drunk in." },
  { photo: "espressoDrip", title: "The shot", caption: "Stopped when the stream turns pale." },
  { photo: "pourOver", title: "The pour", caption: "Slow, and where you can watch it." },
  { photo: "milkPour", title: "The milk", caption: "Drawn into a rosetta at the counter." },
  { photo: "latteLeaf", title: "The cup", caption: "Thick enough to keep it warm a while." },
];

/** One frame stays put while what it holds changes: the whole process, step by step. */
export function ProcessFrame() {
  const [index, setIndex] = useState(0);
  const frame = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches || !frame.current) return;
    let visible = false;
    const io = new IntersectionObserver(([e]) => (visible = e.isIntersecting));
    io.observe(frame.current);
    const id = window.setInterval(() => {
      if (visible && !document.hidden) setIndex((i) => (i + 1) % STEPS.length);
    }, 3200);
    return () => {
      io.disconnect();
      window.clearInterval(id);
    };
  }, []);

  return (
    <section aria-labelledby="process-title" className="frame section grid gap-12 lg:grid-cols-12 lg:items-center lg:gap-x-[var(--gutter)]">
      <div className="lg:col-span-5">
        <h2 id="process-title" className="head max-w-[12ch]">
          From bean <em>to cup</em>
        </h2>
        <p className="mt-6 max-w-[38ch] text-muted">Five steps behind the north counter, none of them rushed.</p>
        <ol className="mt-10 space-y-1">
          {STEPS.map((s, i) => (
            <li key={s.photo}>
              <button
                type="button"
                onClick={() => setIndex(i)}
                aria-current={i === index ? "step" : undefined}
                className={`flex w-full items-baseline gap-4 rounded-xl px-4 py-3 text-left transition-colors duration-200 ${
                  i === index ? "bg-surface-2 text-ink" : "text-muted hover:text-ink"
                }`}
              >
                <span className={`dot translate-y-[-0.1em] ${i === index ? "" : "opacity-30"}`} aria-hidden="true" />
                <span className="font-semibold">{s.title}</span>
                <span className="small hidden sm:inline">{s.caption}</span>
              </button>
            </li>
          ))}
        </ol>
      </div>
      <figure className="lg:col-span-5 lg:col-start-8">
        <div ref={frame} className="relative mx-auto w-full max-w-[30rem]">
          <div className="glow -inset-[15%]" aria-hidden="true" />
          <div className="relative">
            {STEPS.map((s, i) => (
              <PhotoFrame
                key={s.photo}
                photo={PHOTOS[s.photo]}
                ratio="2 / 3"
                sizes="(min-width: 1024px) 30rem, 90vw"
                className={`transition-opacity duration-700 ${i === index ? "opacity-100" : "absolute inset-0 opacity-0"}`}
              />
            ))}
          </div>
        </div>
        <figcaption className="mt-5 text-center text-muted" aria-live="polite">
          <span className="font-semibold text-ink">{STEPS[index].title}.</span> {STEPS[index].caption}
        </figcaption>
      </figure>
    </section>
  );
}
