"use client"
import React from "react";
import { useState } from "react";
export default function MyZone() {
const [chosen, setChosen] = useState("communities");
  return (
    <main className="flex mt-10 flex-col mx-4 md:mx-0 justify-start text-start md:text-center md:justify-center">
      <div className="text-accentBrand text-3xl font-bold">My Zone</div>
      <p className="text-textBrand my-4 font-semibold">Work on your own personal tasks and be productive in your own space.</p>
      <div className="inline-flex my-10 justify-center rounded-md" role="group">
        <button
          type="button"
          onClick={()=>setChosen("communities")}
          className={`inline-flex  items-center rounded-s-lg border ${chosen==="communities" ? " z-10 ring-2 ring-primaryBrand border-primaryBrand bg-primaryBrand text-backgroundBrand" : "border-accentBrand text-accentBrand"}  hover:border-primaryBrand focus:border-primaryBrand  bg-transparent px-4 py-2 text-sm font-medium  hover:bg-primaryBrand hover:text-backgroundBrand focus:z-10 focus:bg-primaryBrand focus:text-backgroundBrand focus:ring-2 focus:ring-primaryBrand `}
        >
          <svg
            className="me-2 h-3 w-3"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z" />
          </svg>
          My Communities
        </button>
        <button
        onClick = {()=>setChosen("projects")}
          type="button"
          className="inline-flex items-center border-b border-t border-accentBrand hover:border-primaryBrand focus:border-primaryBrand  bg-transparent px-4 py-2 text-sm font-medium text-accentBrand hover:bg-primaryBrand hover:text-backgroundBrand focus:z-10 focus:bg-primaryBrand focus:text-backgroundBrand focus:ring-2 focus:ring-primaryBrand"
        >
          <svg
            className="me-2 h-3 w-3"
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
              d="M4 12.25V1m0 11.25a2.25 2.25 0 0 0 0 4.5m0-4.5a2.25 2.25 0 0 1 0 4.5M4 19v-2.25m6-13.5V1m0 2.25a2.25 2.25 0 0 0 0 4.5m0-4.5a2.25 2.25 0 0 1 0 4.5M10 19V7.75m6 4.5V1m0 11.25a2.25 2.25 0 1 0 0 4.5 2.25 2.25 0 0 0 0-4.5ZM16 19v-2"
            />
          </svg>
          My Projects
        </button>
        <button
          type="button"
          className="inline-flex items-center rounded-e-lg border border-accentBrand hover:border-primaryBrand focus:border-primaryBrand  bg-transparent px-4 py-2 text-sm font-medium text-accentBrand hover:bg-primaryBrand hover:text-backgroundBrand focus:z-10 focus:bg-primaryBrand focus:text-backgroundBrand focus:ring-2 focus:ring-primaryBrand"
        >
          <svg
            className="me-2 h-3 w-3"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M14.707 7.793a1 1 0 0 0-1.414 0L11 10.086V1.5a1 1 0 0 0-2 0v8.586L6.707 7.793a1 1 0 1 0-1.414 1.414l4 4a1 1 0 0 0 1.416 0l4-4a1 1 0 0 0-.002-1.414Z" />
            <path d="M18 12h-2.55l-2.975 2.975a3.5 3.5 0 0 1-4.95 0L4.55 12H2a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-4a2 2 0 0 0-2-2Zm-3 5a1 1 0 1 1 0-2 1 1 0 0 1 0 2Z" />
          </svg>
          My Todos
        </button>
      </div>
    </main>
  );
}
