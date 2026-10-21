import Image from "next/image";
import type { CSSProperties, ReactNode } from "react";
import type { Picture } from "@/lib/photos";
import { Reveal } from "./reveal";

type FrameProps = {
  photo: Picture;
  sizes: string;
  /** CSS aspect-ratio for the frame; defaults to the photograph's own, so nothing is cropped */
  ratio?: string;
  className?: string;
  style?: CSSProperties;
  priority?: boolean;
  /** CSS object-position, used only when a ratio other than the photograph's own is asked for */
  focus?: string;
};

/** A photograph in a frame cut to its own proportions, served sharp. */
export function PhotoFrame({ photo, sizes, ratio, className = "", style, priority, focus }: FrameProps) {
  const natural = `${photo.src.width} / ${photo.src.height}`;
  return (
    <div className={`photo ${className}`} style={{ aspectRatio: ratio ?? natural, ...style }}>
      <Image
        src={photo.src}
        alt={photo.alt}
        fill
        sizes={sizes}
        priority={priority}
        quality={90}
        placeholder="blur"
        className="object-cover"
        style={focus ? { objectPosition: focus } : undefined}
      />
    </div>
  );
}

/** Inner-page opening: the title on the left, the page's photograph whole on the right, warmed by light behind it. */
export function PageHero({
  photo,
  title,
  intro,
  children,
}: {
  photo: Picture;
  title: ReactNode;
  intro: ReactNode;
  children?: ReactNode;
}) {
  const ratio = photo.src.width / photo.src.height;
  return (
    <section className="relative isolate overflow-hidden">
      <div className="frame grid items-center gap-y-12 pb-16 pt-[calc(var(--header-h)+8svh)] lg:min-h-[94svh] lg:grid-cols-12 lg:gap-x-[var(--gutter)] lg:pb-20 lg:pt-[calc(var(--header-h)+2rem)]">
        <div className="relative z-10 lg:col-span-5">
          <h1 className="display rise max-w-[11ch]">{title}</h1>
          <div className="lead rise mt-8 max-w-[36ch] text-ink/90" style={{ animationDelay: "120ms" }}>
            {intro}
          </div>
          {children && (
            <div className="rise mt-9 flex flex-wrap gap-3" style={{ animationDelay: "220ms" }}>
              {children}
            </div>
          )}
        </div>
        <div className="relative lg:col-span-7 lg:col-start-6">
          <div className="glow -inset-[12%]" aria-hidden="true" />
          <PhotoFrame
            photo={photo}
            sizes="(min-width: 1024px) 56vw, 92vw"
            priority
            className="settle relative ml-auto w-full"
            style={{ maxWidth: `calc(76svh * ${ratio})` }}
          />
        </div>
      </div>
    </section>
  );
}

/** A section heading with its one supporting paragraph on the same baseline, far apart. */
export function SectionIntro({ title, body, id }: { title: ReactNode; body?: ReactNode; id?: string }) {
  return (
    <div className="grid gap-y-6 lg:grid-cols-12 lg:items-end lg:gap-x-[var(--gutter)]">
      <Reveal className="lg:col-span-7">
        <h2 id={id} className="head max-w-[16ch]">
          {title}
        </h2>
      </Reveal>
      {body && (
        <Reveal className="max-w-[44ch] text-muted lg:col-span-4 lg:col-start-9" delay={0.08}>
          {body}
        </Reveal>
      )}
    </div>
  );
}
