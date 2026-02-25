"use server";

import { db } from "@/db";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";
import argon2 from "argon2"


export interface Data {
  fullName: string;
  email: string;
  password: string;
}

export const registrationAction = async (data: Data) => {
  try {
    const { fullName, email, password } = data;

    // check if email already exist or not
    const [user] = await db.select().from(users).where(eq(users.email, email));

    if (user && user.email === email) {
      return {
        status: "ERROR",
        message: "Email already exists",
      };
    }

    // hash password
    const hashedPassword = await argon2.hash(password)

    // insert to database
    await db.insert(users).values({fullName, email, password: hashedPassword})

    return {
        status: "SUCCESS",
        message: "Sign up successfull.."
    }


  } catch (error) {
    console.error(error);
    return {
        status: "ERROR",
        message: "Opps, unknown error occured.!!"
    }
  }
};
