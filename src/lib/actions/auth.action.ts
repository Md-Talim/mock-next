"use server";

import { auth, db } from "@/firebase/admin";
import { cookies } from "next/headers";

interface SignUpParams {
  uid: string;
  name: string;
  email: string;
  password: string;
}

interface SignInParams {
  email: string;
  idToken: string;
}

const SESSION_DURATION = 60 * 60 * 24 * 7; // One Week

/**
 * Sets the the session cookie for the given ID token.
 * @param idToken - Firebase ID token of the user
 */
export async function setSessionCookie(idToken: string) {
  const cookieStore = await cookies();

  // Create session cookie
  const sessionCookie = await auth.createSessionCookie(idToken, {
    expiresIn: SESSION_DURATION * 1000,
  });

  // Set cookie in the browser
  cookieStore.set("session", sessionCookie, {
    maxAge: SESSION_DURATION,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
  });
}

/**
 * Signs in a user using their email and ID token.
 *
 * @param params - An object containing the user's email and ID token.
 * @param params.email - The email of the user attempting to sign in.
 * @param params.idToken - The Firebase ID token of the user.
 * @returns An object indicating the success or failure of the sign-in attempt.
 *          If successful, sets a session cookie for the user.
 */
export async function SignIn(params: SignInParams) {
  const { email, idToken } = params;

  try {
    const userRecord = await auth.getUserByEmail(email);

    if (!userRecord) {
      return {
        success: false,
        message: "User does not exist. Create an account instead.",
      };
    }

    await setSessionCookie(idToken);
  } catch (e) {
    console.error(e);
    return {
      success: false,
      message: "Failed to sign in.",
    };
  }
}

/**
 * Signs up a new user by creating a user record in the database.
 *
 * @param params - An object containing the user's sign-up details.
 * @param params.uid - The unique identifier for the user.
 * @param params.name - The name of the user.
 * @param params.email - The email address of the user.
 * @param params.password - The password for the user's account.
 * @returns An object indicating the success or failure of the sign-up attempt.
 *          If successful, the user record is created in the database.
 */
export async function signUp(params: SignUpParams) {
  const { uid, name, email } = params;

  try {
    const userRecord = await db.collection("users").doc(uid).get();
    if (userRecord.exists) {
      return {
        success: false,
        message: "User already exists. Please sign in instead.",
      };
    }

    await db.collection("users").doc(uid).set({
      name,
      email,
    });

    return {
      success: true,
      message: "Account created successfully. Please sign in.",
    };
  } catch (e: any) {
    console.error("Error creating a user", e);
    console.log(e.message);

    if (e.code === "auth/email-already-in-use") {
      return {
        success: false,
        message: "Email already in use",
      };
    }

    return {
      success: false,
      message: "Failed to create an account.",
    };
  }
}

/**
 * Retrieves the current authenticated user based on the session cookie.
 *
 * @returns A promise that resolves to the current user object if authenticated,
 *          or null if no valid session is found or the user does not exist.
 * @throws An error if there is an issue verifying the session cookie or fetching the user data.
 */
export async function getCurrentUser(): Promise<User | null> {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get("session")?.value;

  if (!sessionCookie) {
    return null;
  }

  try {
    const decodecClaims = await auth.verifySessionCookie(sessionCookie, true);
    const userRecord = await db
      .collection("users")
      .doc(decodecClaims.uid)
      .get();

    if (!userRecord.exists) {
      return null;
    }

    return {
      ...userRecord.data(),
      id: userRecord.id,
    } as User;
  } catch (error) {
    throw new Error(`Error getting current user: ${error}`);
  }
}

/**
 * Checks if the current user is authenticated.
 *
 * @returns A promise that resolves to `true` if the user is authenticated, `false` otherwise.
 */
export async function isAuthenticated() {
  const currentUser = await getCurrentUser();
  return !!currentUser;
}
