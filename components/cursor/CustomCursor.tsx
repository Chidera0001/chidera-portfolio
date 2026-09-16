"use client";

import { useEffect, useRef, useState } from "react";
import { cursorIcons } from "./icons";

export function CustomCursor() {
  const [iconIndex, setIconIndex] = useState(0);
  const [hovering, setHovering] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canHover = window.matchMedia("(pointer: fine)").matches;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!canHover || reducedMotion) return;

    const wrapper = wrapperRef.current;
    if (!wrapper) return;

    // Don't hide the native cursor until a real mousemove actually arrives.
    // Chrome's mobile device emulation still reports "pointer: fine" for a
    // laptop's trackpad, but delivers touch events instead of mousemove —
    // hiding the cursor eagerly there leaves nothing visible at all.
    let activated = false;

    function onMouseMove(e: MouseEvent) {
      if (!activated) {
        activated = true;
        document.documentElement.classList.add("custom-cursor-active");
        wrapper!.style.display = "block";
      }
      wrapper!.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
      const target = e.target as HTMLElement | null;
      setHovering(!!target?.closest("a, button, input, textarea, [role='button']"));
    }

    document.addEventListener("mousemove", onMouseMove);
    const intervalId = setInterval(() => {
      setIconIndex((i) => (i + 1) % cursorIcons.length);
    }, 10_000);

    return () => {
      document.documentElement.classList.remove("custom-cursor-active");
      document.removeEventListener("mousemove", onMouseMove);
      clearInterval(intervalId);
    };
  }, []);

  const Icon = cursorIcons[iconIndex];

  return (
    <div
      ref={wrapperRef}
      className="pointer-events-none fixed left-0 top-0 z-[9999] hidden -translate-x-1/2 -translate-y-1/2"
      style={{ transform: "translate3d(-100px, -100px, 0)" }}
      aria-hidden
    >
      <div
        className={`transition-transform duration-200 ${hovering ? "scale-125" : "scale-100"}`}
      >
        <Icon />
      </div>
    </div>
  );
}
