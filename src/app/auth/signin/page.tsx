"use client";
import { Suspense } from "react";
import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Package, Eye, EyeOff, Loader2 } from "lucide-react";
import Link from "next/link";

function SignInForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/admin/shipments";
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });
    setLoading(false);
    if (result?.error) {
      setError("Invalid email or password");
    } else {
      router.push(callbackUrl);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label className="block text-sm font-medium text-text-muted mb-1.5">Email address</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          placeholder="admin@eazylogistics.com"
          className="w-full bg-surface-2 border border-[#2a2a3e] rounded-xl px-4 py-3 text-text-primary placeholder:text-text-muted/50 focus:outline-none focus:border-accent transition-colors text-sm"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-text-muted mb-1.5">Password</label>
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder="••••••••"
            className="w-full bg-surface-2 border border-[#2a2a3e] rounded-xl px-4 py-3 pr-12 text-text-primary placeholder:text-text-muted/50 focus:outline-none focus:border-accent transition-colors text-sm"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted hover:text-text-primary transition-colors"
          >
            {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {error && (
        <div className="bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3 text-red-400 text-sm">
          {error}
        </div>
      )}

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-accent hover:bg-accent-warm text-white font-semibold py-3 rounded-xl transition-colors flex items-center justify-center gap-2 disabled:opacity-60"
      >
        {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
        {loading ? "Signing in…" : "Sign In"}
      </button>
    </form>
  );
}

export default function SignInPage() {
  return (
    <div className="min-h-screen bg-surface-0 flex items-center justify-center px-4">
      <div className="grid-pattern absolute inset-0 opacity-30" />
      <div className="radial-gradient-orange absolute inset-0" />

      <div className="relative w-full max-w-md">
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2 mb-6">
            <div className="w-10 h-10 bg-accent rounded-xl flex items-center justify-center">
              <Package className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-text-primary">Eazy Logistics</span>
          </Link>
          <h1 className="text-2xl font-bold text-text-primary mb-2">Admin Portal</h1>
          <p className="text-text-muted text-sm">Sign in to manage shipments and operations</p>
        </div>

        <div className="glass rounded-2xl p-8">
          <Suspense fallback={<div className="text-text-muted text-sm text-center">Loading…</div>}>
            <SignInForm />
          </Suspense>
        </div>

        <p className="text-center text-text-muted text-xs mt-6">
          <Link href="/" className="hover:text-accent transition-colors">← Back to site</Link>
        </p>
      </div>
    </div>
  );
}
