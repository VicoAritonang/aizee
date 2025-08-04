-- Aizee Database Setup - Updated for Competition
-- Jalankan script ini di Supabase SQL Editor

-- Enable Row Level Security
ALTER TABLE auth.users ENABLE ROW LEVEL SECURITY;

-- Buat tabel profiles
CREATE TABLE IF NOT EXISTS profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  name TEXT,
  email TEXT,
  subscription_status TEXT DEFAULT 'inactive',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Buat tabel site_stats untuk tracking pengunjung website
CREATE TABLE IF NOT EXISTS site_stats (
  id INTEGER PRIMARY KEY DEFAULT 1,
  total_visitors INTEGER DEFAULT 0,
  total_registered_users INTEGER DEFAULT 0,
  total_subscribed_users INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Fungsi untuk menambah visitor
CREATE OR REPLACE FUNCTION increment_visitors()
RETURNS INTEGER AS $$
BEGIN
  UPDATE site_stats 
  SET total_visitors = total_visitors + 1, 
      updated_at = NOW()
  WHERE id = 1;
  RETURN (SELECT total_visitors FROM site_stats WHERE id = 1);
END;
$$ LANGUAGE plpgsql;

-- Fungsi untuk update total registered users
CREATE OR REPLACE FUNCTION update_registered_users_count()
RETURNS INTEGER AS $$
BEGIN
  UPDATE site_stats 
  SET total_registered_users = (SELECT COUNT(*) FROM auth.users),
      updated_at = NOW()
  WHERE id = 1;
  RETURN (SELECT total_registered_users FROM site_stats WHERE id = 1);
END;
$$ LANGUAGE plpgsql;

-- Fungsi untuk update total subscribed users
CREATE OR REPLACE FUNCTION update_subscribed_users_count()
RETURNS INTEGER AS $$
BEGIN
  UPDATE site_stats 
  SET total_subscribed_users = (
    SELECT COUNT(*) 
    FROM profiles 
    WHERE subscription_status = 'active'
  ),
  updated_at = NOW()
  WHERE id = 1;
  RETURN (SELECT total_subscribed_users FROM site_stats WHERE id = 1);
END;
$$ LANGUAGE plpgsql;

-- Insert site_stats awal
INSERT INTO site_stats (id, total_visitors, total_registered_users, total_subscribed_users) 
VALUES (1, 0, 0, 0)
ON CONFLICT (id) DO NOTHING;

-- Atur RLS profiles
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own profile" ON profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON profiles
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile" ON profiles
  FOR INSERT WITH CHECK (auth.uid() = id);

-- Atur RLS site_stats (public read, admin write)
ALTER TABLE site_stats ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can read site stats" ON site_stats
  FOR SELECT USING (true);

CREATE POLICY "Authenticated users can update site stats" ON site_stats
  FOR UPDATE USING (auth.uid() IS NOT NULL);

-- Trigger untuk update registered users count ketika user baru signup
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  -- Insert profile
  INSERT INTO public.profiles (id, name, email)
  VALUES (NEW.id, NEW.raw_user_meta_data->>'name', NEW.email);
  
  -- Update registered users count
  PERFORM update_registered_users_count();
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Trigger untuk update subscribed users count ketika subscription status berubah
CREATE OR REPLACE FUNCTION handle_subscription_update()
RETURNS TRIGGER AS $$
BEGIN
  -- Update subscribed users count
  PERFORM update_subscribed_users_count();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger untuk subscription updates
DROP TRIGGER IF EXISTS on_subscription_updated ON profiles;
CREATE TRIGGER on_subscription_updated
  AFTER UPDATE OF subscription_status ON profiles
  FOR EACH ROW EXECUTE FUNCTION public.handle_subscription_update();

-- Perizinan
GRANT USAGE ON SCHEMA public TO anon, authenticated;
GRANT ALL ON public.profiles TO anon, authenticated;
GRANT ALL ON public.site_stats TO anon, authenticated;
GRANT EXECUTE ON FUNCTION public.increment_visitors() TO anon, authenticated;
GRANT EXECUTE ON FUNCTION public.update_registered_users_count() TO anon, authenticated;
GRANT EXECUTE ON FUNCTION public.update_subscribed_users_count() TO anon, authenticated;
GRANT EXECUTE ON FUNCTION public.handle_new_user() TO anon, authenticated;
GRANT EXECUTE ON FUNCTION public.handle_subscription_update() TO anon, authenticated;

-- Update initial counts
SELECT update_registered_users_count();
SELECT update_subscribed_users_count(); 