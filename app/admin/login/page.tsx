import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { login } from "./actions";
import { hasAdminSession } from "@/lib/admin-session";
import { isAdminConfigured, MIN_PASSWORD_LENGTH } from "@/lib/auth";

export const metadata: Metadata = { robots: { index: false, follow: false }, title: "Admin sign in" };
export const dynamic = "force-dynamic";

export default async function Login({ searchParams }: { searchParams: Promise<{ error?: string }> }) {
  if (await hasAdminSession()) redirect("/admin");
  const { error } = await searchParams;
  const configured = isAdminConfigured();
  return (
    <main id="main" className="admin-login">
      <form action={login}>
        <p className="label">Private area</p>
        <h1>Studio access</h1>
        {configured ? (
          <>
            <p>Enter the password configured in your environment.</p>
            <label htmlFor="password">Password</label>
            <input id="password" name="password" type="password" autoComplete="current-password" required autoFocus />
            {error === "1" && (
              <p className="form-error" role="alert">
                That password did not match.
              </p>
            )}
            <button type="submit">Enter admin</button>
          </>
        ) : (
          <p className="form-error" role="alert">
            Admin access is disabled. Set <code>ADMIN_PASSWORD</code> (at least {MIN_PASSWORD_LENGTH} characters) in the
            deployment environment.
          </p>
        )}
      </form>
    </main>
  );
}
