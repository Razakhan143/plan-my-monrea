import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { effectivePrice, formatPrice, getById } from "@/data/catalog";
import { useShop } from "@/lib/shop-store";

export const Route = createFileRoute("/wishlist")({
  head: () => ({
    meta: [
      { title: "Your Wishlist — Monrea Prints" },
      {
        name: "description",
        content: "Printables you've saved for later at Monrea Prints. Add them to your cart whenever you're ready.",
      },
      { property: "og:title", content: "Your Wishlist — Monrea Prints" },
      { property: "og:description", content: "Saved printable planners and trackers." },
    ],
  }),
  component: Wishlist,
});

function Wishlist() {
  const { wishlist, toggleWishlist, addToCart, setCartOpen } = useShop();
  const items = wishlist.map(getById).filter(Boolean);

  return (
    <div className="container-monrea py-12 lg:py-16">
      <h1 className="font-serif text-4xl">Wishlist</h1>
      <p className="mt-2 text-sm text-muted-foreground">
        Saved locally on this device. Connect accounts later to sync it everywhere.
      </p>

      {items.length === 0 ? (
        <div className="py-20 text-center">
          <p className="font-serif text-2xl">Your planning space is waiting.</p>
          <Button asChild className="mt-6">
            <Link to="/shop">Discover More</Link>
          </Button>
        </div>
      ) : (
        <ul className="mt-10 divide-y divide-border border-y border-border">
          {items.map((p) => (
            <li key={p!.id} className="flex flex-wrap items-center gap-4 py-5">
              <img
                src={p!.images[0]}
                alt={p!.name}
                loading="lazy"
                width={80}
                height={100}
                className="h-25 w-20 rounded-sm object-cover"
              />
              <div className="flex-1 min-w-[180px]">
                <h2 className="font-serif text-lg">
                  <Link to="/product/$slug" params={{ slug: p!.slug }} className="hover:text-primary">
                    {p!.name}
                  </Link>
                </h2>
                <p className="mt-1 text-xs text-muted-foreground">
                  Available now · Instant digital download
                </p>
              </div>
              <span className="text-sm font-medium">{formatPrice(effectivePrice(p!))}</span>
              <div className="flex gap-2">
                <Button
                  size="sm"
                  onClick={() => {
                    addToCart(p!.id);
                    setCartOpen(true);
                  }}
                >
                  Add to Cart
                </Button>
                <Button size="sm" variant="ghost" onClick={() => toggleWishlist(p!.id)}>
                  Remove
                </Button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
