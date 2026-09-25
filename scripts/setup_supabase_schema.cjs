const token = process.env.SUPABASE_ACCESS_TOKEN || '';
const ref = process.env.SUPABASE_PROJECT_REF || 'whqsbtsceaznuxicilby';

const sql = `
-- 1. EXTENSIONS
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 2. OPERATORS / CRM USERS TABLE
CREATE TABLE IF NOT EXISTS public.operators (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    username TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    pin TEXT,
    role TEXT NOT NULL DEFAULT 'supervisor',
    avatar TEXT DEFAULT 'GN',
    title TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. PROJECTS TABLE (Fix & Flip Portfolio)
CREATE TABLE IF NOT EXISTS public.projects (
    id TEXT PRIMARY KEY,
    project_number TEXT UNIQUE,
    title TEXT NOT NULL,
    address TEXT NOT NULL,
    county TEXT DEFAULT 'Jefferson',
    state TEXT DEFAULT 'KY',
    beds NUMERIC DEFAULT 3,
    baths NUMERIC DEFAULT 2,
    sqft NUMERIC DEFAULT 1200,
    status TEXT NOT NULL DEFAULT 'acquisition',
    purchase_price NUMERIC DEFAULT 0,
    closing_costs NUMERIC DEFAULT 0,
    rehab_budget NUMERIC DEFAULT 0,
    holding_budget NUMERIC DEFAULT 0,
    target_arv NUMERIC DEFAULT 0,
    actual_sale_price NUMERIC DEFAULT 0,
    acquisition_date DATE,
    target_completion_date DATE,
    notes TEXT,
    cover_image TEXT,
    checklist JSONB DEFAULT '[]'::jsonb,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. EXPENSES TABLE
CREATE TABLE IF NOT EXISTS public.expenses (
    id TEXT PRIMARY KEY,
    project_id TEXT REFERENCES public.projects(id) ON DELETE CASCADE,
    category TEXT NOT NULL,
    amount NUMERIC NOT NULL DEFAULT 0,
    vendor TEXT,
    date DATE,
    description TEXT,
    receipt_url TEXT,
    payment_method TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. LEADS TABLE (Landing page submissions + CRM Pipeline)
CREATE TABLE IF NOT EXISTS public.leads (
    id TEXT PRIMARY KEY,
    full_name TEXT NOT NULL,
    phone TEXT NOT NULL,
    email TEXT,
    address TEXT NOT NULL,
    property_type TEXT DEFAULT 'single-family',
    bedrooms TEXT,
    bathrooms TEXT,
    occupancy TEXT,
    condition TEXT,
    timeline TEXT,
    notes TEXT,
    source TEXT DEFAULT 'Web Form',
    submitted_at TIMESTAMPTZ DEFAULT NOW(),
    status TEXT DEFAULT 'new',
    arv NUMERIC,
    estimated_repair NUMERIC,
    offer_amount NUMERIC,
    extra_data JSONB DEFAULT '{}'::jsonb,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 6. AUCTION RECORDS (TZEL Judicial Auctions)
CREATE TABLE IF NOT EXISTS public.auction_records (
    id TEXT PRIMARY KEY,
    case_number TEXT UNIQUE,
    docket_number TEXT,
    address TEXT,
    appraisal NUMERIC DEFAULT 0,
    sale_date DATE,
    status TEXT DEFAULT 'active',
    details JSONB DEFAULT '{}'::jsonb,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 7. CODE VIOLATIONS (TZEL Distressed Radar)
CREATE TABLE IF NOT EXISTS public.code_violations (
    id TEXT PRIMARY KEY,
    case_number TEXT UNIQUE,
    address TEXT,
    violation_type TEXT,
    date_opened DATE,
    status TEXT,
    details JSONB DEFAULT '{}'::jsonb,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ENABLE ROW LEVEL SECURITY
ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.expenses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.operators ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.auction_records ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.code_violations ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if any to ensure idempotency
DO $$ 
BEGIN
    DROP POLICY IF EXISTS "Allow anonymous insert into leads" ON public.leads;
    DROP POLICY IF EXISTS "Allow full access to leads" ON public.leads;
    DROP POLICY IF EXISTS "Allow full access to projects" ON public.projects;
    DROP POLICY IF EXISTS "Allow full access to expenses" ON public.expenses;
    DROP POLICY IF EXISTS "Allow full access to operators" ON public.operators;
    DROP POLICY IF EXISTS "Allow full access to auction_records" ON public.auction_records;
    DROP POLICY IF EXISTS "Allow full access to code_violations" ON public.code_violations;
EXCEPTION
    WHEN OTHERS THEN NULL;
END $$;

-- Policies
CREATE POLICY "Allow anonymous insert into leads" ON public.leads FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow full access to leads" ON public.leads FOR ALL USING (true);
CREATE POLICY "Allow full access to projects" ON public.projects FOR ALL USING (true);
CREATE POLICY "Allow full access to expenses" ON public.expenses FOR ALL USING (true);
CREATE POLICY "Allow full access to operators" ON public.operators FOR ALL USING (true);
CREATE POLICY "Allow full access to auction_records" ON public.auction_records FOR ALL USING (true);
CREATE POLICY "Allow full access to code_violations" ON public.code_violations FOR ALL USING (true);

-- Insert Default Factory Operators
INSERT INTO public.operators (id, name, email, username, password, pin, role, avatar, title)
VALUES 
  ('usr-admin', 'Gerencia Inversiones', 'admin@gninvestment.com', 'admin', 'admin123', '1234', 'admin', 'GN', 'Director de Operaciones'),
  ('usr-supervisor', 'Operaciones & Obras', 'rehab@gninvestment.com', 'rehab', 'flip2026', '2026', 'supervisor', 'OP', 'Supervisor Fix & Flip')
ON CONFLICT (id) DO NOTHING;
`;

async function main() {
  console.log('Sending schema to Supabase project:', ref);
  const res = await fetch(`https://api.supabase.com/v1/projects/${ref}/database/query`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ query: sql })
  });

  const data = await res.json();
  console.log('HTTP Status:', res.status);
  console.log('Response:', data);
}

main().catch(console.error);
