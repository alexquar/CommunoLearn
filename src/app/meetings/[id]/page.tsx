"use client";
import { notFound } from "next/navigation";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { api, type RouterOutputs } from "~/trpc/react";
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

  const { refetch } = api.meetings.getMeetingById.useQuery({ id: numericId });

  const { mutate: deleteMeeting } = api.meetings.deleteMeetingById.useMutation({
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
    deleteMeeting({ id: numericId });
  };

  useEffect(() => {
    refetch()
      .then((result) => {
        const data = result.data;
        if (!data) return notFound();
        if (data.AssociatedCommunity.private && !data.AssociatedCommunity.members.some(m => m.id === user?.id)) {
          return notFound();
        }
        setMeeting(data ?? null);
      })
      .catch((err) => console.error("Refetch failed:", err));
  }, [refetch, numericId, user]);

  if (isNaN(numericId)) return notFound();

  if (!meeting) return <Loading />;

  return (
    <div className="mx-auto max-w-5xl px-4 py-10">
      <div className="rounded-2xl border border-borderBrand bg-white p-6 shadow-sm hover:shadow-md transition flex flex-col gap-6">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
          <h1 className="text-3xl font-bold text-textBrand">{meeting.title}</h1>
          <Link
            href={`/projects/${meeting.AssociatedProjectId}`}
            className="text-sm text-primaryBrand hover:underline"
          >
            ← Back to Project
          </Link>
        </div>

        {meeting.done && <Blob title="Done" />}

        {/* Description */}
        <p className="text-base text-accentBrand">{meeting.content}</p>

        {/* Metadata */}
        <div className="flex flex-wrap gap-4 text-sm text-textBrand border-t border-borderBrand pt-4">
          <p><span className="font-semibold">Time:</span> {meeting.meetingTime.toLocaleString()}</p>
          <p><span className="font-semibold">Length (hrs):</span> {Number(meeting.length ?? 0).toFixed(2)}</p>
          <p><span className="font-semibold">Created:</span> {meeting.createdAt.toDateString()}</p>
          <p><span className="font-semibold">Updated:</span> {meeting.updatedAt.toDateString()}</p>
          <p><span className="font-semibold">Project:</span> {meeting.AssociatedProject.title}</p>
          <p className="flex items-center gap-1">
            <span className="font-semibold">{meeting.inPerson ? "Location" : "Link"}:</span>
            {meeting.inPerson ? (
              meeting.meetingLocationOrLink
            ) : (
              <a
                target="_blank"
                href={meeting.meetingLocationOrLink}
                className="underline"
              >
                {meeting.meetingLocationOrLink.length > 15
                  ? `${meeting.meetingLocationOrLink.substring(0, 15)}...`
                  : meeting.meetingLocationOrLink}
              </a>
            )}
          </p>
        </div>

        {/* Calendar Button */}
        <button
          onClick={() => {
            const calendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(meeting.title)}&dates=${meeting.meetingTime.toISOString().replace(/-|:|\.\d+/g, "")}/${new Date(meeting.meetingTime.getTime() + (Number(meeting.length) || 0) * 60 * 60 * 1000).toISOString().replace(/-|:|\.\d+/g, "")}&details=${encodeURIComponent(meeting.content)}&location=${encodeURIComponent(meeting.meetingLocationOrLink)}`;
            window.open(calendarUrl, "_blank");
          }}
          className="w-fit rounded-3xl bg-secondaryBrand px-6 py-2 text-white hover:bg-secondaryBrand/75 text-sm"
        >
          Add to Google Calendar
        </button>
        <p className="text-sm text-textBrand">
          (You must be logged in with Google to use this feature.)
        </p>

        {/* Created By */}
        <div className="pt-6 border-t border-borderBrand">
          <Link
            href={`/user/${meeting.createdBy.id}`}
            className="text-sm font-semibold text-primaryBrand hover:underline"
          >
            Created by {meeting.createdBy.firstName} {meeting.createdBy.lastName}
          </Link>
        </div>

        {/* Documents */}
        <div className="pt-6 border-t border-borderBrand">
          <h3 className="text-xl font-semibold text-accentBrand mb-2">Meeting Documents</h3>
          {meeting.meetingDocuments.length === 0 ? (
                 <div className=" text-textBrand text-sm">
        No meetings documents provided 🙁
      </div>
          ) : (
            <ul className="list-disc list-inside text-sm">
              {meeting.meetingDocuments.map((doc, i) => (
                <li key={i}>
                  <a
                    href={doc}
                    target="_blank"
                    className="text-primaryBrand hover:underline"
                  >
                    {i + 1}. {doc}
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Controls */}
        {meeting.createdBy.id === user?.id && (
          <div className="flex flex-wrap gap-4 pt-6">
            <button
              onClick={() => setEdit(true)}
              className="rounded-3xl bg-secondaryBrand px-6 py-2 text-sm text-white hover:bg-secondaryBrand/75"
            >
              Edit Meeting
            </button>
            <button
              onClick={handleDelete}
              className="rounded-3xl bg-secondaryBrand px-6 py-2 text-sm text-white hover:bg-secondaryBrand/75"
            >
              {loading ? "Deleting..." : "Delete Meeting"}
            </button>
          </div>
        )}

        {/* Comments */}
        <div className="pt-6 border-t border-borderBrand">
          <CommentSection
            comments={meeting.Comment}
            onId={meeting.id}
            commentOn="meeting"
          />
        </div>
      </div>

      {/* Edit Modal */}
      <NewMeetingModal
        open={edit}
        setOpen={setEdit}
        projectId={meeting.AssociatedProjectId}
        meetingId={meeting.id}
        communityId={meeting.AssociatedCommunityId}
        isEdit
        titleProp={meeting.title}
        contentProp={meeting.content}
        meetingTimeProp={meeting.meetingTime.toISOString()}
        meetingDocumentsProp={meeting.meetingDocuments}
        inPersonProp={meeting.inPerson}
        meetingLocationOrLinkProp={meeting.meetingLocationOrLink}
        isDone={meeting.done}
        length={meeting.length ? Number(meeting.length) : undefined}
      />
    </div>
  );
}
