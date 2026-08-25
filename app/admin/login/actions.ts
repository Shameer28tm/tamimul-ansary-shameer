"use server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
export async function login(formData: FormData) { const valid = process.env.ADMIN_PASSWORD; if (!valid || formData.get("password") !== valid) redirect("/admin/login?error=1"); (await cookies()).set("portfolio_admin", "authenticated", { httpOnly: true, sameSite: "strict", secure: process.env.NODE_ENV === "production", path: "/" }); redirect("/admin"); }
