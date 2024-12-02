"use client";
import { useCallback, useState } from "react";
import { api } from "~/trpc/react";
import { type Community } from "@prisma/client";
import CommunityCard from "../_components/CommunityCard";
import LoadingNotification from "../_components/LoadingNotification";
import ErrorNotification from "../_components/ErrorNotification";
import Modal from "../_components/PrivateCommunitySearchModal";
import { useRouter } from "next/navigation";
import React from "react";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
export default function Communities() {
const searchParams = useSearchParams();
const givenSearch = searchParams.get("search");


  const router = useRouter();
  const [search, setSearch] = useState(givenSearch ?? "");
  const [error, setError] = useState("");
  const [searchLoading, setSearchLoading] = useState(false);
  const [searchError, setSearchError] = useState("");
  const [open, setOpen] = useState(false);
  const [searchedCommunities, setSearchedCommunities] = useState<Community[]>([])
  const { refetch } = api.communities.getCommunityByName.useQuery(
    { name: search },
    { enabled: false }
  );

  const searchCommunites = useCallback(async (e: React.FormEvent) => {
    setSearchLoading(true);
    setSearchError("");
    e.preventDefault();
    try {
      const { data } = await refetch();
      
      if(data){
          setSearchedCommunities(data);
      } else {
        setSearchError("No communities found with that name :(");
        setSearch("");
      }
    } catch (error) {
      console.log(error);
      setSearchError("An error occurred while searching for communities :(");
      setSearch("")
    } finally{
      setSearchLoading(false);
      setSearch("");
    }
  }, [refetch]);

  useEffect(() => {
    if (givenSearch) {
      const syntheticEvent = new Event('submit', { bubbles: true, cancelable: true });
      const formEvent = syntheticEvent as unknown as React.FormEvent<HTMLFormElement>;
      searchCommunites(formEvent).catch(console.error);
    }
  
  }, [givenSearch, searchCommunites] );

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
    <React.Fragment>
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
              {searchError && 
              <div className="mt-6">
              <ErrorNotification message={searchError}/>
              </div>
              }
              {
                searchLoading && 
                <div className="mt-6">
                <LoadingNotification/>
                </div>
              }
              
            </form>
          </figure>
        </div>
        {
                searchedCommunities.length > 0 && 
                <div className="mt-6 max-w-7xl mx-auto">
                  <blockquote className="my-8 font-bold text-2xl text-accentBrand">Results...</blockquote>
                <ul
                role="list"
                className="grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 sm:gap-y-16 xl:col-span-2"
                >
                  
                  {searchedCommunities?.map((community) => (
                    <li key={community.id}>
                      <CommunityCard community={community} />
                    </li>
                  ))}
                </ul>
                </div>
              }
              
      </section>
      <div className="py-12 mx-4 sm:mx-16 sm:py-18">
      
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

        <div className="flex flex-col items-center mb-12 mt-24">
          <h1 className="mb-4 text-4xl text-accentBrand font-bold">Looking for a private community?</h1>
          <p className="font-semibold text-textBrand my-6">Click below to look for a private community! You must have the community name and password to view and potentially join the community.</p>
          <button
            type="button"
            onClick={() => setOpen(true)}
            className="text-white bg-gradient-to-r from-primaryBrand via-primaryBrand to-secondaryBrand hover:bg-gradient-to-bl  font-medium rounded-full text-sm px-10 py-5 text-center"
          >
            Join a private community
          </button>
        </div>
        <Modal open={open} setOpen={setOpen} />
      </div>
    </React.Fragment>
  );
}
