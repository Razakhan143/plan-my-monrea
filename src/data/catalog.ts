import wellnessImg from "@/assets/mock-wellness.jpg";
import planningImg from "@/assets/mock-planning.jpg";
import habitsImg from "@/assets/mock-habits.jpg";
import financeImg from "@/assets/mock-finance.jpg";
import notesImg from "@/assets/mock-notes.jpg";
import travelImg from "@/assets/mock-travel.jpg";
import businessImg from "@/assets/mock-business.jpg";
import bundleImg from "@/assets/bundle-cover.jpg";

export type CategorySlug =
  | "wellness-health"
  | "planning"
  | "goals-habits"
  | "notes-logs"
  | "lifestyle-travel"
  | "budget-finance"
  | "business-work";

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

export interface Product {
  id: string;
  name: string;
  slug: string;
  category: CategorySlug;
  subcategory: string;
  shortDescription: string;
  description: string;
  price: number;
  salePrice?: number;
  images: string[];
  previewImages: string[];
  fileType: string;
  pageCount: number;
  sizes: string[];
  includedFiles: string[];
  tags: string[];
  featured?: boolean;
  bestseller?: boolean;
  isNew?: boolean;
  isBundle?: boolean;
  bundleContents?: string[];
  bundleValue?: number;
  relatedProducts?: string[];
}

export const ANNOUNCEMENT =
  "Digital printables designed for planning, organizing & intentional living.";

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

const base = {
  fileType: "PDF",
  sizes: ["A4", "US Letter", "A5"],
};

