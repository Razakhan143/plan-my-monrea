import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { Heart, Menu, Search, ShoppingBag, User } from "lucide-react";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { ANNOUNCEMENT } from "@/data/catalog";
import { useShop } from "@/lib/shop-store";
import { SearchDialog } from "./SearchDialog";
import { CartDrawer } from "./CartDrawer";

const nav = [
  { to: "/", label: "Home" },
  { to: "/shop", label: "Shop" },
  { to: "/bundles", label: "Bundles" },
  { to: "/categories", label: "Categories" },
  { to: "/about", label: "About" },
  { to: "/blog", label: "Planning Journal" },
  { to: "/contact", label: "Contact" },
] as const;

export function Header() {
  const { cartCount, wishlist, setCartOpen } = useShop();
  const [searchOpen, setSearchOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <div className="bg-ink text-ivory">
        <p className="container-monrea py-2.5 text-center text-[11px] tracking-[0.14em] uppercase">
          {ANNOUNCEMENT}
        </p>
      </div>

      <header className="sticky top-0 z-40 border-b border-border/70 bg-background/85 backdrop-blur-md">
        <div className="container-monrea flex h-16 items-center justify-between gap-4 lg:h-20">
          <div className="flex items-center gap-2 lg:hidden">
            <Sheet open={menuOpen} onOpenChange={setMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" aria-label="Open menu">
                  <Menu className="size-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-[86vw] max-w-xs bg-background p-0">
                <SheetTitle className="sr-only">Site navigation</SheetTitle>
                <nav className="flex flex-col gap-1 px-6 pt-14" aria-label="Mobile">
                  {nav.map((item) => (
                    <Link
                      key={item.to}
                      to={item.to}
                      onClick={() => setMenuOpen(false)}
                      className="font-serif text-2xl py-2.5 border-b border-border/60 transition-colors hover:text-primary"
                      activeProps={{ className: "text-primary" }}
                    >
                      {item.label}
                    </Link>
                  ))}
                  <Link
                    to="/account"
                    onClick={() => setMenuOpen(false)}
                    className="mt-6 text-sm text-muted-foreground hover:text-foreground"
                  >
                    My account
                  </Link>
                  <Link
                    to="/faq"
                    onClick={() => setMenuOpen(false)}
                    className="mt-2 text-sm text-muted-foreground hover:text-foreground"
                  >
                    FAQ
                  </Link>
                </nav>
              </SheetContent>
            </Sheet>
          </div>

          <Link to="/" className="flex flex-col leading-none" aria-label="Monrea Prints home">
            <span className="font-serif text-xl tracking-tight lg:text-2xl">Monrea Prints</span>
            <span className="hidden text-[10px] tracking-[0.24em] uppercase text-muted-foreground lg:block">
              Printables for an organized life
            </span>
          </Link>

          <nav className="hidden items-center gap-7 lg:flex" aria-label="Primary">
            {nav.slice(1).map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className="text-[13px] tracking-wide text-foreground/80 transition-colors hover:text-primary"
                activeProps={{ className: "text-primary" }}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-0.5">
            <Button
              variant="ghost"
              size="icon"
              aria-label="Search products"
              onClick={() => setSearchOpen(true)}
            >
              <Search className="size-[18px]" />
            </Button>
            <Button variant="ghost" size="icon" asChild aria-label="Account">
              <Link to="/account">
                <User className="size-[18px]" />
              </Link>
            </Button>
            <Button variant="ghost" size="icon" asChild aria-label={`Wishlist, ${wishlist.length} items`}>
              <Link to="/wishlist" className="relative">
                <Heart className="size-[18px]" />
                {wishlist.length > 0 && <Dot>{wishlist.length}</Dot>}
              </Link>
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="relative"
              aria-label={`Shopping bag, ${cartCount} items`}
              onClick={() => setCartOpen(true)}
            >
              <ShoppingBag className="size-[18px]" />
              {cartCount > 0 && <Dot>{cartCount}</Dot>}
            </Button>
          </div>
        </div>
      </header>

      <SearchDialog open={searchOpen} onOpenChange={setSearchOpen} />
      <CartDrawer />
    </>
  );
}

function Dot({ children }: { children: React.ReactNode }) {
  return (
    <span className="absolute -right-0.5 -top-0.5 grid size-4 place-items-center rounded-full bg-primary text-[10px] font-medium text-primary-foreground">
      {children}
    </span>
  );
}
