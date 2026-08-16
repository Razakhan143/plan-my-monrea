import { createFileRoute } from "@tanstack/react-router";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export const Route = createFileRoute("/faq")({
  head: () => ({
    meta: [
      { title: "FAQ — Downloads, Printing & Digital Products | Monrea Prints" },
      {
        name: "description",
        content:
          "Answers about Monrea Prints digital downloads, printing your planner pages, refunds, licensing and technical help.",
      },
      { property: "og:title", content: "Monrea Prints FAQ" },
      {
        property: "og:description",
        content: "Downloads, printing, refunds, licensing and technical help.",
      },
    ],
  }),
  component: Faq,
});

const groups: { title: string; items: [string, string][] }[] = [
  {
    title: "Orders & Downloads",
    items: [
      ["How do I receive my files?", "Download links appear on your order confirmation page and in your account area straight after checkout."],
      ["Can I download more than once?", "Yes. Your files stay available in your account so you can re-download any time."],
      ["I didn't receive my download", "Check your spam folder first, then contact us with your order number and we'll resend it."],
    ],
  },
  {
    title: "Printing",
    items: [
      ["What paper should I use?", "100–120 gsm works best — heavy enough to prevent ink showing through."],
      ["What print settings?", "Print at 100% scale with page scaling off. For double-sided pages use 'flip on long edge'."],
      ["Can I print at a print shop?", "Yes. The PDFs are high resolution and suitable for professional printing."],
    ],
  },
  {
    title: "Digital Products",
    items: [
      ["Is anything shipped?", "No. Every product is a digital download — no physical item will be shipped."],
      ["What's included?", "Each product page lists the exact files, page count and printable sizes included."],
      ["Do the planners have dates?", "Most are undated so you can print only the pages you need, whenever you need them."],
    ],
  },
  {
    title: "Refunds",
    items: [
      ["Can I return a digital file?", "Because files are delivered instantly, digital products are generally non-refundable."],
      ["What if there's a problem with a file?", "Contact us — if a file is faulty or doesn't match its description, we'll fix or refund it."],
    ],
  },
  {
    title: "Licensing & Personal Use",
    items: [
      ["Can I print for my family?", "Yes, personal household use is fine."],
      ["Can I resell or share files?", "No. Files are for personal use only and may not be resold, shared or redistributed."],
      ["Can I use them commercially?", "Commercial use isn't included. Contact us for licensing enquiries."],
    ],
  },
  {
    title: "Technical Issues",
    items: [
      ["The PDF won't open", "Use a current PDF reader such as Adobe Acrobat Reader, then try downloading again."],
      ["The layout prints too small", "Turn off 'fit to page' and print at 100% scale."],
      ["Can I use these on a tablet?", "Yes, the PDFs can be imported into most note-taking apps."],
    ],
  },
];

function Faq() {
  return (
    <div className="container-monrea py-12 lg:py-16">
      <header className="max-w-2xl">
        <p className="eyebrow">Help</p>
        <h1 className="mt-3 font-serif text-4xl lg:text-5xl">Frequently Asked Questions</h1>
        <p className="mt-4 text-[15px] leading-relaxed text-muted-foreground">
          Everything about downloading, printing and using your Monrea Prints files.
        </p>
      </header>

      <div className="mt-12 grid gap-12 lg:grid-cols-2">
        {groups.map((group) => (
          <section key={group.title} aria-labelledby={group.title}>
            <h2 id={group.title} className="font-serif text-2xl">
              {group.title}
            </h2>
            <Accordion type="single" collapsible className="mt-4">
              {group.items.map(([q, a]) => (
                <AccordionItem key={q} value={q}>
                  <AccordionTrigger className="text-left">{q}</AccordionTrigger>
                  <AccordionContent className="text-sm leading-relaxed text-muted-foreground">
                    {a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </section>
        ))}
      </div>
    </div>
  );
}
