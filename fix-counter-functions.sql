-- =====================================================
-- FIX COUNTER FUNCTIONS FOR AIZEE WEBSITE
-- =====================================================

-- Fix the update_registered_users_count function
CREATE OR REPLACE FUNCTION public.update_registered_users_count()
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
    UPDATE public.site_stats 
    SET total_registered_users = (SELECT COUNT(*) FROM public.profiles),
        updated_at = NOW()
    WHERE id = (SELECT id FROM public.site_stats LIMIT 1);
END;
$$;

-- Fix the update_subscribed_users_count function
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

-- Update the counts now
SELECT public.update_registered_users_count();
SELECT public.update_subscribed_users_count();

-- Verify the fix
SELECT 
    'Current Stats:' as info,
    total_visitors,
    total_registered_users,
    total_subscribed_users
FROM public.site_stats;

-- Show actual counts for verification
SELECT 
    'Actual Profile Count:' as info,
    COUNT(*) as total_profiles,
    COUNT(CASE WHEN subscription_status = 'active' THEN 1 END) as active_subscriptions
FROM public.profiles; 