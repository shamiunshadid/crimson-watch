import { auth } from "@/features/auth/auth";
import { headers } from "next/headers";

export const getCurrentUser = async () => {
  
  try {
    const headersList = await headers();
    
    const session = await auth.api.getSession({
      headers: headersList,
    });

    if (!session) {
      return null;
    }

    
    return {
      id: session.user.id,
      name: session.user.name,
      email: session.user.email,
      image: session.user.image,
    };
  } catch (error) {
    console.error("Error getting current user:", error);
    return null;
  }
};
