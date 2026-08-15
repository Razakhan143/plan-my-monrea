import { useNavigate } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { allItems, categories, formatPrice, effectivePrice } from "@/data/catalog";

const suggested = ["habit", "budget", "meal", "travel", "weekly", "bundle"];

export function SearchDialog({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const { productHits, categoryHits } = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return { productHits: [], categoryHits: [] };
    return {
      productHits: allItems
        .filter((p) =>
          [p.name, p.shortDescription, p.subcategory, ...p.tags].join(" ").toLowerCase().includes(q),
        )
        .slice(0, 6),
      categoryHits: categories
        .filter((c) => `${c.name} ${c.shortName} ${c.subcategories.join(" ")}`.toLowerCase().includes(q))
        .slice(0, 3),
    };
  }, [query]);

  function go(to: string) {
    onOpenChange(false);
    setQuery("");
    navigate({ to });
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="top-24 max-w-2xl translate-y-0 bg-background p-0">
        <DialogTitle className="sr-only">Search products</DialogTitle>
        <div className="flex items-center gap-3 border-b border-border px-5 py-4">
          <Search className="size-4 text-muted-foreground" />
          <label htmlFor="site-search" className="sr-only">
            Search printables
          </label>
          <Input
            id="site-search"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search planners, trackers, journals…"
            className="border-0 bg-transparent px-0 shadow-none focus-visible:ring-0"
          />
        </div>

        <div className="max-h-[60vh] overflow-y-auto p-5">
          {!query.trim() && (
            <div>
              <p className="eyebrow">Suggested searches</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {suggested.map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => setQuery(s)}
                    className="rounded-full border border-border px-3.5 py-1.5 text-xs transition-colors hover:border-primary hover:text-primary"
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          )}

          {query.trim() && productHits.length === 0 && categoryHits.length === 0 && (
            <div>
              <p className="text-sm text-muted-foreground">
                No matches for “{query}”. You might like these instead:
              </p>
              <ul className="mt-3 space-y-2">
                {allItems.slice(0, 4).map((p) => (
                  <li key={p.id}>
                    <button
                      type="button"
                      onClick={() => go(`/product/${p.slug}`)}
                      className="text-sm hover:text-primary"
                    >
                      {p.name}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {categoryHits.length > 0 && (
            <div className="mb-6">
              <p className="eyebrow">Categories</p>
              <ul className="mt-3 space-y-2">
                {categoryHits.map((c) => (
                  <li key={c.slug}>
                    <button
                      type="button"
                      onClick={() => go(`/categories/${c.slug}`)}
                      className="text-sm hover:text-primary"
                    >
                      {c.name}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {productHits.length > 0 && (
            <div>
              <p className="eyebrow">Products</p>
              <ul className="mt-3 divide-y divide-border/70">
                {productHits.map((p) => (
                  <li key={p.id}>
                    <button
                      type="button"
                      onClick={() => go(`/product/${p.slug}`)}
                      className="flex w-full items-center gap-3 py-2.5 text-left hover:text-primary"
                    >
                      <img
                        src={p.images[0]}
                        alt=""
                        loading="lazy"
                        width={44}
                        height={56}
                        className="h-14 w-11 rounded-sm object-cover"
                      />
                      <span className="flex-1 text-sm">{p.name}</span>
                      <span className="text-xs text-muted-foreground">
                        {formatPrice(effectivePrice(p))}
                      </span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
