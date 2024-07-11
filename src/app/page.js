import { MongodbAdapter } from "@lucia-auth/adapter-mongodb";
import { Lucia } from "lucia";

export default function Home() {
  const adapter = new MongodbAdapter(db); // your adapter
  return (
    <main>
      <h1>Test</h1>
    </main>
  );
}
export const lucia = new Lucia(adapter, {
  sessionCookie: {
    attributes: {
      // set to `true` when using HTTPS
      secure: process.env.NODE_ENV === "production",
    },
  },
});
