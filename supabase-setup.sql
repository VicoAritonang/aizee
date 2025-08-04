-- Buat tabel profiles
CREATE TABLE IF NOT EXISTS profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  name TEXT,
  email TEXT,
  subscription_status TEXT DEFAULT 'inactive',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Drop existing objects first
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
DROP TRIGGER IF EXISTS on_user_metadata_updated ON auth.users;
DROP FUNCTION IF EXISTS public.handle_new_user();
DROP FUNCTION IF EXISTS public.handle_user_metadata_change();

-- Drop and recreate site_stats table
DROP TABLE IF EXISTS public.site_stats;

-- Create site_stats table
CREATE TABLE IF NOT EXISTS public.site_stats (
    id SERIAL PRIMARY KEY,
    total_visitors BIGINT DEFAULT 0,
    total_registered_users BIGINT DEFAULT 0,
    total_subscribed_users BIGINT DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert initial data if table is empty
INSERT INTO public.site_stats (total_visitors, total_registered_users, total_subscribed_users)
SELECT 0, 0, 0
WHERE NOT EXISTS (SELECT 1 FROM public.site_stats);

-- Create function to increment visitors
CREATE OR REPLACE FUNCTION public.increment_visitors()
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
    UPDATE public.site_stats 
    SET total_visitors = total_visitors + 1,
        updated_at = NOW()
    WHERE id = (SELECT id FROM public.site_stats LIMIT 1);
END;
$$;

-- Drop existing functions first
DROP FUNCTION IF EXISTS public.update_registered_users_count();
DROP FUNCTION IF EXISTS public.update_subscribed_users_count();
DROP FUNCTION IF EXISTS public.increment_visitors();

-- Create function to update registered users count
CREATE OR REPLACE FUNCTION public.update_registered_users_count()
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
    UPDATE public.site_stats 
    SET total_registered_users = (SELECT COUNT(*) FROM auth.users),
        updated_at = NOW()
    WHERE id = (SELECT id FROM public.site_stats LIMIT 1);
END;
$$;

-- Create function to update subscribed users count
CREATE OR REPLACE FUNCTION public.update_subscribed_users_count()
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
    UPDATE public.site_stats 
    SET total_subscribed_users = (
        SELECT COUNT(*) 
        FROM auth.users 
        WHERE raw_user_meta_data->>'subscription_status' = 'active'
    ),
    updated_at = NOW()
    WHERE id = (SELECT id FROM public.site_stats LIMIT 1);
END;
$$;

-- Create trigger to update registered users count when user is created
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
    PERFORM public.update_registered_users_count();
    RETURN NEW;
END;
$$;

-- Create trigger
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW
    EXECUTE FUNCTION public.handle_new_user();

-- Create trigger to update subscribed users count when user metadata changes
CREATE OR REPLACE FUNCTION public.handle_user_metadata_change()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
    IF OLD.raw_user_meta_data->>'subscription_status' IS DISTINCT FROM NEW.raw_user_meta_data->>'subscription_status' THEN
        PERFORM public.update_subscribed_users_count();
    END IF;
    RETURN NEW;
END;
$$;

-- Create trigger
DROP TRIGGER IF EXISTS on_user_metadata_updated ON auth.users;
CREATE TRIGGER on_user_metadata_updated
    AFTER UPDATE ON auth.users
    FOR EACH ROW
    EXECUTE FUNCTION public.handle_user_metadata_change();

-- Atur RLS profiles
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own profile" ON profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON profiles
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile" ON profiles
  FOR INSERT WITH CHECK (auth.uid() = id);

-- Enable Row Level Security
ALTER TABLE public.site_stats ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Allow public read access to site_stats" ON public.site_stats
    FOR SELECT USING (true);

CREATE POLICY "Allow authenticated users to update site_stats" ON public.site_stats
    FOR UPDATE USING (auth.role() = 'authenticated');

-- Grant necessary permissions
GRANT USAGE ON SCHEMA public TO anon, authenticated;
GRANT ALL ON public.profiles TO anon, authenticated;
GRANT ALL ON public.site_stats TO anon, authenticated;
GRANT EXECUTE ON FUNCTION public.increment_visitors() TO anon, authenticated;
GRANT EXECUTE ON FUNCTION public.update_registered_users_count() TO anon, authenticated;
GRANT EXECUTE ON FUNCTION public.update_subscribed_users_count() TO anon, authenticated;

-- Initialize counts
SELECT public.update_registered_users_count();
SELECT public.update_subscribed_users_count();
