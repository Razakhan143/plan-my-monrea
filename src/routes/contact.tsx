import { createFileRoute } from "@tanstack/react-router";
import type { FormEvent } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact Monrea Prints — Help with Downloads & Orders" },
      {
        name: "description",
        content:
          "Questions about your printable download, printing or an order? Send the Monrea Prints team a message and find quick answers in our FAQ.",
      },
      { property: "og:title", content: "Contact Monrea Prints" },
      { property: "og:description", content: "Get help with downloads, printing and orders." },
    ],
  }),
  component: Contact,
});

const faqs = [
  ["How do digital downloads work?", "After checkout you receive download links for your files, plus access from your account area. Nothing is shipped."],
  ["Do you ship physical products?", "No. Every Monrea Prints product is a digital printable file."],
  ["What file formats are included?", "High-resolution print-ready PDFs, sized for standard home and professional printers."],
  ["What paper sizes are supported?", "A4, US Letter and A5 are included with every product."],
  ["Can I print the files multiple times?", "Yes — print as many copies as you like for your own personal use."],
  ["Where can I get help with my order?", "Use the form on this page and we'll get back to you by email."],
];

function Contact() {
  function onSubmit(e: FormEvent) {
    e.preventDefault();
    toast("Message form isn't connected yet", {
      description: "Connect an email service to start receiving these messages.",
    });
  }

  return (
    <div className="container-monrea py-12 lg:py-16">
      <header className="max-w-2xl">
        <p className="eyebrow">Contact</p>
        <h1 className="mt-3 font-serif text-4xl lg:text-5xl">We're happy to help.</h1>
        <p className="mt-4 text-[15px] leading-relaxed text-muted-foreground">
          Questions about a download, printing, or an order? Send a note and we'll reply by email.
        </p>
      </header>

      <div className="mt-12 grid gap-12 lg:grid-cols-2">
        <form onSubmit={onSubmit} className="space-y-5">
          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <Label htmlFor="name">Name</Label>
              <Input id="name" required autoComplete="name" className="mt-2 h-11 bg-background" />
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" required autoComplete="email" className="mt-2 h-11 bg-background" />
            </div>
          </div>
          <div>
            <Label htmlFor="subject">Subject</Label>
            <Input id="subject" required className="mt-2 h-11 bg-background" />
          </div>
          <div>
            <Label htmlFor="message">Message</Label>
            <Textarea id="message" required rows={6} className="mt-2 bg-background" />
          </div>
          <Button type="submit">Send message</Button>
        </form>

        <section aria-labelledby="contact-faq">
          <h2 id="contact-faq" className="font-serif text-2xl">
            Quick answers
          </h2>
          <Accordion type="single" collapsible className="mt-5">
            {faqs.map(([q, a]) => (
              <AccordionItem key={q} value={q}>
                <AccordionTrigger className="text-left">{q}</AccordionTrigger>
                <AccordionContent className="text-sm text-muted-foreground">{a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </section>
      </div>
    </div>
  );
}
