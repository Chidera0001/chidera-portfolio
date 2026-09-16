import { ReactNode } from "react";

export function Section({
  id,
  eyebrow,
  title,
  description,
  children,
}: {
  id: string;
  eyebrow?: string;
  title?: string;
  description?: string;
  children: ReactNode;
}) {
  return (
    <section id={id} className="mt-20 scroll-mt-24">
      {(eyebrow || title) && (
        <div className="mb-6 max-w-xl">
          {eyebrow && (
            <p className="font-heading text-base font-semibold tracking-tight text-[var(--fg-faint)]">
              {eyebrow}
            </p>
          )}
          {title && (
            <h2 className="mt-2 text-2xl font-semibold tracking-tight sm:text-3xl">
              {title}
            </h2>
          )}
          {description && (
            <p className="mt-3 text-[var(--fg-muted)]">{description}</p>
          )}
        </div>
      )}
      {children}
    </section>
  );
}
