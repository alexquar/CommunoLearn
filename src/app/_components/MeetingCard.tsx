import React from 'react'
import { type Meeting } from '@prisma/client'
export default function MeetingCard({meeting}:{meeting: Meeting}) {
  return (
    <div className='max-w-sm h-56 bg-white shadow-xl border border-accentBrand rounded-2xl p-4 text-accentBrand'>
      <h1>
        {meeting.title}
      </h1>
      <p>
        {meeting.content}
      </p>
    </div>
  )
}
