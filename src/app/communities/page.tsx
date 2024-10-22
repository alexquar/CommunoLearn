"use client";
import { useState } from "react";
import { api } from "~/trpc/react";
const people = [
  {
    name: "Leslie Alexander",
    role: "Co-Founder / CEO",
    imageUrl:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  },
  // More people...
];
export default function Communities() {
  const [search, setSearch] = useState("");

  const searchCommunites = async (e: React.FormEvent) => {
    e.preventDefault();

  };
  return (
    <>
      <section className="relative isolate overflow-hidden px-6 pb-12 pt-24 sm:py-32 lg:px-8">
        <div className="mx-auto max-w-2xl lg:max-w-4xl">
          <h1 className="text-center text-3xl font-bold text-primaryBrand">
            CommunoLearn Communities
          </h1>
          <figure className="mt-10">
            <blockquote className="text-center text-lg font-bold leading-8 text-accentBrand sm:text-2xl sm:leading-9">
              <p>
                Find the people you&apos;re looking for. Search public
                communities right now!
              </p>
            </blockquote>
            <form className="mx-auto mt-8 max-w-md">
              <label
                htmlFor="default-search"
                className="sr-only mb-2 text-sm font-medium text-textBrand"
              >
                Search
              </label>
              <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 start-0 flex items-center ps-3">
                  <svg
                    className="h-4 w-4 text-textBrand"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 20 20"
                  >
                    <path
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                    />
                  </svg>
                </div>
                <input
                  type="search"
                  id="default-search"
                  className="block w-full rounded-lg border border-accentBrand bg-white p-4 ps-10 text-sm text-textBrand outline-accentBrand focus:border-accentBrand focus:ring-accentBrand"
                  placeholder="Search Communities..."
                  required
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
                <button
                  type="submit"
                  onClick = {()=> searchCommunites}
                  className="absolute bottom-2.5 end-2.5 rounded-lg bg-secondaryBrand px-4 py-2 text-sm font-medium text-white hover:bg-secondaryBrand/50 focus:outline-none focus:ring-4 focus:ring-secondaryBrand"
                >
                  Search
                </button>
              </div>
            </form>
          </figure>
        </div>
      </section>
      <div className="py-24 sm:py-32">
        <div className="mx-auto grid max-w-7xl gap-20 px-6 lg:px-8 xl:grid-cols-3">
          <div className="max-w-xl">
            <h2 className="text-pretty text-3xl font-semibold tracking-tight text-gray-900 sm:text-4xl">
              Join a popular community!
            </h2>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Bellow are some of the communities that have the most members. See
              if there is something that interests you where you can try out our
              communities!
            </p>
          </div>
          <ul
            role="list"
            className="grid gap-x-8 gap-y-12 sm:grid-cols-3 sm:gap-y-16 xl:col-span-2"
          >
            {[...people, ...people,...people, ...people].map((person) => (
              <li key={person.name}>
                <div className="flex items-center gap-x-6">
                  <img
                    alt=""
                    src={person.imageUrl}
                    className="h-16 w-16 rounded-full"
                  />
                  <div>
                    <h3 className="text-base font-semibold leading-7 tracking-tight text-gray-900">
                      {person.name}
                    </h3>
                    <p className="text-sm font-semibold leading-6 text-indigo-600">
                      {person.role}
                    </p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}
