import { Lucia } from "lucia";
import { MongodbAdapter } from "@lucia-auth/adapter-mongodb";
import { Collection, MongoClient } from "mongodb";

const client = new MongoClient("mongodb://localhost:27017/test");
await client.connect();

const db = client.db("lucia-auth"); // The DB name is set here
export const UserCollection = db.collection("users");
export const SessionCollection = db.collection("sessions");
