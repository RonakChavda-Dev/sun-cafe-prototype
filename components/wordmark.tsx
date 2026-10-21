/** The Sun Cafe mark: the sun disc resting on the horizon. */
export function SunMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden="true">
      <path d="M5 21a11 11 0 0 1 22 0Z" fill="currentColor" />
      <rect x="2" y="23" width="28" height="3" fill="currentColor" />
    </svg>
  );
}

export function Wordmark({ className = "" }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-2 ${className}`}>
      <SunMark className="h-7 w-7 text-accent" />
      <span className="font-[family-name:var(--font-display)] text-[1.75rem] leading-none tracking-[-0.01em]">
        Sun <em className="text-accent">Cafe</em>
      </span>
    </span>
  );
}
