"use client";

import { useId, useState } from "react";
import { Plus } from "lucide-react";
import { Reveal } from "@/components/reveal";

type Item = { q: string; a: string };

/**
 * Questions that open smoothly: the panel's height eases open on a grid-row transition (no fixed
 * heights to measure), the answer fades and rises in, and the plus turns into a cross on the same curve.
 */
export function FaqList({ items }: { items: Item[] }) {
  const [open, setOpen] = useState<Set<number>>(() => new Set());
  const id = useId();

  const toggle = (i: number) =>
    setOpen((prev) => {
      const next = new Set(prev);
      if (next.has(i)) next.delete(i);
      else next.add(i);
      return next;
    });

  return (
    <div className="space-y-3">
      {items.map((f, i) => {
        const isOpen = open.has(i);
        const panel = `${id}-panel-${i}`;
        const button = `${id}-button-${i}`;
        return (
          <Reveal key={f.q} delay={i * 0.06}>
            <div
              className={`rounded-[1.75rem] transition-colors duration-500 ease-[var(--ease-out)] ${
                isOpen ? "bg-surface-2" : "bg-surface hover:bg-[#241b15]"
              }`}
            >
              <h3>
                <button
                  id={button}
                  type="button"
                  aria-expanded={isOpen}
                  aria-controls={panel}
                  onClick={() => toggle(i)}
                  className="flex min-h-11 w-full items-center justify-between gap-6 rounded-[1.75rem] px-6 py-5 text-left text-[1.25rem] font-semibold leading-tight md:px-8"
                >
                  {f.q}
                  <span
                    className={`grid h-10 w-10 shrink-0 place-items-center rounded-full transition-[transform,background-color,color] duration-500 ease-[var(--ease-expo)] ${
                      isOpen ? "rotate-[135deg] bg-accent text-accent-ink" : "bg-surface-2"
                    }`}
                  >
                    <Plus size={18} aria-hidden />
                  </span>
                </button>
              </h3>
              <div
                id={panel}
                role="region"
                aria-labelledby={button}
                inert={!isOpen}
                className={`grid transition-[grid-template-rows] duration-500 ease-[var(--ease-expo)] ${
                  isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                }`}
              >
                <div className="overflow-hidden">
                  <p
                    className={`max-w-[60ch] px-6 pb-6 text-muted transition-[opacity,transform] duration-500 ease-[var(--ease-out)] md:px-8 ${
                      isOpen ? "translate-y-0 opacity-100 delay-75" : "-translate-y-2 opacity-0"
                    }`}
                  >
                    {f.a}
                  </p>
                </div>
              </div>
            </div>
          </Reveal>
        );
      })}
    </div>
  );
}
