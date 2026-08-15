import { createFileRoute } from "@tanstack/react-router";
import { CategoryCard } from "@/components/site/CategoryCard";
import { categories } from "@/data/catalog";

export const Route = createFileRoute("/categories/")({
  head: () => ({
    meta: [
      { title: "Browse Categories — Monrea Prints" },
      {
        name: "description",
        content:
          "Browse printable planner categories: wellness, daily planning, goals and habits, notes and logs, travel, budgeting and business planning.",
      },
      { property: "og:title", content: "Browse Categories — Monrea Prints" },
      {
        property: "og:description",
        content: "Seven planning spaces, from wellness and habits to budgeting and business.",
      },
    ],
  }),
  component: CategoriesIndex,
});

function CategoriesIndex() {
  return (
    <div className="container-monrea py-12 lg:py-16">
      <header className="max-w-2xl">
        <p className="eyebrow">Categories</p>
        <h1 className="mt-3 font-serif text-4xl lg:text-5xl">Find Your Planning Space</h1>
        <p className="mt-4 text-[15px] leading-relaxed text-muted-foreground">
          Start with the part of life you want to organize first. Every category shares the same
          calm layout language, so pages mix and match easily.
        </p>
      </header>
      <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {categories.map((c) => (
          <CategoryCard key={c.slug} category={c} />
        ))}
      </div>
    </div>
  );
}
