import React from 'react'
import { type Meeting } from '@prisma/client'
import MeetingCard from './MeetingCard'
export default function MeetingGrid({meetings}:{meetings: Meeting[]}) {
  return (
    <div className='grid grid-col-1 mx-auto md:grid-cols-2 xl:grid-cols-3 gap-4 lg:gap-8'>
      {
        meetings.length === 0 && (
          <div >
          <p className="text-textBrand">No meetings found :(</p>
            </div>
        )
      }
      {
        meetings.map((meeting) => (
          <React.Fragment key={meeting.id}>
            <MeetingCard meeting={meeting} />
          </React.Fragment>
        ))
      }
    </div>
  )
}
