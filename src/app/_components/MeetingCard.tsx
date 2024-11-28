import React from 'react'
import { type Meeting } from '@prisma/client'
import Link from 'next/link'
export default function MeetingCard({meeting}:{meeting: Meeting}) {
  return (
    <div className='max-w-sm h-64 bg-white shadow-xl border text-left border-accentBrand rounded-2xl p-4 flex flex-col gap-y-4 text-accentBrand'>
      <h1 className='text-3xl truncate font-bold'>
        {meeting.title}
      </h1>
      <p className='text-sm text-semibold truncate text-textBrand'>
       About: {meeting.content}
      </p>
      <p className='text-sm text-semibold truncate text-textBrand'>
       {meeting.inPerson? "Location":"Link"}: {meeting.meetingLocationOrLink}
      </p>
      <p className='text-sm text-semibold truncate text-textBrand'>
        When: {new Date(meeting.meetingTime.toISOString()).toLocaleString()}
      </p>
    <Link href={`/meeting/${meeting.id}`} className='px-10 flex flex-row gap-x-1 hover:bg-primaryBrand/70 py-3 rounded-3xl bg-primaryBrand text-white w-fit'>
    <p>View More</p>
    <span className='my-auto'>
    <svg  className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
        </svg>
    </span>
    </Link>

    </div>
  )
}