export const products: Product[] = [
  {
    id: "p-001",
    name: "Weekly Fitness Planner",
    slug: "weekly-fitness-planner",
    category: "wellness-health",
    subcategory: "Fitness",
    shortDescription: "Plan a realistic week of movement, sets and rest days.",
    description:
      "A calm weekly layout for planning workouts, tracking sets and reps, and scheduling rest. Designed with generous writing space so a full week fits on one page without feeling cramped.",
    price: 6,
    salePrice: 4.5,
    images: [wellnessImg],
    previewImages: [wellnessImg, planningImg, habitsImg],
    fileType: base.fileType,
    pageCount: 4,
    sizes: base.sizes,
    includedFiles: ["Weekly Fitness Planner (A4)", "Weekly Fitness Planner (Letter)", "A5 version", "Printing guide"],
    tags: ["fitness", "workout", "wellness", "weekly"],
    featured: true,
    bestseller: true,
    relatedProducts: ["p-002", "p-004", "p-003"],
  },
  {
    id: "p-002",
    name: "Monthly Meal Planner",
    slug: "monthly-meal-planner",
    category: "wellness-health",
    subcategory: "Meals",
    shortDescription: "A month of meals mapped out, with a matching grocery list.",
    description:
      "Plan breakfasts, lunches and dinners across a full month, then carry it straight into the included grocery list. Ideal for reducing weeknight decisions and food waste.",
    price: 7,
    images: [planningImg],
    previewImages: [planningImg, notesImg],
    fileType: base.fileType,
    pageCount: 6,
    sizes: base.sizes,
    includedFiles: ["Monthly meal grid", "Weekly meal page", "Grocery list", "Recipe template"],
    tags: ["meal planner", "grocery", "food", "monthly"],
    featured: true,
    relatedProducts: ["p-001", "p-003", "p-014"],
  },
  {
    id: "p-003",
    name: "Water & Hydration Tracker",
    slug: "water-hydration-tracker",
    category: "wellness-health",
    subcategory: "Hydration",
    shortDescription: "Simple daily and monthly hydration tracking.",
    description:
      "Two clean layouts for tracking water intake — a daily fill-in sheet and a monthly overview so you can spot patterns over time.",
    price: 4,
    images: [habitsImg],
    previewImages: [habitsImg, wellnessImg],
    fileType: base.fileType,
    pageCount: 2,
    sizes: base.sizes,
    includedFiles: ["Daily water tracker", "Monthly water tracker"],
    tags: ["water", "hydration", "tracker", "health"],
    isNew: true,
    relatedProducts: ["p-001", "p-004", "p-002"],
  },
  {
    id: "p-004",
    name: "Sleep & Rest Tracker",
    slug: "sleep-rest-tracker",
    category: "wellness-health",
    subcategory: "Sleep",
    shortDescription: "Track hours, quality and evening routine in one view.",
    description:
      "A month-at-a-glance sleep log with space for bedtime, wake time, quality rating and notes — plus an evening routine page to help wind down consistently.",
    price: 5,
    images: [notesImg],
    previewImages: [notesImg, habitsImg],
    fileType: base.fileType,
    pageCount: 3,
    sizes: base.sizes,
    includedFiles: ["Monthly sleep log", "Evening routine page", "Notes page"],
    tags: ["sleep", "rest", "tracker", "wellness"],
    relatedProducts: ["p-003", "p-005", "p-001"],
  },
  {
    id: "p-005",
    name: "Gratitude & Self-Care Journal",
    slug: "gratitude-self-care-journal",
    category: "wellness-health",
    subcategory: "Self-Care",
    shortDescription: "Short daily prompts that take five quiet minutes.",
    description:
      "A gentle journal set with daily gratitude prompts, a weekly reflection page and a self-care checklist. Written to be encouraging rather than prescriptive.",
    price: 8,
    salePrice: 6,
    images: [travelImg],
    previewImages: [travelImg, notesImg],
    fileType: base.fileType,
    pageCount: 12,
    sizes: base.sizes,
    includedFiles: ["Daily gratitude pages", "Weekly reflection", "Self-care checklist", "Mood tracker"],
    tags: ["gratitude", "journal", "self-care", "wellness"],
    bestseller: true,
    relatedProducts: ["p-004", "p-009", "p-016"],
  },
  {
    id: "p-006",
    name: "Undated Daily Planner",
    slug: "undated-daily-planner",
    category: "planning",
    subcategory: "Daily",
    shortDescription: "One focused page per day — priorities, schedule, notes.",
    description:
      "A structured but uncluttered daily page with a top-three priorities block, hourly schedule, task list and notes column. Undated so you can print only the days you need.",
    price: 6,
    images: [planningImg],
    previewImages: [planningImg, notesImg, habitsImg],
    fileType: base.fileType,
    pageCount: 5,
    sizes: base.sizes,
    includedFiles: ["Daily planner (2 layouts)", "Priorities page", "Notes page"],
    tags: ["daily planner", "printable planner", "undated"],
    featured: true,
    bestseller: true,
    relatedProducts: ["p-007", "p-008", "p-010"],
  },
  {
    id: "p-007",
    name: "Weekly Planning Spread",
    slug: "weekly-planning-spread",
    category: "planning",
    subcategory: "Weekly",
    shortDescription: "A calm seven-day overview with room for real life.",
    description:
      "A horizontal weekly spread with balanced day columns, a weekly focus block and a small tracker strip along the bottom.",
    price: 6,
    images: [planningImg],
    previewImages: [planningImg, wellnessImg],
    fileType: base.fileType,
    pageCount: 4,
    sizes: base.sizes,
    includedFiles: ["Weekly spread (horizontal)", "Weekly spread (vertical)", "Weekly review"],
    tags: ["weekly planner", "printable planner pages"],
    featured: true,
    relatedProducts: ["p-006", "p-008", "p-011"],
  },
  {
    id: "p-008",
    name: "Monthly & Yearly Overview Set",
    slug: "monthly-yearly-overview-set",
    category: "planning",
    subcategory: "Monthly",
    shortDescription: "Zoom out — a full year and twelve monthly grids.",
    description:
      "Undated monthly calendar grids plus a year-on-a-page overview for birthdays, deadlines and travel. The long view that keeps the weekly pages honest.",
    price: 9,
    salePrice: 7,
    images: [financeImg],
    previewImages: [financeImg, planningImg],
    fileType: base.fileType,
    pageCount: 14,
    sizes: base.sizes,
    includedFiles: ["12 monthly grids", "Year overview", "Important dates page"],
    tags: ["monthly planner", "yearly planner", "calendar"],
    isNew: true,
    relatedProducts: ["p-006", "p-007", "p-012"],
  },
  {
    id: "p-009",
    name: "Monthly Habit Tracker",
    slug: "monthly-habit-tracker",
    category: "goals-habits",
    subcategory: "Habit Trackers",
    shortDescription: "Up to twelve habits, one page, a whole month.",
    description:
      "A clear grid for tracking daily habits across a month, with space to name each habit and a short reflection prompt at the end of the page.",
    price: 5,
    images: [habitsImg],
    previewImages: [habitsImg, notesImg],
    fileType: base.fileType,
    pageCount: 3,
    sizes: base.sizes,
    includedFiles: ["Monthly habit grid", "Weekly habit page", "Reflection page"],
    tags: ["habit tracker", "printable habit tracker", "routine"],
    featured: true,
    bestseller: true,
    relatedProducts: ["p-010", "p-011", "p-006"],
  },
  {
    id: "p-010",
    name: "Goal Setting Workbook",
    slug: "goal-setting-workbook",
    category: "goals-habits",
    subcategory: "Goal Setting",
    shortDescription: "Break a big goal into steps you can start this week.",
    description:
      "A guided workbook that moves from a broad goal to milestones, weekly actions and a simple progress review — without motivational fluff.",
    price: 10,
    salePrice: 8,
    images: [notesImg],
    previewImages: [notesImg, planningImg],
    fileType: base.fileType,
    pageCount: 16,
    sizes: base.sizes,
    includedFiles: ["Goal map", "Milestone pages", "Weekly action plan", "Quarterly review"],
    tags: ["goal tracker", "goals", "workbook", "productivity"],
    featured: true,
    relatedProducts: ["p-009", "p-011", "p-017"],
  },
  {
    id: "p-011",
    name: "Morning & Evening Routine Pages",
    slug: "morning-evening-routine-pages",
    category: "goals-habits",
    subcategory: "Routines",
    shortDescription: "Design two anchors for your day.",
    description:
      "Build a morning and evening routine you can repeat, with checklists, timing suggestions and a weekly consistency tracker.",
    price: 5,
    images: [wellnessImg],
    previewImages: [wellnessImg, habitsImg],
    fileType: base.fileType,
    pageCount: 4,
    sizes: base.sizes,
    includedFiles: ["Morning routine", "Evening routine", "Consistency tracker"],
    tags: ["routine", "habits", "morning routine"],
    isNew: true,
    relatedProducts: ["p-009", "p-004", "p-006"],
  },
  {
    id: "p-012",
    name: "Dot Grid Note Pages",
    slug: "dot-grid-note-pages",
    category: "notes-logs",
    subcategory: "Note Pages",
    shortDescription: "Five quiet note layouts for anything at all.",
    description:
      "Dot grid, lined, split and blank note pages with a consistent header so your notes file neatly alongside the rest of your planner.",
    price: 4,
    images: [notesImg],
    previewImages: [notesImg, businessImg],
    fileType: base.fileType,
    pageCount: 5,
    sizes: base.sizes,
    includedFiles: ["Dot grid", "Lined", "Split page", "Blank", "Index page"],
    tags: ["notes", "dot grid", "printable pages"],
    relatedProducts: ["p-013", "p-006", "p-017"],
  },
  {
    id: "p-013",
    name: "Life Dashboard Set",
    slug: "life-dashboard-set",
    category: "notes-logs",
    subcategory: "Dashboards",
    shortDescription: "One page that shows how everything is going.",
    description:
      "At-a-glance dashboards pulling together habits, budget, goals and wellbeing so you can review your month in five minutes.",
    price: 8,
    images: [financeImg],
    previewImages: [financeImg, habitsImg],
    fileType: base.fileType,
    pageCount: 6,
    sizes: base.sizes,
    includedFiles: ["Monthly dashboard", "Quarterly dashboard", "Review page"],
    tags: ["dashboard", "review", "tracker"],
    featured: true,
    relatedProducts: ["p-012", "p-009", "p-014"],
  },
  {
    id: "p-014",
    name: "Monthly Budget Planner",
    slug: "monthly-budget-planner",
    category: "budget-finance",
    subcategory: "Monthly Budget",
    shortDescription: "Income, fixed costs, spending and what's left.",
    description:
      "A straightforward monthly budget page with income, fixed and variable categories, and a clear remaining-balance summary. No spreadsheets required.",
    price: 7,
    salePrice: 5.5,
    images: [financeImg],
    previewImages: [financeImg, notesImg],
    fileType: base.fileType,
    pageCount: 6,
    sizes: base.sizes,
    includedFiles: ["Monthly budget", "Expense log", "Bill tracker", "Summary page"],
    tags: ["budget planner", "printable budget planner", "finance", "money"],
    featured: true,
    bestseller: true,
    relatedProducts: ["p-015", "p-013", "p-008"],
  },
  {
    id: "p-015",
    name: "Savings & Debt Payoff Trackers",
    slug: "savings-debt-payoff-trackers",
    category: "budget-finance",
    subcategory: "Savings",
    shortDescription: "Visual progress toward the numbers that matter.",
    description:
      "Colour-in savings goal charts, a sinking funds page and a debt payoff tracker so progress stays visible month after month.",
    price: 6,
    images: [habitsImg],
    previewImages: [habitsImg, financeImg],
    fileType: base.fileType,
    pageCount: 5,
    sizes: base.sizes,
    includedFiles: ["Savings goal charts", "Sinking funds", "Debt payoff tracker"],
    tags: ["savings", "debt", "finance tracker"],
    isNew: true,
    relatedProducts: ["p-014", "p-013", "p-010"],
  },
  {
    id: "p-016",
    name: "Travel Planning Kit",
    slug: "travel-planning-kit",
    category: "lifestyle-travel",
    subcategory: "Travel",
    shortDescription: "From first idea to packed suitcase.",
    description:
      "Itinerary pages, a packing checklist, a travel budget sheet and a trip memories page — everything for one trip in a single printable set.",
    price: 9,
    images: [travelImg],
    previewImages: [travelImg, planningImg],
    fileType: base.fileType,
    pageCount: 10,
    sizes: base.sizes,
    includedFiles: ["Itinerary pages", "Packing list", "Travel budget", "Trip notes"],
    tags: ["travel planner", "packing list", "itinerary"],
    featured: true,
    relatedProducts: ["p-014", "p-006", "p-005"],
  },
  {
    id: "p-017",
    name: "Project & Client Planner",
    slug: "project-client-planner",
    category: "business-work",
    subcategory: "Projects",
    shortDescription: "Keep every project and client moving.",
    description:
      "Project overview pages, task breakdowns, a client tracker and a weekly work review, designed for freelancers and small business owners.",
    price: 11,
    salePrice: 9,
    images: [businessImg],
    previewImages: [businessImg, notesImg],
    fileType: base.fileType,
    pageCount: 12,
    sizes: base.sizes,
    includedFiles: ["Project overview", "Task breakdown", "Client tracker", "Weekly work review"],
    tags: ["business planner", "project planner", "work", "productivity"],
    featured: true,
    bestseller: true,
    relatedProducts: ["p-018", "p-010", "p-006"],
  },
  {
    id: "p-018",
    name: "Content & Study Planner",
    slug: "content-study-planner",
    category: "business-work",
    subcategory: "Content",
    shortDescription: "Plan posts, lessons and deadlines in one place.",
    description:
      "A monthly content calendar, idea bank and study session log — equally useful for creators and students juggling deadlines.",
    price: 7,
    images: [businessImg],
    previewImages: [businessImg, planningImg],
    fileType: base.fileType,
    pageCount: 8,
    sizes: base.sizes,
    includedFiles: ["Content calendar", "Idea bank", "Study session log", "Deadline tracker"],
    tags: ["content planner", "study planner", "productivity"],
    isNew: true,
    relatedProducts: ["p-017", "p-012", "p-008"],
  },
];

