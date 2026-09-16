"use client";

import { useEffect, useState } from "react";

const TYPE_SPEED = 45;
const DELETE_SPEED = 25;
const HOLD_MS = 1400;
const PAUSE_MS = 300;

export function RotatingTagline({ lines }: { lines: string[] }) {
  const [lineIndex, setLineIndex] = useState(0);
  const [text, setText] = useState("");
  const [phase, setPhase] = useState<"typing" | "holding" | "deleting" | "pausing">(
    "typing"
  );

  useEffect(() => {
    const current = lines[lineIndex] ?? "";

    if (phase === "typing") {
      if (text.length < current.length) {
        const id = setTimeout(
          () => setText(current.slice(0, text.length + 1)),
          TYPE_SPEED
        );
        return () => clearTimeout(id);
      }
      const id = setTimeout(() => setPhase("holding"), HOLD_MS);
      return () => clearTimeout(id);
    }

    if (phase === "holding") {
      const id = setTimeout(() => setPhase("deleting"), 0);
      return () => clearTimeout(id);
    }

    if (phase === "deleting") {
      if (text.length > 0) {
        const id = setTimeout(
          () => setText(current.slice(0, text.length - 1)),
          DELETE_SPEED
        );
        return () => clearTimeout(id);
      }
      const id = setTimeout(() => setPhase("pausing"), PAUSE_MS);
      return () => clearTimeout(id);
    }

    if (phase === "pausing") {
      const id = setTimeout(() => {
        setLineIndex((i) => (i + 1) % lines.length);
        setPhase("typing");
      }, 0);
      return () => clearTimeout(id);
    }
  }, [phase, text, lineIndex, lines]);

  return (
    <p className="text-[var(--fg-muted)]">
      I am Chidera and I{" "}
      <span className="text-[var(--fg)]">{text}</span>
      <span className="ml-0.5 inline-block w-[1px] animate-pulse bg-[var(--fg-faint)] align-middle" style={{ height: "1em" }} />
    </p>
  );
}
