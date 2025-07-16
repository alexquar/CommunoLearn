/* eslint-disable @typescript-eslint/no-unsafe-assignment */

/* eslint-disable @typescript-eslint/no-unsafe-assignment */

"use client";
import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { formatDistanceToNow } from "date-fns";
import { api } from "~/trpc/react";
import { useAuthContext } from "~/context/AuthContext";
import userIcon from "../../../../public/user.svg";

import Loading from "~/app/loading";
import Error from "~/app/_components/Error";
import CommunityCard from "~/app/_components/CommunityCard";
import ProjectList from "~/app/_components/ProjectList";
import MeetingCard from "~/app/_components/MeetingCard";
import TodoList from "~/app/_components/TodoList";
import EditUserModal from "~/app/_components/EditUserModal";

export default function Page({ params }: { params: { id: string } }) {
  const { id } = params;
  const router = useRouter();
  const { user: currentUser } = useAuthContext();

  const [file, setFile] = useState<File | null>(null);
  const [uploadError, setUploadError] = useState("");
  const [loading, setLoading] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [communityOpen, setCommunityOpen] = useState(false);
  const [projectOpen, setProjectOpen] = useState(false);
  const [meetingOpen, setMeetingOpen] = useState(false);
  const [todoOpen, setTodoOpen] = useState(false);

  const { data: user, isFetching } = api.user.getUserByIdWithRelations.useQuery({ id });

  const { mutate: uploadImage } = api.user.updateUserIcon.useMutation({
    onSuccess: () => {
      setLoading(false);
      setFile(null);
      router.refresh();
    },
    onError: () => {
      setUploadError("Error uploading image");
      setLoading(false);
    },
  });

  const handleUpload = () => {
    if (!file || !id) return;
    setLoading(true);
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = reader.result?.toString().split(",")[1];
      if (base64String) {
        uploadImage({ icon: base64String, id });
      }
    };
    reader.readAsDataURL(file);
  };

  if (isFetching) return <Loading />;
  if (!user) return <Error statusCode={404} errorMessage="User Not Found" redirectLink="/" redirectPlace="Home" />;

  const isOwnProfile = user.id === currentUser?.id;

  return (
    <main className="mx-auto max-w-7xl px-6 py-20 md:py-10">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-accentBrand">
          {isOwnProfile ? "Your Profile" : "User Profile"}
        </h1>
        {isOwnProfile && (
          <p className="mt-4 text-lg text-textBrand md:w-2/3 mx-auto font-medium">
            View and manage your profile, communities, projects, meetings, and tasks. Stay productive.
          </p>
        )}
      </div>

      <div className="mt-16 grid gap-12 md:grid-cols-2">
        {/* LEFT: Info + Avatar */}
        <div className="flex flex-col gap-8">
          <div className="flex gap-6 items-start">
            <Image
              src={user.image ?? userIcon}
              width={96}
              height={96}
              alt="Profile Icon"
              className="h-24 w-24 rounded-full border border-primaryBrand object-cover"
            />
            {isOwnProfile && (
              <div className="flex flex-col gap-3">
                <input
                  type="file"
                  accept="image/png,image/jpeg,image/gif"
                  onChange={(e) => setFile(e.target.files?.[0] ?? null)}
                  className="text-sm text-textBrand file:bg-secondaryBrand file:text-white file:font-semibold file:px-4 file:py-2 file:rounded-full file:border-0 hover:file:bg-secondaryBrand/80"
                />
                {file && (
                  <button
                    onClick={handleUpload}
                    disabled={loading}
                    className="rounded-3xl bg-secondaryBrand text-white px-6 py-2 hover:bg-secondaryBrand/75 disabled:opacity-50"
                  >
                    {loading ? "Uploading..." : "Upate Icon"}
                  </button>
                )}
                {uploadError && <p className="text-red-500">{uploadError}</p>}
                <p className="text-xs text-accentBrand">JPG, GIF or PNG. Max 1MB.</p>
              </div>
            )}
          </div>

          <p className="text-textBrand font-medium">{user.aboutMe ?? "No bio provided"}</p>

          <div className="grid grid-cols-2 gap-x-6 gap-y-6 text-textBrand text-sm">
            <div>
              <p className="font-semibold text-accentBrand">First Name</p>
              <p>{user.firstName}</p>
            </div>
            <div>
              <p className="font-semibold text-accentBrand">Last Name</p>
              <p>{user.lastName}</p>
            </div>
            <div>
              <p className="font-semibold text-accentBrand">Email</p>
              <p>{user.email}</p>
            </div>
            <div>
              <p className="font-semibold text-accentBrand">Location</p>
              <p>{user.location || "Not provided"}</p>
            </div>
            <div>
              <p className="font-semibold text-accentBrand">Age</p>
              <p>
                {user.dateOfBirth
                  ? formatDistanceToNow(new Date(user.dateOfBirth), { addSuffix: true })
                  : "DOB not provided"}
              </p>
            </div>
            <div>
              <div>
                <p className="font-semibold text-accentBrand">Theme</p>
                <button 
                  onClick={() => document.documentElement.classList.toggle('dark')}
                  className="flex items-center gap-2 hover:text-primaryBrand"
                >
                  <span>Dark/Light Mode</span>
                  <svg 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    className="w-5 h-5"
                    stroke="currentColor"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={2} 
                      d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT: Collapsibles */}
        <div className="flex flex-col gap-6">
          <h2 className="text-2xl font-semibold text-accentBrand">Working on...</h2>

          {/* Section Block */}
          {[
            {
              label: "Communities",
              count: user.Communities.length,
              open: communityOpen,
              toggle: () => setCommunityOpen(!communityOpen),
              content: (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
  {user.Communities.map((c) => (
    <CommunityCard key={c.id} community={c} />
  ))}
</div>

              ),
            },
            {
              label: "Projects",
              count: user.Projects.length,
              open: projectOpen,
              toggle: () => setProjectOpen(!projectOpen),
              content: <ProjectList projects={user.Projects} />,
            },
            {
              label: "Meetings",
              count: user.Projects.flatMap((p) => p.Meetings).length,
              open: meetingOpen,
              toggle: () => setMeetingOpen(!meetingOpen),
              content: (
                <div className="grid gap-4 sm:grid-cols-2">
                  {user.Projects.flatMap((p) => p.Meetings).map((m) => (
                    <MeetingCard key={m.id} meeting={m} />
                  ))}
                </div>
              ),
            },
            {
              label: "Todos",
              count: user.assignedTodos.length,
              open: todoOpen,
              toggle: () => setTodoOpen(!todoOpen),
              content: <TodoList todos={user.assignedTodos} />,
            },
          ].map((section) => (
            <div key={section.label}>
              <div className="flex items-center gap-2">
                {isOwnProfile && (
                  <button
                    onClick={section.toggle}
                    disabled={section.count === 0}
                    className="w-6 h-6"
                  >
                    {section.open ? (
                      <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5">
                        <path d="M7 10L12 15L17 10" stroke="#ee6605" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    ) : (
                      <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5">
                        <path d="M10 7L15 12L10 17" stroke="#ee6605" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    )}
                  </button>
                )}
                <p className="font-semibold text-accentBrand">{section.label}</p>
                <span className={`ml-auto flex h-6 w-6 items-center justify-center rounded-full text-xs text-white ${section.count === 0 ? "bg-textBrand" : "bg-primaryBrand"}`}>
                  {section.count}
                </span>
              </div>
              {section.open && <div className="mt-4">{section.content}</div>}
            </div>
          ))}

          <p className="text-sm text-textBrand">
            Created {user.createdTodos.length} todos, {user.OwnedProjects.length} projects,{" "}
            {user.Meetings.length} meetings, {user.Comments.length} comments and{" "}
            {user.OwnedCommunities.length} communities.
          </p>
        </div>
      </div>

      {isOwnProfile && (
        <>
          <button
            onClick={() => setEditOpen(true)}
            className="mt-10 rounded-3xl bg-primaryBrand text-white px-8 py-3 hover:bg-primaryBrand/80 border border-primaryBrand  transition"
          >
            Update Profile
          </button>
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
        </>
      )}
    </main>
  );
}
