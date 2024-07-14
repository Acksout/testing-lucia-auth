import { Lucia } from "lucia";
import { SessionCollection, UserCollection } from "./db";
import { MongodbAdapter } from "@lucia-auth/adapter-mongodb";

const adapter = new MongodbAdapter(SessionCollection, UserCollection);

export const lucia = new Lucia(adapter, {
  sessionCookie: {
    attributes: {
      // set to `true` when using HTTPS
      secure: process.env.NODE_ENV === "production",
    },
  },
  getUserAttributes: (attributes) => {
    return {
      username: attributes.username,
    };
  },
});
