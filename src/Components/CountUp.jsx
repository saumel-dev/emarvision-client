"use client";

import { useEffect, useRef, useState } from "react";
import { animate, useInView, useReducedMotion } from "motion/react";

// Counts every number inside the text from 0 up to its real value.
// Works with "88", "06" (keeps the leading zero) and "24/7" (both numbers count).
// It starts when the card scrolls into view, and runs only once.
export default function CountUp({ value, delay = 0, duration = 1.8 }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const reduceMotion = useReducedMotion();
  const [progress, setProgress] = useState(0); // 0 -> 1

  useEffect(() => {
    if (!inView) return;

    // People who turned animations off just see the final numbers
    if (reduceMotion) {
      setProgress(1);
      return;
    }

    const controls = animate(0, 1, {
      duration,
      delay,
      ease: [0.22, 1, 0.36, 1], // fast start, slow finish
      onUpdate: setProgress,
    });
    return () => controls.stop();
  }, [inView, reduceMotion, duration, delay]);

  // "24/7" -> ["", "24", "/", "7", ""]. Odd positions are the numbers.
  const text = value
    .split(/(\d+)/)
    .map((part, i) =>
      i % 2 === 1
        ? String(Math.round(Number(part) * progress)).padStart(part.length, "0")
        : part
    )
    .join("");

  return (
    // aria-label gives screen readers the final value instead of the counting one
    <span ref={ref} aria-label={value} className="tabular-nums">
      <span aria-hidden="true">{text}</span>
    </span>
  );
}