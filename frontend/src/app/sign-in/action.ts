'use server';

import { db } from "@/db";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";
import argon2 from "argon2"
import { setSessionToCookies } from "@/features/auth/server/use-cases/sessions";


interface Data {
    email: string,
    password: string
}

export const signInAction = async(data: Data)=>{

    try {
        
        const {email, password} = data;
        
        const [user] = await db.select().from(users).where(eq(users.email, email));

    if(!user){
        return {
            status: "ERROR",
            message: "Invalid email or password"
        }
    };

    const isValidatedPassword = await argon2.verify(user.password, password);

    if(!isValidatedPassword){
        return {
            status: "ERROR",
            message: "Invalid email or password"
        }
    }
    
    await setSessionToCookies(user.id);

    return {
        status: "SUCCESS",
        message: "Login successfull.."

    }
    } catch (error) {
        console.error(error)
        return {
            status: "ERROR",
            message: "Opps, unknown error occured.!!"
        }
    }
}

