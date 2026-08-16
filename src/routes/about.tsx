import { createFileRoute, Link } from "@tanstack/react-router";
import heroImg from "@/assets/hero-planners.jpg";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Monrea Prints — Beautiful Tools for an Organized Life" },
      {
        name: "description",
        content:
          "Monrea Prints designs minimalist printable planners, trackers and journals built around the idea that planning should make life feel lighter.",
      },
      { property: "og:title", content: "About Monrea Prints" },
      {
        property: "og:description",
        content: "Why we make printable planning tools, and how they're designed.",
      },
    ],
  }),
  component: About,
});

function About() {
  return (
    <div>
      <header className="container-monrea grid items-center gap-10 py-14 lg:grid-cols-2 lg:py-20">
        <div>
          <p className="eyebrow">Our philosophy</p>
          <h1 className="mt-3 font-serif text-4xl lg:text-5xl">
            Planning should make life feel lighter.
          </h1>
          <p className="mt-5 text-[15px] leading-relaxed text-muted-foreground">
            Monrea Prints was created around a simple idea: planning should make life feel lighter,
            not more complicated. Most planners ask you to adapt to them. We'd rather design pages
            that adapt to you.
          </p>
        </div>
        <div className="overflow-hidden rounded-md border border-border/70">
          <img
            src={heroImg}
            alt="Monrea Prints printable planner pages arranged on a warm neutral surface"
            loading="lazy"
            width={1408}
            height={1104}
            className="w-full object-cover"
          />
        </div>
      </header>

      <section className="bg-cream py-14 lg:py-20">
        <div className="container-monrea grid gap-10 lg:grid-cols-2">
          <div>
            <h2 className="font-serif text-3xl">What we make</h2>
            <p className="mt-4 text-[15px] leading-relaxed text-muted-foreground">
              Printable tools designed to help you organize your days, track your progress, build
              routines, manage responsibilities, create intentional habits and make room for
              personal goals. Every page is drawn in the same calm visual language, so pages from
              different categories still look like they belong together in one binder.
            </p>
          </div>
          <div>
            <h2 className="font-serif text-3xl">How we design</h2>
            <ul className="mt-4 space-y-3 text-[15px] leading-relaxed text-muted-foreground">
              <li>Clarity first — if a page needs instructions, it isn't finished.</li>
              <li>Generous writing space, because real weeks are messy.</li>
              <li>Neutral colours that print cleanly on a home printer.</li>
              <li>Undated wherever possible, so nothing goes to waste.</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="container-monrea py-14 text-center lg:py-20">
        <h2 className="font-serif text-3xl">We create the tools; you create the system.</h2>
        <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-muted-foreground">
          Start with one page, keep what works, and build a system that fits the life you actually
          live.
        </p>
        <div className="mt-7 flex flex-wrap justify-center gap-3">
          <Button asChild>
            <Link to="/shop">Shop Printables</Link>
          </Button>
          <Button asChild variant="outline">
            <Link to="/bundles">Explore Bundles</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
