import { useState, type FormEvent } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function Newsletter() {
  const [email, setEmail] = useState("");

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    toast("Almost there", {
      description:
        "Newsletter signup isn't connected to an email service yet — connect one to start collecting subscribers.",
    });
    setEmail("");
  }

  return (
    <section className="container-monrea py-14 lg:py-20" aria-labelledby="newsletter-title">
      <div className="mx-auto max-w-xl text-center">
        <p className="eyebrow">Plan intentionally. Live fully.</p>
        <h2 id="newsletter-title" className="mt-3 font-serif text-3xl lg:text-4xl">
          Make space for what matters.
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
          Get planning tips, new product releases, and occasional Monrea inspiration.
        </p>
        <form onSubmit={onSubmit} className="mt-6 flex flex-col gap-3 sm:flex-row">
          <label htmlFor="newsletter-email" className="sr-only">
            Email address
          </label>
          <Input
            id="newsletter-email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            className="h-11 bg-background"
          />
          <Button type="submit" className="h-11 px-7">
            Subscribe
          </Button>
        </form>
      </div>
    </section>
  );
}
