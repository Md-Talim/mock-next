import { db } from "@/firebase/admin";

/**
 * Fetches interviews for a specific user by their user ID.
 *
 * @param userId - The ID of the user whose interviews are to be fetched.
 * @returns A promise that resolves to an array of Interview objects or null if no interviews are found.
 */
export async function getInterviewsByUserId(
  userId: string,
): Promise<Interview[] | null> {
  const interviews = await db
    .collection("interviews")
    .where("userId", "==", userId)
    .orderBy("createdAt", "desc")
    .get();

  return interviews.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as Interview[];
}

/**
 * Fetches the latest finalized interviews, excluding those of a specific user.
 *
 * @param userId - The ID of the user whose interviews are to be excluded.
 * @param limit - The maximum number of interviews to fetch. Defaults to 20.
 * @returns A promise that resolves to an array of Interview objects or null if no interviews are found.
 */
export async function getLatestInterviews(
  userId: string,
  limit = 20,
): Promise<Interview[] | null> {
  const interviews = await db
    .collection("interviews")
    .where("userId", "!=", userId)
    .where("finalized", "==", true)
    .orderBy("createdAt", "desc")
    .limit(limit)
    .get();

  return interviews.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as Interview[];
}
