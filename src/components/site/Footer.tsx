import { Link } from "@tanstack/react-router";
import { Newsletter } from "./Newsletter";

const columns = [
  {
    title: "Shop",
    links: [
      { label: "All Products", to: "/shop" },
      { label: "Bundles", to: "/bundles" },
      { label: "Wellness", to: "/categories/wellness-health" },
      { label: "Planning", to: "/categories/planning" },
      { label: "Goals & Habits", to: "/categories/goals-habits" },
      { label: "Finance", to: "/categories/budget-finance" },
      { label: "Business & Work", to: "/categories/business-work" },
    ],
  },
  {
    title: "Help",
    links: [
      { label: "FAQ", to: "/faq" },
      { label: "Contact", to: "/contact" },
      { label: "Download Help", to: "/faq" },
      { label: "Printing Guide", to: "/faq" },
    ],
  },
  {
    title: "About",
    links: [
      { label: "About Monrea Prints", to: "/about" },
      { label: "Planning Journal", to: "/blog" },
      { label: "My Account", to: "/account" },
      { label: "Wishlist", to: "/wishlist" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy Policy", to: "/legal" },
      { label: "Terms & Conditions", to: "/legal" },
      { label: "Refund Policy", to: "/legal" },
      { label: "Digital Product License", to: "/legal" },
    ],
  },
] as const;

const socials = ["Pinterest", "Instagram", "Facebook", "TikTok"];

export function Footer() {
  return (
    <footer className="mt-8 border-t border-border bg-cream">
      <Newsletter />
      <div className="container-monrea grid gap-10 border-t border-border/70 py-14 sm:grid-cols-2 lg:grid-cols-5">
        <div className="lg:pr-8">
          <p className="font-serif text-xl">Monrea Prints</p>
          <p className="mt-3 max-w-xs text-sm leading-relaxed text-muted-foreground">
            Beautiful tools for a more organized life. Printable planners, trackers and journals,
            delivered as instant digital downloads.
          </p>
          <ul className="mt-5 flex flex-wrap gap-x-4 gap-y-2">
            {socials.map((s) => (
              <li key={s}>
                <a
                  href="#"
                  aria-label={`Monrea Prints on ${s} (coming soon)`}
                  className="text-xs tracking-wide text-muted-foreground underline-offset-4 hover:text-primary hover:underline"
                >
                  {s}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {columns.map((col) => (
          <nav key={col.title} aria-label={col.title}>
            <h2 className="eyebrow font-sans">{col.title}</h2>
            <ul className="mt-4 space-y-2.5">
              {col.links.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.to}
                    className="text-sm text-foreground/75 transition-colors hover:text-primary"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        ))}
      </div>
      <div className="container-monrea flex flex-col gap-2 border-t border-border/70 py-6 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
        <p>© {new Date().getFullYear()} Monrea Prints. All rights reserved.</p>
        <p>Digital products only — no physical item will be shipped.</p>
      </div>
    </footer>
  );
}
