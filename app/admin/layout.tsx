import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { verifyAdminSessionToken } from "@/lib/admin-session";

export default async function AdminLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const cookieStore = await cookies();
  const token = cookieStore.get("portfolio_admin")?.value;
  if (!(await verifyAdminSessionToken(token))) redirect("/admin/login");
  return children;
}
