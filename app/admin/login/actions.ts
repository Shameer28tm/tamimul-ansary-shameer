"use server";

import { timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { createAdminSessionToken } from "@/lib/admin-session";

export async function login(formData: FormData) {
  const configuredPassword = process.env.ADMIN_PASSWORD;
  const submittedPassword = formData.get("password");
  if (!configuredPassword || typeof submittedPassword !== "string") redirect("/admin/login?error=1");

  const expected = Buffer.from(configuredPassword);
  const received = Buffer.from(submittedPassword);
  const valid = expected.length === received.length && timingSafeEqual(expected, received);
  if (!valid) redirect("/admin/login?error=1");

  const token = await createAdminSessionToken();
  (await cookies()).set("portfolio_admin", token, {
    httpOnly: true,
    sameSite: "strict",
    secure: process.env.NODE_ENV === "production",
    path: "/admin",
    maxAge: 60 * 60 * 8,
  });
  redirect("/admin");
}
