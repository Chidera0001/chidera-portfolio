import { Section } from "@/components/Section";
import { skills } from "@/lib/data";

export function Craft() {
  return (
    <Section id="toolkit" eyebrow="toolkit">
      <div className="mt-6">
        {skills.map((group) => (
          <div
            key={group.category}
            className="flex flex-col gap-0.5 border-b border-[var(--border)] py-3.5 first:border-t sm:flex-row sm:items-baseline sm:gap-6"
          >
            <p className="w-32 shrink-0 text-sm text-[var(--fg-faint)]">{group.category}</p>
            <p className="text-[15px] text-[var(--fg-muted)]">{group.items.join(", ")}</p>
          </div>
        ))}
      </div>
    </Section>
  );
}
