import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
import { Check, Download, Heart, ShieldCheck } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ProductCard } from "@/components/site/ProductCard";
import { cn } from "@/lib/utils";
import {
  allItems,
  effectivePrice,
  formatPrice,
  getById,
  getCategory,
  getProduct,
} from "@/data/catalog";
import { useShop } from "@/lib/shop-store";

export const Route = createFileRoute("/product/$slug")({
  loader: ({ params }) => {
    const product = getProduct(params.slug);
    if (!product) throw notFound();
    return { product };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return { meta: [{ title: "Product unavailable — Monrea Prints" }, { name: "robots", content: "noindex" }] };
    }
    const { product } = loaderData;
    const description = `${product.shortDescription} ${product.pageCount}-page printable ${product.fileType}, instant digital download from Monrea Prints.`;
    return {
      meta: [
        { title: `${product.name} — Printable | Monrea Prints` },
        { name: "description", content: description },
        { property: "og:title", content: `${product.name} — Monrea Prints` },
        { property: "og:description", content: description },
        { property: "og:type", content: "product" },
      ],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Product",
            name: product.name,
            description: product.description,
            category: getCategory(product.category)?.name,
            offers: {
              "@type": "Offer",
              price: effectivePrice(product).toFixed(2),
              priceCurrency: "USD",
              availability: "https://schema.org/InStock",
            },
          }),
        },
      ],
    };
  },
  component: ProductPage,
});

