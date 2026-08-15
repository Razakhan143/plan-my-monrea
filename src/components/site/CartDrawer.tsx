import { Link } from "@tanstack/react-router";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { effectivePrice, formatPrice } from "@/data/catalog";
import { useShop } from "@/lib/shop-store";

export function CartDrawer() {
  const { cartOpen, setCartOpen, cartItems, subtotal, removeFromCart } = useShop();

  return (
    <Sheet open={cartOpen} onOpenChange={setCartOpen}>
      <SheetContent side="right" className="flex w-full flex-col bg-background sm:max-w-md">
        <SheetHeader>
          <SheetTitle className="font-serif text-xl">Your bag</SheetTitle>
          <p className="text-xs text-muted-foreground">
            A little more organization is on its way.
          </p>
        </SheetHeader>

        {cartItems.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-4 px-6 text-center">
            <p className="font-serif text-lg">Your planning space is waiting.</p>
            <Button asChild onClick={() => setCartOpen(false)}>
              <Link to="/shop">Shop Printables</Link>
            </Button>
          </div>
        ) : (
          <>
            <ul className="flex-1 space-y-4 overflow-y-auto px-4">
              {cartItems.map(({ product, quantity }) => (
                <li key={product.id} className="flex gap-3">
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    loading="lazy"
                    width={80}
                    height={100}
                    className="h-24 w-20 rounded-sm object-cover"
                  />
                  <div className="flex-1">
                    <p className="text-sm font-medium leading-snug">{product.name}</p>
                    <p className="mt-0.5 text-xs text-muted-foreground">Qty {quantity}</p>
                    <p className="mt-1 text-sm">
                      {formatPrice(effectivePrice(product) * quantity)}
                    </p>
                    <button
                      type="button"
                      onClick={() => removeFromCart(product.id)}
                      className="mt-1 text-xs text-muted-foreground underline underline-offset-4 hover:text-primary"
                    >
                      Remove
                    </button>
                  </div>
                </li>
              ))}
            </ul>
            <div className="space-y-3 border-t border-border p-4">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Subtotal</span>
                <span className="font-medium">{formatPrice(subtotal)}</span>
              </div>
              <p className="text-xs text-muted-foreground">
                Digital downloads — no shipping required.
              </p>
              <Button asChild className="w-full" onClick={() => setCartOpen(false)}>
                <Link to="/checkout">Proceed to Checkout</Link>
              </Button>
              <Button variant="outline" asChild className="w-full" onClick={() => setCartOpen(false)}>
                <Link to="/cart">View Cart</Link>
              </Button>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}
