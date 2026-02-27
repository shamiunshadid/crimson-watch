import { db } from "@/db";
import { sessions } from "@/db/schema";
import crypto from "crypto"
import { cookies, headers } from "next/headers";
import { getIpAdress } from "./location";



interface CreateSessionData {
    userId: number,
    sessionToken: string,
    userAgent: string,
    ip: string
}

const SESSION_LIFETIME = 30;

// generate a random token
const generateRandomSessionToken = ()=>{
    return crypto.randomBytes(32).toString("hex");
};

// get the exact expiration date
export function getSessionExpiryDate(): Date{
    const date = new Date();
    date.setDate(date.getDate() + SESSION_LIFETIME);
    return date;
};


// create and insert session in db 
export const createNewSession = async({userId, sessionToken, userAgent, ip}: CreateSessionData)=>{

    const hashedToken = crypto.createHash("sha-256").update(sessionToken).digest("hex");
    const expiresAt = getSessionExpiryDate();

    const session = await db.insert(sessions).values({
        userId,
        sessionToken: hashedToken,
        userAgent,
        ip,
        // expiresAt: new Date(Date.now() + SESSION_LIFETIME * 1000)
        expiresAt
    });

    return session;
}


// set session to cookies
export const setSessionToCookies = async(userId: number)=>{
    const cookieStore = await cookies();

    const token = generateRandomSessionToken();
    const ip = await getIpAdress();
    const headerList = await headers();

    await createNewSession({
        sessionToken: token,
        userId,
        ip,
        userAgent: headerList.get("user-agent") || ""
    });

    cookieStore.set("session", token, {
        secure: true,
        httpOnly: true,
        sameSite: "lax",
        maxAge: SESSION_LIFETIME
    });
}