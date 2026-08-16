-- ROLES ---------------------------------------------------------------
CREATE TYPE public.app_role AS ENUM ('admin', 'customer');

CREATE TABLE public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT,
  full_name TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE ON public.profiles TO authenticated;
GRANT ALL ON public.profiles TO service_role;
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users read own profile" ON public.profiles FOR SELECT TO authenticated USING (auth.uid() = id);
CREATE POLICY "Users update own profile" ON public.profiles FOR UPDATE TO authenticated USING (auth.uid() = id) WITH CHECK (auth.uid() = id);
CREATE POLICY "Users insert own profile" ON public.profiles FOR INSERT TO authenticated WITH CHECK (auth.uid() = id);

CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role public.app_role NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (user_id, role)
);
GRANT SELECT ON public.user_roles TO authenticated;
GRANT ALL ON public.user_roles TO service_role;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role public.app_role)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = _user_id AND role = _role);
$$;

CREATE POLICY "Users read own roles" ON public.user_roles FOR SELECT TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "Admins read all roles" ON public.user_roles FOR SELECT TO authenticated USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins manage roles" ON public.user_roles FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name)
  VALUES (NEW.id, NEW.email, NEW.raw_user_meta_data ->> 'full_name')
  ON CONFLICT (id) DO NOTHING;
  RETURN NEW;
END;
$$;
CREATE TRIGGER on_auth_user_created
AFTER INSERT ON auth.users
FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS TRIGGER LANGUAGE plpgsql SET search_path = public AS $$
BEGIN NEW.updated_at = now(); RETURN NEW; END;
$$;

