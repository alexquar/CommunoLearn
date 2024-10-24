"use client";
import { useState } from "react";
import { api } from "~/trpc/react";
import { type Community } from "@prisma/client";
import CommunityCard from "../_components/CommunityCard";
import { set } from "zod";
import LoadingNotification from "../_components/LoadingNotification";
import ErrorNotification from "../_components/ErrorNotification";



export default function Communities() {
  const [search, setSearch] = useState("");
  const [error, setError] = useState("");
  const { data: community, refetch } = api.communities.getCommunityByName.useQuery(
    { name: search },
    { enabled: false }
  );
  const searchCommunites = async (e: React.FormEvent) => {
    e.preventDefault();
    await refetch();
    console.log(community);
  };

  //get top communities on page load
let topCommunities: Community[] = [];
try{
const { data } = api.communities.getTopCommunities.useQuery();
if(data){
  topCommunities = data.communities;
}
} catch (error) {
console.log(error);
setError('An error occurred while fetching top communities :(');
}



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
            <form
            onSubmit={searchCommunites}
            className="mx-auto mt-8 max-w-md">
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
                  className="absolute bottom-2.5 end-2.5 rounded-lg bg-secondaryBrand px-4 py-2 text-sm font-medium text-white hover:bg-secondaryBrand/50 focus:outline-none focus:ring-4 focus:ring-secondaryBrand"
                >
                  Search
                </button>
              </div>
            </form>
          </figure>
        </div>
      </section>
      <div className="py-12 sm:py-18">
      
        <div className="mx-auto grid max-w-7xl gap-20 px-6 lg:px-8 xl:grid-cols-3">
          <div className="max-w-xl">
            <h2 className="text-pretty text-3xl font-semibold tracking-tight text-gray-900 sm:text-4xl">
              Join a popular community!
            </h2>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Below are some of the communities that have the most members. See
              if there is something that interests you where you can try out our
              communities!
            </p>
          </div>


        {error ? (
          <ErrorNotification message={error} />
        ) : topCommunities.length === 0 ? (
          <div className="mx-auto">
            <LoadingNotification />
          </div>
        ) : (
          <ul
            role="list"
            className="grid gap-x-8 gap-y-12 sm:grid-cols-2 sm:gap-y-16 xl:col-span-2"
          >
            {topCommunities?.map((community) => (
              <li key={community.id}>
                <CommunityCard community={community} />
              </li>
            ))}
          </ul>
        )}




        </div>
      </div>
    </>
  );
}
