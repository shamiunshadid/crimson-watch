// app/dashboard/layout.tsx
import { getCurrentUser } from "@/features/auth/server/use-cases/get-current-user";
import { redirect } from "next/navigation";
import { Sidebar } from "./_components/Sidebar";

// Force dynamic rendering because we use headers()
export const dynamic = 'force-dynamic';

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // This is an extra layer of protection (though middleware already handles it)
  const user = await getCurrentUser();

  if (!user) {
    redirect("/sign-in");
  }

  return (
    <div>
        <Sidebar user={user}/>
      <main>{children}</main>
    </div>
  );
}
