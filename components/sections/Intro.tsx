import { companies, getProjectBySlug, getLiveLink } from "@/lib/data";
import { InlineLogo } from "@/components/InlineLogo";

export function Intro() {
  const idiscovr = getProjectBySlug("idiscovr");
  const citizn = getProjectBySlug("citizn");
  const swiftHaven = companies.find((c) => c.name === "Swift Haven");
  const idiscovrLive = idiscovr ? getLiveLink(idiscovr) : undefined;
  const citiznLive = citizn ? getLiveLink(citizn) : undefined;

  return (
    <div className="mt-10">
      <div className="max-w-2xl space-y-5 text-[15px] leading-relaxed text-[var(--fg)] sm:text-base">
        <p>
          My name is Chidera (Dera for short). I use technology to solve
          problems I have experienced or seen people struggle with.
          I am a product manager and engineer.
        </p>

        <p>
          I am currently building{" "}
          {idiscovrLive ? (
            <InlineLogo href={idiscovrLive} logo="/logos/idiscovr.svg">
              iDiscovr
            </InlineLogo>
          ) : (
            "iDiscovr"
          )}
          , a music discovery platform for independent artists, and
          previously built{" "}
          {citiznLive ? (
            <InlineLogo href={citiznLive} logo="/logos/citizn.svg">
              Citizn
            </InlineLogo>
          ) : (
            "Citizn"
          )}
          , a civic reporting platform with an AI verification pipeline.
        </p>

        <p>
          In a more voluntary role, I work with{" "}
          {swiftHaven?.url ? (
            <InlineLogo href={swiftHaven.url} logo="/logos/swifthaven.svg">
              Swift Haven
            </InlineLogo>
          ) : (
            "Swift Haven"
          )}{" "}
          — we run outreaches in schools and rural communities across Rwanda,
          sharing relief materials while talking to girls about their periods
          and educating young boys to understand it too, so it stops being
          something whispered about.
        </p>
      </div>
    </div>
  );
}
