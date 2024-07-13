"use client";
import {useState} from "react";
import bcrypt from "bcryptjs";
// import dbConnect from "@/lib/db.js";

export default function Home() {
    const saltRound = 13;

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [hashedPassword, setHashedPassword] = useState("");

    const formSubmit = (e) => {
        e.preventDefault();

        // Hash the password
        bcrypt.hash(password, saltRound, function (err, hash) {
            if (err) {
                throw new Error(err);
            }
            setHashedPassword(hash); // Store the hashed password

            // Store hashed password in db
            console.log("Username: ", username);
            console.log("Hashed Password: ", hash);
        });
    };

    return (
        <main>
            <h1>Test</h1>
            <form action="" onSubmit={formSubmit} id="form">
                <label htmlFor="username">Username</label>
                <input onChange={(e) => setUsername(e.target.value)} id="username" type="text"/>

                <label htmlFor="password">Password</label>
                <input onChange={(e) => setPassword(e.target.value)} id="password" type="password"/>

                <button type="submit">Full Send!</button>
            </form>
        </main>
    );
}
