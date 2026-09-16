import { Section } from "@/components/Section";
import { ProjectCard } from "@/components/ProjectCard";
import { projects } from "@/lib/data";

const ASIDE: Record<string, { label: string; note: string }> = {
  idiscovr: {
    label: "02 / Cutting the friction",
    note: "Watched onboarding drop off across 11 screens, so we cut it to 4 and swapped manual uploads for one-tap imports.",
  },
  citizn: {
    label: "03 / A pothole started this",
    note: "Started after a pothole put me in a motorbike accident, and weeks later nothing had changed.",
  },
  strand: {
    label: "04 / Built from my own mess",
    note: "Built from my own experience fundraising — first users are a group of founders giving feedback pre-launch.",
  },
};

export function SelectedWork() {
  return (
    <Section id="work" eyebrow="selected work">
      <div>
        {projects.map((project, i) => (
          <ProjectCard
            key={project.slug}
            project={project}
            aside={ASIDE[project.slug]}
            side={i % 2 === 0 ? "left" : "right"}
          />
        ))}
      </div>
    </Section>
  );
}
