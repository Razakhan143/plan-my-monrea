import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import type { Category } from "@/data/catalog";

export function CategoryCard({ category }: { category: Category }) {
  return (
    <Link
      to="/categories/$slug"
      params={{ slug: category.slug }}
      className="group flex flex-col rounded-md border border-border/70 bg-card p-5 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-paper"
    >
      <div className="overflow-hidden rounded-sm bg-cream">
        <img
          src={category.image}
          alt={`${category.name} printable pages`}
          loading="lazy"
          width={900}
          height={1100}
          className="aspect-[5/3] w-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
      </div>
      <h3 className="mt-4 font-serif text-lg">{category.shortName}</h3>
      <p className="mt-1.5 flex-1 text-[13px] leading-relaxed text-muted-foreground">
        {category.description}
      </p>
      <span className="mt-4 inline-flex items-center gap-1.5 text-xs tracking-[0.12em] uppercase text-primary">
        Explore
        <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-1" />
      </span>
    </Link>
  );
}
