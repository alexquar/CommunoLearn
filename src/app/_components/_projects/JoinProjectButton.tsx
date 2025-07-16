"use client"
import React, { useState } from 'react'
import { useAuthContext } from '~/context/AuthContext'
import { api } from '~/trpc/react'
import type{ MemberOf } from '~/types/userTypes'
import { useRouter } from 'next/navigation'
import ErrorNotification from '../_general/ErrorNotification'

export default function JoinProjectButton({projectId, members}:{projectId:number, members:MemberOf[]}) {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")
    const router = useRouter()
    const {user} = useAuthContext()
    const {mutate} = api.projects.addProjectMemberById.useMutation({
        onSuccess: () => {
            console.log("Project joined successfully")
            setLoading(false)
            router.refresh()
        },
        onError: (error) => {
            console.error(error)
            setError("Error Occured")
            setLoading(false)
        }
    })
    const handleJoinCommunity = () => {
        setLoading(true)
        setError("")
        mutate({
            projectId,
            userId: user?.id ?? ""
        })
    }

    return (
        <>
            {error && <ErrorNotification message={error} />}
            { !members.some(member => member.id === user?.id)  &&
                <div className="mt-2 ms-auto w-fit">
                    <div onClick={handleJoinCommunity} className='px-10 hover:bg-secondaryBrand/75 py-3 rounded-3xl bg-secondaryBrand text-white'>
                        {loading ? 'Joining...' : 'Join Project'}
                    </div>
                </div>
            }
        </>
    )
}
