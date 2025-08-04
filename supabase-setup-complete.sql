-- =====================================================
-- COMPLETE SETUP FOR AIZEE WEBSITE
-- =====================================================

-- Step 1: Drop all existing objects
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
DROP TRIGGER IF EXISTS on_user_metadata_updated ON auth.users;
DROP FUNCTION IF EXISTS public.handle_new_user();
DROP FUNCTION IF EXISTS public.handle_user_metadata_change();
DROP FUNCTION IF EXISTS public.update_registered_users_count();
DROP FUNCTION IF EXISTS public.update_subscribed_users_count();
DROP FUNCTION IF EXISTS public.increment_visitors();
DROP TABLE IF EXISTS public.site_stats;
DROP TABLE IF EXISTS public.profiles;

-- Step 2: Create profiles table with proper foreign key
CREATE TABLE public.profiles (
    id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
    name TEXT,
    email TEXT,
    subscription_status TEXT DEFAULT 'inactive',
    subscription_start_date TIMESTAMP WITH TIME ZONE,
    subscription_end_date TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Step 3: Create site_stats table
CREATE TABLE public.site_stats (
    id SERIAL PRIMARY KEY,
    total_visitors BIGINT DEFAULT 0,
    total_registered_users BIGINT DEFAULT 0,
    total_subscribed_users BIGINT DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Step 4: Insert initial data
INSERT INTO public.site_stats (total_visitors, total_registered_users, total_subscribed_users)
VALUES (0, 0, 0);

-- Step 5: Create functions
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

CREATE OR REPLACE FUNCTION public.update_subscribed_users_count()
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
    UPDATE public.site_stats 
    SET total_subscribed_users = (
        SELECT COUNT(*) 
        FROM public.profiles 
        WHERE subscription_status = 'active'
    ),
    updated_at = NOW()
    WHERE id = (SELECT id FROM public.site_stats LIMIT 1);
END;
$$;

-- Step 6: Create trigger functions
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
    -- Wait a bit to ensure user is fully created
    PERFORM pg_sleep(0.1);
    
    -- Insert profile for new user
    INSERT INTO public.profiles (id, name, email)
    VALUES (NEW.id, COALESCE(NEW.raw_user_meta_data->>'name', 'User'), NEW.email)
    ON CONFLICT (id) DO NOTHING;
    
    -- Update registered users count
    PERFORM public.update_registered_users_count();
    
    RETURN NEW;
END;
$$;

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

-- Step 7: Create triggers
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW
    EXECUTE FUNCTION public.handle_new_user();

CREATE TRIGGER on_user_metadata_updated
    AFTER UPDATE ON auth.users
    FOR EACH ROW
    EXECUTE FUNCTION public.handle_user_metadata_change();

-- Step 8: Enable Row Level Security
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.site_stats ENABLE ROW LEVEL SECURITY;

-- Step 9: Create policies for profiles
CREATE POLICY "Users can view own profile" ON public.profiles
    FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON public.profiles
    FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile" ON public.profiles
    FOR INSERT WITH CHECK (auth.uid() = id);

-- Step 10: Create policies for site_stats
CREATE POLICY "Allow public read access to site_stats" ON public.site_stats
    FOR SELECT USING (true);

CREATE POLICY "Allow authenticated users to update site_stats" ON public.site_stats
    FOR UPDATE USING (auth.role() = 'authenticated');

-- Step 11: Grant permissions
GRANT USAGE ON SCHEMA public TO anon, authenticated;
GRANT ALL ON public.profiles TO anon, authenticated;
GRANT ALL ON public.site_stats TO anon, authenticated;
GRANT EXECUTE ON FUNCTION public.increment_visitors() TO anon, authenticated;
GRANT EXECUTE ON FUNCTION public.update_registered_users_count() TO anon, authenticated;
GRANT EXECUTE ON FUNCTION public.update_subscribed_users_count() TO anon, authenticated;

-- Step 12: Initialize counts
SELECT public.update_registered_users_count();
SELECT public.update_subscribed_users_count();

-- Step 13: Verify setup
SELECT 'Setup completed successfully!' as status;
SELECT * FROM public.site_stats; 