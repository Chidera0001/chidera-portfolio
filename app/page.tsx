import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { Intro } from "@/components/sections/Intro";
import { Quote } from "@/components/sections/Quote";
import { SelectedWork } from "@/components/sections/SelectedWork";
import { Experience } from "@/components/sections/Experience";
import { Craft } from "@/components/sections/Craft";
import { Elsewhere } from "@/components/sections/Elsewhere";

export default function Home() {
  return (
    <main className="mx-auto w-full max-w-2xl px-6 py-12 sm:py-16">
      <SiteHeader />
      <Intro />
      <Quote />
      <SelectedWork />
      <Experience />
      <Craft />
      <Elsewhere />
      <SiteFooter />
    </main>
  );
}
