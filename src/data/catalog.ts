import wellnessImg from "@/assets/mock-wellness.jpg";
import planningImg from "@/assets/mock-planning.jpg";
import habitsImg from "@/assets/mock-habits.jpg";
import financeImg from "@/assets/mock-finance.jpg";
import notesImg from "@/assets/mock-notes.jpg";
import travelImg from "@/assets/mock-travel.jpg";
import businessImg from "@/assets/mock-business.jpg";
import bundleImg from "@/assets/bundle-cover.jpg";

/**
 * Categories are a fixed taxonomy held in code.
 * Products, journal posts and site settings live in the database and are
 * managed from the admin panel at /admin.
 */

export type CategorySlug =
  | "wellness-health"
  | "planning"
  | "goals-habits"
  | "notes-logs"
  | "lifestyle-travel"
  | "budget-finance"
  | "business-work";

export const imageKeys = [
  "wellness",
  "planning",
  "habits",
  "finance",
  "notes",
  "travel",
  "business",
  "bundle",
] as const;

export type ImageKey = (typeof imageKeys)[number];

const images: Record<ImageKey, string> = {
  wellness: wellnessImg,
  planning: planningImg,
  habits: habitsImg,
  finance: financeImg,
  notes: notesImg,
  travel: travelImg,
  business: businessImg,
  bundle: bundleImg,
};

export const imageFor = (key: string | null | undefined) =>
  images[(key ?? "planning") as ImageKey] ?? planningImg;

export interface Product {
  id: string;
  name: string;
  slug: string;
  category: string;
  subcategory: string;
  short_description: string;
  description: string;
  price: number;
  sale_price: number | null;
  image_key: string;
  file_type: string;
  page_count: number;
  sizes: string[];
  included_files: string[];
  tags: string[];
  featured: boolean;
  bestseller: boolean;
  is_new: boolean;
  is_bundle: boolean;
  bundle_value: number | null;
  published: boolean;
  sort_order: number;
}

export interface Post {
  id: string;
  title: string;
  slug: string;
  category: string;
  excerpt: string;
  body: string;
  reading_time: string;
  image_key: string;
  published: boolean;
  published_at: string;
}

export interface Category {
  slug: CategorySlug;
  name: string;
  shortName: string;
  description: string;
  intro: string;
  image: string;
  subcategories: string[];
  seoTitle: string;
  seoDescription: string;
}

