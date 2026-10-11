"use client";

import { useEffect, useRef, useState } from "react";

export function useCountUp(
  end: number,
  { duration = 1600, start = 0, delay = 200 }: { duration?: number; start?: number; delay?: number } = {},
) {
  const [value, setValue] = useState(start);
  const frame = useRef<number | null>(null);

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout> | null = null;

    const tick = (timestamp: number, startTime: number) => {
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.round(start + eased * (end - start)));
      if (progress < 1) {
        frame.current = requestAnimationFrame((t) => tick(t, startTime));
      }
    };

    timeout = setTimeout(() => {
      const startTime = performance.now();
      frame.current = requestAnimationFrame((t) => tick(t, startTime));
    }, delay);

    return () => {
      if (timeout) clearTimeout(timeout);
      if (frame.current) cancelAnimationFrame(frame.current);
    };
  }, [end, duration, start, delay]);

  return value;
}
