import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Minus, Plus, X } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { effectivePrice, formatPrice } from "@/data/catalog";
import { useShop } from "@/lib/shop-store";

export const Route = createFileRoute("/cart")({
  head: () => ({
    meta: [
      { title: "Your Cart — Monrea Prints" },
      {
        name: "description",
        content: "Review your printable planner downloads before checkout. Digital products only — nothing is shipped.",
      },
      { property: "og:title", content: "Your Cart — Monrea Prints" },
      { property: "og:description", content: "Review your digital printable downloads." },
    ],
  }),
  component: CartPage,
});

function CartPage() {
  const { cartItems, subtotal, setQuantity, removeFromCart, toggleWishlist } = useShop();
  const [code, setCode] = useState("");
  const [discount, setDiscount] = useState(0);

  function applyCode() {
    if (code.trim().toUpperCase() === "PLAN10") {
      setDiscount(subtotal * 0.1);
      toast("Discount applied", { description: "10% off your order." });
    } else {
      setDiscount(0);
      toast("That code isn't recognized");
    }
  }

  if (cartItems.length === 0) {
    return (
      <div className="container-monrea flex min-h-[50vh] flex-col items-center justify-center py-20 text-center">
        <h1 className="font-serif text-3xl">Your planning space is waiting.</h1>
        <p className="mt-3 text-sm text-muted-foreground">Your cart is empty for now.</p>
        <Button asChild className="mt-6">
          <Link to="/shop">Shop Printables</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="container-monrea py-12 lg:py-16">
      <h1 className="font-serif text-4xl">Your Cart</h1>
      <p className="mt-2 text-sm text-muted-foreground">
        A little more organization is on its way.
      </p>

      <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_360px]">
        <ul className="divide-y divide-border border-y border-border">
          {cartItems.map(({ product, quantity }) => (
            <li key={product.id} className="flex gap-4 py-5">
              <img
                src={product.images[0]}
                alt={product.name}
                loading="lazy"
                width={96}
                height={120}
                className="h-30 w-24 rounded-sm object-cover"
              />
              <div className="flex flex-1 flex-col">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h2 className="font-serif text-lg">
                      <Link to="/product/$slug" params={{ slug: product.slug }} className="hover:text-primary">
                        {product.name}
                      </Link>
                    </h2>
                    <p className="mt-1 text-xs text-muted-foreground">
                      Digital download · {product.pageCount} pages
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => removeFromCart(product.id)}
                    aria-label={`Remove ${product.name}`}
                    className="text-muted-foreground hover:text-primary"
                  >
                    <X className="size-4" />
                  </button>
                </div>
                <div className="mt-auto flex flex-wrap items-center justify-between gap-3 pt-4">
                  <div className="flex items-center rounded-md border border-border">
                    <button
                      type="button"
                      onClick={() => setQuantity(product.id, quantity - 1)}
                      aria-label="Decrease quantity"
                      className="grid size-9 place-items-center hover:text-primary"
                    >
                      <Minus className="size-3.5" />
                    </button>
                    <span className="w-8 text-center text-sm" aria-live="polite">{quantity}</span>
                    <button
                      type="button"
                      onClick={() => setQuantity(product.id, quantity + 1)}
                      aria-label="Increase quantity"
                      className="grid size-9 place-items-center hover:text-primary"
                    >
                      <Plus className="size-3.5" />
                    </button>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      toggleWishlist(product.id);
                      removeFromCart(product.id);
                      toast("Moved to wishlist");
                    }}
                    className="text-xs text-muted-foreground underline underline-offset-4 hover:text-primary"
                  >
                    Move to wishlist
                  </button>
                  <span className="text-sm font-medium">
                    {formatPrice(effectivePrice(product) * quantity)}
                  </span>
                </div>
              </div>
            </li>
          ))}
        </ul>

        <aside className="h-fit rounded-md border border-border bg-card p-6">
          <h2 className="font-serif text-xl">Order summary</h2>
          <div className="mt-5 space-y-3 text-sm">
            <Row label="Subtotal" value={formatPrice(subtotal)} />
            <Row label="Discount" value={discount ? `-${formatPrice(discount)}` : "—"} />
            <div className="flex items-center justify-between border-t border-border pt-3 text-base">
              <span>Total</span>
              <span className="font-medium">{formatPrice(Math.max(0, subtotal - discount))}</span>
            </div>
          </div>

          <div className="mt-5 flex gap-2">
            <label htmlFor="discount" className="sr-only">Discount code</label>
            <Input
              id="discount"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder="Discount code"
              className="h-10 bg-background"
            />
            <Button variant="outline" className="h-10" onClick={applyCode}>
              Apply
            </Button>
          </div>

          <p className="mt-4 text-xs text-muted-foreground">
            Digital products — no shipping costs and nothing to wait for.
          </p>

          <Button asChild className="mt-5 w-full">
            <Link to="/checkout">Proceed to Checkout</Link>
          </Button>
          <Button asChild variant="ghost" className="mt-2 w-full">
            <Link to="/shop">Continue Shopping</Link>
          </Button>
        </aside>
      </div>
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-muted-foreground">{label}</span>
      <span>{value}</span>
    </div>
  );
}
