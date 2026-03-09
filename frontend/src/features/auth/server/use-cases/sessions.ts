import { db } from "@/db";
import { sessions, users, } from "@/db/schema";
import crypto from "crypto"
import { cookies, headers } from "next/headers";
import { getIpAdress } from "./location";
import { eq } from "drizzle-orm";



interface CreateSessionData {
    userId: string,
    sessionToken: string,
    userAgent: string,
    ip: string
}

export type UserWithSession = {
  id: number;
  fullName: string;
  email: string;
  session: {
    id: number; // Changed to number since your sessions.id is integer
    expiresAt: Date;
    userAgent: string | null;
    ip: string | null;
  };
};

// const sessionLifeTime = process.env.SESSION_LIFETIME;  //days
// const sessionName = process.env.SESSION_NAME;
// const sessionRefreshTime = process.env.SESSION_REFRESH_TIME;  //days

const SESSION_LIFETIME = 30;
const SESSION_NAME = "session";
const SESSION_REFRESH_TIME = 15;

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
export const setSessionToCookies = async(userId: string)=>{
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

    cookieStore.set(SESSION_NAME, token, {
        secure: process.env.NODE_ENV === 'production',
        httpOnly: true,
        sameSite: "lax",
        maxAge: SESSION_LIFETIME
    });
}


// Get the current user
export const getCurrentUsers = async()=>{
    try {
        const cookieStore = await cookies();
        const rawToken = cookieStore.get(SESSION_NAME)?.value;

        if(!rawToken) {
            return null;
        };

        // hasded token to search in the database
        const hashedToken = crypto.createHash("sha-256").update(rawToken).digest("hex");

        const session = await db.select({
            id: users.id,
            fullName: users.fullName,
            email: users.email,

            // Session fields
            sessionId: sessions.id,
            sessionExpiresAt: sessions.expiresAt,
            sessionUserAgent: sessions.userAgent,
            sessionIp: sessions.ip,
        })
        .from(sessions)
        .where(eq(sessions.sessionToken, hashedToken))
        .innerJoin(users, eq(users.id, sessions.userId))
        .limit(1);

        if(!session){
            return null;
        };

        const result = session[0];

        const currentTime = Date.now();
        const sessionExpirsAt = result.sessionExpiresAt.getTime();

        // check for session expired or not!!
        if(currentTime >= sessionExpirsAt){
            await db.delete(sessions).where(eq(sessions.id, result.sessionId))
            return null;
        }


        const refreshThreshold = sessionExpirsAt - (SESSION_REFRESH_TIME * 1000);

        if(currentTime >= refreshThreshold){
            await db.update(sessions).set({expiresAt: new Date(Date.now() + (SESSION_LIFETIME * 1000)),
                updatedAt: new Date(),
            }).where(eq(sessions.id, result.sessionId))
        }


        return {
            id: result.id,
            fullName: result.fullName,
            email: result.email,
            session: {
                id: result.sessionId,
                expiresAt: result.sessionExpiresAt,
                userAgent: result.sessionUserAgent,
                ip: result.sessionIp,
            }
        };

    } catch (error) {
        console.error("Error getting current user", error);
        return null;
    }
}


// For middleware
export const validateSession = async () => {
  try {
    const cookieStore = await cookies();
    const rawToken = cookieStore.get(SESSION_NAME)?.value;
    console.log("Raw token", rawToken);
    
    if (!rawToken) {
    console.log('❌ No session cookie found')
      return { isValid: false, user: null };
    }

    const hashedToken = crypto
      .createHash("sha256")
      .update(rawToken)
      .digest("hex");

    const [session] = await db
      .select()
      .from(sessions)
      .where(eq(sessions.sessionToken, hashedToken))
      .limit(1);

    console.log('Session found:', session ? 'Yes' : 'No')

    if (!session || session.expiresAt <= new Date()) {
        console.log('❌ Session not found in database')
      cookieStore.delete(SESSION_NAME);
      return { isValid: false, user: null };
    }

    // Get the user associated with this session
    const [user] = await db
      .select({
        id: users.id,
        fullName: users.fullName,
        email: users.email,
      })
      .from(users)
      .where(eq(users.id, session.userId))
      .limit(1);

    if (!user) {
      // User doesn't exist anymore, clean up session
      await db.delete(sessions).where(eq(sessions.id, session.id));
      cookieStore.delete(SESSION_NAME);
      return { isValid: false, user: null };
    }

    return {
      isValid: true,
      user: session,
      sessionId: session.id,
    };
  } catch (error) {
    console.error("Error validating session:", error);
    return { isValid: false, user: null };
  }
};


// For logout
export const deleteSession = async()=>{
    try {
        const cookieStore = await cookies();
        const rawToken = cookieStore.get(SESSION_NAME)?.value;

        if(rawToken){
            const hashedToken = crypto.createHash("sha-256").update(rawToken).digest("hex");

            await db.delete(sessions).where(eq(sessions.sessionToken, hashedToken))
        }

        cookieStore.delete(SESSION_NAME);

        return {
            success: true
        };


    } catch (error) {
        console.error("Error deleting sessions ",error)
    }
}