export const bundles: Product[] = [
  {
    id: "b-001",
    name: "Complete Wellness Tracker Kit",
    slug: "complete-wellness-tracker-kit",
    category: "wellness-health",
    subcategory: "Bundles",
    shortDescription: "Thirteen wellness printables in one considered system.",
    description:
      "Everything for movement, meals, hydration, rest and reflection — a complete wellness system that works together instead of thirteen unrelated pages.",
    price: 24,
    bundleValue: 68,
    images: [bundleImg],
    previewImages: [bundleImg, wellnessImg, habitsImg],
    fileType: "PDF",
    pageCount: 48,
    sizes: ["A4", "US Letter", "A5"],
    includedFiles: [
      "Monthly Workout Planner",
      "Weekly Fitness Planner",
      "Daily Fitness Planner",
      "Monthly Meal Planner",
      "Weekly Meal Planner",
      "Recipe Template",
      "Monthly Water Tracker",
      "Weekly Water Tracker",
      "Sleep Tracker",
      "Stress Tracker",
      "Gratitude Journal",
      "Self-Care Journal",
      "Health / Blood Pressure Log",
    ],
    bundleContents: [
      "Monthly Workout Planner",
      "Weekly Fitness Planner",
      "Daily Fitness Planner",
      "Monthly Meal Planner",
      "Weekly Meal Planner",
      "Recipe Template",
      "Monthly Water Tracker",
      "Weekly Water Tracker",
      "Sleep Tracker",
      "Stress Tracker",
      "Gratitude Journal",
      "Self-Care Journal",
      "Health / Blood Pressure Log",
    ],
    tags: ["wellness bundle", "printable wellness planner"],
    isBundle: true,
    featured: true,
    bestseller: true,
    relatedProducts: ["p-001", "p-002", "p-005"],
  },
  {
    id: "b-002",
    name: "Everyday Planning System",
    slug: "everyday-planning-system",
    category: "planning",
    subcategory: "Bundles",
    shortDescription: "Daily, weekly, monthly and yearly pages that match.",
    description:
      "A full planning system in one download — every view you need, drawn in the same visual language so your binder looks intentional.",
    price: 22,
    bundleValue: 54,
    images: [bundleImg],
    previewImages: [bundleImg, planningImg],
    fileType: "PDF",
    pageCount: 40,
    sizes: ["A4", "US Letter", "A5"],
    includedFiles: [
      "Undated Daily Planner",
      "Weekly Planning Spread",
      "Monthly Grids (12)",
      "Year Overview",
      "Weekly Review",
      "Notes Pages",
    ],
    bundleContents: [
      "Undated Daily Planner",
      "Weekly Planning Spread",
      "Monthly Grids (12)",
      "Year Overview",
      "Weekly Review",
      "Notes Pages",
    ],
    tags: ["planner bundle", "printable planner pages"],
    isBundle: true,
    featured: true,
    relatedProducts: ["p-006", "p-007", "p-008"],
  },
  {
    id: "b-003",
    name: "Money & Goals Bundle",
    slug: "money-goals-bundle",
    category: "budget-finance",
    subcategory: "Bundles",
    shortDescription: "Budgeting and goal-setting pages that talk to each other.",
    description:
      "Pair your monthly budget with goal maps, savings charts and habit tracking so financial goals stop living in a separate notebook.",
    price: 19,
    bundleValue: 44,
    images: [bundleImg],
    previewImages: [bundleImg, financeImg],
    fileType: "PDF",
    pageCount: 32,
    sizes: ["A4", "US Letter", "A5"],
    includedFiles: [
      "Monthly Budget Planner",
      "Expense Log",
      "Savings Goal Charts",
      "Debt Payoff Tracker",
      "Goal Setting Workbook",
      "Monthly Habit Tracker",
    ],
    bundleContents: [
      "Monthly Budget Planner",
      "Expense Log",
      "Savings Goal Charts",
      "Debt Payoff Tracker",
      "Goal Setting Workbook",
      "Monthly Habit Tracker",
    ],
    tags: ["budget bundle", "goals"],
    isBundle: true,
    isNew: true,
    relatedProducts: ["p-014", "p-015", "p-010"],
  },
  {
    id: "b-004",
    name: "Work & Business Starter Bundle",
    slug: "work-business-starter-bundle",
    category: "business-work",
    subcategory: "Bundles",
    shortDescription: "Projects, clients, content and focused work weeks.",
    description:
      "A practical set for freelancers, students and professionals — plan projects, track clients, schedule content and review each week.",
    price: 21,
    bundleValue: 48,
    images: [bundleImg],
    previewImages: [bundleImg, businessImg],
    fileType: "PDF",
    pageCount: 36,
    sizes: ["A4", "US Letter", "A5"],
    includedFiles: [
      "Project Planner",
      "Client Tracker",
      "Content Calendar",
      "Study Session Log",
      "Weekly Work Review",
      "Meeting Notes",
    ],
    bundleContents: [
      "Project Planner",
      "Client Tracker",
      "Content Calendar",
      "Study Session Log",
      "Weekly Work Review",
      "Meeting Notes",
    ],
    tags: ["business bundle", "work planner"],
    isBundle: true,
    relatedProducts: ["p-017", "p-018", "p-012"],
  },
];

