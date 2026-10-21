"use client";

import { useEffect, useRef, type CSSProperties, type ElementType, type ReactNode } from "react";

type Props = {
  children: ReactNode;
  className?: string;
  /** stagger in seconds, so the parts of a section arrive in reading order */
  delay?: number;
  as?: ElementType;
  id?: string;
};

/**
 * Rises once as it enters the view. The content is in the HTML from the start; it is only held back
 * when scripts run and motion is welcome (see `[data-reveal]` in globals.css).
 */
export function Reveal({ children, className, delay = 0, as: Tag = "div", id }: Props) {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            e.target.classList.add("is-in");
            io.unobserve(e.target);
          }
        }
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.05 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <Tag ref={ref} id={id} data-reveal="" className={className} style={{ "--d": `${Math.round(delay * 1000)}ms` } as CSSProperties}>
      {children}
    </Tag>
  );
}
