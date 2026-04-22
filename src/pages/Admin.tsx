import { useState } from "react";
import { Navigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Logo } from "@/components/Logo";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

const Admin = () => {
  const { session, loading } = useAuth();
  const [tab, setTab] = useState("signin");
  const [busy, setBusy] = useState(false);
  const [signIn, setSignIn] = useState({ email: "", password: "" });
  const [signUp, setSignUp] = useState({ name: "", email: "", password: "" });

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
    setBusy(true);
    const { error } = await supabase.auth.signInWithPassword(signIn);
    setBusy(false);
    if (error) toast.error(error.message);
    else toast.success("Welcome back!");
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    const { error } = await supabase.auth.signUp({
      email: signUp.email,
      password: signUp.password,
      options: {
        emailRedirectTo: `${window.location.origin}/admin`,
        data: { display_name: signUp.name },
      },
    });
    setBusy(false);
    if (error) {
      toast.error(error.message);
    } else {
      toast.success("Account created. You're signed in.");
    }
  };

  return (
    <div className="min-h-screen grid place-items-center bg-gradient-soft container-px py-12">
      <div className="w-full max-w-md rounded-3xl bg-card border border-border shadow-lift p-8">
        <div className="flex flex-col items-center text-center mb-6">
          <Logo size={56} />
          <h1 className="font-display font-extrabold text-2xl mt-4 text-foreground">Admin Access</h1>
          <p className="text-sm text-muted-foreground">Yuva Technologies Dashboard</p>
        </div>

        <Tabs value={tab} onValueChange={setTab}>
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
                <Label htmlFor="su-name">Name</Label>
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
              <Button type="submit" disabled={busy} className="w-full rounded-full h-11 shadow-glow">
                {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : "Create Account"}
              </Button>
            </form>
          </TabsContent>
        </Tabs>

        <a href="/" className="mt-6 block text-center text-xs text-muted-foreground hover:text-primary">
          ← Back to website
        </a>
      </div>
    </div>
  );
};

export default Admin;
