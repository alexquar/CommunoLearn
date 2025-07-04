/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */

"use client";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import logo from "../../../public/plan-28.svg";
import { useAuthContext } from "~/context/AuthContext";
import useSignout from "../hooks/useSignout";
export default function NavBar() {
  const { user } =  useAuthContext();
  const [dropdown, setDropdown] = useState(false);
  const handleSignout = async () => {
    await useSignout();
  }
  return (
    <nav className="flex flex-row justify-between border-gray-200 bg-backgroundBrand p-10 md:shadow-lg">
      <div className="flex">
        <span>
          <Image
            src={logo}
            width={32}
            className="hidden h-8 md:block"
            alt="Flowbite Logo"
          />
        </span>
        <Link
          href="/"
          className="whitespace-nowrap text-2xl font-semibold text-textBrand hover:cursor-pointer md:ms-5"
        >
          CommunoLearn
        </Link>
      </div>
      {user && (
        <div className="hidden w-full md:block md:w-auto" id="navbar-default">
          <ul className="mt-4 flex flex-col p-4 font-medium md:mt-0 md:flex-row md:space-x-8 md:p-0 rtl:space-x-reverse">
            <li>
              <Link
                href="/communities"
                className="block rounded px-3 py-2 text-textBrand hover:underline md:p-0 md:hover:bg-transparent"
              >
                Communities
              </Link>
            </li>
            <li>
              <Link
                href={`/user/${user.id}`}
                className="block rounded px-3 py-2 text-textBrand hover:underline md:p-0 md:hover:bg-transparent"
              >
                My Zone
              </Link>
            </li>
            <li>
              <Link
                href="/messaging"
                className="block rounded px-3 py-2 text-textBrand hover:underline md:p-0 md:hover:bg-transparent"
              >
                Messaging
              </Link>
            </li>
            <li>
              <button
                onClick={handleSignout}
                className="block rounded px-3 py-2 text-textBrand underline md:p-0 md:hover:bg-transparent"
              >
                Sign Out
              </button>
            </li>
          </ul>
        </div>
      )}
      {!user && (
        <div className="hidden w-full md:block md:w-auto" id="navbar-default">
          <ul className="mt-4 flex flex-col p-4 font-medium md:mt-0 md:flex-row md:space-x-8 md:p-0 rtl:space-x-reverse">
            <li></li>
            <li>
              <Link
                href="/signup"
                className="block rounded px-3 py-2 text-textBrand hover:underline md:p-0 md:hover:bg-transparent"
              >
                Signup
              </Link>
            </li>
            <li>
              <Link
                href="/login"
                className="block rounded px-3 py-2 text-textBrand hover:underline md:p-0 md:hover:bg-transparent"
              >
                Login
              </Link>
            </li>
          </ul>
        </div>
      )}
      <div className="relative md:hidden">
        <div >
          <button
        onClick={() => setDropdown(!dropdown)}
        id="dropdownDefaultButton"
        data-dropdown-toggle="dropdown"
        className="inline-flex items-center rounded-lg border border-backgroundBrand bg-secondaryBrand px-5 py-2.5 text-center text-sm font-medium text-white outline-none hover:border-secondaryBrand hover:bg-backgroundBrand hover:text-secondaryBrand"
        type="button"
          >
        Options
        <svg
          className="ms-3 h-2.5 w-2.5"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 10 6"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="m1 1 4 4 4-4"
          />
        </svg>
          </button>
        </div>
        {dropdown && (
          <div className="absolute right-0 mt-2 z-10">
        {user && (
          <div
            id="dropdownNavbar"
            className="w-44 divide-y divide-gray-100 rounded-lg bg-white font-normal shadow"
          >
            <ul
          className="py-2 text-sm text-gray-700 dark:text-gray-400"
          aria-labelledby="dropdownLargeButton"
            >
          <li>
            <Link href="/communities" className="block px-4 py-2 hover:bg-gray-100">
              Communities
            </Link>
          </li>
          <li>
            <Link href="/" className="block px-4 py-2 hover:bg-gray-100">
              Home
            </Link>
          </li>
          <li>
            <Link href={`user/${user.id}`} className="block px-4 py-2 hover:bg-gray-100">
              My Zone
            </Link>
          </li>
          <li>
            <Link href="/messaging" className="block px-4 py-2 hover:bg-gray-100">
              Messaging
            </Link>
          </li>
            </ul>
            <div className="py-1">
          <button
            onClick={handleSignout}
            className="block w-full px-4 py-2 cursor-pointer text-start text-sm text-gray-700 hover:bg-gray-100"
          >
            Sign out
          </button>
            </div>
          </div>
        )}
        {!user && (
          <div
            id="dropdownNavbar"
            className="w-44 divide-y divide-gray-100 rounded-lg bg-white font-normal shadow"
          >
            <ul
          className="py-2 text-sm text-gray-700 dark:text-gray-400"
          aria-labelledby="dropdownLargeButton"
            >
          <li>
            <Link
              href="/signup"
              className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
            >
              Signup
            </Link>
          </li>
          <li>
            <Link
              href="/login"
              className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
            >
              Login
            </Link>
          </li>
            </ul>
          </div>
        )}
          </div>
        )}
      </div>
    </nav>
  );
}
