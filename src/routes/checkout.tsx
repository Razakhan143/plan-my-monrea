import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { Info } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { effectivePrice, formatPrice } from "@/data/catalog";
import { useShop } from "@/lib/shop-store";

export const Route = createFileRoute("/checkout")({
  head: () => ({
    meta: [
      { title: "Checkout — Monrea Prints" },
      {
        name: "description",
        content: "Complete your Monrea Prints order. Digital printables delivered instantly — no shipping required.",
      },
      { property: "og:title", content: "Checkout — Monrea Prints" },
      { property: "og:description", content: "Secure checkout for instant digital downloads." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: Checkout,
});

function Checkout() {
  const { cartItems, subtotal } = useShop();
  const [agreed, setAgreed] = useState(false);

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    toast("Payments aren't connected yet", {
      description:
        "This checkout is fully built but no payment provider is connected. Connect one to take real orders.",
    });
  }

  if (cartItems.length === 0) {
    return (
      <div className="container-monrea flex min-h-[50vh] flex-col items-center justify-center py-20 text-center">
        <h1 className="font-serif text-3xl">Nothing to check out yet.</h1>
        <Button asChild className="mt-6">
          <Link to="/shop">Shop Printables</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="container-monrea py-12 lg:py-16">
      <h1 className="font-serif text-4xl">Checkout</h1>
      <p className="mt-2 text-sm text-muted-foreground">
        Digital products only — we'll email your download links.
      </p>

      <form onSubmit={onSubmit} className="mt-10 grid gap-10 lg:grid-cols-[1fr_380px]">
        <div className="space-y-10">
          <section aria-labelledby="customer">
            <h2 id="customer" className="font-serif text-xl">Customer information</h2>
            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              <Field id="first" label="First name" autoComplete="given-name" />
              <Field id="last" label="Last name" autoComplete="family-name" />
              <div className="sm:col-span-2">
                <Field id="email" label="Email address" type="email" autoComplete="email" hint="Your download links are sent here." />
              </div>
            </div>
          </section>

          <section aria-labelledby="payment">
            <h2 id="payment" className="font-serif text-xl">Payment</h2>
            <div className="mt-5 rounded-md border border-dashed border-border bg-cream p-5">
              <p className="flex items-start gap-2.5 text-sm text-muted-foreground">
                <Info className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden />
                No payment provider is connected yet. This section is ready for a real payment
                integration — until then, no card details are collected and no charge can be made.
              </p>
            </div>
          </section>

          <section aria-labelledby="terms">
            <h2 id="terms" className="font-serif text-xl">Confirmation</h2>
            <div className="mt-5 flex items-start gap-3">
              <Checkbox
                id="agree"
                checked={agreed}
                onCheckedChange={(v) => setAgreed(v === true)}
                aria-describedby="agree-desc"
              />
              <Label htmlFor="agree" className="text-sm font-normal leading-relaxed">
                I understand this order contains digital downloads only and no physical item will be
                shipped.
              </Label>
            </div>
            <p id="agree-desc" className="mt-2 text-xs text-muted-foreground">
              By ordering you agree to the digital product license and refund policy.
            </p>
          </section>
        </div>

        <aside className="h-fit rounded-md border border-border bg-card p-6">
          <h2 className="font-serif text-xl">Order summary</h2>
          <ul className="mt-5 space-y-4">
            {cartItems.map(({ product, quantity }) => (
              <li key={product.id} className="flex gap-3 text-sm">
                <img
                  src={product.images[0]}
                  alt=""
                  loading="lazy"
                  width={48}
                  height={60}
                  className="h-15 w-12 rounded-sm object-cover"
                />
                <span className="flex-1">
                  {product.name}
                  <span className="block text-xs text-muted-foreground">Qty {quantity}</span>
                </span>
                <span>{formatPrice(effectivePrice(product) * quantity)}</span>
              </li>
            ))}
          </ul>
          <div className="mt-5 border-t border-border pt-4 text-sm">
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Subtotal</span>
              <span>{formatPrice(subtotal)}</span>
            </div>
            <div className="mt-3 flex items-center justify-between text-base">
              <span>Total</span>
              <span className="font-medium">{formatPrice(subtotal)}</span>
            </div>
          </div>
          <Button type="submit" className="mt-6 w-full" disabled={!agreed}>
            Complete Order
          </Button>
          <p className="mt-3 text-xs text-muted-foreground">
            Instant digital access after payment. No shipping address needed.
          </p>
        </aside>
      </form>
    </div>
  );
}

function Field({
  id,
  label,
  type = "text",
  autoComplete,
  hint,
}: {
  id: string;
  label: string;
  type?: string;
  autoComplete?: string;
  hint?: string;
}) {
  return (
    <div>
      <Label htmlFor={id} className="text-xs tracking-wide">
        {label}
      </Label>
      <Input id={id} type={type} autoComplete={autoComplete} required className="mt-2 h-11 bg-background" />
      {hint && <p className="mt-1.5 text-xs text-muted-foreground">{hint}</p>}
    </div>
  );
}
