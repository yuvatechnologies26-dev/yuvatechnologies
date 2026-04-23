
-- 1) RPC to redeem admin signup code (bypasses RLS via SECURITY DEFINER)
CREATE OR REPLACE FUNCTION public.redeem_admin_code(_code text)
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  uid uuid := auth.uid();
BEGIN
  IF uid IS NULL THEN
    RAISE EXCEPTION 'Not authenticated';
  END IF;
  IF _code IS NULL OR _code <> 'Rishi@123' THEN
    RETURN false;
  END IF;
  INSERT INTO public.user_roles (user_id, role)
  VALUES (uid, 'admin'::app_role)
  ON CONFLICT (user_id, role) DO NOTHING;
  RETURN true;
END;
$$;

-- ensure unique constraint exists for ON CONFLICT (no-op if already there)
DO $$ BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint WHERE conname = 'user_roles_user_id_role_key'
  ) THEN
    BEGIN
      ALTER TABLE public.user_roles ADD CONSTRAINT user_roles_user_id_role_key UNIQUE (user_id, role);
    EXCEPTION WHEN duplicate_table OR duplicate_object THEN NULL;
    END;
  END IF;
END $$;

-- 2) Allow public to submit testimonials (will be inserted as approved=false by default)
CREATE POLICY "Public can submit testimonials"
ON public.testimonials
FOR INSERT
TO anon, authenticated
WITH CHECK (approved = false);
