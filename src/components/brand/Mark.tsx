// The CalcKitchen thermometer mark (same shapes as LOGO_SVG in src/components/instrument/svg.ts), for ImageResponse
// routes: icons and social images. Inline SVG only, no emoji and no remote fetch, so builds work offline.

export function Mark({ h, dark = false }: { h: number; dark?: boolean }) {
  const w = (h * 16) / 34;
  const line = dark ? "#FFFFFF" : "#0E1621";
  const stem = dark ? "#0E1621" : "#FFFFFF";
  return (
    <svg width={w} height={h} viewBox="0 0 16 34">
      <rect x="4" y="1" width="8" height="24" rx="4" fill={stem} stroke={line} strokeWidth="2" />
      <rect x="6.5" y="10" width="3" height="16" fill="#E35A0F" />
      <circle cx="8" cy="26" r="6.5" fill="#E35A0F" stroke={line} strokeWidth="2" />
    </svg>
  );
}
