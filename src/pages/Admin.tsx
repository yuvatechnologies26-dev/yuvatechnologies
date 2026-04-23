import { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Logo } from "@/components/Logo";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";
import { Loader2, ArrowLeft } from "lucide-react";

const ADMIN_SIGNUP_CODE = "Rishi@123";

const Admin = () => {
  const { session, loading } = useAuth();
  const [tab, setTab] = useState("signin");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [signIn, setSignIn] = useState({ email: "", password: "" });
  const [signUp, setSignUp] = useState({ name: "", email: "", password: "", code: "" });

  if (loading) {
    return (
      <div className="min-h-screen grid place-items-center bg-gradient-soft">
        <Loader2 className="h-6 w-6 animate-spin text-primary" />
      </div>
    );
  }

  if (session) return <Navigate to="/admin/dashboard" replace />;

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null); setSuccess(null); setBusy(true);
    const { error } = await supabase.auth.signInWithPassword(signIn);
    setBusy(false);
    if (error) {
      setError(error.message);
    } else {
      toast.success("Welcome back!");
    }
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null); setSuccess(null);

    if (signUp.code !== ADMIN_SIGNUP_CODE) {
      setError("Invalid signup code. Please contact the administrator.");
      return;
    }

    setBusy(true);
    const { data, error } = await supabase.auth.signUp({
      email: signUp.email,
      password: signUp.password,
      options: {
        emailRedirectTo: `${window.location.origin}/admin`,
        data: { display_name: signUp.name },
      },
    });

    if (error) {
      setBusy(false);
      setError(error.message);
      return;
    }

    // If we have an active session immediately (email confirm off), grant admin role via RPC
    if (data.session) {
      await (supabase as any).rpc("redeem_admin_code", { _code: signUp.code });
    } else {
      // Try sign in (in case auto-confirm is on but signUp didn't return a session)
      const { data: signInData } = await supabase.auth.signInWithPassword({
        email: signUp.email,
        password: signUp.password,
      });
      if (signInData.session) {
        await (supabase as any).rpc("redeem_admin_code", { _code: signUp.code });
      }
    }

    setBusy(false);
    setSuccess("Account created! Logging you in…");
    setTimeout(() => {
      setTab("signin");
      setSignIn({ email: signUp.email, password: "" });
      setSuccess(null);
    }, 1500);
  };

  return (
    <div className="min-h-screen grid place-items-center bg-gradient-soft container-px py-12">
      <div className="w-full max-w-md rounded-3xl bg-card border border-border shadow-lift p-8">
        <Link to="/" className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-primary mb-4">
          <ArrowLeft className="h-3 w-3" /> Back to website
        </Link>

        <div className="flex flex-col items-center text-center mb-6">
          <Logo size={56} />
          <h1 className="font-display font-extrabold text-2xl mt-4 text-foreground">Admin Access</h1>
          <p className="text-sm text-muted-foreground">Yuva Technologies Dashboard</p>
        </div>

        {error && (
          <div className="mb-4 rounded-lg bg-destructive/10 text-destructive border border-destructive/30 px-3 py-2 text-sm">
            {error}
          </div>
        )}
        {success && (
          <div className="mb-4 rounded-lg bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-500/30 px-3 py-2 text-sm">
            {success}
          </div>
        )}

        <Tabs value={tab} onValueChange={(v) => { setTab(v); setError(null); setSuccess(null); }}>
          <TabsList className="grid grid-cols-2 w-full">
            <TabsTrigger value="signin">Sign In</TabsTrigger>
            <TabsTrigger value="signup">Sign Up</TabsTrigger>
          </TabsList>

          <TabsContent value="signin" className="mt-5">
            <form onSubmit={handleSignIn} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="si-email">Email</Label>
                <Input id="si-email" type="email" required autoComplete="email"
                  value={signIn.email} onChange={(e) => setSignIn({ ...signIn, email: e.target.value })} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="si-password">Password</Label>
                <Input id="si-password" type="password" required autoComplete="current-password"
                  value={signIn.password} onChange={(e) => setSignIn({ ...signIn, password: e.target.value })} />
              </div>
              <Button type="submit" disabled={busy} className="w-full rounded-full h-11 shadow-glow">
                {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : "Sign In"}
              </Button>
            </form>
          </TabsContent>

          <TabsContent value="signup" className="mt-5">
            <form onSubmit={handleSignUp} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="su-name">Full Name</Label>
                <Input id="su-name" required value={signUp.name}
                  onChange={(e) => setSignUp({ ...signUp, name: e.target.value })} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="su-email">Email</Label>
                <Input id="su-email" type="email" required autoComplete="email"
                  value={signUp.email} onChange={(e) => setSignUp({ ...signUp, email: e.target.value })} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="su-password">Password</Label>
                <Input id="su-password" type="password" required minLength={8} autoComplete="new-password"
                  value={signUp.password} onChange={(e) => setSignUp({ ...signUp, password: e.target.value })} />
                <p className="text-xs text-muted-foreground">Minimum 8 characters.</p>
              </div>
              <div className="space-y-2">
                <Label htmlFor="su-code">Signup Code</Label>
                <Input id="su-code" required placeholder="Enter access code"
                  value={signUp.code} onChange={(e) => setSignUp({ ...signUp, code: e.target.value })} />
              </div>
              <Button type="submit" disabled={busy} className="w-full rounded-full h-11 shadow-glow">
                {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : "Create Account"}
              </Button>
            </form>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Admin;
