"use client"
import React, { useState } from 'react'
import { useAuthContext } from '~/context/AuthContext'
import { api } from '~/trpc/react'
import type{ MemberOf } from '~/types/userTypes'
export default function JoinProjectButton({projectId, members}:{projectId:number, members:MemberOf[]}) {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")
    const {user} = useAuthContext()
    const {mutate} = api.projects.addProjectMemberById.useMutation({
        onSuccess: () => {
            console.log("Project joined successfully")
            setLoading(false)
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
    }
)
    }
  return (
    <>
    { !members.some(member => member.id === user?.id)  &&
    <div onClick={handleJoinCommunity} className='px-10 hover:bg-secondaryBrand/75 py-3 rounded-3xl bg-secondaryBrand text-white'>
        Join Project
    </div>
    }
    </>
  )
}
