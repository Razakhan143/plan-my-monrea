import { createFileRoute, Link } from "@tanstack/react-router";
import { Download } from "lucide-react";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/order-confirmation")({
  head: () => ({
    meta: [
      { title: "Order Confirmation — Monrea Prints" },
      {
        name: "description",
        content: "Your Monrea Prints order confirmation and digital download links.",
      },
      { property: "og:title", content: "Order Confirmation — Monrea Prints" },
      { property: "og:description", content: "Download your printable planner files." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: OrderConfirmation,
});

function OrderConfirmation() {
  return (
    <div className="container-monrea py-14 lg:py-20">
      <div className="mx-auto max-w-2xl">
        <p className="eyebrow">Order confirmation</p>
        <h1 className="mt-3 font-serif text-4xl">Your order is ready.</h1>
        <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
          This page is the delivery screen customers see after a successful payment. It's built and
          ready — download links appear here once payments and file delivery are connected.
        </p>

        <div className="mt-10 rounded-md border border-border bg-card p-6">
          <dl className="grid gap-4 text-sm sm:grid-cols-3">
            <div>
              <dt className="eyebrow">Order number</dt>
              <dd className="mt-1">—</dd>
            </div>
            <div>
              <dt className="eyebrow">Purchase date</dt>
              <dd className="mt-1">—</dd>
            </div>
            <div>
              <dt className="eyebrow">Delivery</dt>
              <dd className="mt-1">Instant download</dd>
            </div>
          </dl>

          <div className="mt-6 rounded-md border border-dashed border-border bg-cream p-5">
            <p className="flex items-center gap-2 text-sm text-muted-foreground">
              <Download className="size-4 text-primary" aria-hidden />
              Purchased files will be listed here, each with its own download button and file
              details (format, size, page count).
            </p>
          </div>

          <ol className="mt-6 list-decimal space-y-1.5 pl-5 text-sm text-muted-foreground">
            <li>Download your files to a device you can print from.</li>
            <li>Print at 100% scale on 100–120 gsm paper.</li>
            <li>Re-download any time from your account.</li>
          </ol>
        </div>

        <div className="mt-8 flex flex-wrap gap-3">
          <Button asChild>
            <Link to="/account">Go to My Downloads</Link>
          </Button>
          <Button asChild variant="outline">
            <Link to="/shop">Continue Shopping</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
