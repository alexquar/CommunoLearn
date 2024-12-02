"use client";
import { notFound } from "next/navigation";
import React, { useEffect } from "react";
import Link from "next/link";
import { api, type RouterOutputs } from "~/trpc/react";
import { useState } from "react";
import NewMeetingModal from "~/app/_components/NewMeetingModal";
import Loading from "~/app/loading";
import { useAuthContext } from "~/context/AuthContext";
import Blob from "~/app/_components/Blob";
import CommentSection from "~/app/_components/_comments/CommentSection";
import { useRouter } from "next/navigation";
type MeetingWithRelations = RouterOutputs["meetings"]["getMeetingById"];
export default function Meeting({ params }: { params: { id: string } }) {
  const [edit, setEdit] = useState(false);
  const [meeting, setMeeting] = useState<MeetingWithRelations | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { user } = useAuthContext();
  const id = params.id;
  const numericId = Number(id);

  const { refetch } = api.meetings.getMeetingById.useQuery({
    id: numericId,
  });

  const {mutate : deleteMeeting} = api.meetings.deleteMeetingById.useMutation({
    onSuccess: () => {
      setLoading(false);
      router.push(`/projects/${meeting?.AssociatedProjectId}`);
    },
    onError: (error) => {
      setLoading(false);
      console.error(error);
    },
  });

  const handleDelete = () => {
    setLoading(true);
    deleteMeeting({
      id: numericId,
    });
  }

  useEffect(() => {
    refetch()
      .then((result) => {
        const data = result.data;
        if (!data) {
          return notFound();
        }
        if (
          data.AssociatedCommunity.private &&
          !data.AssociatedCommunity.members.some(
            (member) => member.id === user?.id,
          )
        ) {
          return notFound();
        }
        setMeeting(data ?? null);
      })
      .catch((error) => {
        console.error("Failed to refetch todo:", error);
      });
  }, [refetch, numericId, user]);

  if (isNaN(numericId)) {
    return notFound();
  }

  return (
    <>
      {" "}
      {meeting ? (
        <div className="mx-auto flex max-w-7xl flex-col gap-12 px-10 py-12">
          <div className="flex flex-col gap-y-3">
            <div className="flex flex-row justify-between">
              <h1 className="text-5xl font-bold text-accentBrand">
                {meeting?.title}
              </h1>
              <Link
                href={`/projects/${meeting?.AssociatedProjectId}`}
                className="cursor-pointer text-lg font-semibold text-primaryBrand hover:underline"
              >
                Back to Project
              </Link>
            </div>
            {meeting.done && (
              <div className="inline-flex">
                <Blob title="Done" />
              </div>
            )}
            <p className="text-lg font-semibold text-textBrand">
              {meeting?.content}
            </p>
            <div className="flex flex-col gap-x-1 gap-y-4 text-textBrand md:flex-row">
              <p className="border-textBrand pe-1 md:border-e">
                Time: {meeting.meetingTime.toDateString()}
              </p>
              <p className="border-textBrand pe-1 md:border-e">
                Updated: {meeting.updatedAt.toDateString()}
              </p>
              <p className="border-textBrand pe-1 md:border-e">
                Created: {meeting.createdAt.toDateString()}
              </p>
              <p className="border-textBrand pe-1 md:border-e">
                Associated Project: {meeting.AssociatedProject.title}
              </p>
              <p className="flex flex-row border-textBrand pe-1 md:border-e">
                {meeting.inPerson ? "Location" : "Link"}:{" "}
                {!meeting.inPerson ? (
                  <a
                    target="_blank"
                    className="cursor-point ms-1 underline"
                    href={meeting.meetingLocationOrLink}
                  >
                    {meeting.meetingLocationOrLink.length > 15
                      ? `${meeting.meetingLocationOrLink.substring(0, 15)}...`
                      : meeting.meetingLocationOrLink}
                  </a>
                ) : (
                  meeting.meetingLocationOrLink
                )}
              </p>
            </div>
            <div className="mt-4 flex flex-col gap-y-8 text-xl font-bold text-primaryBrand">
              <Link href={`/user/${meeting.createdBy.id}`}>
                Created by {meeting.createdBy.firstName}{" "}
                {meeting.createdBy.lastName}
              </Link>
              <span>
                <h3 className="mb-4 text-lg font-semibold text-accentBrand">
                  Meeting Documents
                </h3>
                <ul>
                  {meeting.meetingDocuments.length === 0 ? (
                    <div>
                      <p className="text-base font-normal text-textBrand">
                        No meeting documents provided :(
                      </p>
                    </div>
                  ) : (
                    <>
                      {meeting.meetingDocuments.map((doc, i) => (
                        <li key={i}>
                          <a
                            href={doc}
                            target="_blank"
                            className="text-base font-normal text-primaryBrand hover:underline"
                          >
                            {i + 1}. {doc}
                          </a>
                        </li>
                      ))}
                    </>
                  )}
                </ul>
              </span>
              {meeting.createdBy.id === user?.id && (
                <div className="flex flex-row gap-x-4">
                <button
                  onClick={() => setEdit(true)}
                  className="w-fit rounded-3xl bg-secondaryBrand px-10 py-3 text-base font-normal text-white hover:bg-secondaryBrand/75"
                >
                  Edit Meeting
                </button>
                <button
                  onClick={handleDelete}
                  className="w-fit rounded-3xl bg-secondaryBrand px-10 py-3 text-base font-normal text-white hover:bg-secondaryBrand/75"
                >
                  {loading ? "Deleting..." : "Delete Meeting"}
                </button>
                </div>
              )}
              <CommentSection
                comments={meeting.Comment}
                onId={meeting.id}
                commentOn="meeting"
              />
            </div>
          </div>
          <NewMeetingModal
            open={edit}
            setOpen={setEdit}
            projectId={meeting?.AssociatedProjectId}
            meetingId={meeting?.id}
            communityId={meeting?.AssociatedCommunityId}
            isEdit
            titleProp={meeting?.title}
            contentProp={meeting?.content}
            meetingTimeProp={meeting?.meetingTime.toISOString()}
            meetingDocumentsProp={meeting?.meetingDocuments}
            inPersonProp={meeting?.inPerson}
            meetingLocationOrLinkProp={meeting?.meetingLocationOrLink}
            isDone={meeting?.done}
          />
        </div>
      ) : (
        <Loading />
      )}
    </>
  );
}
