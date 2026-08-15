import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { effectivePrice, formatPrice, type Product } from "@/data/catalog";
import { useShop } from "@/lib/shop-store";

export function BundleCard({ bundle }: { bundle: Product }) {
  const { addToCart, setCartOpen } = useShop();
  const value = bundle.bundleValue ?? bundle.price;
  const savings = Math.max(0, value - effectivePrice(bundle));

  return (
    <article className="flex flex-col overflow-hidden rounded-md border border-border/70 bg-card transition-shadow duration-300 hover:shadow-paper">
      <Link to="/product/$slug" params={{ slug: bundle.slug }} className="block overflow-hidden bg-cream">
        <img
          src={bundle.images[0]}
          alt={`${bundle.name} printable bundle cover`}
          loading="lazy"
          width={1200}
          height={900}
          className="aspect-[4/3] w-full object-cover transition-transform duration-700 hover:scale-[1.03]"
        />
      </Link>
      <div className="flex flex-1 flex-col p-5">
        <p className="eyebrow">{bundle.includedFiles.length} printables · {bundle.pageCount} pages</p>
        <h3 className="mt-2 font-serif text-xl">
          <Link to="/product/$slug" params={{ slug: bundle.slug }} className="hover:text-primary">
            {bundle.name}
          </Link>
        </h3>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
          {bundle.shortDescription}
        </p>
        <div className="mt-4 flex items-baseline gap-2.5">
          <span className="text-lg font-medium">{formatPrice(effectivePrice(bundle))}</span>
          <span className="text-sm text-muted-foreground line-through">{formatPrice(value)}</span>
          {savings > 0 && (
            <span className="rounded-full bg-accent px-2.5 py-1 text-[10px] tracking-[0.12em] uppercase">
              Save {formatPrice(savings)}
            </span>
          )}
        </div>
        <div className="mt-5 flex gap-2">
          <Button
            className="flex-1"
            onClick={() => {
              addToCart(bundle.id);
              setCartOpen(true);
            }}
          >
            Add to Cart
          </Button>
          <Button variant="outline" asChild>
            <Link to="/product/$slug" params={{ slug: bundle.slug }}>
              Explore Bundle
            </Link>
          </Button>
        </div>
      </div>
    </article>
  );
}
