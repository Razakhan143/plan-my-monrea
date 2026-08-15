import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { effectivePrice, formatPrice, getCategory, type Product } from "@/data/catalog";
import { useShop } from "@/lib/shop-store";

export function QuickView({ product }: { product: Product }) {
  const { addToCart, setCartOpen } = useShop();
  const category = getCategory(product.category);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="sm" variant="secondary" className="h-9 flex-1 text-xs">
          Quick View
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-3xl bg-background p-0">
        <div className="grid gap-0 sm:grid-cols-2">
          <img
            src={product.images[0]}
            alt={`${product.name} preview`}
            loading="lazy"
            width={900}
            height={1100}
            className="hidden h-full w-full object-cover sm:block"
          />
          <div className="p-6">
            <DialogHeader className="space-y-2 text-left">
              <p className="eyebrow">{category?.shortName}</p>
              <DialogTitle className="font-serif text-2xl">{product.name}</DialogTitle>
              <DialogDescription className="text-sm leading-relaxed">
                {product.description}
              </DialogDescription>
            </DialogHeader>
            <dl className="mt-5 grid grid-cols-2 gap-3 text-xs text-muted-foreground">
              <div>
                <dt className="eyebrow">Format</dt>
                <dd className="mt-1 text-foreground">{product.fileType}</dd>
              </div>
              <div>
                <dt className="eyebrow">Pages</dt>
                <dd className="mt-1 text-foreground">{product.pageCount}</dd>
              </div>
              <div className="col-span-2">
                <dt className="eyebrow">Sizes</dt>
                <dd className="mt-1 text-foreground">{product.sizes.join(" · ")}</dd>
              </div>
            </dl>
            <p className="mt-5 text-lg font-medium">{formatPrice(effectivePrice(product))}</p>
            <p className="mt-1 text-xs text-muted-foreground">
              Digital product · Instant access · Nothing will be shipped
            </p>
            <div className="mt-5 flex gap-2">
              <Button
                className="flex-1"
                onClick={() => {
                  addToCart(product.id);
                  setCartOpen(true);
                }}
              >
                Add to Cart
              </Button>
              <Button variant="outline" asChild>
                <Link to="/product/$slug" params={{ slug: product.slug }}>
                  View Product
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
