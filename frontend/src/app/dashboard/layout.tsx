// app/dashboard/layout.tsx
import { getCurrentUsers } from "@/features/auth/server/use-cases/sessions";
import { redirect } from "next/navigation";
import { Sidebar } from "./_components/Sidebar";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // This is an extra layer of protection (though middleware already handles it)
  const user = await getCurrentUsers();

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
