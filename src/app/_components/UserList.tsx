import React from 'react'
import type { MemberOf } from '~/types/userTypes'
import Image from 'next/image'
import user from '../../../public/user.svg'
export default function UserList({members, ownerId}: {members: MemberOf[], ownerId: string}) {
    return (
        <ul className='flex flex-row gap-x-8 mx-2 py-4 overflow-x-scroll'>
            {
                members.map((member) => (
                    <li className='flex-shrink-0 justify-center items-center flex flex-row gap-x-3' key={member.id}>
                        <Image src={user} alt="avatar" className='w-8 border p-1 border-primaryBrand h-8 rounded-full' />
                        <span>
                        <p className='text-textBrand cursor-pointer font-semibold'>
                        {member.firstName} {member.lastName}
                        </p>
                        <p className={`${member.id === ownerId ? 'text-primaryBrand' : 'text-accentBrand'} font-bold`}>
                        {member.id === ownerId ? 'Owner' : 'Member'}
                        </p>
                        </span>
                    </li>
                ))
            }
        </ul>
    )
}
