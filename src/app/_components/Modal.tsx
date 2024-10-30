"use client";
import Blob from "./Blob";
import { useState } from "react";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { useRouter } from "next/navigation";

export default function Modal(props: {
  open: boolean;
  setOpen: (open: boolean) => void;
}) {
  const router =useRouter()
  const { open, setOpen } = props;
  const [communityName, setCommunityName] = useState("");
  const [communityPassword, setCommunityPassword] = useState("");
  const [validCommunityEntered, setValidCommunityEntered] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const searchByName = (e: React.FormEvent) => {
    try {
      setLoading(true);
      setError("");
      e.preventDefault();
      console.warn("clicked");
      //make network req to see if there is a community that has that name and is private

      //throw new error and deal with it special if that community is not private
      setValidCommunityEntered(true);
    } catch (err) {
      console.error(err);
      setError("Community name could not be validated");
    } finally {
      setLoading(false);
    }
  };

  const joinPrivateCommunity =  (e:React.FormEvent) => {
    e.preventDefault()
    setError('')
    console.log(communityPassword)
    //try to join the community from the password we got 

    //if success display a success on the modal set a timeout then redirect to the communties screen with the id we have
    router.push(`/communities/id`)
    //if failed set an errir
    setError('somethinb')
  }

  const back = () => {
    setCommunityPassword('')
    setCommunityName('')
    setValidCommunityEntered(false)
  }

  return (
    <Dialog open={open} onClose={setOpen} className="relative z-10">
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
      />

      <form
        onSubmit={validCommunityEntered ? joinPrivateCommunity : searchByName}
        className="fixed inset-0 z-10 w-screen overflow-y-auto"
      >
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <DialogPanel
            transition
            className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in sm:my-8 sm:w-full sm:max-w-xl data-[closed]:sm:translate-y-0 data-[closed]:sm:scale-95"
          >
            <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
              <div className="sm:flex sm:items-start">
                <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                  <DialogTitle
                    as="h3"
                    className="my-6 text-xl font-bold leading-6 text-secondaryBrand"
                  >
                    Join a Private Community
                  </DialogTitle>
                  <div className="mt-2">
                    <p className="text-sm text-textBrand">
                      In order to join a private community you must know its
                      name and password. Please enter the name of a private
                      community first and if one exists with a matching name you
                      may enter a password.
                    </p>
                  </div>
                  <div className="mt-8">
                    {validCommunityEntered ? (
                      <label className="flex flex-col">
                        <span className="flex flex-row justify-between sm:w-2/3 items-center">
                          <p>
                          Password
                          </p>
                        <Blob title="COMMUNITY EXISTS!"  />
                        </span>
                        <input
                          type="password"
                          value={communityPassword}
                          onChange={(e)=>setCommunityPassword(e.target.value)}
                          placeholder="Enter a community password"
                          className="mt-2 rounded-xl border border-accentBrand px-4 py-2 text-textBrand outline-accentBrand sm:w-2/3"
                        />
                      </label>
                    ) : (
                      <label className="flex flex-col">
                        <span>Community Name</span>
                        <input
                        value={communityName}
                        onChange={(e)=>setCommunityName(e.target.value)}
                          type="text"
                          placeholder="Enter a community name"
                          className="mt-2 rounded-xl border border-accentBrand px-4 py-2 text-textBrand outline-accentBrand sm:w-2/3"
                        />
                      </label>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-8 bg-gray-50 px-4 py-4 sm:flex sm:flex-row-reverse sm:px-6">
              {validCommunityEntered ? (
                <>
                <button
                  type="submit"
                  onClick={searchByName}
                  className="inline-flex w-full justify-center rounded-xl border-2 border-primaryBrand bg-primaryBrand px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-white hover:text-primaryBrand sm:ml-3  sm:w-auto"
                >
                 Attempt to join {communityName || "the community"}
                </button>
                     <button
                     onClick={back}
                     type="button"
                     data-autofocus
                     className="mt-3 inline-flex w-full items-center justify-center rounded-xl border-accentBrand bg-white px-3 py-2 text-sm font-semibold text-accentBrand shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-accentBrand hover:text-white sm:mt-0 sm:w-auto"
                   >
                     Back
                   </button>
                   </>
              ) : (
                <>
                <button
                  type="submit"
                  onClick={searchByName}
                  className="inline-flex w-full justify-center rounded-xl border-2 border-primaryBrand bg-primaryBrand px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-white hover:text-primaryBrand sm:ml-3 sm:w-auto"
                >
                  Check for a community
                </button>
                  <button
                  onClick={() => setOpen(false)}
                  type="button"
                  data-autofocus
                  className="mt-3 inline-flex w-full items-center justify-center rounded-xl border-accentBrand bg-white px-3 py-2 text-sm font-semibold text-accentBrand shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-accentBrand hover:text-white sm:mt-0 sm:w-auto"
                >
                  Cancel
                </button>
                </>
              )}
            
            </div>
          </DialogPanel>
        </div>
      </form>
    </Dialog>
  );
}
