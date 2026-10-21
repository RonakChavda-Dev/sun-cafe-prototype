import Image from "next/image";
import Link from "next/link";
import { Reveal } from "@/components/reveal";
import { PhotoFrame } from "@/components/ui";
import { MENU, MENU_CATEGORIES } from "@/lib/content";
import { formatTime } from "@/lib/daylight";
import { menuSlug } from "@/lib/menu-slug";
import { PHOTOS } from "@/lib/photos";

/** The whole menu: each category under its own name, its lead dish shown large, every item with its picture. */
export function MenuBoard() {
  return (
    <div>
      <nav aria-label="Menu categories" className="sticky top-0 z-20 -mx-[var(--margin)] bg-bg/95 px-[var(--margin)] py-3 backdrop-blur-sm">
        <ul className="flex flex-wrap gap-2">
          {MENU_CATEGORIES.map((c) => (
            <li key={c.id}>
              <a href={`#${c.id}`} className="chip">
                {c.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      {MENU_CATEGORIES.map((c) => {
        const items = MENU.filter((m) => m.category === c.id);
        const lead = PHOTOS[items[0].photo];
        return (
          <section key={c.id} id={c.id} aria-labelledby={`${c.id}-title`} className="scroll-mt-20 pt-24">
            <div className="grid gap-10 lg:grid-cols-12 lg:gap-x-[var(--gutter)]">
              <div className="lg:col-span-4">
                <div className="flex items-baseline justify-between gap-6">
                  <h2 id={`${c.id}-title`} className="head">
                    {c.label}
                  </h2>
                  <p className="tabular-nums text-muted">
                    {items.length} {items.length === 1 ? "item" : "items"}
                  </p>
                </div>
                <p className="mt-4 max-w-[30ch] text-muted">{c.note}</p>
                <Reveal className="mt-8 hidden lg:block">
                  <PhotoFrame photo={lead} sizes="30vw" className="max-h-[34rem] w-full" ratio={lead.src.width >= lead.src.height ? "4 / 3" : "4 / 5"} />
                </Reveal>
              </div>
              <ul className="grid content-start gap-x-14 gap-y-10 md:grid-cols-2 lg:col-span-7 lg:col-start-6">
                {items.map((item, i) => (
                  <Reveal as="li" key={item.name} delay={(i % 2) * 0.07} id={menuSlug(item.name)} className="grid scroll-mt-24 grid-cols-[5rem_1fr] gap-x-5 md:grid-cols-[6rem_1fr]">
                    <span className="relative mt-1 block aspect-square overflow-hidden rounded-[0.9rem] bg-surface">
                      <Image src={PHOTOS[item.photo].src} alt={PHOTOS[item.photo].alt} fill sizes="96px" quality={90} className="object-cover" />
                    </span>
                    <div>
                      <div className="flex items-baseline justify-between gap-4">
                        <h3 className="font-[family-name:var(--font-display)] text-[1.75rem] leading-none">{item.name}</h3>
                        <Link
                          href={`/space?t=${item.pairedAt}#studio`}
                          className="link shrink-0 text-sm font-semibold tabular-nums text-accent"
                          aria-label={`See the hall at ${formatTime(item.pairedAt)}, the hour paired with ${item.name}`}
                        >
                          {formatTime(item.pairedAt).replace(/^0/, "")}
                        </Link>
                      </div>
                      <p className="mt-2 text-ink/85">{item.description}</p>
                      <p className="small mt-2 text-muted">Served in {item.servedIn.toLowerCase()}.</p>
                    </div>
                  </Reveal>
                ))}
              </ul>
            </div>
          </section>
        );
      })}
    </div>
  );
}
