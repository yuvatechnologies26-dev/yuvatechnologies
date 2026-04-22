import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

type TableName =
  | "site_settings"
  | "services"
  | "pricing_plans"
  | "one_time_services"
  | "impact_stats"
  | "process_steps"
  | "team_members"
  | "testimonials"
  | "portfolio_items"
  | "faqs"
  | "trusted_creators";

export const useCMS = <T = any>(
  table: TableName,
  options: { orderBy?: string; ascending?: boolean; filter?: { column: string; value: any } } = {},
) => {
  const { orderBy = "sort_order", ascending = true, filter } = options;
  const [data, setData] = useState<T[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    const load = async () => {
      const client = supabase as any;
      let q = client.from(table).select("*").order(orderBy, { ascending });
      if (filter) q = q.eq(filter.column, filter.value);
      const { data: rows, error } = await q;
      if (!cancelled) {
        if (!error && rows) setData(rows as T[]);
        setLoading(false);
      }
    };
    load();

    const channel = supabase
      .channel(`cms-${table}`)
      .on("postgres_changes", { event: "*", schema: "public", table }, () => load())
      .subscribe();

    return () => {
      cancelled = true;
      supabase.removeChannel(channel);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [table]);

  return { data, loading };
};

export const useIsAdmin = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const check = async (uid: string | undefined) => {
      if (!uid) { setIsAdmin(false); setLoading(false); return; }
      const { data } = await supabase.from("user_roles").select("role").eq("user_id", uid).eq("role", "admin").maybeSingle();
      setIsAdmin(!!data);
      setLoading(false);
    };

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_e, s) => check(s?.user?.id));
    supabase.auth.getSession().then(({ data: { session } }) => check(session?.user?.id));
    return () => subscription.unsubscribe();
  }, []);

  return { isAdmin, loading };
};
