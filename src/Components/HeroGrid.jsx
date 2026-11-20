// Draws the faint orange grid at the bottom of the hero.
// How it works: one small tile image (a cell with lines on its top and left edge)
// is repeated, then clipped into a "staircase" shape.
// The staircase comes from `tops`: one number per column, from left to right.
// 0 = the column starts on the first row (highest), 1 = second row, and so on.
// The middle entry of the list sits at the center of the page.

function makeTile(cell) {
  const svg = `<svg xmlns='http://www.w3.org/2000/svg' width='${cell}' height='${cell}' viewBox='0 0 ${cell} ${cell}'><path d='M0.5 0V${cell}M0 0.5H${cell}' stroke='#633EE9' stroke-opacity='0.35' stroke-width='1' fill='none'/></svg>`;
  return `url("data:image/svg+xml,${encodeURIComponent(svg)}")`;
}

function makeClip(tops, cell) {
  const mid = Math.floor(tops.length / 2);
  const far = "9999px";
  const points = [`-${far} ${tops[0] * cell}px`];

  tops.forEach((row, i) => {
    const offset = i - mid; // how many cells away from the center
    const y = `${row * cell}px`;
    if (i > 0) points.push(`calc(50% + ${(offset - 0.5) * cell}px) ${y}`);
    points.push(`calc(50% + ${(offset + 0.5) * cell}px) ${y}`);
  });

  points.push(
    `calc(100% + ${far}) ${tops[tops.length - 1] * cell}px`,
    `calc(100% + ${far}) 100%`,
    `-${far} 100%`
  );

  return `polygon(${points.join(", ")})`;
}

export default function HeroGrid({ cell, tops, height, className = "" }) {
  // 4px extra on top so the small "+" ends of the first lines are not cut off
  const headroom = 4;

  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute inset-x-0 bottom-0 ${className}`}
      style={{
        height: height + headroom,
        backgroundImage: makeTile(cell),
        backgroundSize: `${cell}px ${cell}px`,
        backgroundPosition: `50% ${headroom}px`,
        clipPath: makeClip(tops, cell),
      }}
    />
  );
}