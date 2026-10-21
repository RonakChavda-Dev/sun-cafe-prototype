import Link from "next/link";
import { NAV_LINKS } from "@/lib/nav";

/** The mark built large: the sun setting on the horizon, cut into slices 4px apart. */
function MarkBuiltLarge() {
  const slices = Array.from({ length: 7 }, (_, i) => i);
  const r = 330;
  const cx = 600;
  const base = 340;
  const band = (r - 8) / slices.length;
  return (
    <svg viewBox="0 0 1200 380" className="block h-auto w-full" role="img" aria-label="The Sun Cafe mark: a sun resting on the horizon">
      <defs>
        <clipPath id="footer-sun">
          <circle cx={cx} cy={base} r={r} />
        </clipPath>
      </defs>
      <g clipPath="url(#footer-sun)" fill="var(--accent)">
        {slices.map((i) => {
          // Slices thin out toward the horizon, like the last light.
          const y = base - r + i * band;
          const h = band - 4 - i * 2.2;
          return <rect key={i} x={cx - r} y={y} width={r * 2} height={Math.max(6, h)} />;
        })}
      </g>
      <rect x="0" y={base + 4} width="1200" height="36" fill="var(--accent)" />
    </svg>
  );
}

export function SiteFooter() {
  return (
    <footer className="bg-surface pt-[var(--section)]">
      <div className="frame">
        <MarkBuiltLarge />

        <div className="mt-14 grid gap-y-10 md:grid-cols-12 md:gap-x-[var(--gutter)]">
          <p className="lead max-w-[30ch] md:col-span-5">
            Sun Cafe is a fictional cafe, designed as a portfolio project. There is no address to visit, only a hall to
            explore.
          </p>
          <nav aria-label="Footer" className="md:col-span-3 md:col-start-7">
            <ul className="space-y-2">
              <li>
                <Link href="/" className="link">
                  Home
                </Link>
              </li>
              {NAV_LINKS.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="link">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <div className="md:col-span-3">
            <p className="text-muted">
              Photographs from Unsplash. Furniture, textures and lighting for the 3D hall from Poly Haven.
            </p>
            <Link href="/credits" className="link mt-2 inline-block font-semibold text-ink">
              Every photographer, credited
            </Link>
          </div>
        </div>

        <div className="mt-16 flex items-center justify-between gap-4 pb-8 text-muted">
          <p className="small">© 2026 Sun Cafe, a fictional brand.</p>
          <a href="#main" className="btn btn-plain min-h-11 px-5 text-[var(--step-small)]">
            Back to the top
          </a>
        </div>
      </div>
    </footer>
  );
}
