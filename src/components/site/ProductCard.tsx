import { Link } from "@tanstack/react-router";
import { Heart } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { effectivePrice, formatPrice, getCategory, type Product } from "@/data/catalog";
import { useShop } from "@/lib/shop-store";
import { QuickView } from "./QuickView";

export function ProductCard({ product }: { product: Product }) {
  const { addToCart, setCartOpen, toggleWishlist, inWishlist } = useShop();
  const category = getCategory(product.category);
  const saved = inWishlist(product.id);
  const onSale = product.salePrice != null;

  return (
    <article className="group relative flex flex-col">
      <div className="relative overflow-hidden rounded-md border border-border/70 bg-cream">
        <Link
          to="/product/$slug"
          params={{ slug: product.slug }}
          aria-label={`View ${product.name}`}
          className="block"
        >
          <img
            src={product.images[0]}
            alt={`${product.name} printable page preview`}
            loading="lazy"
            width={900}
            height={1100}
            className="aspect-[4/5] w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.035]"
          />
        </Link>

        <div className="pointer-events-none absolute left-2.5 top-2.5 flex flex-col gap-1.5">
          {product.isBundle && <Badge>Bundle</Badge>}
          {product.isNew && <Badge>New</Badge>}
          {onSale && <Badge tone="accent">Sale</Badge>}
        </div>

        <button
          type="button"
          onClick={() => {
            toggleWishlist(product.id);
            toast(saved ? "Removed from wishlist" : "Saved to wishlist", {
              description: product.name,
            });
          }}
          aria-label={saved ? `Remove ${product.name} from wishlist` : `Save ${product.name} to wishlist`}
          aria-pressed={saved}
          className="absolute right-2.5 top-2.5 grid size-8 place-items-center rounded-full bg-background/90 text-foreground/70 shadow-paper transition-colors hover:text-primary"
        >
          <Heart className={cn("size-4", saved && "fill-primary text-primary")} />
        </button>

        <div className="absolute inset-x-2.5 bottom-2.5 flex gap-2 opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-within:opacity-100">
          <QuickView product={product} />
          <Button
            size="sm"
            className="h-9 flex-1 text-xs"
            onClick={() => {
              addToCart(product.id);
              setCartOpen(true);
            }}
          >
            Add to Cart
          </Button>
        </div>
      </div>

      <div className="mt-3.5 flex flex-1 flex-col">
        <p className="eyebrow">{category?.shortName}</p>
        <h3 className="mt-1.5 font-serif text-[17px] leading-snug">
          <Link to="/product/$slug" params={{ slug: product.slug }} className="hover:text-primary">
            {product.name}
          </Link>
        </h3>
        <p className="mt-1 line-clamp-2 text-[13px] leading-relaxed text-muted-foreground">
          {product.shortDescription}
        </p>
        <p className="mt-2.5 flex items-baseline gap-2 text-sm">
          <span className={cn("font-medium", onSale && "text-primary")}>
            {formatPrice(effectivePrice(product))}
          </span>
          {onSale && (
            <span className="text-xs text-muted-foreground line-through">
              {formatPrice(product.price)}
            </span>
          )}
        </p>
      </div>
    </article>
  );
}

function Badge({ children, tone }: { children: React.ReactNode; tone?: "accent" }) {
  return (
    <span
      className={cn(
        "rounded-full px-2.5 py-1 text-[10px] tracking-[0.12em] uppercase",
        tone === "accent"
          ? "bg-primary text-primary-foreground"
          : "bg-background/90 text-foreground/80",
      )}
    >
      {children}
    </span>
  );
}
