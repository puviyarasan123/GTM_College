import { useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";

/**
 * Seamless horizontal marquee.
 *
 * The children are rendered N times and the track slides left by exactly one
 * copy, so the loop point is invisible. N starts at 2 and grows if one copy is
 * narrower than the viewport — otherwise short tickers would show a gap.
 * Pauses on hover/focus and respects `prefers-reduced-motion`.
 */
export function Marquee({
  children,
  durationSeconds = 40,
  className = "",
  groupClassName = "",
}: {
  children: ReactNode;
  durationSeconds?: number;
  className?: string;
  groupClassName?: string;
}) {
  const viewportRef = useRef<HTMLDivElement>(null);
  const groupRef = useRef<HTMLDivElement>(null);
  const [copies, setCopies] = useState(2);

  useEffect(() => {
    const measure = () => {
      const viewport = viewportRef.current?.offsetWidth ?? 0;
      const group = groupRef.current?.offsetWidth ?? 0;
      if (!viewport || !group) return;
      setCopies(Math.max(2, Math.ceil(viewport / group) + 1));
    };
    measure();
    const observer = new ResizeObserver(measure);
    if (viewportRef.current) observer.observe(viewportRef.current);
    if (groupRef.current) observer.observe(groupRef.current);
    return () => observer.disconnect();
  }, [children]);

  return (
    <div ref={viewportRef} className={`marquee-viewport ${className}`}>
      <div
        className="marquee-track"
        style={
          {
            "--marquee-duration": `${durationSeconds}s`,
            "--marquee-copies": copies,
          } as React.CSSProperties
        }
      >
        {Array.from({ length: copies }, (_, i) => (
          <div
            key={i}
            ref={i === 0 ? groupRef : undefined}
            className={`marquee-group ${groupClassName}`}
            aria-hidden={i > 0 ? "true" : undefined}
          >
            {children}
          </div>
        ))}
      </div>
    </div>
  );
}
