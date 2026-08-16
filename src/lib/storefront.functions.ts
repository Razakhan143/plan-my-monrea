import { createServerFn } from "@tanstack/react-start";
import { createClient } from "@supabase/supabase-js";
import { z } from "zod";
import type { Post, Product } from "@/data/catalog";

function publicClient() {
  const key = process.env["SUPABASE_PUBLISHABLE_KEY"]!;
  const url = process.env["SUPABASE_URL"]!;
  return createClient(url, key, {
    auth: { persistSession: false, autoRefreshToken: false },
    global: {
      fetch: (input, init) => {
        const headers = new Headers(init?.headers);
        if (key.startsWith("sb_") && headers.get("Authorization") === `Bearer ${key}`) {
          headers.delete("Authorization");
        }
        headers.set("apikey", key);
        return fetch(input, { ...init, headers });
      },
    },
  });
}

export const listProducts = createServerFn({ method: "GET" }).handler(async () => {
  const { data, error } = await publicClient()
    .from("products")
    .select("*")
    .eq("published", true)
    .order("sort_order", { ascending: true });
  if (error) throw new Error(error.message);
  return (data ?? []) as unknown as Product[];
});

export const listPosts = createServerFn({ method: "GET" }).handler(async () => {
  const { data, error } = await publicClient()
    .from("blog_posts")
    .select("*")
    .eq("published", true)
    .order("published_at", { ascending: false });
  if (error) throw new Error(error.message);
  return (data ?? []) as unknown as Post[];
});

export const getSettings = createServerFn({ method: "GET" }).handler(async () => {
  const { data, error } = await publicClient().from("site_settings").select("key, value");
  if (error) return {} as Record<string, string>;
  return Object.fromEntries((data ?? []).map((r) => [r.key as string, r.value as string]));
});

const emailSchema = z.object({ email: z.string().email() });

export const subscribeToNewsletter = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => emailSchema.parse(data))
  .handler(async ({ data }) => {
    const { error } = await publicClient()
      .from("newsletter_subscribers")
      .insert({ email: data.email.toLowerCase() });
    if (error && !error.message.includes("duplicate")) {
      return { ok: false as const, message: "We couldn't save that address." };
    }
    return { ok: true as const, message: "You're on the list." };
  });

const messageSchema = z.object({
  name: z.string().min(1).max(120),
  email: z.string().email(),
  subject: z.string().max(160).default(""),
  message: z.string().min(1).max(4000),
});

export const sendContactMessage = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => messageSchema.parse(data))
  .handler(async ({ data }) => {
    const { error } = await publicClient().from("contact_messages").insert(data);
    if (error) return { ok: false as const, message: "Your message couldn't be sent." };
    return { ok: true as const, message: "Thanks — we'll be in touch by email." };
  });