-- PRODUCTS ------------------------------------------------------------
CREATE TABLE public.products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  category TEXT NOT NULL,
  subcategory TEXT NOT NULL DEFAULT '',
  short_description TEXT NOT NULL DEFAULT '',
  description TEXT NOT NULL DEFAULT '',
  price NUMERIC(10,2) NOT NULL DEFAULT 0,
  sale_price NUMERIC(10,2),
  image_key TEXT NOT NULL DEFAULT 'planning',
  file_type TEXT NOT NULL DEFAULT 'PDF',
  page_count INTEGER NOT NULL DEFAULT 1,
  sizes TEXT[] NOT NULL DEFAULT ARRAY['A4','US Letter','A5'],
  included_files TEXT[] NOT NULL DEFAULT '{}',
  tags TEXT[] NOT NULL DEFAULT '{}',
  featured BOOLEAN NOT NULL DEFAULT false,
  bestseller BOOLEAN NOT NULL DEFAULT false,
  is_new BOOLEAN NOT NULL DEFAULT false,
  is_bundle BOOLEAN NOT NULL DEFAULT false,
  bundle_value NUMERIC(10,2),
  published BOOLEAN NOT NULL DEFAULT true,
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT ON public.products TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.products TO authenticated;
GRANT ALL ON public.products TO service_role;
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public reads published products" ON public.products FOR SELECT TO anon USING (published = true);
CREATE POLICY "Signed in reads published products" ON public.products FOR SELECT TO authenticated USING (published = true OR public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins manage products" ON public.products FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE TRIGGER products_updated_at BEFORE UPDATE ON public.products FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- BLOG ----------------------------------------------------------------
CREATE TABLE public.blog_posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  category TEXT NOT NULL DEFAULT 'Planning Tips',
  excerpt TEXT NOT NULL DEFAULT '',
  body TEXT NOT NULL DEFAULT '',
  reading_time TEXT NOT NULL DEFAULT '4 min read',
  image_key TEXT NOT NULL DEFAULT 'planning',
  published BOOLEAN NOT NULL DEFAULT true,
  published_at DATE NOT NULL DEFAULT CURRENT_DATE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT ON public.blog_posts TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.blog_posts TO authenticated;
GRANT ALL ON public.blog_posts TO service_role;
ALTER TABLE public.blog_posts ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public reads published posts" ON public.blog_posts FOR SELECT TO anon USING (published = true);
CREATE POLICY "Signed in reads posts" ON public.blog_posts FOR SELECT TO authenticated USING (published = true OR public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins manage posts" ON public.blog_posts FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE TRIGGER blog_posts_updated_at BEFORE UPDATE ON public.blog_posts FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- SETTINGS ------------------------------------------------------------
CREATE TABLE public.site_settings (
  key TEXT PRIMARY KEY,
  value TEXT NOT NULL DEFAULT '',
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT ON public.site_settings TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.site_settings TO authenticated;
GRANT ALL ON public.site_settings TO service_role;
ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone reads settings" ON public.site_settings FOR SELECT TO anon USING (true);
CREATE POLICY "Signed in reads settings" ON public.site_settings FOR SELECT TO authenticated USING (true);
CREATE POLICY "Admins manage settings" ON public.site_settings FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- ORDERS --------------------------------------------------------------
CREATE TABLE public.orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_number TEXT NOT NULL UNIQUE,
  customer_email TEXT NOT NULL,
  customer_name TEXT,
  total NUMERIC(10,2) NOT NULL DEFAULT 0,
  status TEXT NOT NULL DEFAULT 'pending',
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.orders TO authenticated;
GRANT ALL ON public.orders TO service_role;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users read own orders" ON public.orders FOR SELECT TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "Admins manage orders" ON public.orders FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE TABLE public.order_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id UUID NOT NULL REFERENCES public.orders(id) ON DELETE CASCADE,
  product_id UUID REFERENCES public.products(id) ON DELETE SET NULL,
  product_name TEXT NOT NULL,
  unit_price NUMERIC(10,2) NOT NULL DEFAULT 0,
  quantity INTEGER NOT NULL DEFAULT 1
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.order_items TO authenticated;
GRANT ALL ON public.order_items TO service_role;
ALTER TABLE public.order_items ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users read own order items" ON public.order_items FOR SELECT TO authenticated USING (EXISTS (SELECT 1 FROM public.orders o WHERE o.id = order_id AND o.user_id = auth.uid()));
CREATE POLICY "Admins manage order items" ON public.order_items FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- SUBSCRIBERS & MESSAGES ----------------------------------------------
CREATE TABLE public.newsletter_subscribers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT NOT NULL UNIQUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT INSERT ON public.newsletter_subscribers TO anon;
GRANT SELECT, INSERT, DELETE ON public.newsletter_subscribers TO authenticated;
GRANT ALL ON public.newsletter_subscribers TO service_role;
ALTER TABLE public.newsletter_subscribers ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can subscribe" ON public.newsletter_subscribers FOR INSERT TO anon WITH CHECK (true);
CREATE POLICY "Signed in can subscribe" ON public.newsletter_subscribers FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Admins manage subscribers" ON public.newsletter_subscribers FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE TABLE public.contact_messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  subject TEXT NOT NULL DEFAULT '',
  message TEXT NOT NULL,
  handled BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT INSERT ON public.contact_messages TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.contact_messages TO authenticated;
GRANT ALL ON public.contact_messages TO service_role;
ALTER TABLE public.contact_messages ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can send a message" ON public.contact_messages FOR INSERT TO anon WITH CHECK (true);
CREATE POLICY "Signed in can send a message" ON public.contact_messages FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Admins manage messages" ON public.contact_messages FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- SEED ----------------------------------------------------------------
INSERT INTO public.site_settings (key, value) VALUES
  ('announcement', 'Digital printables designed for planning, organizing & intentional living.'),
  ('store_email', 'hello@monreaprints.com');

INSERT INTO public.products
  (name, slug, category, subcategory, short_description, description, price, sale_price, image_key, page_count, included_files, tags, featured, bestseller, is_new, is_bundle, bundle_value, sort_order)
VALUES
('Weekly Fitness Planner','weekly-fitness-planner','wellness-health','Fitness','Plan a realistic week of movement, sets and rest days.','A calm weekly layout for planning workouts, tracking sets and reps, and scheduling rest. Designed with generous writing space so a full week fits on one page without feeling cramped.',6,4.5,'wellness',4,ARRAY['Weekly Fitness Planner (A4)','Weekly Fitness Planner (Letter)','A5 version','Printing guide'],ARRAY['fitness','workout','wellness','weekly'],true,true,false,false,NULL,1),
('Monthly Meal Planner','monthly-meal-planner','wellness-health','Meals','A month of meals mapped out, with a matching grocery list.','Plan breakfasts, lunches and dinners across a full month, then carry it straight into the included grocery list. Ideal for reducing weeknight decisions and food waste.',7,NULL,'planning',6,ARRAY['Monthly meal grid','Weekly meal page','Grocery list','Recipe template'],ARRAY['meal planner','grocery','food','monthly'],true,false,false,false,NULL,2),
('Water & Hydration Tracker','water-hydration-tracker','wellness-health','Hydration','Simple daily and monthly hydration tracking.','Two clean layouts for tracking water intake — a daily fill-in sheet and a monthly overview so you can spot patterns over time.',4,NULL,'habits',2,ARRAY['Daily water tracker','Monthly water tracker'],ARRAY['water','hydration','tracker','health'],false,false,true,false,NULL,3),
('Sleep & Rest Tracker','sleep-rest-tracker','wellness-health','Sleep','Track hours, quality and evening routine in one view.','A month-at-a-glance sleep log with space for bedtime, wake time, quality rating and notes — plus an evening routine page to help wind down consistently.',5,NULL,'notes',3,ARRAY['Monthly sleep log','Evening routine page','Notes page'],ARRAY['sleep','rest','tracker','wellness'],false,false,false,false,NULL,4),
('Gratitude & Self-Care Journal','gratitude-self-care-journal','wellness-health','Self-Care','Short daily prompts that take five quiet minutes.','A gentle journal set with daily gratitude prompts, a weekly reflection page and a self-care checklist. Written to be encouraging rather than prescriptive.',8,6,'travel',12,ARRAY['Daily gratitude pages','Weekly reflection','Self-care checklist','Mood tracker'],ARRAY['gratitude','journal','self-care','wellness'],false,true,false,false,NULL,5),
('Undated Daily Planner','undated-daily-planner','planning','Daily','One focused page per day — priorities, schedule, notes.','A structured but uncluttered daily page with a top-three priorities block, hourly schedule, task list and notes column. Undated so you can print only the days you need.',6,NULL,'planning',5,ARRAY['Daily planner (2 layouts)','Priorities page','Notes page'],ARRAY['daily planner','printable planner','undated'],true,true,false,false,NULL,6),
('Weekly Planning Spread','weekly-planning-spread','planning','Weekly','A calm seven-day overview with room for real life.','A horizontal weekly spread with balanced day columns, a weekly focus block and a small tracker strip along the bottom.',6,NULL,'planning',4,ARRAY['Weekly spread (horizontal)','Weekly spread (vertical)','Weekly review'],ARRAY['weekly planner','printable planner pages'],true,false,false,false,NULL,7),
('Monthly & Yearly Overview Set','monthly-yearly-overview-set','planning','Monthly','Zoom out — a full year and twelve monthly grids.','Undated monthly calendar grids plus a year-on-a-page overview for birthdays, deadlines and travel. The long view that keeps the weekly pages honest.',9,7,'finance',14,ARRAY['12 monthly grids','Year overview','Important dates page'],ARRAY['monthly planner','yearly planner','calendar'],false,false,true,false,NULL,8),
('Monthly Habit Tracker','monthly-habit-tracker','goals-habits','Habit Trackers','Up to twelve habits, one page, a whole month.','A clear grid for tracking daily habits across a month, with space to name each habit and a short reflection prompt at the end of the page.',5,NULL,'habits',3,ARRAY['Monthly habit grid','Weekly habit page','Reflection page'],ARRAY['habit tracker','printable habit tracker','routine'],true,true,false,false,NULL,9),
('Goal Setting Workbook','goal-setting-workbook','goals-habits','Goal Setting','Break a big goal into steps you can start this week.','A guided workbook that moves from a broad goal to milestones, weekly actions and a simple progress review — without motivational fluff.',10,8,'notes',16,ARRAY['Goal map','Milestone pages','Weekly action plan','Quarterly review'],ARRAY['goal tracker','goals','workbook','productivity'],true,false,false,false,NULL,10),
('Morning & Evening Routine Pages','morning-evening-routine-pages','goals-habits','Routines','Design two anchors for your day.','Build a morning and evening routine you can repeat, with checklists, timing suggestions and a weekly consistency tracker.',5,NULL,'wellness',4,ARRAY['Morning routine','Evening routine','Consistency tracker'],ARRAY['routine','habits','morning routine'],false,false,true,false,NULL,11),
('Dot Grid Note Pages','dot-grid-note-pages','notes-logs','Note Pages','Five quiet note layouts for anything at all.','Dot grid, lined, split and blank note pages with a consistent header so your notes file neatly alongside the rest of your planner.',4,NULL,'notes',5,ARRAY['Dot grid','Lined','Split page','Blank','Index page'],ARRAY['notes','dot grid','printable pages'],false,false,false,false,NULL,12),
('Life Dashboard Set','life-dashboard-set','notes-logs','Dashboards','One page that shows how everything is going.','At-a-glance dashboards pulling together habits, budget, goals and wellbeing so you can review your month in five minutes.',8,NULL,'finance',6,ARRAY['Monthly dashboard','Quarterly dashboard','Review page'],ARRAY['dashboard','review','tracker'],true,false,false,false,NULL,13),
('Monthly Budget Planner','monthly-budget-planner','budget-finance','Monthly Budget','Income, fixed costs, spending and what''s left.','A straightforward monthly budget page with income, fixed and variable categories, and a clear remaining-balance summary. No spreadsheets required.',7,5.5,'finance',6,ARRAY['Monthly budget','Expense log','Bill tracker','Summary page'],ARRAY['budget planner','printable budget planner','finance','money'],true,true,false,false,NULL,14),
('Savings & Debt Payoff Trackers','savings-debt-payoff-trackers','budget-finance','Savings','Visual progress toward the numbers that matter.','Colour-in savings goal charts, a sinking funds page and a debt payoff tracker so progress stays visible month after month.',6,NULL,'habits',5,ARRAY['Savings goal charts','Sinking funds','Debt payoff tracker'],ARRAY['savings','debt','finance tracker'],false,false,true,false,NULL,15),
('Travel Planning Kit','travel-planning-kit','lifestyle-travel','Travel','From first idea to packed suitcase.','Itinerary pages, a packing checklist, a travel budget sheet and a trip memories page — everything for one trip in a single printable set.',9,NULL,'travel',10,ARRAY['Itinerary pages','Packing list','Travel budget','Trip notes'],ARRAY['travel planner','packing list','itinerary'],true,false,false,false,NULL,16),
('Project & Client Planner','project-client-planner','business-work','Projects','Keep every project and client moving.','Project overview pages, task breakdowns, a client tracker and a weekly work review, designed for freelancers and small business owners.',11,9,'business',12,ARRAY['Project overview','Task breakdown','Client tracker','Weekly work review'],ARRAY['business planner','project planner','work','productivity'],true,true,false,false,NULL,17),
('Content & Study Planner','content-study-planner','business-work','Content','Plan posts, lessons and deadlines in one place.','A monthly content calendar, idea bank and study session log — equally useful for creators and students juggling deadlines.',7,NULL,'business',8,ARRAY['Content calendar','Idea bank','Study session log','Deadline tracker'],ARRAY['content planner','study planner','productivity'],false,false,true,false,NULL,18),
('Complete Wellness Tracker Kit','complete-wellness-tracker-kit','wellness-health','Bundles','Thirteen wellness printables in one considered system.','Everything for movement, meals, hydration, rest and reflection — a complete wellness system that works together instead of thirteen unrelated pages.',24,NULL,'bundle',48,ARRAY['Monthly Workout Planner','Weekly Fitness Planner','Daily Fitness Planner','Monthly Meal Planner','Weekly Meal Planner','Recipe Template','Monthly Water Tracker','Weekly Water Tracker','Sleep Tracker','Stress Tracker','Gratitude Journal','Self-Care Journal','Health / Blood Pressure Log'],ARRAY['wellness bundle','printable wellness planner'],true,true,false,true,68,19),
('Everyday Planning System','everyday-planning-system','planning','Bundles','Daily, weekly, monthly and yearly pages that match.','A full planning system in one download — every view you need, drawn in the same visual language so your binder looks intentional.',22,NULL,'bundle',40,ARRAY['Undated Daily Planner','Weekly Planning Spread','Monthly Grids (12)','Year Overview','Weekly Review','Notes Pages'],ARRAY['planner bundle','printable planner pages'],true,false,false,true,54,20),
('Money & Goals Bundle','money-goals-bundle','budget-finance','Bundles','Budgeting and goal-setting pages that talk to each other.','Pair your monthly budget with goal maps, savings charts and habit tracking so financial goals stop living in a separate notebook.',19,NULL,'bundle',32,ARRAY['Monthly Budget Planner','Expense Log','Savings Goal Charts','Debt Payoff Tracker','Goal Setting Workbook','Monthly Habit Tracker'],ARRAY['budget bundle','goals'],false,false,true,true,44,21),
('Work & Business Starter Bundle','work-business-starter-bundle','business-work','Bundles','Projects, clients, content and focused work weeks.','A practical set for freelancers, students and professionals — plan projects, track clients, schedule content and review each week.',21,NULL,'bundle',36,ARRAY['Project Planner','Client Tracker','Content Calendar','Study Session Log','Weekly Work Review','Meeting Notes'],ARRAY['business bundle','work planner'],false,false,false,true,48,22);

INSERT INTO public.blog_posts (title, slug, category, excerpt, body, reading_time, image_key, published_at) VALUES
('How to Build a Planning System That Actually Lasts','build-a-planning-system-that-lasts','Planning Tips','Most planning systems fail because they ask for too much. Here is a smaller, sturdier way to start.',
'A planning system fails for the same reason most routines fail: it asks for more attention than an ordinary week can spare. The fix is rarely a better planner — it is a smaller one.

Start with a single page you will genuinely open every day. For most people that is a weekly spread, not a daily one. Add a monthly view only once the weekly page has survived a full month.

Give each page one job. A habit tracker tracks habits. A budget page holds money. When pages overlap, you end up maintaining the same information twice and quietly abandon both.

Finally, schedule the review, not just the planning. Fifteen minutes at the end of the week is what turns a stack of printed pages into a system.','5 min read','planning','2026-07-28'),
('A Simple Guide to Printing Planner Pages at Home','printing-planner-pages-at-home','Organization','Paper weight, scaling, duplex settings — the small choices that make printables feel premium.',
'Printables live or die by the paper. 100–120 gsm is the sweet spot: heavy enough that ink does not ghost through, light enough for a home printer to handle without jamming.

Always print at 100% scale with ''fit to page'' switched off. Our files already include safe margins, and scaling shifts the grid alignment.

For double-sided pages, use the ''flip on long edge'' setting so the layout stays upright on both sides.

If you plan to reuse a tracker, print once and slide it into a clear pocket — a dry-erase pen turns a single sheet into a permanent fixture.','4 min read','notes','2026-07-14'),
('Gentle Habit Tracking: Progress Without Perfection','gentle-habit-tracking','Wellness','Streaks are motivating until you break one. A softer approach to tracking that survives real life.',
'Streak-based tracking rewards perfect months and punishes ordinary ones. Since most months are ordinary, the tracker gets abandoned by week three.

Try counting instead of chaining. Twenty out of thirty days is an excellent month, and it stays excellent after a missed Tuesday.

Track no more than five habits at once, and make at least one of them something you already do. Momentum matters more than ambition.

At the end of the month, write one sentence about what got in the way. That sentence is usually more useful than the grid itself.','6 min read','habits','2026-06-30'),
('Why Budgeting on Paper Still Works','budgeting-on-paper','Budgeting','Apps automate the numbers. Paper makes you notice them. A case for the printed budget page.',
'Automated budgeting is efficient and easy to ignore. Writing a number by hand takes four seconds and is much harder to skim past.

A monthly paper budget works best as a companion to your banking app, not a replacement: the app records, the page decides.

Keep categories broad. Five or six is plenty; twenty is bookkeeping.

Review at the same time each month — payday is a natural anchor — and carry one note forward about what you would change.','5 min read','finance','2026-06-12');