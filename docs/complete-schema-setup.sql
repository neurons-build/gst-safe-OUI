-- Complete Database Schema Setup for GSTSafe v2
-- Run this in your Supabase SQL Editor to set up all tables from scratch

-- 1. Create users table (extends auth.users)
CREATE TABLE IF NOT EXISTS public.users (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  name varchar(100) NOT NULL,
  profession varchar(150),
  phone varchar(15),
  state varchar(60) NOT NULL,
  state_category varchar(10) NOT NULL CHECK (state_category IN ('general', 'special')),
  gst_threshold integer NOT NULL,
  is_gst_registered boolean DEFAULT false,
  whatsapp_alerts boolean DEFAULT false,
  email_alerts boolean DEFAULT true,
  onboarding_complete boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- 2. Create income_entries table
CREATE TABLE IF NOT EXISTS public.income_entries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  source_name varchar(100) NOT NULL,
  amount integer NOT NULL, -- in paise
  month integer NOT NULL CHECK (month >= 1 AND month <= 12),
  year integer NOT NULL,
  financial_year varchar(10) NOT NULL,
  income_type varchar(10) NOT NULL CHECK (income_type IN ('domestic', 'export')),
  notes varchar(200),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- 3. Create invoices table
CREATE TABLE IF NOT EXISTS public.invoices (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  client_name varchar(100) NOT NULL,
  amount integer NOT NULL, -- in paise
  invoice_date date NOT NULL,
  file_path text NOT NULL,
  file_type varchar(10),
  notes varchar(500),
  created_at timestamptz DEFAULT now()
);

-- 4. Create alerts_sent table
CREATE TABLE IF NOT EXISTS public.alerts_sent (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  alert_type varchar(5) NOT NULL CHECK (alert_type IN ('75', '90', '100')),
  financial_year varchar(10) NOT NULL,
  channel varchar(15) NOT NULL CHECK (channel IN ('email', 'whatsapp')),
  sent_at timestamptz DEFAULT now(),
  UNIQUE(user_id, alert_type, financial_year, channel)
);

-- 5. Create subscriptions table
CREATE TABLE IF NOT EXISTS public.subscriptions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  plan varchar(10) DEFAULT 'free' CHECK (plan IN ('free', 'pro')),
  status varchar(15) DEFAULT 'active' CHECK (status IN ('active', 'expired', 'cancelled')),
  razorpay_subscription_id varchar(100),
  started_at timestamptz,
  valid_until timestamptz,
  created_at timestamptz DEFAULT now()
);

-- 6. Create admin_settings table (if not exists)
CREATE TABLE IF NOT EXISTS public.admin_settings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  key TEXT UNIQUE NOT NULL,
  value TEXT NOT NULL,
  description TEXT,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 7. Insert default admin settings
INSERT INTO public.admin_settings (key, value, description) VALUES
  ('subscriptions_enabled', 'false', 'Enable subscription/pro features. Set to false for first 100 users to improve product.'),
  ('max_free_users', '100', 'Maximum number of users before enabling subscriptions')
ON CONFLICT (key) DO NOTHING;

-- 8. Enable RLS on all tables
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.income_entries ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.invoices ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.alerts_sent ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.admin_settings ENABLE ROW LEVEL SECURITY;

-- 9. RLS Policies for users
DROP POLICY IF EXISTS "Users can view their own profile" ON public.users;
CREATE POLICY "Users can view their own profile" ON public.users FOR SELECT USING (auth.uid() = id);
DROP POLICY IF EXISTS "Users can update their own profile" ON public.users;
CREATE POLICY "Users can update their own profile" ON public.users FOR UPDATE USING (auth.uid() = id);

-- 10. RLS Policies for income_entries
DROP POLICY IF EXISTS "Users can view their own income entries" ON public.income_entries;
CREATE POLICY "Users can view their own income entries" ON public.income_entries FOR SELECT USING (auth.uid() = user_id);
DROP POLICY IF EXISTS "Users can insert their own income entries" ON public.income_entries;
CREATE POLICY "Users can insert their own income entries" ON public.income_entries FOR INSERT WITH CHECK (auth.uid() = user_id);
DROP POLICY IF EXISTS "Users can update their own income entries" ON public.income_entries;
CREATE POLICY "Users can update their own income entries" ON public.income_entries FOR UPDATE USING (auth.uid() = user_id);
DROP POLICY IF EXISTS "Users can delete their own income entries" ON public.income_entries;
CREATE POLICY "Users can delete their own income entries" ON public.income_entries FOR DELETE USING (auth.uid() = user_id);

-- 11. RLS Policies for invoices
DROP POLICY IF EXISTS "Users can view their own invoices" ON public.invoices;
CREATE POLICY "Users can view their own invoices" ON public.invoices FOR SELECT USING (auth.uid() = user_id);
DROP POLICY IF EXISTS "Users can insert their own invoices" ON public.invoices;
CREATE POLICY "Users can insert their own invoices" ON public.invoices FOR INSERT WITH CHECK (auth.uid() = user_id);
DROP POLICY IF EXISTS "Users can update their own invoices" ON public.invoices;
CREATE POLICY "Users can update their own invoices" ON public.invoices FOR UPDATE USING (auth.uid() = user_id);
DROP POLICY IF EXISTS "Users can delete their own invoices" ON public.invoices;
CREATE POLICY "Users can delete their own invoices" ON public.invoices FOR DELETE USING (auth.uid() = user_id);

-- 12. RLS Policies for alerts_sent
DROP POLICY IF EXISTS "Users can view their own alerts sent" ON public.alerts_sent;
CREATE POLICY "Users can view their own alerts sent" ON public.alerts_sent FOR SELECT USING (auth.uid() = user_id);

-- 13. RLS Policies for subscriptions
DROP POLICY IF EXISTS "Users can view their own subscriptions" ON public.subscriptions;
CREATE POLICY "Users can view their own subscriptions" ON public.subscriptions FOR SELECT USING (auth.uid() = user_id);

-- 14. RLS Policies for admin_settings
DROP POLICY IF EXISTS "Service role full access" ON public.admin_settings;
CREATE POLICY "Service role full access" ON public.admin_settings
  FOR ALL
  USING (auth.role() = 'service_role')
  WITH CHECK (auth.role() = 'service_role');

DROP POLICY IF EXISTS "Authenticated read access" ON public.admin_settings;
CREATE POLICY "Authenticated read access" ON public.admin_settings
  FOR SELECT
  USING (auth.role() = 'authenticated');

-- 15. Trigger to auto-create user row on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.users (id, name, state, state_category, gst_threshold, onboarding_complete)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.email),
    'Maharashtra',
    'general',
    200000000, -- 20L in paise
    false
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 16. Create trigger
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
