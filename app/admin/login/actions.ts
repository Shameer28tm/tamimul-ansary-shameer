"use server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { createSessionToken, SESSION_TTL_SECONDS, sessionCookieName, verifyPassword, isAdminConfigured } from "@/lib/auth";

const FAILURE_DELAY_MS = 750;

export async function login(formData: FormData) {
  if (!isAdminConfigured()) redirect("/admin/login?error=config");
  const ok = await verifyPassword(formData.get("password"));
  if (!ok) {
    // Slow down online guessing; serverless instances do not share memory, so a fixed delay is the portable option.
    await new Promise((r) => setTimeout(r, FAILURE_DELAY_MS));
    redirect("/admin/login?error=1");
  }
  const token = await createSessionToken();
  if (!token) redirect("/admin/login?error=config");
  (await cookies()).set(sessionCookieName(), token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
    maxAge: SESSION_TTL_SECONDS,
  });
  redirect("/admin");
}

export async function logout() {
  (await cookies()).set(sessionCookieName(), "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
    maxAge: 0,
  });
  redirect("/admin/login");
}
