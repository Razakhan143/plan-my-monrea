import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/legal")({
  head: () => ({
    meta: [
      { title: "Policies — Privacy, Terms, Refunds & License | Monrea Prints" },
      {
        name: "description",
        content:
          "Monrea Prints policies: privacy, terms and conditions, refund policy and the digital product license for printable planner files.",
      },
      { property: "og:title", content: "Monrea Prints Policies" },
      { property: "og:description", content: "Privacy, terms, refunds and digital product license." },
    ],
  }),
  component: Legal,
});

const sections = [
  {
    title: "Privacy Policy",
    body: "We collect only the information needed to deliver your digital files and respond to support requests — your name, email address and order details. We don't sell personal data. Analytics and email tooling are added only where they help run the shop.",
  },
  {
    title: "Terms & Conditions",
    body: "By purchasing from Monrea Prints you agree that all products are digital files delivered electronically, that prices are shown in USD, and that product previews are representative of the files you receive.",
  },
  {
    title: "Refund Policy",
    body: "Because files are delivered instantly, digital products are generally non-refundable. If a file is faulty, incomplete or materially different from its description, contact us and we'll correct it or issue a refund.",
  },
  {
    title: "Digital Product License",
    body: "Your purchase includes a personal-use license: print as many copies as you like for yourself and your household. Files may not be resold, shared, redistributed, or used commercially without a separate license.",
  },
];

function Legal() {
  return (
    <div className="container-monrea py-12 lg:py-16">
      <header className="max-w-2xl">
        <p className="eyebrow">Legal</p>
        <h1 className="mt-3 font-serif text-4xl lg:text-5xl">Policies</h1>
        <p className="mt-4 text-[15px] leading-relaxed text-muted-foreground">
          Plain-language policies for a digital-product shop. Review these with a professional
          before selling in your region.
        </p>
      </header>

      <div className="mt-12 max-w-3xl space-y-10">
        {sections.map((s) => (
          <section key={s.title}>
            <h2 className="font-serif text-2xl">{s.title}</h2>
            <p className="mt-3 text-[15px] leading-relaxed text-muted-foreground">{s.body}</p>
          </section>
        ))}
      </div>
    </div>
  );
}