export const allItems: Product[] = [...products, ...bundles];

export const getProduct = (slug: string) => allItems.find((p) => p.slug === slug);
export const getById = (id: string) => allItems.find((p) => p.id === id);
export const byCategory = (slug: CategorySlug) =>
  allItems.filter((p) => p.category === slug);

export const effectivePrice = (p: Product) => p.salePrice ?? p.price;
export const formatPrice = (n: number) =>
  n.toLocaleString("en-US", { style: "currency", currency: "USD" });

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

export interface Post {
  slug: string;
  title: string;
  category: string;
  excerpt: string;
  readingTime: string;
  date: string;
  image: string;
  body: string[];
}

export const posts: Post[] = [
  {
    slug: "build-a-planning-system-that-lasts",
    title: "How to Build a Planning System That Actually Lasts",
    category: "Planning Tips",
    excerpt:
      "Most planning systems fail because they ask for too much. Here is a smaller, sturdier way to start.",
    readingTime: "5 min read",
    date: "2026-07-28",
    image: planningImg,
    body: [
      "A planning system fails for the same reason most routines fail: it asks for more attention than an ordinary week can spare. The fix is rarely a better planner — it is a smaller one.",
      "Start with a single page you will genuinely open every day. For most people that is a weekly spread, not a daily one. Add a monthly view only once the weekly page has survived a full month.",
      "Give each page one job. A habit tracker tracks habits. A budget page holds money. When pages overlap, you end up maintaining the same information twice and quietly abandon both.",
      "Finally, schedule the review, not just the planning. Fifteen minutes at the end of the week is what turns a stack of printed pages into a system.",
    ],
  },
  {
    slug: "printing-planner-pages-at-home",
    title: "A Simple Guide to Printing Planner Pages at Home",
    category: "Organization",
    excerpt:
      "Paper weight, scaling, duplex settings — the small choices that make printables feel premium.",
    readingTime: "4 min read",
    date: "2026-07-14",
    image: notesImg,
    body: [
      "Printables live or die by the paper. 100–120 gsm is the sweet spot: heavy enough that ink does not ghost through, light enough for a home printer to handle without jamming.",
      "Always print at 100% scale with 'fit to page' switched off. Our files already include safe margins, and scaling shifts the grid alignment.",
      "For double-sided pages, use the 'flip on long edge' setting so the layout stays upright on both sides.",
      "If you plan to reuse a tracker, print once and slide it into a clear pocket — a dry-erase pen turns a single sheet into a permanent fixture.",
    ],
  },
  {
    slug: "gentle-habit-tracking",
    title: "Gentle Habit Tracking: Progress Without Perfection",
    category: "Wellness",
    excerpt:
      "Streaks are motivating until you break one. A softer approach to tracking that survives real life.",
    readingTime: "6 min read",
    date: "2026-06-30",
    image: habitsImg,
    body: [
      "Streak-based tracking rewards perfect months and punishes ordinary ones. Since most months are ordinary, the tracker gets abandoned by week three.",
      "Try counting instead of chaining. Twenty out of thirty days is an excellent month, and it stays excellent after a missed Tuesday.",
      "Track no more than five habits at once, and make at least one of them something you already do. Momentum matters more than ambition.",
      "At the end of the month, write one sentence about what got in the way. That sentence is usually more useful than the grid itself.",
    ],
  },
  {
    slug: "budgeting-on-paper",
    title: "Why Budgeting on Paper Still Works",
    category: "Budgeting",
    excerpt:
      "Apps automate the numbers. Paper makes you notice them. A case for the printed budget page.",
    readingTime: "5 min read",
    date: "2026-06-12",
    image: financeImg,
    body: [
      "Automated budgeting is efficient and easy to ignore. Writing a number by hand takes four seconds and is much harder to skim past.",
      "A monthly paper budget works best as a companion to your banking app, not a replacement: the app records, the page decides.",
      "Keep categories broad. Five or six is plenty; twenty is bookkeeping.",
      "Review at the same time each month — payday is a natural anchor — and carry one note forward about what you would change.",
    ],
  },
];

export const getPost = (slug: string) => posts.find((p) => p.slug === slug);
