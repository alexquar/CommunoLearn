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
import Link from "next/link";
export default function Communities() {
  const searchParams = useSearchParams();
  const givenSearch = searchParams.get("search");

  const router = useRouter();
  const [search, setSearch] = useState(givenSearch ?? "");
  const [error, setError] = useState("");
  const [searchLoading, setSearchLoading] = useState(false);
  const [searchError, setSearchError] = useState("");
  const [open, setOpen] = useState(false);
  const [searchedCommunities, setSearchedCommunities] = useState<Community[] | null>(null);
  const [searchedSomeCommunities, setSearchedSomeCommunities] = useState<Community[]>([]);
  const { refetch } = api.communities.getCommunityByName.useQuery(
    { name: search },
    { enabled: false },
  );

  const { refetch: getSomeCommunities} = api.communities.getSomeCommunitiesByName.useQuery(
    { name: search },
    { enabled: false },
  );

  const searchSomeCommunities = useCallback(
    async () => {
      try {
        const { data } = await getSomeCommunities();
        console.log("Searched some communities:", data);
        if(data){
        setSearchedSomeCommunities(data);
        } else {
          setSearchedSomeCommunities([]);
        }
      } catch (error) {
        console.log(error);
      } 
    },
    [getSomeCommunities],
  );

  useEffect(() => {
    if (search.length > 0) {
      searchSomeCommunities().catch(console.error);
    } else {
      setSearchedSomeCommunities([]);
    }
  }
  , [search, searchSomeCommunities]);

  const searchCommunites = useCallback(
    async (e: React.FormEvent) => {
      setSearchLoading(true);
      setSearchError("");
      e.preventDefault();
      try {
        const { data } = await refetch();

        if (data) {
          setSearchedCommunities(data);
        } else {
          setSearchError("No communities found with that name :(");
          setSearch("");
        }
      } catch (error) {
        console.log(error);
        setSearchError("An error occurred while searching for communities :(");
        setSearch("");
      } finally {
        setSearchLoading(false);
        setSearch("");
      }
    },
    [refetch],
  );

  useEffect(() => {
    if (givenSearch) {
      const syntheticEvent = new Event("submit", {
        bubbles: true,
        cancelable: true,
      });
      const formEvent =
        syntheticEvent as unknown as React.FormEvent<HTMLFormElement>;
      searchCommunites(formEvent).catch(console.error);
    }
  }, [givenSearch, searchCommunites]);

  //get top communities on page load
  let topCommunities: Community[] = [];
  try {
    const { data } = api.communities.getTopCommunities.useQuery();
    if (data) {
      topCommunities = data.communities;
    }
  } catch (error) {
    console.log(error);
    setError("An error occurred while fetching top communities :(");
  }

  return (
    <React.Fragment>
  {/* Hero + Search Section */}
  <section className="relative isolate px-6 py-24 sm:py-32 lg:px-8">
    <div className="mx-auto max-w-3xl text-center">
      <h1 className="text-4xl font-bold text-primaryBrand sm:text-5xl">
        CommunoLearn Communities
      </h1>
      <p className="mt-4 text-lg text-accentBrand">
        Find the people you’re looking for. Search public communities now!
      </p>

      {/* Search Bar */}
      <form onSubmit={searchCommunites} className="relative mt-10 max-w-xl mx-auto">
        <input
          type="search"
          id="community-search"
          placeholder="Search communities..."
          className="w-full rounded-lg border border-accentBrand bg-white py-4 pl-10 pr-32 text-sm text-textBrand shadow-sm focus:outline-none focus:ring-2 focus:ring-accentBrand"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          required
        />
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
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
            />
          </svg>
        </div>
        <button
          type="submit"
          className="absolute top-1/2 right-2 -translate-y-1/2 rounded-md bg-secondaryBrand px-4 py-2 text-sm text-white hover:bg-secondaryBrand/80"
        >
          Search
        </button>

        {/* Autocomplete Results */}
        {searchedSomeCommunities.length > 0 && (
          <div className="absolute z-50 mt-2 w-full rounded-lg border border-accentBrand  shadow-lg">
            <ul className="max-h-48 overflow-y-auto divide-y divide-borderBrand bg-white rounded-lg overflow-x-clip text-textBrand">
              {searchedSomeCommunities.map((community) => (
                <li key={community.id} className="p-3 hover:bg-gray-100 rounded-lg cursor-pointer">
                  <Link
                    href={`/communities/${community.id}`}
                    className="block rounded-lg font-semibold text-textBrand"
                  >
                    {community.name}
                  
                  <p className="text-sm text-gray-500">
                    {community.sloganCommunity || "No slogan available"}
                  </p>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </form>

      {/* Search Status */}
      {searchError && <div className="mt-6"><ErrorNotification message={searchError} /></div>}
      {searchLoading && <div className="mt-6"><LoadingNotification /></div>}
    </div>

    {/* Search Results */}
    {searchedCommunities && (
      <div className="mx-auto mt-16 max-w-7xl px-4 sm:px-6 lg:px-8">
        {searchedCommunities.length > 0 ? (
          <>
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-2xl font-bold text-accentBrand">Search Results</h2>
              <button
                onClick={() => router.push('/communities/new')}
                className="rounded-lg bg-secondaryBrand px-4 py-2 text-sm text-white hover:bg-secondaryBrand/80"
              >
                Create New Community
              </button>
            </div>
            <ul className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {searchedCommunities.map((community) => (
                <li key={community.id}>
                  <CommunityCard community={community} />
                </li>
              ))}
            </ul>
          </>
        ) : (
          <div className="mx-auto mt-6 max-w-md">
            <ErrorNotification message="No communities found with that name :(" />
          </div>
        )}
      </div>
    )}
  </section>

  {/* Popular Communities Section */}
  <section className="sm:py-24 mx-4 py-16 sm:mx-16">
    <div className="mx-auto grid max-w-7xl gap-20 px-6 lg:px-8 xl:grid-cols-3">
      <div className="max-w-xl">
        <h2 className="text-pretty text-3xl font-semibold tracking-tight text-accentBrand sm:text-4xl">
          Join a popular community!
        </h2>
        <p className="mt-6 text-lg leading-8 text-gray-600">
          These are some of the most active communities. Find one that fits your interests and get involved!
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
          className="grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3 sm:gap-y-16 xl:col-span-2  xl:gap-x-6"
        >
          {topCommunities.map((community) => (
            <li key={community.id}>
              <CommunityCard community={community} />
            </li>
          ))}
        </ul>
      )}
    </div>
  </section>

  {/* CTA: Create or Join Private Community */}
  <section className="py-24">
    <div className="mx-auto max-w-4xl text-center">
      <h2 className="text-3xl font-bold text-accentBrand">Create or Join a private Community</h2>
      <p className="mt-4 text-lg text-textBrand">
        Start your own public or private community, or join one using a private access code.
      </p>
      <div className="mt-8 flex flex-col sm:flex-row justify-center gap-6">
        <button
          onClick={() => router.push("/communities/new")}
          className="rounded-full bg-gradient-to-l from-primaryBrand to-secondaryBrand px-6 py-3 text-white text-sm font-semibold hover:opacity-90"
        >
          Create a Community
        </button>
        <button
          onClick={() => setOpen(true)}
          className="rounded-full bg-gradient-to-r from-primaryBrand to-secondaryBrand px-6 py-3 text-white text-sm font-semibold hover:opacity-90"
        >
          Join Private Community
        </button>
      </div>
      <Modal open={open} setOpen={setOpen} />
    </div>
  </section>
</React.Fragment>
  );
}
