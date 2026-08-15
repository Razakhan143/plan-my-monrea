import { createFileRoute } from "@tanstack/react-router";
import { BundleCard } from "@/components/site/BundleCard";
import { bundles } from "@/data/catalog";

export const Route = createFileRoute("/bundles")({
  head: () => ({
    meta: [
      { title: "Printable Planner Bundles — Monrea Prints" },
      {
        name: "description",
        content:
          "Curated printable bundles: complete wellness kits, everyday planning systems, budgeting and business sets. Save more with every bundle.",
      },
      { property: "og:title", content: "Printable Planner Bundles — Monrea Prints" },
      {
        property: "og:description",
        content: "Complete printable planning systems, bundled and priced to save.",
      },
    ],
  }),
  component: Bundles,
});

function Bundles() {
  return (
    <div className="container-monrea py-12 lg:py-16">
      <header className="max-w-2xl">
        <p className="eyebrow">Bundles</p>
        <h1 className="mt-3 font-serif text-4xl lg:text-5xl">More Pages. More Possibilities.</h1>
        <p className="mt-4 text-[15px] leading-relaxed text-muted-foreground">
          Build your complete planning system with thoughtfully curated printable bundles designed
          around the way you actually live and work.
        </p>
      </header>

      <div className="mt-12 grid gap-6 md:grid-cols-2">
        {bundles.map((b) => (
          <BundleCard key={b.id} bundle={b} />
        ))}
      </div>
    </div>
  );
}
