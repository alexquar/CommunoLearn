/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import React from 'react'
import type { MemberOf } from '~/types/userTypes'
import Image from 'next/image'
import user from '../../../../public/user.svg'
import Link from 'next/link'
export default function UserList({members, ownerId}: {members: MemberOf[], ownerId: string}) {
    return (
        <ul className="flex flex-wrap gap-6 py-4">
  {members.map((member) => (
    <li
      key={member.id}
      className="rounded-2xl border border-gray-200 shadow-sm p-4 flex flex-row items-center gap-4 w-full max-w-xs transition hover:shadow-md hover:-translate-y-1"
    >
      <Link
        href={`/user/${member.id}`}
        className="flex items-center gap-4"
      >
        <Image
          src={member.image ?? user}
          width={48}
          height={48}
          alt="avatar"
          className="w-12 h-12 rounded-full border border-primaryBrand"
        />
        <span className="flex flex-col">
          <p className="text-lg font-semibold text-textBrand">
            {member.firstName} {member.lastName}
          </p>
          <p
            className={`text-sm font-medium ${
              member.id === ownerId ? 'text-primaryBrand' : 'text-accentBrand'
            }`}
          >
            {member.id === ownerId ? 'Owner' : 'Member'}
          </p>
        </span>
      </Link>
    </li>
  ))}
  {
    members.length === 0 && (
      <li className="text-textBrand text-sm">
        No members found 🙁
      </li>
    )
  }
</ul>
    )
}
