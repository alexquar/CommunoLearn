/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */

"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { usePathname } from "next/navigation";
import logo from "../../../public/plan-28.svg";
import { useAuthContext } from "~/context/AuthContext";
import useSignout from "../hooks/useSignout";

export default function NavBar() {
  const { user } = useAuthContext();
  const pathname = usePathname();
  const [dropdown, setDropdown] = useState(false);
  const handleSignout = async () => {
    await useSignout();
  };

  const isActive = (href: string) => pathname === href;

  return (
    <nav className="flex flex-row justify-between border-gray-200 bg-backgroundBrand p-10 md:shadow-lg">
      <div className="flex items-center gap-3">
        <Image src={logo} width={32} className="hidden h-8 md:block" alt="Logo" />
        <Link
          href="/"
          className="whitespace-nowrap text-2xl font-semibold text-textBrand hover:cursor-pointer"
        >
          CommunoLearn
        </Link>
      </div>

      {user && (
        <div className="hidden w-full lg:block md:w-auto" id="navbar-default">
          <ul className="mt-4 flex flex-col p-4 font-medium md:mt-0 md:flex-row md:space-x-8 md:p-0 rtl:space-x-reverse">
            <li>
              <Link
                href="/communities"
                className={`flex items-center gap-2 px-3 py-2 ${
                  isActive("/communities") ? "underline text-secondaryBrand" : "text-textBrand hover:underline"
                }`}
              >
                {/* Community icon */}
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a4 4 0 00-3-3.87M9 20h6M3 20h5v-2a4 4 0 00-3-3.87M12 12a4 4 0 100-8 4 4 0 000 8z" />
                </svg>
                Communities
              </Link>
            </li>
            <li>
              <Link
              href={`/user/${user.id}`}
              className={`flex items-center gap-2 px-3 py-2 ${
                pathname.startsWith(`/user/${user.id}`) ? "underline text-secondaryBrand" : "text-textBrand hover:underline"
              }`}
              >
              {/* Avatar */}
              <Image
                src={user.image ?? "/user.svg"}
                alt="avatar"
                width={20}
                height={20}
                className="rounded-full w-5 h-5 border border-primaryBrand"
              />
              My Account
              </Link>
            </li>
            <li>
              <Link
                href="/messaging"
                className={`flex items-center gap-2 px-3 py-2 ${
                  isActive("/messaging") ? "underline text-secondaryBrand" : "text-textBrand hover:underline"
                }`}
              >
                {/* Messaging icon */}
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
                </svg>
                Messaging
              </Link>
            </li>
            <li>
              <button
                onClick={handleSignout}
                className="block rounded px-3 py-2 text-textBrand underline"
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
            <li>
              <Link
                href="/signup"
                className="block rounded px-3 py-2 text-textBrand hover:underline md:p-0"
              >
                Signup
              </Link>
            </li>
            <li>
              <Link
                href="/login"
                className="block rounded px-3 py-2 text-textBrand hover:underline md:p-0"
              >
                Login
              </Link>
            </li>
          </ul>
        </div>
      )}

      {/* Mobile Dropdown */}
      <div className="relative lg:hidden">
        <button
          onClick={() => setDropdown(!dropdown)}
          id="dropdownDefaultButton"
          aria-expanded={dropdown}
          aria-haspopup="true"
          className="inline-flex items-center rounded-lg border border-backgroundBrand bg-secondaryBrand px-5 py-2.5 text-sm font-medium text-white outline-none hover:border-secondaryBrand hover:bg-backgroundBrand hover:text-secondaryBrand"
          type="button"
        >
          Options
          <svg
            className="ms-3 h-2.5 w-2.5"
            fill="none"
            viewBox="0 0 10 6"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M1 1l4 4 4-4" />
          </svg>
        </button>

        {dropdown && (
          <div className="absolute right-0 z-10 mt-2">
            {user ? (
              <div className="w-44 divide-y divide-gray-100 rounded-lg bg-white font-normal shadow">
                <ul className="py-2 text-sm text-gray-700">
                  <li>
                    <Link href="/communities" className="block px-4 py-2 hover:bg-gray-100">
                      Communities
                    </Link>
                  </li>
                  <li>
                    <Link href={`/user/${user.id}`} className="block px-4 py-2 hover:bg-gray-100">
                      My Account
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
                    className="block w-full px-4 py-2 text-start text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Sign Out
                  </button>
                </div>
              </div>
            ) : (
              <div className="w-44 divide-y divide-gray-100 rounded-lg bg-white font-normal shadow">
                <ul className="py-2 text-sm text-gray-700">
                  <li>
                    <Link href="/signup" className="block px-4 py-2 hover:bg-gray-100">
                      Signup
                    </Link>
                  </li>
                  <li>
                    <Link href="/login" className="block px-4 py-2 hover:bg-gray-100">
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
