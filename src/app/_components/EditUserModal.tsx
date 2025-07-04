"use client";
import React, { useEffect } from "react";
import { useState } from "react";
import { api } from "~/trpc/react";
import ErrorNotification from "./ErrorNotification";
import { useRouter } from "next/navigation";
import type { location as Location } from "@prisma/client";
export default function EditUserModal({
  open,
  setOpen,
  userId,
  firstName,
  lastName,
  dateOfBirth,
  location,
  aboutMe
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
  userId: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  location: keyof typeof Location;
    aboutMe: string;
}) {
  const router = useRouter();
  const [fName, setFName] = useState(firstName);
  const [lName, setLname] = useState(lastName);
  const [DOB, setDOB] = useState(() => {
    if (!dateOfBirth) return "";
    const d = new Date(dateOfBirth);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, "0"); // Months are 0-based
    const day = String(d.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  });
  const [loc, setLoc] = useState(location);
  const [abtMe, setAbtMe] = useState(aboutMe);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    setFName(firstName);
    setLname(lastName);
    setDOB(() => {
        if (!dateOfBirth) return "";
      const d = new Date(dateOfBirth);
      const year = d.getFullYear();
      const month = String(d.getMonth() + 1).padStart(2, "0"); // Months are 0-based
      const day = String(d.getDate()).padStart(2, "0");
      return `${year}-${month}-${day}`;
    });
    setLoc(location);
  }, [dateOfBirth, firstName, lastName, location, open]);

  const { mutate: edit } = api.user.updateUser.useMutation({
    onSuccess: () => {
      setLoading(false);
      setOpen(false);
      router.refresh();
    },
    onError: (error) => {
      //
      setLoading(false);
      console.error(error);
      setError("Failed to update user");
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
        setLoading(true);
        setError("");
        const endDate = new Date(DOB);
        
          edit({
              id: userId,
              firstName: fName,
              lastName: lName,
              dateOfBirth: endDate,
              location: loc,
              aboutMe: abtMe,
          })
  };

  return (
    <>
      {open && (
        <div className="fixed left-0 right-0 top-0 z-50 flex h-full w-full items-center justify-center overflow-y-auto overflow-x-hidden bg-gray-300/75">
          <div className="relative max-h-full w-full max-w-xl p-4">
            <div className="relative rounded-lg bg-white shadow">
              <div className="flex items-center justify-between rounded-t border-b p-4 md:p-5">
                <h3 className="text-lg font-bold text-accentBrand">
                  Edit your profile
                </h3>
                <button
                  onClick={() => setOpen(false)}
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
              <form onSubmit={handleSubmit} className="p-4 md:p-5">
                <div className="mb-4 grid grid-cols-2 gap-12">
                  <div className="col-span-2">
                    <label className="mb-2 block text-sm font-medium text-accentBrand">
                      First Name
                    </label>
                    <input
                      type="text"
                      className="block w-full rounded-lg border-2 border-primaryBrand bg-white p-2.5 text-sm text-textBrand placeholder-textBrand outline-primaryBrand"
                      placeholder="Your Project Name"
                      required
                      value={fName}
                      onChange={(e) => setFName(e.target.value)}
                    />
                  </div>

                  <div className="col-span-2">
                    <label className="mb-2 block text-sm font-medium text-accentBrand">
                      Last Name
                    </label>
                    <input
                      type="text"
                      className="block w-full rounded-lg border-2 border-primaryBrand bg-white p-2.5 text-sm text-textBrand placeholder-textBrand outline-primaryBrand"
                      placeholder="Your Project Name"
                      required
                      value={lName}
                      onChange={(e) => setLname(e.target.value)}
                    />
                  </div>

                  <div className="col-span-2">
                    <label className="mb-2 block text-sm font-medium text-accentBrand">
                      About Me (Bio)
                    </label>
                    <textarea
                      rows={3}
                      className="block w-full rounded-lg border-2 border-primaryBrand bg-white p-2.5 text-sm text-textBrand placeholder-textBrand outline-primaryBrand"
                      placeholder="All about me"
                      required
                      value={abtMe}
                      onChange={(e) => setAbtMe(e.target.value)}
                    />
                  </div>

                  <div className="col-span-2 sm:col-span-1">
                    <label className="mb-2 block text-sm font-medium text-accentBrand">
                      Date of Birth
                    </label>
                    <input
                      type="date"
                      className="block w-full rounded-lg border-2 border-primaryBrand bg-white p-2.5 text-sm text-textBrand placeholder-textBrand outline-primaryBrand"
                      required
                      value={DOB}
                      onChange={(e) => setDOB(e.target.value)}
                    />
                  </div>
               
                    <div className="col-span-2 sm:col-span-1">
                      <label className="mb-2 block text-sm font-medium text-accentBrand">
                        Location
                      </label>
                      <select
                        value={loc}
                        onChange={(e) =>
                          setLoc(e.target.value as keyof typeof Location)
                        }
                        className="block w-full rounded-lg border-2 border-primaryBrand bg-white p-2.5 text-sm text-textBrand placeholder-textBrand outline-primaryBrand"
                      >
                        <option selected value="Canada">
                          Canada
                        </option>
                        <option value="USA">United States</option>
                        <option value="Mexico">Mexio</option>
                        <option value="France">France</option>
                        <option value="Germany">Germany</option>
                      </select>
                    </div>
                  
                </div>
                <div className="flex flex-col items-center justify-between gap-y-4 sm:flex-row">
                  <button
                    type="submit"
                    className="inline-flex items-center rounded-lg bg-secondaryBrand px-5 py-2.5 text-center text-sm font-medium text-white hover:cursor-pointer hover:bg-secondaryBrand/75"
                  >
                    <svg
                      className="-ms-1 me-1 h-5 w-5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                        clip-rule="evenodd"
                      ></path>
                    </svg>
                    {loading ? "Updating Profile..." : "Update Profile"}
                  </button>
                  <span>{error && <ErrorNotification message={error} />}</span>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
