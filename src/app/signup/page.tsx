/* eslint-disable react-hooks/rules-of-hooks */
"use client"
import React from "react";
import Image from "next/image";
import icon from "../../../public/plan-28.svg";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { api } from "~/trpc/react";
import type { location } from "@prisma/client";
import ErrorNotification from "../_components/ErrorNotification";
import useSignUp from "../hooks/useSignup";
export default function Signup() {
const router = useRouter();
const [firstName, setFirstName] = useState("");
const [lastName, setLastName] = useState("");
const [email, setEmail] = useState("");
const [password, setPassword] = useState("");
const [country, setCountry] = useState<keyof typeof location>("Canada");
const [error, setError] = useState("");
const  [loading, setLoading] = useState(false);

//set up mutation
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
})


const handleSubmit = async (e: React.FormEvent) => {
  //prep for call
  setLoading(true);
  setError("");
e.preventDefault();
//log user in 
const {result, error} = await useSignUp(email, password);
//update user context
console.log(result);
if(error){
  setError("Account could not be created!");
  setLoading(false);
  return;
}
//call mutation
 mutate({
  email,
  firstName,
  lastName,
  location: country,
});

}
  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <Image
            alt="communolearn logo"
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
            src={icon}
            className="mx-auto h-16 w-auto sm:h-20"
          />
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-primaryBrand">
            Sign up for an Account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form onSubmit={handleSubmit} className="space-y-6">
          <div>
              <label
                htmlFor="firstName"
                className="block text-sm font-medium leading-6 text-textBrand"
              >
                First Name
              </label>
              <div className="mt-2">
                <input
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  id="firstName"
                  name="firstName"
                  type="text"
                  required
                  placeholder="John"
                  className="block w-full rounded-md border-0 px-1 py-1.5 text-textBrand shadow-sm ring-1 outline-accentBrand ring-inset ring-accentBrand placeholder:text-textBrand focus:ring-2 focus:ring-inset focus:ring-accentBrand sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="lastName"
                className="block text-sm font-medium leading-6 text-textBrand"
              >
                Last Name
              </label>
              <div className="mt-2">
                <input
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                id="lastName"
                  name="lastName"
                  type="text"
                  required
                  placeholder="Doe"
                  className="block w-full rounded-md border-0 px-1 py-1.5 text-textBrand shadow-sm outline-accentBrand ring-1 ring-inset ring-accentBrand placeholder:text-textBrand focus:ring-2 focus:ring-inset focus:ring-accentBrand sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-textBrand"
              >
                Email address
              </label>
              <div className="mt-2">
                <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                id="email"
                  name="email"
                  type="email"
                  required
                  placeholder="JohnDoe@gmail.com"
                  autoComplete="email"
                  className="block w-full rounded-md border-0 px-1 py-1.5 text-textBrand shadow-sm outline-accentBrand ring-1 ring-inset ring-accentBrand placeholder:text-textBrand focus:ring-2 focus:ring-inset focus:ring-accentBrand sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
            <label htmlFor="countries" className="block mb-2 text-sm font-medium text-textBrand">Country</label>
  <select 
  value={country}
  onChange={(e) => setCountry(e.target.value as keyof typeof location)}
  id="countries" className="bg-white border border-accentBrand outline-accentBrand text-textBrand text-sm rounded-lg focus:ring-accentBrand focus:border-accentBrand block w-full px-1 py-2.5 ">
    <option selected value="Canada">Canada</option>
    <option value="USA">United States</option>
    <option value="Mexico">Mexio</option>
    <option value="France">France</option>
    <option value="Germany">Germany</option>
  </select>

            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6 text-textBrand"
                >
                  Password
                </label>
                <div className="text-sm">
                  <a
                    href="https://u-passwords.web.app/login"
                    className="font-semibold text-secondaryBrand hover:text-secondaryBrand/75"
                  >
                    Need password help?
                  </a>
                </div>
              </div>
              <div className="mt-2">
                <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                  id="password"
                  name="password"
                  type="password"
                  required
                  autoComplete="current-password"
                  placeholder="********"
                  className="block w-full rounded-md border-0 px-1 py-1.5 text-textBrand outline-accentBrand shadow-sm ring-1 ring-inset ring-accentBrand placeholder:text-textBrand focus:ring-2 focus:ring-inset focus:ring-accentBrand sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md border-2 border-primaryBrand bg-primaryBrand px-3 py-1.5 text-sm font-semibold leading-6 text-backgroundBrand shadow-sm hover:bg-backgroundBrand hover:text-primaryBrand"
              >
                {loading ? "Signing in....":
                'Sign in'}
              </button>
            </div>
            <div>
              {error && (
                <>
                <ErrorNotification message={error} />
                </>
              )}
            </div>
          </form>

          <p className="mt-10 text-center text-sm text-gray-500">
            Already a member?{" "}
            <Link
              href="/login"
              className="font-semibold leading-6 text-secondaryBrand hover:text-secondaryBrand/75"
            >
             Sign in now!
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}
