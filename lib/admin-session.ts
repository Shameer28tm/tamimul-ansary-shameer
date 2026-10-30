import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { sessionCookieName, verifySessionToken } from "@/lib/auth";

export async function hasAdminSession() {
  const store = await cookies();
  return verifySessionToken(store.get(sessionCookieName())?.value);
}

/** Server-side authorization check — run in every admin page/action, independent of middleware. */
export async function requireAdmin() {
  if (!(await hasAdminSession())) redirect("/admin/login");
}
