import React from "react";
import { type Meeting } from "@prisma/client";

export default function MeetingCard({ meeting }: { meeting: Meeting }) {
  return (
    <div className="flex flex-col justify-between rounded-2xl border border-borderBrand bg-white p-6 shadow-sm hover:shadow-md transition min-h-[260px]">
      <div className="flex flex-col gap-y-2">
        <h2 className="text-lg font-semibold text-textBrand line-clamp-1">
          {meeting.title}
        </h2>
        <p className="text-sm text-textBrand line-clamp-2">
          {meeting.content}
        </p>
        <p className="text-xs text-accentBrand truncate">
          {meeting.inPerson ? "Location" : "Link"}:{" "}
          <span className="text-textBrand">{meeting.meetingLocationOrLink}</span>
        </p>
        <p className="text-xs text-accentBrand truncate">
          When:{" "}
          <span className="text-textBrand">
            {new Date(meeting.meetingTime).toLocaleString()}
          </span>
        </p>
      </div>
    </div>
  );
}
