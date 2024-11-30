"use client";
import React, { useState } from "react";
import Loading from "~/app/loading";
import { api } from "~/trpc/react";
import Error from "~/app/_components/Error";
import Image from "next/image";
import userIcon from "../../../../public/user.svg";
import { formatDistanceToNow } from "date-fns";
import CommunityCard from "~/app/_components/CommunityCard";
import ProjectList from "~/app/_components/ProjectList";
import MeetingCard from "~/app/_components/MeetingCard";
import TodoList from "~/app/_components/TodoList";
export default function Page({ params }: { params: { id: string } }) {
  const { id } = params;
  const [chosen, setChosen] = useState("communities");
  const [communityOpen, setCommunityOpen] = useState(false);
  const [projectOpen, setProjectOpen] = useState(false);
  const [meetingOpen, setMeetingOpen] = useState(false);
  const [todoOpen, setTodoOpen] = useState(false);

  const { data: user, isFetching } = api.user.getUserByIdWithRelations.useQuery(
    { id },
  );

  return (
    <>
      {isFetching ? (
        <Loading />
      ) : !user ? (
        <Error
          statusCode={404}
          errorMessage="User Not Found"
          redirectLink="/"
          redirectPlace="Home"
        />
      ) : (
        <main className="mx-auto my-24 flex max-w-7xl flex-col p-10 md:my-10 md:items-center">
          {/* Header Section */}
          <div className="text-center text-3xl font-bold text-accentBrand">
            My Zone
          </div>
          <p className="mt-4 text-center font-semibold leading-relaxed text-textBrand md:w-2/3">
            View your profile and communities, projects, meetings, and todos
            related to your account. Or, work on your own personal tasks and be
            productive in your space.
          </p>

          <div className="my-20 grid w-full grid-cols-2 gap-x-4">
            <div className="flex w-full flex-col gap-y-8">
              <div className="flex flex-row gap-x-8">
                <Image
                  src={userIcon}
                  width={100}
                  height={100}
                  className="rounded-full border border-primaryBrand"
                  alt="Profile Picture"
                />
                <div className="flex flex-col gap-y-4">
                  <button className="rounded-3xl bg-secondaryBrand px-10 py-3 text-center text-white hover:bg-secondaryBrand/75">
                    Change Avatar
                  </button>
                  <p className="leading-6 text-accentBrand">
                    JPG, GIF or PNG. 1MB Max Size
                  </p>
                </div>
              </div>
              <p className="py-4 font-semibold text-textBrand">
                {user.aboutMe ?? "No bio provided"}
              </p>
              <div className="grid grid-cols-2 gap-x-4 gap-y-8">
                <div>
                  <h1 className="font-bold text-accentBrand">First Name</h1>
                  <p className="mt-1 font-light text-textBrand">
                    {user.firstName}
                  </p>
                </div>
                <div>
                  <h1 className="font-bold text-accentBrand">Last Name</h1>
                  <p className="mt-1 font-light text-textBrand">
                    {user.lastName}
                  </p>
                </div>
                <div>
                  <h1 className="font-bold text-accentBrand">Email</h1>
                  <p className="mt-1 font-light text-textBrand">{user.email}</p>
                </div>
                <div>
                  <h1 className="font-bold text-accentBrand">Location</h1>
                  <p className="mt-1 font-light text-textBrand">
                    {user.location}
                  </p>
                </div>
                <div>
                  <h1 className="font-bold text-accentBrand">Age</h1>
                  <p className="mt-1 font-light text-textBrand">
                    {user.dateOfBirth
                      ? formatDistanceToNow(new Date(user.dateOfBirth))
                      : "Date of birth not provided"}
                  </p>
                </div>
              </div>
            </div>
            <div className="gap-y-8">
              <h1 className="mb-8 text-2xl font-semibold text-accentBrand">
                What you've got goin on...
              </h1>
              <div className="flex flex-col gap-y-8">
                <div className="flex flex-row items-center gap-x-2">
                  <span
                    onClick={() => setCommunityOpen((prev) => !prev)}
                    className="my-auto h-6 w-6"
                  >
                    {communityOpen ? (
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                        <g
                          id="SVGRepo_tracerCarrier"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        ></g>
                        <g id="SVGRepo_iconCarrier">
                          {" "}
                          <path
                            d="M7 10L12 15L17 10"
                            stroke="#ee6605"
                            stroke-width="1.5"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          ></path>{" "}
                        </g>
                      </svg>
                    ) : (
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                        <g
                          id="SVGRepo_tracerCarrier"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        ></g>
                        <g id="SVGRepo_iconCarrier">
                          {" "}
                          <path
                            d="M10 7L15 12L10 17"
                            stroke="#ee6605"
                            stroke-width="1.5"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          ></path>{" "}
                        </g>
                      </svg>
                    )}
                  </span>
                  <h1 className="font-bold text-accentBrand">Communities</h1>
                  <p className="font-light text-textBrand">
                    {user.Communities.length}
                  </p>
                </div>
                {communityOpen &&
                <div className="grid grid-cols-2 gap-4">
                {user.Communities.map((community) => (
                    <CommunityCard key={community.id} community
                    ={community} />
                ))}
                </div>
}
                <div className="flex flex-row items-center gap-x-2">
                <span
                    onClick={() => setProjectOpen((prev) => !prev)}
                    className="my-auto h-6 w-6"
                  >
                    {projectOpen ? (
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                        <g
                          id="SVGRepo_tracerCarrier"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        ></g>
                        <g id="SVGRepo_iconCarrier">
                          {" "}
                          <path
                            d="M7 10L12 15L17 10"
                            stroke="#ee6605"
                            stroke-width="1.5"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          ></path>{" "}
                        </g>
                      </svg>
                    ) : (
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                        <g
                          id="SVGRepo_tracerCarrier"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        ></g>
                        <g id="SVGRepo_iconCarrier">
                          {" "}
                          <path
                            d="M10 7L15 12L10 17"
                            stroke="#ee6605"
                            stroke-width="1.5"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          ></path>{" "}
                        </g>
                      </svg>
                    )}
                  </span>
                  <h1 className="font-bold text-accentBrand">Projects</h1>
                  <p className="font-light text-textBrand">
                    {user.Projects.length}
                  </p>
                </div>
                {projectOpen &&
                <ProjectList projects={user.Projects} />
}
                <div className="flex flex-row items-center gap-x-2">
                <span
                    onClick={() => setMeetingOpen((prev) => !prev)}
                    className="my-auto h-6 w-6"
                  >
                    {meetingOpen ? (
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                        <g
                          id="SVGRepo_tracerCarrier"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        ></g>
                        <g id="SVGRepo_iconCarrier">
                          {" "}
                          <path
                            d="M7 10L12 15L17 10"
                            stroke="#ee6605"
                            stroke-width="1.5"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          ></path>{" "}
                        </g>
                      </svg>
                    ) : (
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                        <g
                          id="SVGRepo_tracerCarrier"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        ></g>
                        <g id="SVGRepo_iconCarrier">
                          {" "}
                          <path
                            d="M10 7L15 12L10 17"
                            stroke="#ee6605"
                            stroke-width="1.5"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          ></path>{" "}
                        </g>
                      </svg>
                    )}
                  </span>
                  <h1 className="font-bold text-accentBrand">Meetings</h1>
                  <p className="font-light text-textBrand">
                    {user.Meetings.length}
                  </p>
                </div>
                {meetingOpen &&
                <div className="grid grid-cols-2 gap-4">
                {user.Meetings.map((meeting) => (
                    <MeetingCard key={meeting.id} meeting={meeting} />
                ))}
                </div>
                }
                <div className="flex flex-row items-center gap-x-2">
                <span
                    onClick={() => setTodoOpen((prev) => !prev)}
                    className="my-auto h-6 w-6"
                  >
                    {todoOpen ? (
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                        <g
                          id="SVGRepo_tracerCarrier"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        ></g>
                        <g id="SVGRepo_iconCarrier">
                          {" "}
                          <path
                            d="M7 10L12 15L17 10"
                            stroke="#ee6605"
                            stroke-width="1.5"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          ></path>{" "}
                        </g>
                      </svg>
                    ) : (
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                        <g
                          id="SVGRepo_tracerCarrier"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        ></g>
                        <g id="SVGRepo_iconCarrier">
                          {" "}
                          <path
                            d="M10 7L15 12L10 17"
                            stroke="#ee6605"
                            stroke-width="1.5"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          ></path>{" "}
                        </g>
                      </svg>
                    )}
                  </span>
                  <h1 className="font-bold text-accentBrand">Todos</h1>
                  <p className="font-light text-textBrand">
                    {user.assignedTodos.length}
                  </p>
                </div>
                {todoOpen &&
                <TodoList todos={user.assignedTodos} />
                }
              </div>
            </div>
          </div>
          {/* Navigation Buttons */}
          <div className="mt-10 inline-flex justify-center divide-x divide-gray-300 rounded-md border border-gray-300 bg-white shadow-sm">
            {/* My Communities Button */}
            <button
              type="button"
              onClick={() => setChosen("communities")}
              className={`inline-flex items-center rounded-l-md px-6 py-3 text-sm font-medium ${
                chosen === "communities"
                  ? "bg-primaryBrand text-white"
                  : "text-accentBrand hover:bg-primaryBrand hover:text-white"
              }`}
            >
              <svg
                className="me-2 h-4 w-4"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 20"
                aria-hidden="true"
              >
                <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z" />
              </svg>
              My Communities
            </button>

            {/* My Projects Button */}
            <button
              type="button"
              onClick={() => setChosen("projects")}
              className={`inline-flex items-center px-6 py-3 text-sm font-medium ${
                chosen === "projects"
                  ? "bg-primaryBrand text-white"
                  : "text-accentBrand hover:bg-primaryBrand hover:text-white"
              }`}
            >
              <svg
                className="me-2 h-4 w-4"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
                aria-hidden="true"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 12.25V1m0 11.25a2.25 2.25 0 0 0 0 4.5m0-4.5a2.25 2.25 0 0 1 0 4.5M4 19v-2.25m6-13.5V1m0 2.25a2.25 2.25 0 0 0 0 4.5m0-4.5a2.25 2.25 0 0 1 0 4.5M10 19V7.75m6 4.5V1m0 11.25a2.25 2.25 0 1 0 0 4.5 2.25 2.25 0 0 0 0-4.5ZM16 19v-2"
                />
              </svg>
              My Projects
            </button>

            {/* My Todos Button */}
            <button
              type="button"
              onClick={() => setChosen("todos")}
              className={`inline-flex items-center rounded-r-md px-6 py-3 text-sm font-medium ${
                chosen === "todos"
                  ? "bg-primaryBrand text-white"
                  : "text-accentBrand hover:bg-primaryBrand hover:text-white"
              }`}
            >
              <svg
                className="me-2 h-4 w-4"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 20"
                aria-hidden="true"
              >
                <path d="M14.707 7.793a1 1 0 0 0-1.414 0L11 10.086V1.5a1 1 0 0 0-2 0v8.586L6.707 7.793a1 1 0 1 0-1.414 1.414l4 4a1 1 0 0 0 1.416 0l4-4a1 1 0 0 0-.002-1.414Z" />
                <path d="M18 12h-2.55l-2.975 2.975a3.5 3.5 0 0 1-4.95 0L4.55 12H2a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-4a2 2 0 0 0-2-2Zm-3 5a1 1 0 1 1 0-2 1 1 0 0 1 0 2Z" />
              </svg>
              My Todos
            </button>
          </div>
        </main>
      )}
    </>
  );
}
