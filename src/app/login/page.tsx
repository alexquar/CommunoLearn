/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable react-hooks/rules-of-hooks */
"use client";
import Image from "next/image";
import icon from "../../../public/plan-28.svg";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import useSignIn from "../hooks/useSignin";
import useSignInWithGoogle from "../hooks/useSigninWithGoogle";
import useResetPassword from "../hooks/useResetPassword";
import useSignInWithGithub from "../hooks/useSigninWithGithub";
import ErrorNotification from "../_components/ErrorNotification";

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const signinWithGoogle = useSignInWithGoogle();

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    const { result, error } = await useSignIn(email, password);
    if (error) {
      console.error(error);
      setError("Invalid email or password");
      setPassword("");
    } else {
      router.push("/");
    }
  };

  const handleSignInWithGoogle = async () => {
    const { result, error } = await signinWithGoogle();
    if (error) {
      console.error(error);
      setError("Could not sign in with Google!");
    } else {
      router.push("/");
    }
  };

  const handleSignInWithGithub = async () => {
    const { result, error } = await useSignInWithGithub();
    if (error) {
      console.error(error);
      setError("Could not sign in with Github!");
    } else {
      router.push("/");
    }
  };

  const handleResetPassword = async () => {
    const { result, error } = await useResetPassword(email);
    if (error) {
      console.error(error);
      setError("Could not reset password!");
    } else {
      alert("Password reset email sent! Please check your inbox.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-md rounded-2xl border border-borderBrand bg-white p-8 shadow-md">
        <div className="flex flex-col items-center">
          <Image src={icon} alt="Communolearn Logo" className="h-16 w-16" />
          <h2 className="mt-4 text-2xl font-bold text-primaryBrand">
            Sign in to your account
          </h2>
        </div>

        <form onSubmit={handleSignIn} className="mt-6 space-y-5">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-textBrand"
            >
              Email address
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="mt-1 w-full rounded-md border border-accentBrand px-3 py-2 text-sm text-textBrand focus:outline-none focus:ring-2 focus:ring-accentBrand"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <div className="flex justify-between">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-textBrand"
              >
                Password
              </label>
              <button
                type="button"
                onClick={handleResetPassword}
                className="text-xs font-semibold text-secondaryBrand hover:text-secondaryBrand/75"
              >
                Forgot password?
              </button>
            </div>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className={`mt-1 w-full rounded-md border px-3 py-2 text-sm text-textBrand focus:outline-none focus:ring-2 focus:ring-accentBrand ${
                error ? "border-red-500 ring-red-500" : "border-accentBrand"
              }`}
              placeholder="••••••••"
            />
          </div>

          {error && <ErrorNotification message={error} />}

          <button
            type="submit"
            className="w-full rounded-md bg-primaryBrand py-2 px-4 text-sm font-semibold text-white hover:bg-primaryBrand/80"
          >
            Sign in with Email
          </button>
        </form>

        <div className="mt-6 space-y-3">
          <button
            type="button"
            onClick={handleSignInWithGoogle}
            className="flex w-full items-center justify-center gap-2 rounded-md border-2 border-secondaryBrand bg-secondaryBrand py-2 px-4 text-sm font-semibold text-white hover:bg-white hover:text-secondaryBrand"
          >
            <svg
              className="h-5 w-5"
              fill="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path d="M12.545,10.239v3.821h5.445c-0.712,2.315-2.647,3.972-5.445,3.972c-3.332,0-6.033-2.701-6.033-6.032s2.701-6.032,6.033-6.032c1.498,0,2.866,0.549,3.921,1.453l2.814-2.814C17.503,2.988,15.139,2,12.545,2C7.021,2,2.543,6.477,2.543,12s4.478,10,10.002,10c8.396,0,10.249-7.85,9.426-11.748L12.545,10.239z" />
            </svg>
            Sign in with Google
          </button>

          <button
            type="button"
            onClick={handleSignInWithGithub}
            className="flex w-full items-center justify-center gap-2 rounded-md border-2 border-secondaryBrand bg-secondaryBrand py-2 px-4 text-sm font-semibold text-white hover:bg-white hover:text-secondaryBrand"
          >
            <svg
              className="h-5 w-5"
              fill="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
            </svg>
            Sign in with GitHub
          </button>
        </div>

        <p className="mt-6 text-center text-sm text-textBrand">
          Not a member?{" "}
          <Link
            href="/signup"
            className="font-semibold text-secondaryBrand hover:text-secondaryBrand/75"
          >
            Sign up now!
          </Link>
        </p>
      </div>
    </div>
  );
}
