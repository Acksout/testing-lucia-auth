import { signupAction } from "@/actions/signup-action";

export default function Page() {
  return (
    <div>
      <h1>SignUp Page</h1>
      <form action={signupAction}>
        <label htmlFor="username">Username</label>
        <input id="username" type="text" name="username" />

        <label htmlFor="password">Password</label>
        <input id="password" type="password" name="password" />
        <button>SignUp</button>
      </form>
    </div>
  );
}
