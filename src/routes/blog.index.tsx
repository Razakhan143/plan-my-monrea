import { createFileRoute, Link } from "@tanstack/react-router";
import { posts } from "@/data/catalog";

export const Route = createFileRoute("/blog/")({
  head: () => ({
    meta: [
      { title: "The Planning Journal — Monrea Prints" },
      {
        name: "description",
        content:
          "Planning tips, productivity ideas, organization guides and printable-friendly routines from the Monrea Prints Planning Journal.",
      },
      { property: "og:title", content: "The Planning Journal — Monrea Prints" },
      {
        property: "og:description",
        content: "Practical writing on planning, habits, organization and budgeting.",
      },
    ],
  }),
  component: Blog,
});

function Blog() {
  return (
    <div className="container-monrea py-12 lg:py-16">
      <header className="max-w-2xl">
        <p className="eyebrow">Journal</p>
        <h1 className="mt-3 font-serif text-4xl lg:text-5xl">The Planning Journal</h1>
        <p className="mt-4 text-[15px] leading-relaxed text-muted-foreground">
          Short, practical writing on planning, habits, organization and money — the thinking behind
          the pages we design.
        </p>
      </header>

      <div className="mt-12 grid gap-10 md:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
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
            <h2 className="mt-2 font-serif text-xl leading-snug">
              <Link to="/blog/$slug" params={{ slug: post.slug }} className="hover:text-primary">
                {post.title}
              </Link>
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{post.excerpt}</p>
            <p className="mt-3 text-xs text-muted-foreground">
              {new Date(post.date).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })} · {post.readingTime}
            </p>
          </article>
        ))}
      </div>
    </div>
  );
}
