/* eslint-disable @typescript-eslint/no-unsafe-assignment */

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
import { useRouter } from "next/navigation";
import EditUserModal from "~/app/_components/EditUserModal";
import { useAuthContext } from "~/context/AuthContext";
export default function Page({ params }: { params: { id: string } }) {
  const { id } = params;
  const { user: currentUser } = useAuthContext();
  const router = useRouter();
  const [communityOpen, setCommunityOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [uploadError, setUploadError] = useState("");
  const [projectOpen, setProjectOpen] = useState(false);
  const [meetingOpen, setMeetingOpen] = useState(false);
  const [todoOpen, setTodoOpen] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [editOpen, setEditOpen] = useState(false);
  const { data: user, isFetching } = api.user.getUserByIdWithRelations.useQuery(
    { id },
  );

  const { mutate: uploadImage } = api.user.updateUserIcon.useMutation({
    onSuccess: () => {
      console.log("Image uploaded successfully");
      setLoading(false);
      router.refresh();
    },
    onError: (error) => {
      console.error(error);
      setUploadError("Error uploading image");
      setLoading(false);
    },
  });

  const handleUpload = async () => {
  if (!file || !id) return;
  setLoading(true);

  const reader = new FileReader();
  reader.onloadend = () => {
    const base64String = reader.result?.toString().split(",")[1]; // strip the `data:*/*;base64,` prefix
    if (base64String) {
      uploadImage({ icon: base64String, id });
    }
  };
  reader.readAsDataURL(file); // triggers `onloadend`
  };

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
            {user.id === currentUser?.id ? "Your Profile" : "User Profile"}
          </div>
          {user.id === currentUser?.id && (
            <p className="mt-4 text-center font-semibold leading-relaxed text-textBrand md:w-2/3">
              View your profile and communities, projects, meetings, and todos
              related to your account. Or, work on your own personal tasks and
              be productive in your space.
            </p>
          )}

          <div className="mt-20 grid w-full grid-cols-1 gap-x-4 gap-y-16 md:grid-cols-2">
            <div className="flex w-full flex-col gap-y-8">
                <div className="flex flex-row gap-x-8">
                <Image
                  src={user?.image ?? userIcon}
                  width={96}
                  height={96}
                  className="h-24 w-24 rounded-full border border-primaryBrand object-cover"
                  alt="Profile Picture"
                />
                {user.id === currentUser?.id && (
                    <div className="flex flex-col gap-y-4">
                    <input
                    type="file"
                    accept="image/jpeg,image/png,image/gif"
                    onChange={(e) => setFile(e.target.files?.[0] ?? null)}
                    className="block w-full text-sm text-slate-500
                    file:mr-4 file:py-2 file:px-4
                    file:rounded-full file:border-0
                    file:text-sm file:font-semibold
                    file:bg-secondaryBrand file:text-white
                    hover:file:bg-secondaryBrand/75"
                    />
                    {file && (
                    <button
                    onClick={handleUpload}
                    disabled={loading}
                    className="rounded-3xl bg-secondaryBrand px-10 py-3 text-center text-white hover:bg-secondaryBrand/75 disabled:opacity-50"
                    >
                    {loading ? 'Uploading...' : 'Choose New Icon'}
                    </button>
                    )}
                    {uploadError && (
                    <p className="text-red-500">{uploadError}</p>
                    )}
                    <p className="leading-6 text-accentBrand">
                    JPG, GIF or PNG. 1MB Max Size
                    </p>
                    </div>
                )}
                </div>
              <p className="w-11/12 py-4 font-semibold leading-8 text-textBrand">
                {user.aboutMe ?? "No bio provided"}
              </p>
              <div className="grid grid-cols-2 gap-x-4 gap-y-8">
                <div>
                  <h1 className="font-bold text-accentBrand">First Name</h1>
                  <p className="mt-1 truncate font-light text-textBrand">
                    {user.firstName}
                  </p>
                </div>
                <div>
                  <h1 className="font-bold text-accentBrand">Last Name</h1>
                  <p className="mt-1 truncate font-light text-textBrand">
                    {user.lastName}
                  </p>
                </div>
                <div>
                  <h1 className="font-bold text-accentBrand">Email</h1>
                  <p className="mt-1 truncate font-light text-textBrand">
                    {user.email}
                  </p>
                </div>
                <div>
                  <h1 className="font-bold text-accentBrand">Location</h1>
                  <p className="mt-1 font-light text-textBrand">
                    {user.location}
                  </p>
                </div>
                <div>
                  <h1 className="font-bold text-accentBrand">Age</h1>
                  <p className="mt-1 truncate font-light text-textBrand">
                    {user.dateOfBirth
                      ? formatDistanceToNow(new Date(user.dateOfBirth))
                      : "Date of birth not provided"}
                  </p>
                </div>
              </div>
            </div>
            <div className="gap-y-8">
              <h1 className="mb-8 text-2xl font-semibold text-accentBrand">
                Working on...
              </h1>
              <div className="flex flex-col gap-y-8">
                <div className="flex flex-row items-center gap-x-2">
                  {user.id === currentUser?.id && (
                    <button
                      disabled={user.Communities.length === 0}
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
                    </button>
                  )}
                  <h1 className="font-bold text-accentBrand">Communities</h1>
                  <p
                    className={`rounded-full font-light ${user.Communities.length === 0 ? "bg-textBrand" : "bg-primaryBrand"} flex h-8 w-8 items-center justify-center text-white`}
                  >
                    {user.Communities.length}
                  </p>
                </div>
                {communityOpen && (
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-1 xl:grid-cols-2">
                    {user.Communities.map((community) => (
                      <CommunityCard key={community.id} community={community} />
                    ))}
                  </div>
                )}
                <div className="flex flex-row items-center gap-x-2">
                  {user.id === currentUser?.id && (
                    <button
                      disabled={user.Projects.length === 0}
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
                    </button>
                  )}
                  <h1 className="font-bold text-accentBrand">Projects</h1>
                  <p
                    className={`rounded-full font-light ${user.Projects.length === 0 ? "bg-textBrand" : "bg-primaryBrand"} flex h-8 w-8 items-center justify-center text-white`}
                  >
                    {user.Projects.length}
                  </p>
                </div>
                {projectOpen && <ProjectList projects={user.Projects} />}
                <div className="flex flex-row items-center gap-x-2">
                  {user.id === currentUser?.id && (
                    <button
                      disabled={
                        user.Projects.flatMap((project) => project.Meetings)
                          .length === 0
                      }
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
                    </button>
                  )}
                  <h1 className="font-bold text-accentBrand">Meetings</h1>
                  <p
                    className={`rounded-full font-light ${
                      user.Projects.map((project) => {
                        return project.Meetings;
                      }).length === 0
                        ? "bg-textBrand"
                        : "bg-primaryBrand"
                    } flex h-8 w-8 items-center justify-center text-white`}
                  >
                    {
                      user.Projects.flatMap((project) => project.Meetings)
                        .length
                    }
                  </p>
                </div>
                {meetingOpen && (
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-1 xl:grid-cols-2">
                    {user.Projects.flatMap((project) => project.Meetings).map(
                      (meeting) => (
                        <MeetingCard key={meeting.id} meeting={meeting} />
                      ),
                    )}
                  </div>
                )}
                <div className="flex flex-row items-center gap-x-2">
                  {user.id === currentUser?.id && (
                    <button
                      disabled={user.assignedTodos.length === 0}
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
                    </button>
                  )}
                  <h1 className="font-bold text-accentBrand">Todos</h1>
                  <p
                    className={`rounded-full font-light ${user.assignedTodos.length === 0 ? "bg-textBrand" : "bg-primaryBrand"} flex h-8 w-8 items-center justify-center text-white`}
                  >
                    {user.assignedTodos.length}
                  </p>
                </div>
                {todoOpen && <TodoList todos={user.assignedTodos} />}
                <p className="font-small text-sm text-textBrand">
                  Created {user.createdTodos.length} todos,{" "}
                  {user.OwnedProjects.length} projects, {user.Meetings.length}{" "}
                  meetings, {user.Comments.length} comments and {user.OwnedCommunities.length} communities.
                </p>
              </div>
            </div>
          </div>
          {user.id === currentUser?.id && (
            <button
              onClick={() => setEditOpen(true)}
              className="mt-10 rounded-3xl border border-primaryBrand bg-primaryBrand px-10 py-3 text-center text-white hover:bg-backgroundBrand hover:text-primaryBrand"
            >
              Update Profile
            </button>
          )}

          <EditUserModal
            open={editOpen}
            setOpen={setEditOpen}
            userId={user.id}
            firstName={user.firstName}
            lastName={user.lastName}
            location={user.location}
            dateOfBirth={user.dateOfBirth?.toLocaleString() ?? ""}
            aboutMe={user.aboutMe ?? ""}
          />
        </main>
      )}
    </>
  );
}
