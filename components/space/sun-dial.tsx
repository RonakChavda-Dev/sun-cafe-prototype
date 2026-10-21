type Props = { progress: number; elevation: number; lamp: number };

const W = 240;
const H = 104;
const R = 96;

/** A small sun-path diagram: the dot rides the arc from east to west. */
export function SunDial({ progress, elevation, lamp }: Props) {
  const angle = Math.PI * (1 - progress);
  const lift = Math.min(1, elevation / ((62 * Math.PI) / 180));
  const x = W / 2 + Math.cos(angle) * R;
  const y = H - 8 - Math.sin(Math.PI * progress) * R * (0.25 + 0.75 * lift);
  const set = lamp > 0.6;

  return (
    <svg viewBox={`0 0 ${W} ${H + 14}`} className="w-full max-w-[18rem] text-ink" aria-hidden="true">
      <path
        d={`M ${W / 2 - R} ${H - 8} A ${R} ${R * 0.92} 0 0 1 ${W / 2 + R} ${H - 8}`}
        fill="none"
        stroke="currentColor"
        strokeOpacity="0.35"
        strokeWidth="2"
      />
      <line x1="4" x2={W - 4} y1={H - 8} y2={H - 8} stroke="currentColor" strokeOpacity="0.5" strokeWidth="3" />
      <text x={W / 2 - R} y={H + 10} fontSize="13" fill="currentColor" fillOpacity="0.6" textAnchor="middle">
        E
      </text>
      <text x={W / 2 + R} y={H + 10} fontSize="13" fill="currentColor" fillOpacity="0.6" textAnchor="middle">
        W
      </text>
      
      {set ? (
        <circle cx={x} cy={y} r="7" fill="none" stroke="var(--accent)" strokeWidth="2" />
      ) : (
        <>
          <circle cx={x} cy={y} r="14" fill="var(--accent)" opacity="0.25" />
          <circle cx={x} cy={y} r="7" fill="var(--accent)" />
        </>
      )}
    </svg>
  );
}
