import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { getPost, posts } from "@/data/catalog";

export const Route = createFileRoute("/blog/$slug")({
  loader: ({ params }) => {
    const post = getPost(params.slug);
    if (!post) throw notFound();
    return { post };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return { meta: [{ title: "Article not found — Monrea Prints" }, { name: "robots", content: "noindex" }] };
    }
    const { post } = loaderData;
    return {
      meta: [
        { title: `${post.title} — Monrea Prints` },
        { name: "description", content: post.excerpt },
        { property: "og:title", content: post.title },
        { property: "og:description", content: post.excerpt },
        { property: "og:type", content: "article" },
      ],
    };
  },
  component: Article,
});

function Article() {
  const { post } = Route.useLoaderData();
  const more = posts.filter((p) => p.slug !== post.slug).slice(0, 2);

  return (
    <article className="container-monrea py-12 lg:py-16">
      <div className="mx-auto max-w-2xl">
        <p className="eyebrow">{post.category}</p>
        <h1 className="mt-3 font-serif text-4xl leading-tight">{post.title}</h1>
        <p className="mt-3 text-xs text-muted-foreground">
          {new Date(post.date).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })} · {post.readingTime}
        </p>
        <img
          src={post.image}
          alt={`Illustration for ${post.title}`}
          loading="lazy"
          width={1200}
          height={800}
          className="mt-8 aspect-[3/2] w-full rounded-md object-cover"
        />
        <div className="mt-8 space-y-5 text-[15px] leading-[1.75] text-foreground/85">
          {post.body.map((para, i) => (
            <p key={i}>{para}</p>
          ))}
        </div>

        <hr className="my-12 border-border" />

        <h2 className="font-serif text-2xl">Keep reading</h2>
        <ul className="mt-5 space-y-3">
          {more.map((p) => (
            <li key={p.slug}>
              <Link to="/blog/$slug" params={{ slug: p.slug }} className="hover:text-primary">
                {p.title}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
}
