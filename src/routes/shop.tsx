import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { ProductCard } from "@/components/site/ProductCard";
import { allItems, categories, effectivePrice, type CategorySlug } from "@/data/catalog";

export const Route = createFileRoute("/shop")({
  head: () => ({
    meta: [
      { title: "Shop All Printables — Monrea Prints" },
      {
        name: "description",
        content:
          "Browse every Monrea Prints printable: planners, habit trackers, budget pages, wellness journals and curated bundles. Filter by category, type and price.",
      },
      { property: "og:title", content: "Shop All Printables — Monrea Prints" },
      {
        property: "og:description",
        content: "Printable planners, trackers and journals. Filter by category, price and type.",
      },
    ],
  }),
  component: Shop,
});

type Sort = "featured" | "newest" | "price-asc" | "price-desc" | "best";
type Kind = "all" | "individual" | "bundle";

function Shop() {
  const [query, setQuery] = useState("");
  const [cats, setCats] = useState<CategorySlug[]>([]);
  const [kind, setKind] = useState<Kind>("all");
  const [maxPrice, setMaxPrice] = useState(30);
  const [sort, setSort] = useState<Sort>("featured");

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    const list = allItems.filter((p) => {
      if (q && ![p.name, p.shortDescription, p.subcategory, ...p.tags].join(" ").toLowerCase().includes(q))
        return false;
      if (cats.length && !cats.includes(p.category)) return false;
      if (kind === "bundle" && !p.isBundle) return false;
      if (kind === "individual" && p.isBundle) return false;
      if (effectivePrice(p) > maxPrice) return false;
      return true;
    });

    const sorted = [...list];
    switch (sort) {
      case "price-asc":
        sorted.sort((a, b) => effectivePrice(a) - effectivePrice(b));
        break;
      case "price-desc":
        sorted.sort((a, b) => effectivePrice(b) - effectivePrice(a));
        break;
      case "newest":
        sorted.sort((a, b) => Number(!!b.isNew) - Number(!!a.isNew));
        break;
      case "best":
        sorted.sort((a, b) => Number(!!b.bestseller) - Number(!!a.bestseller));
        break;
      default:
        sorted.sort((a, b) => Number(!!b.featured) - Number(!!a.featured));
    }
    return sorted;
  }, [query, cats, kind, maxPrice, sort]);

  function toggleCat(slug: CategorySlug) {
    setCats((prev) => (prev.includes(slug) ? prev.filter((c) => c !== slug) : [...prev, slug]));
  }

  return (
    <div className="container-monrea py-12 lg:py-16">
      <header className="max-w-2xl">
        <p className="eyebrow">Shop</p>
        <h1 className="mt-3 font-serif text-4xl lg:text-5xl">All Printables</h1>
        <p className="mt-4 text-[15px] leading-relaxed text-muted-foreground">
          Every Monrea Prints page in one place. Each product is a digital download — nothing will
          be shipped.
        </p>
      </header>

      <div className="mt-10 grid gap-10 lg:grid-cols-[240px_1fr]">
        <aside className="space-y-8" aria-label="Product filters">
          <div>
            <label htmlFor="shop-search" className="eyebrow">
              Search
            </label>
            <div className="relative mt-3">
              <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                id="shop-search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Name, keyword, category"
                className="h-10 bg-background pl-9"
              />
            </div>
          </div>

          <fieldset>
            <legend className="eyebrow">Category</legend>
            <ul className="mt-3 space-y-2">
              {categories.map((c) => (
                <li key={c.slug}>
                  <label className="flex cursor-pointer items-center gap-2.5 text-sm">
                    <input
                      type="checkbox"
                      checked={cats.includes(c.slug)}
                      onChange={() => toggleCat(c.slug)}
                      className="size-4 accent-[var(--primary)]"
                    />
                    {c.shortName}
                  </label>
                </li>
              ))}
            </ul>
          </fieldset>

          <fieldset>
            <legend className="eyebrow">Product type</legend>
            <div className="mt-3 flex flex-wrap gap-2">
              {(["all", "individual", "bundle"] as Kind[]).map((k) => (
                <button
                  key={k}
                  type="button"
                  aria-pressed={kind === k}
                  onClick={() => setKind(k)}
                  className={`rounded-full border px-3.5 py-1.5 text-xs capitalize transition-colors ${
                    kind === k ? "border-primary bg-primary text-primary-foreground" : "border-border"
                  }`}
                >
                  {k}
                </button>
              ))}
            </div>
          </fieldset>

          <div>
            <p className="eyebrow">Max price</p>
            <Slider
              className="mt-4"
              value={[maxPrice]}
              min={4}
              max={30}
              step={1}
              onValueChange={(values) => setMaxPrice(values[0] ?? 30)}
              aria-label="Maximum price"
            />
            <p className="mt-2 text-xs text-muted-foreground">Up to ${maxPrice}</p>
          </div>

          <Button
            variant="ghost"
            className="px-0 text-xs underline underline-offset-4"
            onClick={() => {
              setQuery("");
              setCats([]);
              setKind("all");
              setMaxPrice(30);
            }}
          >
            Clear all filters
          </Button>
        </aside>

        <section aria-label="Products">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border pb-4">
            <p className="text-sm text-muted-foreground">{results.length} products</p>
            <div className="flex items-center gap-2">
              <label htmlFor="sort" className="text-xs text-muted-foreground">
                Sort
              </label>
              <Select value={sort} onValueChange={(v) => setSort(v as Sort)}>
                <SelectTrigger id="sort" className="h-9 w-[180px] bg-background">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="featured">Featured</SelectItem>
                  <SelectItem value="newest">Newest</SelectItem>
                  <SelectItem value="price-asc">Price: Low to High</SelectItem>
                  <SelectItem value="price-desc">Price: High to Low</SelectItem>
                  <SelectItem value="best">Best Selling</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {results.length === 0 ? (
            <p className="py-20 text-center font-serif text-xl">
              Your planning space is waiting — try a different filter.
            </p>
          ) : (
            <div className="mt-8 grid grid-cols-2 gap-x-5 gap-y-10 lg:grid-cols-3 xl:grid-cols-4">
              {results.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