function ProductPage() {
  const { product } = Route.useLoaderData();
  const { addToCart, setCartOpen, toggleWishlist, inWishlist } = useShop();
  const [active, setActive] = useState(0);
  const [zoom, setZoom] = useState(false);
  const category = getCategory(product.category);
  const saved = inWishlist(product.id);
  const related = (product.relatedProducts ?? []).map(getById).filter(Boolean) as typeof allItems;
  const complements = allItems
    .filter((p) => p.id !== product.id && !related.some((r) => r.id === p.id))
    .slice(0, 4);

  return (
    <div>
      <nav aria-label="Breadcrumb" className="container-monrea pt-8 text-xs text-muted-foreground">
        <ol className="flex flex-wrap items-center gap-2">
          <li>
            <Link to="/" className="hover:text-primary">Home</Link>
          </li>
          <li aria-hidden>/</li>
          <li>
            <Link to="/shop" className="hover:text-primary">Shop</Link>
          </li>
          <li aria-hidden>/</li>
          <li>
            <Link to="/categories/$slug" params={{ slug: product.category }} className="hover:text-primary">
              {category?.shortName}
            </Link>
          </li>
          <li aria-hidden>/</li>
          <li aria-current="page" className="text-foreground">{product.name}</li>
        </ol>
      </nav>

      <div className="container-monrea grid gap-10 py-10 lg:grid-cols-2 lg:gap-16 lg:py-14">
        <div>
          <button
            type="button"
            onClick={() => setZoom((z) => !z)}
            aria-label={zoom ? "Zoom out of product image" : "Zoom into product image"}
            className="block w-full overflow-hidden rounded-md border border-border/70 bg-cream"
          >
            <img
              src={product.previewImages[active] ?? product.images[0]}
              alt={`${product.name} — printable page preview ${active + 1}`}
              width={900}
              height={1100}
              className={cn(
                "aspect-[4/5] w-full object-cover transition-transform duration-500",
                zoom && "scale-150 cursor-zoom-out",
              )}
            />
          </button>
          <div className="mt-3 flex gap-3">
            {product.previewImages.map((img, i) => (
              <button
                key={i}
                type="button"
                onClick={() => {
                  setActive(i);
                  setZoom(false);
                }}
                aria-label={`Show preview ${i + 1}`}
                aria-current={i === active}
                className={cn(
                  "overflow-hidden rounded-sm border transition-colors",
                  i === active ? "border-primary" : "border-border/70",
                )}
              >
                <img src={img} alt="" loading="lazy" width={72} height={90} className="h-[90px] w-[72px] object-cover" />
              </button>
            ))}
          </div>
        </div>

        <div>
          <p className="eyebrow">{category?.shortName}</p>
          <h1 className="mt-3 font-serif text-3xl lg:text-4xl">{product.name}</h1>
          <p className="mt-3 text-sm text-muted-foreground">
            Reviews coming soon — this product hasn't been rated yet.
          </p>

          <div className="mt-5 flex items-baseline gap-3">
            <span className="text-2xl font-medium">{formatPrice(effectivePrice(product))}</span>
            {product.salePrice != null && (
              <>
                <span className="text-sm text-muted-foreground line-through">
                  {formatPrice(product.price)}
                </span>
                <span className="rounded-full bg-accent px-2.5 py-1 text-[10px] tracking-[0.12em] uppercase">
                  Save {formatPrice(product.price - product.salePrice)}
                </span>
              </>
            )}
          </div>

          <p className="mt-5 text-[15px] leading-relaxed text-muted-foreground">{product.description}</p>

          <dl className="mt-6 grid grid-cols-2 gap-4 border-y border-border py-5 text-sm">
            <div>
              <dt className="eyebrow">File format</dt>
              <dd className="mt-1">{product.fileType}</dd>
            </div>
            <div>
              <dt className="eyebrow">Page count</dt>
              <dd className="mt-1">{product.pageCount} pages</dd>
            </div>
            <div>
              <dt className="eyebrow">Printable sizes</dt>
              <dd className="mt-1">{product.sizes.join(" · ")}</dd>
            </div>
            <div>
              <dt className="eyebrow">Delivery</dt>
              <dd className="mt-1">Instant digital download</dd>
            </div>
          </dl>

          <div className="mt-6 flex flex-wrap gap-3">
            <Button
              size="lg"
              className="flex-1 min-w-[160px]"
              onClick={() => {
                addToCart(product.id);
                setCartOpen(true);
              }}
            >
              Add to Cart
            </Button>
            <Button size="lg" variant="outline" asChild className="flex-1 min-w-[140px]">
              <Link to="/checkout" onClick={() => addToCart(product.id)}>
                Buy Now
              </Link>
            </Button>
            <Button
              size="lg"
              variant="ghost"
              aria-pressed={saved}
              onClick={() => {
                toggleWishlist(product.id);
                toast(saved ? "Removed from wishlist" : "Saved to wishlist");
              }}
              aria-label="Save to wishlist"
            >
              <Heart className={cn("size-5", saved && "fill-primary text-primary")} />
            </Button>
          </div>

          <ul className="mt-6 space-y-2 text-sm text-muted-foreground">
            <li className="flex items-center gap-2">
              <Download className="size-4 text-primary" aria-hidden /> Digital product — no physical
              item will be shipped
            </li>
            <li className="flex items-center gap-2">
              <ShieldCheck className="size-4 text-primary" aria-hidden /> Secure checkout, instant
              access after payment
            </li>
          </ul>

          <Accordion type="single" collapsible className="mt-8" defaultValue="included">
            <AccordionItem value="included">
              <AccordionTrigger>What's Included</AccordionTrigger>
              <AccordionContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  {product.includedFiles.map((f) => (
                    <li key={f} className="flex items-start gap-2">
                      <Check className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden />
                      {f}
                    </li>
                  ))}
                </ul>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="sizes">
              <AccordionTrigger>Sizes & Formats</AccordionTrigger>
              <AccordionContent className="text-sm text-muted-foreground">
                Supplied as high-resolution {product.fileType} files in {product.sizes.join(", ")}.
                Print at 100% scale with page scaling turned off for accurate proportions.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="how">
              <AccordionTrigger>How It Works</AccordionTrigger>
              <AccordionContent>
                <ol className="list-decimal space-y-1.5 pl-5 text-sm text-muted-foreground">
                  <li>Purchase the product.</li>
                  <li>Download your files.</li>
                  <li>Print at home or through a professional printer.</li>
                  <li>Start planning.</li>
                </ol>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="important">
              <AccordionTrigger>Important Information</AccordionTrigger>
              <AccordionContent className="text-sm text-muted-foreground">
                This is a digital download. No physical item will be shipped. Files are for personal
                use and may be printed as many times as you like.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="printing">
              <AccordionTrigger>Printing Guide</AccordionTrigger>
              <AccordionContent className="text-sm text-muted-foreground">
                We recommend 100–120 gsm paper, 100% scale, and "flip on long edge" for double-sided
                printing. Slip trackers into a clear pocket to reuse them with a dry-erase pen.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>

      {related.length > 0 && (
        <section className="bg-cream py-14" aria-labelledby="related">
          <div className="container-monrea">
            <h2 id="related" className="font-serif text-2xl">You May Also Like</h2>
            <div className="mt-8 grid grid-cols-2 gap-x-5 gap-y-10 lg:grid-cols-4">
              {related.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="container-monrea py-14" aria-labelledby="complete">
        <h2 id="complete" className="font-serif text-2xl">Complete Your Planning System</h2>
        <div className="mt-8 grid grid-cols-2 gap-x-5 gap-y-10 lg:grid-cols-4">
          {complements.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>
    </div>
  );
}
