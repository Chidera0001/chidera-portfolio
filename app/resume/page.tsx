import type { Metadata } from "next";
import {
  additionalLeadership,
  education,
  experience,
  profile,
  skills,
} from "@/lib/data";
import { ResumeActions } from "@/components/ResumeActions";

export const metadata: Metadata = {
  title: `${profile.name} · Résumé`,
  description: `Résumé for ${profile.name}, ${profile.title} in ${profile.location}.`,
};

export default function ResumePage() {
  return (
    <main className="mx-auto w-full max-w-3xl px-6 py-12 sm:py-16 print:max-w-none print:px-0 print:py-0">
      <ResumeActions />

      <div className="mt-10 print:mt-0">
        <h1 className="text-3xl font-semibold tracking-tight">{profile.name}</h1>
        <p className="mt-1 text-[var(--fg-muted)]">
          {profile.title} · {profile.location}
        </p>
        <p className="mt-2 text-sm text-[var(--fg-muted)]">
          <a href={`mailto:${profile.email}`} className="hover:text-[var(--fg)]">
            {profile.email}
          </a>{" "}
          ·{" "}
          <a href={profile.linkedin} className="hover:text-[var(--fg)]">
            linkedin.com/in/chidera-anele
          </a>{" "}
          ·{" "}
          <a href={profile.github} className="hover:text-[var(--fg)]">
            github.com/Chidera0001
          </a>
        </p>
      </div>

      <ResumeSection title="Summary">
        <p className="text-sm leading-relaxed text-[var(--fg)]">
          Product Engineer with years of experience building fintech, logistics,
          civic-tech, and AI-enabled products across Africa and Europe. Led product
          development for a cross-border logistics marketplace that expanded to 5+
          African countries, moved 3+ tonnes of cargo, and paid out $30K+ to
          travellers within three months. First-Class Software Engineering
          graduate; Google Project Management certified.
        </p>
      </ResumeSection>

      <ResumeSection title="Experience">
        <RoleList roles={experience} />
      </ResumeSection>

      <ResumeSection title="Additional Leadership">
        <RoleList roles={additionalLeadership} />
      </ResumeSection>

      <ResumeSection title="Education">
        <ul className="space-y-3">
          {education.map((e) => (
            <li key={e.credential} className="flex items-baseline justify-between gap-4 text-sm">
              <div>
                <p className="text-[var(--fg)]">
                  {e.credential}
                  {e.school ? ` · ${e.school}` : ""}
                </p>
                {e.location && <p className="text-[var(--fg-faint)]">{e.location}</p>}
              </div>
              <span className="shrink-0 text-[var(--fg-faint)]">{e.date}</span>
            </li>
          ))}
        </ul>
      </ResumeSection>

      <ResumeSection title="Skills">
        <div className="grid gap-4 sm:grid-cols-2">
          {skills.map((group) => (
            <div key={group.category}>
              <p className="text-sm font-medium text-[var(--fg)]">{group.category}</p>
              <p className="mt-1 text-sm leading-relaxed text-[var(--fg-muted)]">
                {group.items.join(", ")}
              </p>
            </div>
          ))}
        </div>
      </ResumeSection>
    </main>
  );
}

function ResumeSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mt-10 border-t border-[var(--border)] pt-6 print:break-inside-avoid">
      <h2 className="text-xs uppercase tracking-[0.14em] text-[var(--fg-faint)]">
        {title}
      </h2>
      <div className="mt-4">{children}</div>
    </section>
  );
}

function RoleList({ roles }: { roles: typeof experience }) {
  return (
    <ul className="space-y-6">
      {roles.map((role) => (
        <li key={`${role.company}-${role.start}`}>
          <div className="flex items-baseline justify-between gap-4">
            <p className="text-sm font-medium text-[var(--fg)]">
              {role.role} · {role.company}
            </p>
            <p className="shrink-0 text-sm text-[var(--fg-faint)]">
              {role.start} – {role.current ? "Present" : role.end}
            </p>
          </div>
          <p className="text-sm text-[var(--fg-faint)]">{role.location}</p>
          <ul className="mt-2 space-y-1.5">
            {role.bullets.map((b, i) => (
              <li key={i} className="flex gap-2 text-sm leading-relaxed text-[var(--fg-muted)]">
                <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-[var(--fg-faint)]" />
                <span>{b}</span>
              </li>
            ))}
          </ul>
        </li>
      ))}
    </ul>
  );
}
