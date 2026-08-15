import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Download, HeartHandshake, Printer, Sparkles, Layers } from "lucide-react";
import heroImg from "@/assets/hero-planners.jpg";
import { Button } from "@/components/ui/button";
import { CategoryCard } from "@/components/site/CategoryCard";
import { ProductCard } from "@/components/site/ProductCard";
import { BundleCard } from "@/components/site/BundleCard";
import { allItems, bundles, categories, intents, posts, products } from "@/data/catalog";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Monrea Prints — Printable Planners, Trackers & Journals" },
      {
        name: "description",
        content:
          "Thoughtfully designed printable planners, habit trackers, budget pages and journals. Instant digital downloads for a calmer, more organized life.",
      },
      { property: "og:title", content: "Monrea Prints — Printable Planners & Trackers" },
      {
        property: "og:description",
        content:
          "Printable planners, trackers and journals designed for organized, intentional living. Instant digital download.",
      },
    ],
  }),
  component: Home,
});

const featured = allItems.filter((p) => p.featured && !p.isBundle).slice(0, 8);
const bestsellers = products.filter((p) => p.bestseller || p.isNew).slice(0, 4);

const why = [
  { icon: Sparkles, title: "Thoughtfully Designed", copy: "Every printable is designed with usability and clarity in mind." },
  { icon: Printer, title: "Easy to Print", copy: "Digital files sized for convenient home or professional printing." },
  { icon: Layers, title: "Practical & Beautiful", copy: "Useful planning tools without sacrificing aesthetics." },
  { icon: HeartHandshake, title: "Designed for Real Life", copy: "Pages for routines, goals, work, wellness and finances." },
  { icon: Download, title: "Instant Digital Access", copy: "Download your files right away — nothing is shipped." },
];

