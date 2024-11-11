"use client";
import React from "react";
import { useState } from "react";
import { api } from "~/trpc/react";
import ErrorNotification from "./ErrorNotification";
import { useRouter } from "next/navigation";
export default function NewTodoModal({
  open,
  setOpen,
  projectId
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
  projectId: number;
}) {
  const router = useRouter();
  const [meetingName, setMeetingName] = useState("");
  const [meetingTime, setMeetingTime] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [meetingLocationOrLink, setMeetingLocationOrLink] = useState("");
  const [inPerson, setInPerson] = useState(false);
  const [content, setContent] = useState("");
  const [meetingDocuments, setMeetingDocuments] = useState<string[]>([]);
  const [currentDocument, setCurrentDocument] = useState("");
  const { mutate } = api.meetings.createNewMeeting.useMutation({
    onSuccess: () => {
      console.log("Todo created successfully");
      setLoading(false);
      setOpen(false);
      router.refresh();
    },
    onError: (error) => {
      setLoading(false);
      console.error(error);
      setError("Error Occured");
    },
  });

  //get the current user

  const handleSubmit = async (e: React.FormEvent) => {
    setLoading(true);
    setError("");
    e.preventDefault();
    
    
  };

  return (
    <>
      {open && (
        <div className="fixed left-0 right-0 top-0 z-50 flex h-full w-full items-center justify-center overflow-y-auto overflow-x-hidden bg-gray-300/75">
          <div className="relative w-full max-w-xl p-4">
            <div className="relative max-h-[80vh] overflow-y-scroll rounded-lg bg-white shadow">
              <div className="flex items-center justify-between rounded-t border-b p-4 md:p-5">
                <h3 className="text-lg font-bold text-accentBrand">
                  Create New Todo
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
                      Meeting Name
                    </label>
                    <input
                      type="text"
                      className="block w-full rounded-lg border-2 border-primaryBrand bg-white p-2.5 text-sm text-textBrand placeholder-textBrand outline-primaryBrand"
                      placeholder="Your Meetings Name"
                      required
                      value={meetingName}
                      onChange={(e) => setMeetingName(e.target.value)}
                    />
                  </div>

                  <div className="col-span-2">
                    <label className="mb-2 block text-sm font-medium text-accentBrand">
                      Meeting Content
                    </label>
                    <textarea
                      rows={3}
                      className="block w-full rounded-lg border-2 border-primaryBrand bg-white p-2.5 text-sm text-textBrand placeholder-textBrand outline-primaryBrand"
                      placeholder="This is what will take place in this meeting"
                      required
                      value={content}
                      onChange={(e) => setContent(e.target.value)}
                    />
                  </div>

                  <div className="col-span-2 sm:col-span-1">
                    <label className="mb-2 block text-sm font-medium text-accentBrand">
                      Meeting Time
                    </label>
                    <input
                      type="datetime-local"
                      className="block w-full rounded-lg border-2 border-primaryBrand bg-white p-2.5 text-sm text-textBrand placeholder-textBrand outline-primaryBrand"
                      required
                      value={meetingTime}
                      onChange={(e) => setMeetingTime(e.target.value)}
                    />
                  </div>

                  <div className="col-span-1">
                    <label className="mb-5 cursor-pointer items-center">
                      <span className="mb-2 text-sm font-medium text-accentBrand">
                        In person?
                      </span>
                      <input
                        onChange={(e) => setInPerson(e.target.checked)}
                        type="checkbox"
                        checked={inPerson}
                        className="peer sr-only"
                      />
                      <div className="peer relative mt-2 h-6 w-11 rounded-full bg-textBrand after:absolute after:start-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-textBrand after:bg-white after:transition-all after:content-[''] peer-checked:bg-primaryBrand peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none rtl:peer-checked:after:-translate-x-full"></div>
                    </label>
                  </div>

                  <div className="col-span-2">
                    <label className="mb-2 block text-sm font-medium text-accentBrand">
                      {inPerson ? "Meeting Location" : "Meeting Link"}
                    </label>
                    <input
                      className="block w-full rounded-lg border-2 border-primaryBrand bg-white p-2.5 text-sm text-textBrand placeholder-textBrand outline-primaryBrand"
                      placeholder={`${inPerson ? "Location" : "Link"} for this meeting`}
                      required
                      value={meetingLocationOrLink}
                      onChange={(e) => setMeetingLocationOrLink(e.target.value)}
                    />
                  </div>

                  <div className="col-span-1">
                    <label className="mb-2 block text-sm font-medium text-accentBrand">
                      Meeting Documents
                    </label>
                    <input
                      className="block w-full rounded-lg border-2 border-primaryBrand bg-white p-2.5 text-sm text-textBrand placeholder-textBrand outline-primaryBrand"
                      placeholder="Document URL"
                      value={currentDocument}
                      onChange={(e) => setCurrentDocument(e.target.value)}
                      type="url"
                    />
                  </div>

                  <div className="col-span-1 place-content-end">
                    <button
                      onClick={() => {
                        setMeetingDocuments([
                          ...meetingDocuments,
                          currentDocument,
                        ]);
                        setCurrentDocument("");
                      }}
                      type="button"
                      className="block items-center rounded-lg bg-secondaryBrand px-4 py-2.5 text-center text-sm font-medium text-white hover:cursor-pointer hover:bg-secondaryBrand/75"
                    >
                      Add to list
                    </button>
                  </div>

                  <ul className="col-span-2 mb-6">
                    <h1 className="mb-2 block text-lg font-medium text-accentBrand">
                      Documents
                    </h1>
                    {meetingDocuments.length === 0 ? 
                    <p className="font-bold text-sm text-textBrand">
                        No documents added yet
                        </p>
                        : 
                        <>
                    {meetingDocuments.map((doc, index) => (
                      <li
                        key={index}
                        className="flex flex-row items-center gap-2 py-2"
                      >
                        <a
                        target="_blank"
                          className="align-middle text-sm font-medium text-accentBrand underline hover:cursor-pointer"
                          href={doc}
                        >
                          {doc.length > 40 ? `${doc.substring(0, 40)}...` : doc}
                        </a>
                        <button
                          onClick={() => {
                            setMeetingDocuments(
                              meetingDocuments.filter((_, i) => i !== index),
                            );
                          }}
                          type="button"
                          className="inline-flex items-center rounded-lg px-2 py-1.5 text-center text-sm font-medium text-accentBrand hover:cursor-pointer hover:bg-gray-100"
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
                        </button>
                      </li>
                      
                    ))}
                    </>
                    }
                  </ul>
                </div>
                <div className="flex flex-row items-center justify-between">
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
                    {loading ? "Creating todo..." : "Add new todo"}
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
