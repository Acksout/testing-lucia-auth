"use server";
import { lucia } from "@/lib/auth";
import { UserCollection } from "@/lib/db";
import bcrypt from "bcrypt"; // JS or no?
import { generateIdFromEntropySize } from "lucia";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function signupAction(formData) {
  console.log({ formData });

  // Multiple validations could be added here as per requirement.
  const username = formData.get("username");
  if (
    typeof username !== "string" ||
    username.length < 3 ||
    username.length > 20
  ) {
    return {
      error: "Invalid username",
    };
  }

  const password = formData.get("password");
  if (
    typeof password !== "string" ||
    password.length < 3 ||
    password.length > 50
  ) {
    return {
      error: "Invalid password",
    };
  }

  // Hash the password
  const hashPassword = await bcrypt.hash(password, 13);
  console.log({ hashPassword });

  // Insert them into the db

  const userId = generateIdFromEntropySize(10);

  await UserCollection.insertOne({
    _id: userId,
    username,
    hashed_password: hashPassword,
  });

  // Create lucia session
  const session = await lucia.createSession(userId, {});

  // Set session cookie

  const sessionCookie = await lucia.createSessionCookie(session.id);
  // Redirect to a PAGE
  // Setting cookie using nextjs headers
  cookies().set(
    sessionCookie.name,
    sessionCookie.value,
    sessionCookie.attributes
  );
  return redirect("/signin");
}
