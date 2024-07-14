"use server";

import { lucia } from "@/lib/auth";
import { UserCollection } from "@/lib/db";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import bcrypt from "bcrypt";

export async function signinAction(formData) {
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
  // Check if user exists in db

  const existingUser = await UserCollection.findOne({ username });
  if (!existingUser) {
    return {
      error: "Wrong username or password",
    };
  }
  // Check password

  const validPassword = await bcrypt.compare(
    password,
    existingUser.hashed_password
  );
  if (!validPassword) {
    return {
      error: "Wrong username or password",
    };
  }
  // Create session

  const session = await lucia.createSession(existingUser._id, {});

  // Set Cookie

  const sessionCookie = await lucia.createSessionCookie(session.id);

  // Setting cookie using nextjs headers
  cookies().set(
    sessionCookie.name,
    sessionCookie.value,
    sessionCookie.attributes
  );
  // Redirect Somewhere
  return redirect("/demologgedinpage");
}
