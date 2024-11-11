"use client";
import React from "react";
import { useState } from "react";
import { useRouter } from "next/navigation";
export default function HomePageSearch() {
  const router = useRouter();
  const [text, setText] = useState("");
  return (
    <form
    onSubmit={(e) => {
        e.preventDefault();
        router.push(`/communities?search=${text}`);
        }}
    className="mt-6 flex max-w-md gap-x-4">
      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        type="text"
        required
        placeholder="Search for a community"
        className="min-w-0 flex-auto rounded-md placeholder:text-textBrand border-0 px-3.5 py-2 text-textBrand shadow-sm outline-accentBrand ring-1 ring-inset ring-accentBrand focus:ring-2 focus:ring-inset focus:ring-accentBrand sm:text-sm sm:leading-6"
      />
      <button
        type="submit"
        className="flex-none rounded-3xl border-2 border-accentBrand bg-accentBrand px-5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-backgroundBrand hover:text-accentBrand"
      >
        Search
      </button>
    </form>
  );
}