function Home() {
  return (
    <>
      <section className="border-b border-border/70 bg-cream">
        <div className="container-monrea grid items-center gap-10 py-14 lg:grid-cols-[1fr_1.05fr] lg:gap-16 lg:py-24">
          <div className="reveal">
            <p className="eyebrow">Digital printables · Instant access</p>
            <h1 className="mt-4 font-serif text-4xl leading-[1.08] sm:text-5xl lg:text-6xl">
              Plan Your Life.
              <br />
              Simplify Your Everyday.
            </h1>
            <p className="mt-5 max-w-xl text-[15px] leading-relaxed text-muted-foreground">
              Discover thoughtfully designed planners, trackers, journals, and printable tools
              created to help you organize your days, build better habits, manage your goals, and
              make space for what matters.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild size="lg" className="px-7">
                <Link to="/shop">Shop Printables</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="px-7">
                <Link to="/bundles">Explore Bundles</Link>
              </Button>
            </div>
            <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-xs text-muted-foreground">
              <li>Digital product</li>
              <li aria-hidden>·</li>
              <li>No physical item shipped</li>
              <li aria-hidden>·</li>
              <li>A4, Letter & A5 sizes</li>
            </ul>
          </div>
          <div className="overflow-hidden rounded-md border border-border/70 bg-background shadow-paper">
            <img
              src={heroImg}
              alt="A composition of minimalist Monrea Prints printable planner pages on a warm ivory surface"
              width={1408}
              height={1104}
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      </section>

      <section className="section-y" aria-labelledby="categories-title">
        <div className="container-monrea">
          <SectionHead
            eyebrow="Categories"
            title="Find Your Planning Space"
            id="categories-title"
            action={{ to: "/categories", label: "All categories" }}
          />
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {categories.map((c) => (
              <CategoryCard key={c.slug} category={c} />
            ))}
          </div>
        </div>
      </section>

      <section className="section-y bg-cream" aria-labelledby="featured-title">
        <div className="container-monrea">
          <SectionHead
            eyebrow="Featured"
            title="Made for Your Everyday"
            id="featured-title"
            action={{ to: "/shop", label: "Shop all" }}
          />
          <div className="mt-10 grid grid-cols-2 gap-x-5 gap-y-10 lg:grid-cols-4">
            {featured.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      </section>

      <section className="section-y" aria-labelledby="intent-title">
        <div className="container-monrea">
          <SectionHead eyebrow="Start here" title="What Are You Working On?" id="intent-title" />
          <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {intents.map((intent) => (
              <Link
                key={intent.label}
                to="/categories/$slug"
                params={{ slug: intent.category }}
                className="group flex items-center justify-between rounded-md border border-border/70 bg-card px-5 py-4 text-sm transition-all hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-paper"
              >
                {intent.label}
                <ArrowRight className="size-4 text-muted-foreground transition-transform group-hover:translate-x-1 group-hover:text-primary" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section-y bg-cream" aria-labelledby="bundles-title">
        <div className="container-monrea">
          <div className="max-w-2xl">
            <p className="eyebrow">Bundles</p>
            <h2 id="bundles-title" className="mt-3 font-serif text-3xl lg:text-4xl">
              More Pages. More Possibilities.
            </h2>
            <p className="mt-4 text-[15px] leading-relaxed text-muted-foreground">
              Build your complete planning system with thoughtfully curated printable bundles
              designed around the way you actually live and work.
            </p>
          </div>
          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {bundles.slice(0, 2).map((b) => (
              <BundleCard key={b.id} bundle={b} />
            ))}
          </div>
          <div className="mt-8">
            <Button asChild variant="outline">
              <Link to="/bundles">Explore Bundles</Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="section-y" aria-labelledby="why-title">
        <div className="container-monrea">
          <SectionHead eyebrow="Why Monrea Prints" title="Planning Should Feel Simple." id="why-title" />
          <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-5">
            {why.map(({ icon: Icon, title, copy }) => (
              <div key={title}>
                <Icon className="size-5 text-primary" aria-hidden />
                <h3 className="mt-3.5 font-serif text-lg">{title}</h3>
                <p className="mt-1.5 text-[13px] leading-relaxed text-muted-foreground">{copy}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-y bg-cream" aria-labelledby="best-title">
        <div className="container-monrea">
          <SectionHead
            eyebrow="Bestsellers & new arrivals"
            title="Loved & Newly Added"
            id="best-title"
            action={{ to: "/shop", label: "See everything" }}
          />
          <div className="mt-10 grid grid-cols-2 gap-x-5 gap-y-10 lg:grid-cols-4">
            {bestsellers.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      </section>

      <section className="section-y" aria-labelledby="journal-title">
        <div className="container-monrea">
          <SectionHead
            eyebrow="The Planning Journal"
            title="Ideas for a Simpler System"
            id="journal-title"
            action={{ to: "/blog", label: "Read the journal" }}
          />
          <div className="mt-10 grid gap-8 md:grid-cols-3">
            {posts.slice(0, 3).map((post) => (
              <article key={post.slug} className="group">
                <Link to="/blog/$slug" params={{ slug: post.slug }} className="block overflow-hidden rounded-md bg-cream">
                  <img
                    src={post.image}
                    alt={`Illustration for ${post.title}`}
                    loading="lazy"
                    width={900}
                    height={600}
                    className="aspect-[3/2] w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </Link>
                <p className="eyebrow mt-4">{post.category}</p>
                <h3 className="mt-2 font-serif text-xl leading-snug">
                  <Link to="/blog/$slug" params={{ slug: post.slug }} className="hover:text-primary">
                    {post.title}
                  </Link>
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{post.excerpt}</p>
                <p className="mt-3 text-xs text-muted-foreground">
                  {new Date(post.date).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })} · {post.readingTime}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

function SectionHead({
  eyebrow,
  title,
  id,
  action,
}: {
  eyebrow: string;
  title: string;
  id: string;
  action?: { to: string; label: string };
}) {
  return (
    <div className="flex flex-wrap items-end justify-between gap-4">
      <div>
        <p className="eyebrow">{eyebrow}</p>
        <h2 id={id} className="mt-3 font-serif text-3xl lg:text-4xl">
          {title}
        </h2>
      </div>
      {action && (
        <Link
          to={action.to}
          className="inline-flex items-center gap-1.5 text-xs tracking-[0.12em] uppercase text-primary hover:underline underline-offset-4"
        >
          {action.label}
          <ArrowRight className="size-3.5" />
        </Link>
      )}
    </div>
  );
}
