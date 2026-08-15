import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ProductCard } from "@/components/site/ProductCard";
import { BundleCard } from "@/components/site/BundleCard";
import {
  byCategory,
  categories,
  getCategory,
  type CategorySlug,
} from "@/data/catalog";

export const Route = createFileRoute("/categories/$slug")({
  loader: ({ params }) => {
    const category = getCategory(params.slug);
    if (!category) throw notFound();
    return { category };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return { meta: [{ title: "Category not found — Monrea Prints" }, { name: "robots", content: "noindex" }] };
    }
    const { category } = loaderData;
    return {
      meta: [
        { title: `${category.seoTitle} — Monrea Prints` },
        { name: "description", content: category.seoDescription },
        { property: "og:title", content: `${category.name} — Monrea Prints` },
        { property: "og:description", content: category.seoDescription },
      ],
    };
  },
  component: CategoryPage,
});

function CategoryPage() {
  const { category } = Route.useLoaderData();
  const items = byCategory(category.slug as CategorySlug);
  const singles = items.filter((p) => !p.isBundle);
  const categoryBundles = items.filter((p) => p.isBundle);
  const related = categories.filter((c) => c.slug !== category.slug).slice(0, 4);

  return (
    <div>
      <nav aria-label="Breadcrumb" className="container-monrea pt-8 text-xs text-muted-foreground">
        <ol className="flex flex-wrap items-center gap-2">
          <li>
            <Link to="/" className="hover:text-primary">
              Home
            </Link>
          </li>
          <li aria-hidden>/</li>
          <li>
            <Link to="/categories" className="hover:text-primary">
              Categories
            </Link>
          </li>
          <li aria-hidden>/</li>
          <li aria-current="page" className="text-foreground">
            {category.name}
          </li>
        </ol>
      </nav>

      <header className="container-monrea grid items-center gap-8 py-10 lg:grid-cols-2 lg:py-14">
        <div>
          <p className="eyebrow">{category.shortName}</p>
          <h1 className="mt-3 font-serif text-4xl lg:text-5xl">{category.name}</h1>
          <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-muted-foreground">
            {category.intro}
          </p>
          <ul className="mt-6 flex flex-wrap gap-2">
            {category.subcategories.map((s) => (
              <li
                key={s}
                className="rounded-full border border-border px-3.5 py-1.5 text-xs text-muted-foreground"
              >
                {s}
              </li>
            ))}
          </ul>
        </div>
        <div className="overflow-hidden rounded-md border border-border/70 bg-cream">
          <img
            src={category.image}
            alt={`${category.name} printable pages from Monrea Prints`}
            loading="lazy"
            width={900}
            height={600}
            className="aspect-[3/2] w-full object-cover"
          />
        </div>
      </header>

      <section className="container-monrea pb-14" aria-labelledby="cat-products">
        <h2 id="cat-products" className="font-serif text-2xl">
          Printables in this category
        </h2>
        {singles.length === 0 ? (
          <p className="mt-6 text-sm text-muted-foreground">
            New pages for this category are on their way.
          </p>
        ) : (
          <div className="mt-8 grid grid-cols-2 gap-x-5 gap-y-10 lg:grid-cols-4">
            {singles.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        )}
      </section>

      {categoryBundles.length > 0 && (
        <section className="bg-cream py-14" aria-labelledby="cat-bundles">
          <div className="container-monrea">
            <h2 id="cat-bundles" className="font-serif text-2xl">
              Bundles for {category.shortName}
            </h2>
            <div className="mt-8 grid gap-6 md:grid-cols-2">
              {categoryBundles.map((b) => (
                <BundleCard key={b.id} bundle={b} />
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="container-monrea py-14" aria-labelledby="cat-related">
        <h2 id="cat-related" className="font-serif text-2xl">
          Related categories
        </h2>
        <ul className="mt-6 flex flex-wrap gap-3">
          {related.map((c) => (
            <li key={c.slug}>
              <Link
                to="/categories/$slug"
                params={{ slug: c.slug }}
                className="inline-block rounded-full border border-border px-4 py-2 text-sm transition-colors hover:border-primary hover:text-primary"
              >
                {c.shortName}
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
