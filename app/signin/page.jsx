import { signinAction } from "@/actions/signin-action";

export default function Page() {
  return (
    <div>
      <h1>SignIn Page</h1>
      <form action={signinAction}>
        <label htmlFor="username">Username</label>
        <input id="username" type="text" name="username" />

        <label htmlFor="password">Password</label>
        <input id="password" type="password" name="password" />
        <button>SignIn</button>
      </form>
    </div>
  );
}
