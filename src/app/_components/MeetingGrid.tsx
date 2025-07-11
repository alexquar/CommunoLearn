import React from "react";
import { type Meeting } from "@prisma/client";
import MeetingCard from "./MeetingCard";

export default function MeetingGrid({ meetings }: { meetings: Meeting[] }) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {meetings.length === 0 ? (
      <div className="my-8 text-textBrand text-sm">
        No meetings found 🙁
      </div>
    )
: (
        meetings.map((meeting) => (
          <MeetingCard key={meeting.id} meeting={meeting} />
        ))
      )}
    </div>
  );
}
