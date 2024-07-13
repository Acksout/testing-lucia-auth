import {NextRouter} from "next/router.js";
import Link from "next/link.js";
export default function Home() {
    return (
        <div>
            <h1>Home</h1>
            <Link href="/sign-up">SignUp</Link>
        </div>
    )
}

// Homepage