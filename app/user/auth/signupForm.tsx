"use client";
import { SignInBtn } from "@/app/components/nexAuthButtons";
import { signIn } from "next-auth/react";

export async function SignupForm() {
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Add your signup logic here
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());
    console.log(data);

    try {
      const res = await fetch("/api/signup", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (res.ok) {
        form.reset();
        res.json();
        console.log("response", res);
        signIn()
      }
      
    } catch (error) {
      console.log(error);
      alert("something went wrong");
    }
  };

  return (
    <div>
      <h1 className="text-2xl text-center">Sign up</h1>
      <br />
      <form onSubmit={(e) => handleSubmit(e)}>
        <div className="mb-4">
          <label
            className="mb-2 block text-sm font-bold text-gray-700"
            htmlFor="email"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            className="w-full rounded-md border p-2"
            placeholder="Enter your email"
          />
        </div>

        <div className="mb-4">
          <label
            className="mb-2 block text-sm font-bold text-gray-700"
            htmlFor="email"
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            className="w-full rounded-md border p-2"
            placeholder="Enter password"
          />
        </div>
        <div className="mb-4">
          <label
            className="mb-2 block text-sm font-bold text-gray-700"
            htmlFor="email"
          >
            Confirm password
          </label>
          <input
            type="password"
            id="confirm-password"
            name="confirmPassword"
            className="w-full rounded-md border p-2"
            placeholder="Enter password"
          />
        </div>

        <button
          type="submit"
          className="rounded-md bg-success px-4 py-2 text-white hover:bg-blue-600"
        >
          Sign up
        </button>
      </form>
        <p className="m-2">
          Already have an account?
          <SignInBtn className="text-success">Sing in</SignInBtn>
        </p>
        <button className="bg-indigo-900 btn w-full" onClick={()=>signIn('github')}>Singin with GitHub</button>
    </div>
  );
}
