import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useShop } from "@/lib/shop-store";
import { getById } from "@/data/catalog";

export const Route = createFileRoute("/account")({
  head: () => ({
    meta: [
      { title: "My Account — Monrea Prints" },
      {
        name: "description",
        content: "Your Monrea Prints account: orders, downloads, wishlist and settings for your printable planner purchases.",
      },
      { property: "og:title", content: "My Account — Monrea Prints" },
      { property: "og:description", content: "Orders, downloads and wishlist in one place." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: Account,
});

const sections = ["Overview", "My Orders", "My Downloads", "Wishlist", "Account Settings"] as const;
type Section = (typeof sections)[number];

function Account() {
  const [active, setActive] = useState<Section>("Overview");
  const { wishlist } = useShop();

  return (
    <div className="container-monrea py-12 lg:py-16">
      <h1 className="font-serif text-4xl">My Account</h1>
      <p className="mt-2 max-w-xl text-sm text-muted-foreground">
        Accounts aren't connected yet. The dashboard below is ready to be wired to real
        authentication, orders and download delivery.
      </p>

      <div className="mt-10 grid gap-10 lg:grid-cols-[220px_1fr]">
        <nav aria-label="Account sections" className="h-fit">
          <ul className="space-y-1">
            {sections.map((s) => (
              <li key={s}>
                <button
                  type="button"
                  onClick={() => setActive(s)}
                  aria-current={active === s}
                  className={cn(
                    "w-full rounded-md px-3.5 py-2.5 text-left text-sm transition-colors",
                    active === s ? "bg-accent text-foreground" : "text-muted-foreground hover:text-foreground",
                  )}
                >
                  {s}
                </button>
              </li>
            ))}
          </ul>
        </nav>

        <section aria-live="polite" className="rounded-md border border-border bg-card p-7">
          <h2 className="font-serif text-2xl">{active}</h2>

          {active === "Overview" && (
            <p className="mt-4 max-w-lg text-sm leading-relaxed text-muted-foreground">
              Sign in to see your orders, re-download purchased files and keep your wishlist in sync
              across devices. Authentication isn't enabled on this store yet.
            </p>
          )}

          {(active === "My Orders" || active === "My Downloads") && (
            <div className="mt-4 max-w-lg space-y-3 text-sm text-muted-foreground">
              <p>
                {active === "My Orders"
                  ? "No orders yet — order history appears here once payments are connected."
                  : "Your purchased files will be listed here, downloadable as many times as you need."}
              </p>
              <Button asChild variant="outline">
                <Link to="/shop">Start Planning</Link>
              </Button>
            </div>
          )}

          {active === "Wishlist" && (
            <div className="mt-4 text-sm text-muted-foreground">
              {wishlist.length === 0 ? (
                <p>Nothing saved yet — your planning space is waiting.</p>
              ) : (
                <ul className="space-y-2">
                  {wishlist.map((id) => {
                    const p = getById(id);
                    return p ? (
                      <li key={id}>
                        <Link to="/product/$slug" params={{ slug: p.slug }} className="hover:text-primary">
                          {p.name}
                        </Link>
                      </li>
                    ) : null;
                  })}
                </ul>
              )}
              <Button asChild variant="outline" className="mt-4">
                <Link to="/wishlist">Open wishlist</Link>
              </Button>
            </div>
          )}

          {active === "Account Settings" && (
            <p className="mt-4 max-w-lg text-sm leading-relaxed text-muted-foreground">
              Name, email and password settings will live here once accounts are enabled.
            </p>
          )}
        </section>
      </div>
    </div>
  );
}
