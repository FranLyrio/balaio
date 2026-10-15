export function Logo() {
  return (
    <svg width="36" height="36" viewBox="0 0 36 36" aria-hidden="true">
      <rect width="36" height="36" rx="10" className="fill-accent" />
      <g fill="none" className="stroke-primary">
        <path d="M8 15 H28 L25.5 28 H10.5 Z" strokeWidth="2.4" strokeLinejoin="round" />
        <path d="M12 15 Q18 6 24 15" strokeWidth="2.4" strokeLinecap="round" />
        <path d="M9.5 21 H26.5 M14 15 L15.5 28 M22 15 L20.5 28" strokeWidth="1.8" />
      </g>
    </svg>
  );
}
