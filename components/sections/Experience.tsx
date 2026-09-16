import { Section } from "@/components/Section";
import { ExperienceRow } from "@/components/ExperienceRow";
import { experience } from "@/lib/data";

export function Experience() {
  return (
    <Section id="experience" eyebrow="experience">
      <ul className="mt-6">
        {experience.map((role) => (
          <ExperienceRow key={`${role.company}-${role.start}`} role={role} />
        ))}
      </ul>
    </Section>
  );
}
