"use server";

import { deleteSession } from "@/features/auth/server/use-cases/sessions";
import { redirect } from "next/navigation";

export async function signOut() {
  await deleteSession();
  redirect("/");
};