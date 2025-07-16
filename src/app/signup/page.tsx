/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable react-hooks/rules-of-hooks */
"use client";
import React, { useState } from "react";
import Image from "next/image";
import icon from "../../../public/plan-28.svg";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { api } from "~/trpc/react";
import type { location } from "@prisma/client";
import ErrorNotification from "../_components/_general/ErrorNotification";
import useSignUp from "../hooks/useSignup";

export default function Signup() {
  const router = useRouter();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [country, setCountry] = useState<keyof typeof location>("Canada");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { mutate } = api.user.newUser.useMutation({
    onSuccess: () => {
      setError("");
      setLoading(false);
      router.push("/");
    },
    onError: (error) => {
      console.error(error);
      setError("Account could not be created!");
      setLoading(false);
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const { error: signUpError } = await useSignUp(email, password);
    if (signUpError) {
      setError("Account could not be created!");
      setLoading(false);
      return;
    }

    mutate({
      email: email.toLowerCase(),
      firstName,
      lastName,
      location: country,
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-md rounded-2xl border border-borderBrand bg-white p-8 shadow-md">
        <div className="flex flex-col items-center">
          <Image src={icon} alt="Communolearn Logo" className="h-16 w-16" />
          <h2 className="mt-4 text-2xl font-bold text-primaryBrand">
            Create your account
          </h2>
          <p className="text-sm text-textBrand mt-1">
            Let’s get started with a few details
          </p>
        </div>

        <form onSubmit={handleSubmit} className="mt-6 space-y-5">
          <div>
            <label
              htmlFor="firstName"
              className="block text-sm font-medium text-textBrand"
            >
              First Name
            </label>
            <input
              id="firstName"
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
              placeholder="John"
              className="mt-1 w-full rounded-md border border-accentBrand px-3 py-2 text-sm text-textBrand focus:outline-none focus:ring-2 focus:ring-accentBrand"
            />
          </div>

          <div>
            <label
              htmlFor="lastName"
              className="block text-sm font-medium text-textBrand"
            >
              Last Name
            </label>
            <input
              id="lastName"
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
              placeholder="Doe"
              className="mt-1 w-full rounded-md border border-accentBrand px-3 py-2 text-sm text-textBrand focus:outline-none focus:ring-2 focus:ring-accentBrand"
            />
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-textBrand"
            >
              Email Address
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="john@example.com"
              className="mt-1 w-full rounded-md border border-accentBrand px-3 py-2 text-sm text-textBrand focus:outline-none focus:ring-2 focus:ring-accentBrand"
            />
          </div>

          <div>
            <label
              htmlFor="country"
              className="block text-sm font-medium text-textBrand"
            >
              Country
            </label>
            <select
              id="country"
              value={country}
              onChange={(e) =>
                setCountry(e.target.value as keyof typeof location)
              }
              className="mt-1 block w-full rounded-md border border-accentBrand bg-white px-3 py-2 text-sm text-textBrand focus:outline-none focus:ring-2 focus:ring-accentBrand"
            >
              <option value="Canada">Canada</option>
              <option value="USA">United States</option>
              <option value="Mexico">Mexico</option>
              <option value="France">France</option>
              <option value="Germany">Germany</option>
            </select>
          </div>

          <div>
            <div className="flex justify-between">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-textBrand"
              >
                Password
              </label>
              <a
                href="https://u-passwords.web.app/login"
                className="text-xs font-semibold text-secondaryBrand hover:text-secondaryBrand/80"
              >
                Need help?
              </a>
            </div>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="********"
              className="mt-1 w-full rounded-md border border-accentBrand px-3 py-2 text-sm text-textBrand focus:outline-none focus:ring-2 focus:ring-accentBrand"
            />
          </div>

          {error && <ErrorNotification message={error} />}

          <button
            type="submit"
            className="w-full rounded-md bg-primaryBrand py-2 px-4 text-sm font-semibold text-white hover:bg-primaryBrand/80"
          >
            {loading ? "Signing up..." : "Sign Up"}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-textBrand">
          Already have an account?{" "}
          <Link
            href="/login"
            className="font-semibold text-secondaryBrand hover:text-secondaryBrand/75"
          >
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
