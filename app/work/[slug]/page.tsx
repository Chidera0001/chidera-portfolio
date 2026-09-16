import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getProjectBySlug, projects } from "@/lib/data";
import { SiteFooter } from "@/components/SiteFooter";
import { CommandPalette } from "@/components/CommandPalette";
import { ThemeToggle } from "@/components/ThemeToggle";
import { ProjectGallery } from "@/components/ProjectGallery";
import { ProjectHeroMedia } from "@/components/ProjectHeroMedia";

function displayUrl(href: string): string {
  try {
    return new URL(href).host;
  } catch {
    return href;
  }
}

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return {};
  return {
    title: `${project.name} · Chidera Anele`,
    description: project.narrative,
  };
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) notFound();

  const index = projects.findIndex((p) => p.slug === slug);
  const next = projects[(index + 1) % projects.length];

  return (
    <main className="mx-auto w-full max-w-2xl px-6 py-12 sm:py-16">
      <div className="flex items-center justify-between">
        <Link
          href="/#work"
          className="text-sm text-[var(--fg-muted)] transition hover:text-[var(--fg)]"
        >
          ← selected work
        </Link>
        <div className="flex items-center gap-3">
          <ThemeToggle />
          <CommandPalette />
        </div>
      </div>

      <header className="mt-8 flex items-start justify-between gap-6">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            {project.name}
          </h1>
          <p className="mt-2 text-[var(--fg-muted)]">{project.tagline}</p>
        </div>
        <div className="shrink-0 text-right text-sm text-[var(--fg-faint)]">
          {project.year}
          {project.status && <div className="mt-1">{project.status}</div>}
        </div>
      </header>

      <ProjectHeroMedia
        image={project.image}
        alt={`${project.name} preview`}
        video={project.video}
        fit={project.mediaFit}
        background={project.mediaBackground}
      />

      <p className="mt-10 max-w-2xl text-[15px] leading-relaxed text-[var(--fg)] sm:text-base">
        {project.fullStory ?? project.narrative}
      </p>

      <div className="mt-12 grid gap-10 sm:grid-cols-2">
        <div>
          <h2 className="text-xs uppercase tracking-[0.14em] text-[var(--fg-faint)]">
            the problem
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-[var(--fg-muted)]">
            {project.problem}
          </p>
        </div>
        <div>
          <h2 className="text-xs uppercase tracking-[0.14em] text-[var(--fg-faint)]">
            what I built
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-[var(--fg-muted)]">
            {project.whatIBuilt}
          </p>
        </div>
        <div>
          <h2 className="text-xs uppercase tracking-[0.14em] text-[var(--fg-faint)]">
            my role
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-[var(--fg-muted)]">
            {project.myRole}
          </p>
        </div>
        <div>
          <h2 className="text-xs uppercase tracking-[0.14em] text-[var(--fg-faint)]">
            built with
          </h2>
          <ul className="mt-3 flex flex-wrap gap-2">
            {project.builtWith.map((tech) => (
              <li
                key={tech}
                className="rounded-full border border-[var(--border)] px-3 py-1 text-xs text-[var(--fg-muted)]"
              >
                {tech}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mt-12">
        <h2 className="text-xs uppercase tracking-[0.14em] text-[var(--fg-faint)]">
          what it does
        </h2>
        <ul className="mt-4 space-y-2">
          {project.whatItDoes.map((item, i) => (
            <li key={i} className="flex gap-2 text-sm leading-relaxed text-[var(--fg)]">
              <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-[var(--fg-faint)]" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-12">
        <h2 className="text-xs uppercase tracking-[0.14em] text-[var(--fg-faint)]">
          results
        </h2>
        <ul className="mt-4 space-y-2">
          {project.results.map((item, i) => (
            <li key={i} className="flex gap-2 text-sm leading-relaxed text-[var(--fg)]">
              <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-[var(--accent)]" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>

      {project.links.length > 0 && (
        <div className="mt-12">
          <h2 className="text-xs uppercase tracking-[0.14em] text-[var(--fg-faint)]">
            links
          </h2>
          <div className="mt-3 border-t border-[var(--border)]">
            {project.links.map((link) => (
              <div
                key={link.label}
                className="flex items-center justify-between gap-4 border-b border-[var(--border)] py-4 text-sm"
              >
                <span className="text-[var(--fg-muted)]">{link.label}</span>
                <a
                  href={link.href}
                  target="_blank"
                  rel="noreferrer"
                  className="text-[var(--accent)] underline decoration-[var(--accent)]/40 underline-offset-4 hover:decoration-[var(--accent)]"
                >
                  {displayUrl(link.href)}
                </a>
              </div>
            ))}
          </div>
        </div>
      )}

      {project.gallery && project.gallery.length > 0 && (
        <ProjectGallery items={project.gallery} />
      )}

      <div className="mt-16 border-t border-[var(--border)] pt-8">
        <Link
          href={`/work/${next.slug}`}
          className="group flex items-center justify-between"
        >
          <span className="text-sm text-[var(--fg-faint)]">Next</span>
          <span className="flex items-center gap-2 text-lg font-medium tracking-tight">
            {next.name}
            <span className="transition group-hover:translate-x-0.5">→</span>
          </span>
        </Link>
      </div>

      <SiteFooter />
    </main>
  );
}
