"use client";
import React, { useState } from "react";
import useGenerateCommunity from "../hooks/useGenerateCommunity";
import ErrorNotification from "./ErrorNotification";
export default function GenerateCommunityModal({
  open,
  setOpen,
  type = "community",
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
  type?: "community" | "project"; // Optional type prop to differentiate between community and project generation
}) {
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const handleGenerateCommunity = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const { result, error } = await useGenerateCommunity(prompt);
    if (error) {
      console.error("Error generating community:", error);
      setError("Failed to generate community. Please try again.");
      setLoading(false);
      return;
    }
    console.log("Generated community:", result);
    setLoading(false);
    setError("");
    // setOpen(false); // Close the modal after generation
  };

    const handleGenerateProject = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const { result, error } = await useGenerateCommunity(prompt);
    if (error) {
      console.error("Error generating project:", error);
      setError("Failed to generate project. Please try again.");
      setLoading(false);
      return;
    }
    console.log("Generated project:", result);
    setLoading(false);
    setError("");
    // setOpen(false); // Close the modal after generation
  };

  return (
    <>
      {open && (
        <div className="fixed left-0 right-0 top-0 z-50 flex h-full w-full items-center justify-center overflow-y-auto overflow-x-hidden bg-gray-300/75">
          <div className="relative max-h-full w-full max-w-xl p-4">
            <div className="relative rounded-lg bg-white shadow">
              <div className="flex items-center justify-between rounded-t border-b p-4 md:p-5">
                <h3 className="text-lg font-bold text-accentBrand">
                  Generate a {type === "project" ? "Project" : "Community"}
                </h3>
                <button
                  onClick={() => {
                    setOpen(false)
                    setPrompt("");
                    setError("");
                  }
                  }
                  type="button"
                  className="ms-auto inline-flex h-8 w-8 items-center justify-center rounded-lg bg-transparent text-sm text-accentBrand hover:bg-gray-100"
                >
                  <svg
                    className="h-3 w-3"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 14 14"
                  >
                    <path
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                    />
                  </svg>
                  <span className="sr-only">Close modal</span>
                </button>
              </div>
              <div className="p-6">
                <form onSubmit={type === "project" ? handleGenerateProject : handleGenerateCommunity}>
                  <textarea
                    className="w-full rounded-lg border border-gray-300 p-2 text-sm text-textBrand focus:border-secondaryBrand focus:ring-secondaryBrand"
                    placeholder={`Describe the ${type} you want to create...`}
                    rows={4}
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                  ></textarea>
                  <p className="mt-1 text-sm text-primaryBrand">
                  {prompt.length > 0 && prompt.length<=500 && `${500 - prompt.length} character(s) remaining`}
                  </p>
                  <p className="mt-1 text-sm text-red-500">
                  {prompt.length > 500 && `${prompt.length -500 } character(s) over limit`}
                  </p>
                  {error && (
                    <div className="mt-4">
                      <ErrorNotification message={error} />
                    </div>
                  )}
                  <div className="mt-4 flex justify-end">
                    <button
                      type="button"
                      onClick={() => setOpen(false)}
                      className="mr-2 rounded-lg bg-gray-200 px-4 py-2 text-sm text-textBrand hover:bg-gray-300"
                    >
                      Cancel
                    </button>
                    <button
                      disabled={prompt.length === 0 || prompt.length > 500}
                      type="submit"
                      className="rounded-lg bg-secondaryBrand px-4 py-2 text-sm text-white hover:bg-secondaryBrand/80 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {loading ? "Generating..." : `Generate ${type === "project" ? "Project" : "Community"}`}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
