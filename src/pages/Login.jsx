import { useState } from "react";
import { Navigate } from "react-router-dom";
import { supabase } from "../lib/supabase";
import { useSession } from "../lib/useSession";
import { SF } from "../lib/constants";
import { inputCls } from "../lib/inputCls";
import Logo from "../components/Logo";
import Field from "../components/Field";
import PillButton from "../components/PillButton";

export default function LoginPage() {
  const session = useSession();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  if (session === undefined) {
    return (
      <div className="min-h-screen flex items-center justify-center text-sm text-neutral-400">
        Loading…
      </div>
    );
  }

  if (session) {
    return <Navigate to="/listings" replace />;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setLoading(false);
    if (error) setError(error.message);
  }

  return (
    <div style={{ fontFamily: SF }} className="min-h-screen bg-white text-neutral-900 flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="flex justify-center mb-10">
          <Logo />
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Field label="Email">
            <input
              type="email"
              required
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className={inputCls}
            />
          </Field>
          <Field label="Password">
            <input
              type="password"
              required
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className={inputCls}
            />
          </Field>
          {error && <p className="text-sm text-rose-600">{error}</p>}
          <PillButton type="submit" variant="accent" className="w-full mt-2" disabled={loading}>
            {loading ? "Signing in…" : "Sign in"}
          </PillButton>
        </form>
      </div>
    </div>
  );
}