export const categories: Category[] = [
  {
    slug: "wellness-health",
    name: "Wellness, Diet & Health",
    shortName: "Wellness & Self-Care",
    description:
      "Tools for health, fitness, meals, hydration, sleep, gratitude, and self-care.",
    intro:
      "Gentle, structured pages that make looking after yourself feel achievable — track movement, meals, water, rest and reflection without turning wellbeing into another chore.",
    image: wellnessImg,
    subcategories: ["Fitness", "Meals", "Hydration", "Sleep", "Self-Care", "Health Logs"],
    seoTitle: "Printable Wellness Planner Pages & Health Trackers",
    seoDescription:
      "Printable wellness planner pages: fitness planners, meal planners, water and sleep trackers, gratitude and self-care journals. Instant digital download.",
  },
  {
    slug: "planning",
    name: "Daily to Yearly Planning",
    shortName: "Planning & Organization",
    description: "Daily, weekly, monthly, and yearly planning tools.",
    intro:
      "The backbone of your system. Daily pages for focus, weekly spreads for rhythm, monthly and yearly views for perspective — all in one calm, consistent layout language.",
    image: planningImg,
    subcategories: ["Daily", "Weekly", "Monthly", "Yearly", "Undated"],
    seoTitle: "Printable Planner Pages — Daily, Weekly & Monthly",
    seoDescription:
      "Minimalist printable planner pages for daily, weekly, monthly and yearly planning. Undated, print-at-home PDF files with instant digital access.",
  },
  {
    slug: "goals-habits",
    name: "Goals, Habits & Tasks",
    shortName: "Goals & Habits",
    description: "Goal-setting, habit tracking, routines, and task management.",
    intro:
      "Turn intentions into repeatable action. Break big goals into steps, build routines you'll actually keep, and see your progress on a single page.",
    image: habitsImg,
    subcategories: ["Habit Trackers", "Goal Setting", "Routines", "Task Lists"],
    seoTitle: "Printable Habit Tracker & Goal Setting Pages",
    seoDescription:
      "Printable habit tracker and goal tracker pages, routine builders and task lists designed for steady, realistic progress. Instant download.",
  },
  {
    slug: "notes-logs",
    name: "Notes, Logs & Dashboards",
    shortName: "Notes & Logs",
    description: "Notes, records, dashboards, trackers, and logs.",
    intro:
      "Somewhere for everything else. Dot grids, structured note pages, records and at-a-glance dashboards to keep the loose ends of life in one place.",
    image: notesImg,
    subcategories: ["Note Pages", "Dashboards", "Logs", "Records"],
    seoTitle: "Printable Note Pages, Logs & Planner Dashboards",
    seoDescription:
      "Printable note pages, dot grid sheets, logs and planner dashboards for keeping records tidy and easy to scan. Digital download.",
  },
  {
    slug: "lifestyle-travel",
    name: "Lifestyle, Travel & Rest",
    shortName: "Lifestyle & Travel",
    description: "Travel planning, lifestyle organization, rest, and personal planning.",
    intro:
      "For the parts of life that aren't work. Trip itineraries, packing lists, slow-weekend pages and simple tools for making room to rest.",
    image: travelImg,
    subcategories: ["Travel", "Packing", "Home", "Rest & Reset"],
    seoTitle: "Printable Travel Planner & Lifestyle Organization Pages",
    seoDescription:
      "Printable travel planner pages, packing lists, itineraries and lifestyle organization sheets for trips and slower days. Instant digital download.",
  },
  {
    slug: "budget-finance",
    name: "Budgeting & Finance",
    shortName: "Budget & Finance",
    description: "Budgeting, savings, expenses, financial tracking, and money organization.",
    intro:
      "Clear, unintimidating money pages. Monthly budgets, expense logs, savings challenges and debt payoff trackers that show you exactly where things stand.",
    image: financeImg,
    subcategories: ["Monthly Budget", "Expenses", "Savings", "Debt Payoff", "Bills"],
    seoTitle: "Printable Budget Planner & Expense Tracker Pages",
    seoDescription:
      "Printable budget planner pages, expense trackers, savings challenges and bill logs to organize your money month by month. Digital download.",
  },
  {
    slug: "business-work",
    name: "Business & Work Planning",
    shortName: "Business & Work",
    description: "Work planning, business organization, project planning, and productivity.",
    intro:
      "Structure for the working week. Project plans, client trackers, content calendars and productivity pages for entrepreneurs and busy professionals.",
    image: businessImg,
    subcategories: ["Projects", "Clients", "Content", "Productivity", "Study"],
    seoTitle: "Printable Business Planner & Productivity Pages",
    seoDescription:
      "Printable business planner and productivity pages: project plans, client trackers, content calendars and weekly work reviews. Instant download.",
  },
];

export const getCategory = (slug: string) => categories.find((c) => c.slug === slug);

export const effectivePrice = (p: Product) => Number(p.sale_price ?? p.price);
export const formatPrice = (n: number) =>
  Number(n).toLocaleString("en-US", { style: "currency", currency: "USD" });

export interface Intent {
  label: string;
  category: CategorySlug;
}

export const intents: Intent[] = [
  { label: "Getting Organized", category: "planning" },
  { label: "Building Better Habits", category: "goals-habits" },
  { label: "Improving Wellness", category: "wellness-health" },
  { label: "Managing Money", category: "budget-finance" },
  { label: "Planning My Goals", category: "goals-habits" },
  { label: "Organizing Work", category: "business-work" },
  { label: "Planning a Trip", category: "lifestyle-travel" },
  { label: "Making Time for Myself", category: "wellness-health" },
];

export const DEFAULT_ANNOUNCEMENT =
  "Digital printables designed for planning, organizing & intentional living.";

export const postDate = (value: string) =>
  new Date(value).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
