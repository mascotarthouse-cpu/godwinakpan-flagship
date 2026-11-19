"use client";
import { useActionState } from "react";
import { login } from "../actions";

export default function LoginForm({ next }: { next: string }) {
  const [state, action, pending] = useActionState(login, null as null | { error: string; email: string });
  const f = "w-full rounded-xl border border-sky/15 bg-transparent px-4 py-3.5 outline-none focus:border-red";
  return (
    <form action={action} className="mt-10 space-y-3">
      <input type="hidden" name="next" value={next} />
      <input name="email" type="email" required placeholder="Email" defaultValue={state?.email} key={state?.email ?? "e"} className={f} autoComplete="username" />
      <input name="password" type="password" required placeholder="Password" className={f} autoComplete="current-password" />
      <button disabled={pending} className="btn-light w-full justify-center">{pending ? "Signing in…" : "Sign in"}</button>
      {state?.error && <p className="text-sm text-red" data-error>{state.error}</p>}
    </form>
  );
}
